"""
VotoClaro — Cliente da API DivulgaCandContas do TSE
===================================================
Busca candidatos em tempo real da API REST nao oficial do TSE.

A API nao possui documentacao oficial. Endpoints mapeados via
engenharia reversa do sistema DivulgaCandContas.

Base URL: https://divulgacandcontas.tse.jus.br/divulga/rest/v1
Eleicao 2026 ID: 20322002026

Codigos de Cargo:
  1 = Presidente
  2 = Vice-Presidente
  3 = Governador
  4 = Vice-Governador
  5 = Senador
  6 = Deputado Federal
  7 = Deputado Estadual
  8 = Deputado Distrital
  9 = 1o Suplente Senador
  10 = 2o Suplente Senador
"""

import json
import os
import time
import threading
from pathlib import Path
from typing import Optional

import requests

# --- CONFIG ---
TSE_BASE_URL = "https://divulgacandcontas.tse.jus.br/divulga/rest/v1"
TSE_FOTO_URL = "https://divulgacandcontas.tse.jus.br/divulga/rest/arquivo/img"
ELEICAO_2026_ID = "20322002026"
ANO = 2026

# Codigos de cargo
CARGO_PRESIDENTE       = 1
CARGO_VICE_PRESIDENTE  = 2
CARGO_GOVERNADOR       = 3
CARGO_VICE_GOVERNADOR  = 4
CARGO_SENADOR          = 5
CARGO_DEPUTADO_FEDERAL = 6
CARGO_DEPUTADO_ESTADUAL = 7
CARGO_DEPUTADO_DISTRITAL = 8

# Mapeamento nome -> codigo
CARGO_MAP = {
    "presidente":        CARGO_PRESIDENTE,
    "governador":        CARGO_GOVERNADOR,
    "senador":           CARGO_SENADOR,
    "deputado federal":  CARGO_DEPUTADO_FEDERAL,
    "deputado estadual": CARGO_DEPUTADO_ESTADUAL,
    "deputado distrital": CARGO_DEPUTADO_DISTRITAL,
}

CARGO_NOME = {
    CARGO_PRESIDENTE:        "Presidente",
    CARGO_VICE_PRESIDENTE:   "Vice-Presidente",
    CARGO_GOVERNADOR:        "Governador",
    CARGO_VICE_GOVERNADOR:   "Vice-Governador",
    CARGO_SENADOR:           "Senador",
    CARGO_DEPUTADO_FEDERAL:  "Deputado Federal",
    CARGO_DEPUTADO_ESTADUAL: "Deputado Estadual",
    CARGO_DEPUTADO_DISTRITAL:"Deputado Distrital",
}

# UFs do Brasil
UFS = [
    "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA",
    "MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN",
    "RS","RO","RR","SC","SP","SE","TO"
]

# Cache em disco
ROOT = Path(__file__).resolve().parent.parent
CACHE_DIR = ROOT / "data" / "cache" / "tse_api"
CACHE_DIR.mkdir(parents=True, exist_ok=True)
CACHE_TTL = 1800  # 30 minutos

# Modo offline (VOTOCLARO_OFFLINE=1 ou "python server.py --offline"): usa só o
# cache em disco, sem consultar o TSE. Serve para reproduzir o corpus fixado em
# 16/09 e 22/10/2026 (cache do artigo) depois do fim do pleito.
OFFLINE = os.environ.get("VOTOCLARO_OFFLINE") == "1"

# Rate limiting
_last_request_time = 0
_rate_lock = threading.Lock()
MIN_REQUEST_INTERVAL = 0.5  # 500ms entre requests

# --- SESSION ---

def _create_session():
    """Cria sessao HTTP com headers de navegador."""
    session = requests.Session()
    session.headers.update({
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/126.0.0.0 Safari/537.36"
        ),
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "Referer": "https://divulgacandcontas.tse.jus.br/divulga/",
        "Origin": "https://divulgacandcontas.tse.jus.br",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Ch-Ua": '"Chromium";v="126", "Google Chrome";v="126", "Not)A;Brand";v="99"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"',
    })
    return session

_session = _create_session()


# --- CACHE ---

def _cache_key(cargo_id, uf):
    return f"tse_{ANO}_{uf}_{cargo_id}"


def cache_ts(key):
    """Data e hora (epoch) em que o registro do cache foi gravado, ou None."""
    path = CACHE_DIR / f"{key}.json"
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f).get("ts")
    except Exception:
        return None


