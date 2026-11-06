"""
VotoClaro - Servidor (FastAPI)
==============================
Plataforma informativa das Eleicoes 2026. Sem login, sem cadastro.

Fornece ao front-end, a partir da API publica DivulgaCandContas (TSE):
  - /api/presidentes                 candidatos a Presidente
  - /api/eleicao/{uf}/{cargo}        candidatos de um estado por cargo
                                     (governador | senador | dep-estadual | dep-federal)
  - /api/detalhe/{uf}/{id}           dados resumidos do candidato (trajetoria, coligacao...)
  - /api/foto/{uf}/{id}              foto oficial (proxy com cache em disco)

Execucao (Python 3.10 ou superior):
    pip install -r requirements.txt
    python server.py              # consulta o TSE e grava o cache
    python server.py --offline    # usa so o cache em disco (corpus de 16/09 e 22/10/2026)
Acesse: http://127.0.0.1:8000

Privacidade: o servidor escuta so em 127.0.0.1 e nao grava registro de acesso
(access_log desligado). Nao ha cadastro, cookie nem banco de dados de usuarios.
"""

import os
import re
import sys
import time
import threading
import unicodedata
import webbrowser
from pathlib import Path

import requests
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse, Response
from fastapi.staticfiles import StaticFiles

ROOT = Path(__file__).parent
if "--offline" in sys.argv:
    os.environ["VOTOCLARO_OFFLINE"] = "1"
sys.path.insert(0, str(ROOT / "backend" / "api"))

try:
    import tse_client
    TSE_AVAILABLE = True
except ImportError as e:  # pragma: no cover
    TSE_AVAILABLE = False
    print(f"  [TSE] Modulo tse_client nao disponivel: {e}")

FOTO_CACHE = ROOT / "data" / "cache" / "fotos"
FOTO_CACHE.mkdir(parents=True, exist_ok=True)

# Situacoes de registro que tiram o candidato da disputa
SITUACOES_EXCLUIDAS = ("renúncia", "renuncia", "cancel", "falec", "cassad", "não conhec", "nao conhec")

CARGOS = {
    "governador":   lambda uf: tse_client.get_governadores(uf),
    "senador":      lambda uf: tse_client.get_senadores_tse(uf),
    "dep-estadual": lambda uf: tse_client.get_deputados_estaduais(uf),
    "dep-federal":  lambda uf: tse_client.get_deputados_federais(uf),
}

_foto_session = requests.Session()
_foto_session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0 Safari/537.36",
    "Referer": "https://divulgacandcontas.tse.jus.br/divulga/",
})
_foto_sem = threading.Semaphore(6)


# --- HELPERS ---

def norm_sigla(s: str) -> str:
    """'PC do B' -> 'PCDOB', 'MISSÃO' -> 'MISSAO'."""
    s = unicodedata.normalize("NFKD", s or "").encode("ascii", "ignore").decode()
    return re.sub(r"[^A-Z0-9]", "", s.upper())


def parse_coligacao(composicao: str, partido: str) -> list:
    """Extrai as siglas de uma string de coligacao do TSE.
    Ex.: 'PSB / PDT / FEDERAÇÃO BRASIL DA ESPERANÇA - FE BRASIL(13-PT/65-PC do B/43-PV)'
    """
    siglas = set()
    if partido:
        siglas.add(norm_sigla(partido))
    comp = (composicao or "").strip()
    if not comp or comp.strip("* ") == "":
        return sorted(siglas)
    # Partidos dentro de federacoes: (13-PT/65-PC do B/43-PV)
    for grupo in re.findall(r"\(([^)]*)\)", comp):
        for p in grupo.split("/"):
            p = re.sub(r"^\s*\d+\s*-\s*", "", p)
            if p.strip():
                siglas.add(norm_sigla(p))
    # Partidos soltos
    sem_feds = re.sub(r"[^/]*\([^)]*\)", "", comp)
    for p in sem_feds.split("/"):
        p = p.strip()
        if p and len(p) <= 15:
            siglas.add(norm_sigla(p))
    siglas.discard("")
    return sorted(siglas)