def _cache_get(key, allow_stale=False):
    """Busca no cache em disco. Com allow_stale=True ignora a validade."""
    allow_stale = allow_stale or OFFLINE
    path = CACHE_DIR / f"{key}.json"
    if path.exists():
        try:
            with open(path, encoding="utf-8") as f:
                item = json.load(f)
            if allow_stale or time.time() - item.get("ts", 0) < CACHE_TTL:
                return item["data"]
        except Exception:
            pass
    return None


def _cache_set(key, data):
    """Salva no cache em disco."""
    try:
        with open(CACHE_DIR / f"{key}.json", "w", encoding="utf-8") as f:
            json.dump({"ts": time.time(), "data": data}, f, ensure_ascii=False)
    except Exception:
        pass


# --- API FETCH ---

def _rate_limit():
    """Aplica rate limiting entre requests."""
    global _last_request_time
    with _rate_lock:
        now = time.time()
        elapsed = now - _last_request_time
        if elapsed < MIN_REQUEST_INTERVAL:
            time.sleep(MIN_REQUEST_INTERVAL - elapsed)
        _last_request_time = time.time()


def _fetch_tse(endpoint, timeout=15):
    """
    Faz request para a API do TSE com tratamento de erros.
    Retorna dict/list ou None em caso de falha.
    """
    global _session
    _rate_limit()

    url = f"{TSE_BASE_URL}/{endpoint}"
    try:
        resp = _session.get(url, timeout=timeout)
        if resp.status_code == 200:
            return resp.json()
        elif resp.status_code == 403:
            # Tentar renovar a sessao
            print(f"  TSE API 403 em {endpoint} - tentando renovar sessao...")
            _session = _create_session()
            # Visitar a pagina principal para pegar cookies
            try:
                _session.get(
                    "https://divulgacandcontas.tse.jus.br/divulga/",
                    timeout=10
                )
                time.sleep(1)
                resp = _session.get(url, timeout=timeout)
                if resp.status_code == 200:
                    return resp.json()
            except Exception:
                pass
            print(f"  TSE API 403 persistente - usando cache local")
            return None
        elif resp.status_code == 404:
            return None
        else:
            print(f"  TSE API status {resp.status_code} em {endpoint}")
            return None
    except requests.exceptions.Timeout:
        print(f"  TSE API timeout em {endpoint}")
        return None
    except Exception as e:
        print(f"  TSE API erro: {e}")
        return None


# --- CANDIDATOS ---

def get_candidatos_raw(cargo_id, uf="BR"):
    """
    Busca candidatos brutos da API do TSE.
    Retorna lista de candidatos ou lista vazia.
    """
    key = _cache_key(cargo_id, uf)

    # 1. Tentar cache
    cached = _cache_get(key)
    if cached is not None:
        return cached

    if OFFLINE:
        return []

    # 2. Buscar da API
    endpoint = f"candidatura/listar/{ANO}/{uf}/{ELEICAO_2026_ID}/{cargo_id}/candidatos"
    data = _fetch_tse(endpoint)

    if data and isinstance(data, dict):
        candidatos = data.get("candidatos", [])
        if candidatos:
            _cache_set(key, candidatos)
            return candidatos

    # 3. API indisponivel: usar cache antigo, se existir
    stale = _cache_get(key, allow_stale=True)
    return stale or []


def normalizar_candidato_tse(raw, cargo_nome=None, uf_override=None):
    """
    Converte um candidato da API do TSE para o formato padrao do VotoClaro.

    Campos da API TSE:
      id, nomeUrna, nomeCompleto, numero, partido.sigla, partido.numero,
      descricaoSituacao, descricaoTotalizacao, fpiSqCandidato,
      dvSqCandidato, fotoUrl, sgUe, idEleicao
    """
    partido_sigla = ""
    if isinstance(raw.get("partido"), dict):
        partido_sigla = raw["partido"].get("sigla", "")
    elif isinstance(raw.get("partido"), str):
        partido_sigla = raw["partido"]

    uf = uf_override or raw.get("sgUe", "BR")
    if len(uf) > 2:
        uf = "BR"

    # Construir URL da foto (rota publica do DivulgaCand)
    foto_url = None
    sq_candidato = raw.get("id")
    if sq_candidato:
        foto_url = f"{TSE_FOTO_URL}/{ELEICAO_2026_ID}/{sq_candidato}/{uf}"

    # Se a API retorna fotoUrl diretamente
    if raw.get("fotoUrl"):
        foto_url = raw["fotoUrl"]

    cargo = cargo_nome or raw.get("descricaoCargo", "")

    return {
        "id": f"tse_{sq_candidato}" if sq_candidato else f"tse_{raw.get('numero', '')}",
        "tse_id": sq_candidato,
        "nome": raw.get("nomeCompleto", raw.get("nomeUrna", "")),
        "nomeUrna": raw.get("nomeUrna", ""),
        "numero": raw.get("numero"),
        "partido": partido_sigla,
        "uf": uf,
        "cargo": cargo,
        "metodo": "party",
        "fotoUrl": foto_url,
        "situacao": raw.get("descricaoSituacao", ""),
        "totalizacao": raw.get("descricaoTotalizacao", ""),
        "fonte": "DivulgaCandContas TSE",
        "tse_url": candidato_url(uf, sq_candidato) if sq_candidato else None,
    }