def ativo(c: dict) -> bool:
    sit = (c.get("situacao") or "").lower()
    return not any(x in sit for x in SITUACOES_EXCLUIDAS)


def lean(c: dict, uf: str) -> dict:
    """Versao enxuta do candidato para listas grandes."""
    return {
        "id": str(c.get("tse_id") or ""),
        "nome": c.get("nome", ""),
        "urna": c.get("nomeUrna", ""),
        "numero": c.get("numero"),
        "partido": c.get("partido", ""),
        "situacao": c.get("situacao", ""),
        "totalizacao": c.get("totalizacao", ""),
        "uf": uf,
        "tse_url": c.get("tse_url"),
    }


CARGO_ID = {
    "governador": lambda uf: tse_client.CARGO_GOVERNADOR,
    "senador": lambda uf: tse_client.CARGO_SENADOR,
    "dep-federal": lambda uf: tse_client.CARGO_DEPUTADO_FEDERAL,
    "dep-estadual": lambda uf: tse_client.CARGO_DEPUTADO_DISTRITAL if uf == "DF" else tse_client.CARGO_DEPUTADO_ESTADUAL,
}


def consultado_em(key):
    """Data e hora (ISO 8601, com fuso) da consulta ao TSE gravada no cache (RN03)."""
    ts = tse_client.cache_ts(key)
    if not ts:
        return None
    from datetime import datetime, timezone
    return datetime.fromtimestamp(ts, tz=timezone.utc).astimezone().isoformat(timespec="minutes")


def tse_indisponivel():
    return JSONResponse({"erro": "Cliente do TSE indisponivel"}, status_code=503)


# --- APP ---

VERSAO = "6.1"

app = FastAPI(title="VotoClaro API", version="6.1.0", docs_url="/api/docs", openapi_url="/api/openapi.json")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


@app.get("/", include_in_schema=False)
def serve_index():
    return FileResponse(ROOT / "index.html")


@app.get("/api/status")
def api_status():
    return {"status": "online", "version": VERSAO, "tse_api": TSE_AVAILABLE,
            "offline": bool(TSE_AVAILABLE and tse_client.OFFLINE)}


@app.get("/api/presidentes")
def presidentes():
    if not TSE_AVAILABLE:
        return tse_indisponivel()
    dados = [lean(c, "BR") for c in tse_client.get_presidentes() if ativo(c)]
    return {"dados": dados, "total": len(dados),
            "consultado_em": consultado_em(tse_client._cache_key(tse_client.CARGO_PRESIDENTE, "BR"))}


@app.get("/api/eleicao/{uf}/{cargo}")
def eleicao(uf: str, cargo: str):
    if not TSE_AVAILABLE:
        return tse_indisponivel()
    uf = uf.upper()
    if uf not in tse_client.UFS:
        return JSONResponse({"erro": "UF invalida"}, status_code=400)
    fn = CARGOS.get(cargo.lower())
    if not fn:
        return JSONResponse({"erro": f"Cargo invalido. Use: {', '.join(CARGOS)}"}, status_code=400)
    try:
        dados = [lean(c, uf) for c in fn(uf) if ativo(c)]
    except Exception as e:
        return JSONResponse({"erro": str(e)}, status_code=502)
    dados.sort(key=lambda c: c["urna"])
    chave = tse_client._cache_key(CARGO_ID[cargo.lower()](uf), uf)
    return {"dados": dados, "total": len(dados), "uf": uf, "cargo": cargo,
            "consultado_em": consultado_em(chave)}


@app.get("/api/detalhe/{uf}/{tse_id}")
def detalhe(uf: str, tse_id: str):
    if not TSE_AVAILABLE:
        return tse_indisponivel()
    uf = uf.upper()
    d = tse_client.get_candidato_detalhes(uf, tse_id)
    if not d:
        return JSONResponse({"erro": "Candidato nao encontrado"}, status_code=404)

    partido = (d.get("partido") or {}).get("sigla", "")
    eleicoes = []
    for e in d.get("eleicoesAnteriores") or []:
        eleicoes.append({
            "ano": e.get("nrAno"),
            "cargo": e.get("cargo"),
            "local": e.get("local"),
            "partido": e.get("partido"),
            "situacao": e.get("situacaoTotalizacao"),
            "link": e.get("txLink"),
        })
    eleicoes.sort(key=lambda e: e["ano"] or 0, reverse=True)

    natural = None
    if d.get("nomeMunicipioNascimento"):
        natural = f"{d['nomeMunicipioNascimento'].title()}/{d.get('sgUfNascimento') or ''}".rstrip("/")

    return {"dados": {
        "id": str(d.get("id")),
        "urna": d.get("nomeUrna"),
        "nome": d.get("nomeCompleto"),
        "numero": d.get("numero"),
        "partido": partido,
        "partido_nome": (d.get("partido") or {}).get("nome"),
        "cargo": (d.get("cargo") or {}).get("nome"),
        "uf": uf,
        "nascimento": d.get("dataDeNascimento"),
        "naturalidade": natural,
        "instrucao": d.get("grauInstrucao"),
        "ocupacao": d.get("ocupacao"),
        "situacao": d.get("descricaoSituacao"),
        "totalizacao": d.get("descricaoTotalizacao"),
        "coligacao": d.get("nomeColigacao"),
        "composicao": d.get("composicaoColigacao"),
        "coligacao_siglas": parse_coligacao(d.get("composicaoColigacao"), partido),
        "total_bens": d.get("totalDeBens"),
        "vices": [
            {"nome": v.get("nm_URNA"), "partido": v.get("sg_PARTIDO"), "cargo": v.get("ds_CARGO")}
            for v in (d.get("vices") or [])
        ],
        "eleicoes": eleicoes,
        "sites": [s.lower() for s in (d.get("sites") or [])][:6],
        "tem_plano": any(str(a.get("codTipo")) == "5" for a in (d.get("arquivos") or [])),
        "tse_url": tse_client.candidato_url(uf, d.get("id")),
    }, "consultado_em": consultado_em(f"tse_detalhe_{tse_client.ANO}_{uf}_{tse_id}")}


@app.get("/api/foto/{uf}/{tse_id}")
def foto(uf: str, tse_id: str):
    """Proxy da foto oficial do TSE, com cache em disco (evita CORS e acelera)."""
    if not tse_id.isdigit():
        return Response(status_code=400)
    path = FOTO_CACHE / f"{tse_id}.img"
    headers = {"Cache-Control": "public, max-age=604800"}
    if path.exists() and path.stat().st_size > 0:
        return Response(path.read_bytes(), media_type="image/jpeg", headers=headers)
    if not TSE_AVAILABLE:
        return Response(status_code=404)
    url = tse_client.proxy_foto_url(tse_id, uf.upper())
    try:
        with _foto_sem:
            r = _foto_session.get(url, timeout=12)
        ctype = r.headers.get("content-type", "")
        if r.status_code == 200 and ctype.startswith("image") and len(r.content) > 500:
            path.write_bytes(r.content)
            return Response(r.content, media_type=ctype, headers=headers)
    except Exception:
        pass
    return Response(status_code=404)


# Arquivos estaticos (depois das rotas da API)
app.mount("/css", StaticFiles(directory=ROOT / "css"), name="css")
app.mount("/js", StaticFiles(directory=ROOT / "js"), name="js")


def open_browser():
    time.sleep(1.5)
    webbrowser.open("http://127.0.0.1:8000")


if __name__ == "__main__":
    print("=" * 56)
    print(f"  VotoClaro v{VERSAO} - Eleicoes 2026")
    print(f"  TSE DivulgaCandContas: {'OK' if TSE_AVAILABLE else 'indisponivel'}"
          + (" (modo offline: so cache)" if TSE_AVAILABLE and tse_client.OFFLINE else ""))
    print("  Acesse: http://127.0.0.1:8000")
    print("=" * 56)
    if TSE_AVAILABLE and not tse_client.OFFLINE:
        try:
            tse_client.preload_presidentes()
        except Exception as e:
            print(f"  [TSE] Erro no preload: {e}")
    if "--no-browser" not in sys.argv:
        threading.Thread(target=open_browser, daemon=True).start()
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="warning", access_log=False)