# --- DETALHAMENTO DE CANDIDATO ---

def get_candidato_detalhes(uf, candidato_id):
    """
    Busca o raio-X completo (detalhamento) de um candidato na API do TSE.
    Retorna bens, certidoes, plano de governo, etc.
    """
    key = f"tse_detalhe_{ANO}_{uf}_{candidato_id}"
    cached = _cache_get(key)
    if cached is not None:
        return cached

    if OFFLINE:
        return None

    # Endpoint da rota de detalhamento ("Raio-X")
    endpoint = f"candidatura/buscar/{ANO}/{uf}/{ELEICAO_2026_ID}/candidato/{candidato_id}"
    data = _fetch_tse(endpoint)

    if data:
        _cache_set(key, data)
        return data
    return _cache_get(key, allow_stale=True)


# --- FUNCOES PUBLICAS ---

def get_presidentes():
    """Busca todos os candidatos a Presidente."""
    raw = get_candidatos_raw(CARGO_PRESIDENTE, "BR")
    return [normalizar_candidato_tse(c, "Presidente", "BR") for c in raw]


def get_governadores(uf):
    """Busca candidatos a Governador de um estado."""
    raw = get_candidatos_raw(CARGO_GOVERNADOR, uf)
    return [normalizar_candidato_tse(c, "Governador", uf) for c in raw]


def get_senadores_tse(uf):
    """Busca candidatos a Senador de um estado."""
    raw = get_candidatos_raw(CARGO_SENADOR, uf)
    return [normalizar_candidato_tse(c, "Senador", uf) for c in raw]


def get_deputados_federais(uf):
    """Busca candidatos a Deputado Federal de um estado."""
    raw = get_candidatos_raw(CARGO_DEPUTADO_FEDERAL, uf)
    return [normalizar_candidato_tse(c, "Deputado Federal", uf) for c in raw]


def get_deputados_estaduais(uf):
    """Busca candidatos a Deputado Estadual de um estado."""
    cargo = CARGO_DEPUTADO_DISTRITAL if uf == "DF" else CARGO_DEPUTADO_ESTADUAL
    nome_cargo = "Deputado Distrital" if uf == "DF" else "Deputado Estadual"
    raw = get_candidatos_raw(cargo, uf)
    return [normalizar_candidato_tse(c, nome_cargo, uf) for c in raw]


def get_todos_governadores():
    """Busca governadores de TODOS os estados."""
    todos = []
    for uf in UFS:
        govs = get_governadores(uf)
        todos.extend(govs)
    return todos


def get_candidatos_por_cargo(cargo_nome, uf=None):
    """
    Busca candidatos por nome do cargo.
    cargo_nome: "Presidente", "Governador", "Senador", "Deputado Federal", "Deputado Estadual"
    uf: Sigla do estado (obrigatorio para cargos estaduais)
    """
    cargo_lower = cargo_nome.lower().strip()

    if "presidente" in cargo_lower:
        return get_presidentes()

    if not uf:
        return []

    if "governador" in cargo_lower:
        return get_governadores(uf)
    elif "senador" in cargo_lower:
        return get_senadores_tse(uf)
    elif "federal" in cargo_lower:
        return get_deputados_federais(uf)
    elif "estadual" in cargo_lower or "distrital" in cargo_lower:
        return get_deputados_estaduais(uf)

    return []


def buscar_candidatos_tse(query, limite=10):
    """
    Busca candidatos por nome em TODAS as fontes TSE.
    Busca nos caches locais primeiro, depois na API se necessario.
    """
    query_lower = query.lower()
    resultados = []

    # Buscar presidente (sempre BR)
    pres = get_presidentes()
    resultados.extend([c for c in pres if query_lower in c["nome"].lower()])

    if len(resultados) >= limite:
        return resultados[:limite]

    # Buscar em todos os estados (usar cache se disponivel)
    for uf in UFS:
        if len(resultados) >= limite:
            break

        for cargo_id, cargo_nome in [
            (CARGO_GOVERNADOR, "Governador"),
            (CARGO_SENADOR, "Senador"),
            (CARGO_DEPUTADO_FEDERAL, "Deputado Federal"),
        ]:
            key = _cache_key(cargo_id, uf)
            cached = _cache_get(key)
            if cached:
                for c in cached:
                    norm = normalizar_candidato_tse(c, cargo_nome, uf)
                    if query_lower in norm["nome"].lower():
                        resultados.append(norm)
                        if len(resultados) >= limite:
                            break

    return resultados[:limite]


def get_stats_tse():
    """Retorna estatisticas dos dados TSE em cache."""
    stats = {
        "presidentes": 0,
        "governadores": 0,
        "senadores": 0,
        "dep_federais": 0,
        "dep_estaduais": 0,
        "total": 0,
    }

    key = _cache_key(CARGO_PRESIDENTE, "BR")
    cached = _cache_get(key)
    if cached:
        stats["presidentes"] = len(cached)

    for uf in UFS:
        for cargo_id, stat_key in [
            (CARGO_GOVERNADOR, "governadores"),
            (CARGO_SENADOR, "senadores"),
            (CARGO_DEPUTADO_FEDERAL, "dep_federais"),
            (CARGO_DEPUTADO_ESTADUAL, "dep_estaduais"),
        ]:
            key = _cache_key(cargo_id, uf)
            cached = _cache_get(key)
            if cached:
                stats[stat_key] += len(cached)

    stats["total"] = sum(stats.values())
    return stats


def preload_presidentes():
    """Pre-carrega candidatos a presidente (chama ao iniciar o servidor)."""
    print("  [TSE] Carregando candidatos a Presidente...")
    pres = get_presidentes()
    print(f"  [TSE] {len(pres)} candidatos a Presidente carregados")
    return pres


REGIAO_UF = {
    "AC": "NORTE", "AM": "NORTE", "AP": "NORTE", "PA": "NORTE", "RO": "NORTE", "RR": "NORTE", "TO": "NORTE",
    "AL": "NORDESTE", "BA": "NORDESTE", "CE": "NORDESTE", "MA": "NORDESTE", "PB": "NORDESTE",
    "PE": "NORDESTE", "PI": "NORDESTE", "RN": "NORDESTE", "SE": "NORDESTE",
    "DF": "CENTROOESTE", "GO": "CENTROOESTE", "MS": "CENTROOESTE", "MT": "CENTROOESTE",
    "ES": "SUDESTE", "MG": "SUDESTE", "RJ": "SUDESTE", "SP": "SUDESTE",
    "PR": "SUL", "RS": "SUL", "SC": "SUL",
}


def candidato_url(uf, tse_id):
    """Pagina publica do candidato no DivulgaCandContas.

    Rota do site desde 2024: #/candidato/{REGIAO}/{UF}/{eleicao}/{id}/{ano}/{localidade}.
    A rota antiga (#/candidato/{ano}/{eleicao}/{uf}/{id}) abre "Erro ao carregar a pagina".
    """
    uf = (uf or "BR").upper()
    regiao = REGIAO_UF.get(uf, "BRASIL")
    return (f"https://divulgacandcontas.tse.jus.br/divulga/#/candidato/"
            f"{regiao}/{uf}/{ELEICAO_2026_ID}/{tse_id}/{ANO}/{uf}")


def proxy_foto_url(tse_id, uf="BR"):
    """Retorna a URL da foto oficial do candidato no TSE."""
    return f"{TSE_FOTO_URL}/{ELEICAO_2026_ID}/{tse_id}/{uf}"


# --- MAIN (teste) ---

if __name__ == "__main__":
    print("=" * 60)
    print("  Teste do cliente TSE DivulgaCandContas")
    print("=" * 60)

    print("\n--- Presidentes ---")
    pres = get_presidentes()
    for p in pres:
        print(f"  {p['numero']} - {p['nomeUrna']} ({p['partido']}) [{p['situacao']}]")
    print(f"\n  Total: {len(pres)} candidatos a Presidente")

    print("\n--- Governadores SP ---")
    govs = get_governadores("SP")
    for g in govs:
        print(f"  {g['numero']} - {g['nomeUrna']} ({g['partido']}) [{g['situacao']}]")
    print(f"  Total: {len(govs)}")

    print("\n--- Senadores SP ---")
    sens = get_senadores_tse("SP")
    for s in sens[:5]:
        print(f"  {s['numero']} - {s['nomeUrna']} ({s['partido']}) [{s['situacao']}]")
    print(f"  Total: {len(sens)}")

    print("\n--- Stats ---")
    stats = get_stats_tse()
    print(f"  {stats}")
