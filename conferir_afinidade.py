"""
Recalcula a Tabela 3 do ATCC (seção 4.4): distribuição das faixas de afinidade
para cada candidato à Presidência com registro ativo no TSE (todos são exibidos
na plataforma desde a versão 6).

Uso (na raiz do repositório do VotoClaro):
    python conferir_afinidade.py

O script não tem regra própria. Ele lê do próprio projeto:
  - js/data.js ............ posições dos partidos (PARTIDOS, Bolognesi,
                            Ribeiro e Codato, 2023) e parâmetros (AFINIDADE);
  - server.py ............. filtro de situação (SITUACOES_EXCLUIDAS),
                            norm_sigla e parse_coligacao;
  - backend/data/cache/tse_api ... candidaturas em cache.
A fórmula é a mesma da função calcAfinidade (js/data.js). A coligação do
presidente vem do arquivo de detalhe dele no cache, como faz a interface
(função coligacaoPres em js/app.js); sem arquivo de detalhe no cache, vale só
o próprio partido.
"""
import collections, glob, json, math, os, re, sys, unicodedata

RAIZ = sys.argv[1] if len(sys.argv) > 1 else "."
CACHE = os.path.join(RAIZ, "backend", "data", "cache", "tse_api")
CARGOS = [("3", "Governador"), ("5", "Senador"), ("6", "Deputado federal"), ("7", "Deputado estadual")]

# --- funções copiadas de server.py, sem alteração -------------------------
src = open(os.path.join(RAIZ, "server.py"), encoding="utf-8").read()
ns = {"re": re, "unicodedata": unicodedata}
for nome in ("norm_sigla", "parse_coligacao"):
    exec(re.search(r"def %s\(.*?(?=\n\n\n|\ndef )" % nome, src, re.S).group(0), ns)
norm_sigla, parse_coligacao = ns["norm_sigla"], ns["parse_coligacao"]
EXCLUIDAS = eval(re.search(r"SITUACOES_EXCLUIDAS = (\(.*?\))", src).group(1))

# --- posições dos partidos lidas de js/data.js ----------------------------
js = open(os.path.join(RAIZ, "js", "data.js"), encoding="utf-8").read()
PARTIDOS = {k: (float(v),) for k, v in
            re.findall(r"(\w+):\s*\{ ideologia: ([\d.]+)", js)}
DENOM = float(re.search(r"denominador: ([\d.]+)", js).group(1))

def ativo(c):
    sit = (c.get("descricaoSituacao") or "").lower()
    return not any(x in sit for x in EXCLUIDAS)

def afinidade(sigla_cand, sigla_pres, coligacao):
    """Mesma lógica de calcAfinidade (js/data.js)."""
    c, p = norm_sigla(sigla_cand), norm_sigla(sigla_pres)
    if c and c == p:
        return 100
    na_coligacao = c in coligacao
    if c not in PARTIDOS or p not in PARTIDOS:
        return 85 if na_coligacao else None
    d = abs(PARTIDOS[c][0] - PARTIDOS[p][0]) / 10
    valor = round(max(0, 1 - d / DENOM) * 100)
    return max(valor, 85) if na_coligacao else valor

def faixa(v):
    if v is None:
        return "sem"  # partido sem posição publicada (RN02)
    return "alta" if v >= 75 else "moderada" if v >= 50 else "baixa"

def carregar(cargo):
    lista = []
    for f in sorted(glob.glob(os.path.join(CACHE, f"tse_2026_*_{cargo}.json"))):
        if "_BR_" not in f:
            lista += [c for c in json.load(open(f, encoding="utf-8"))["data"] if ativo(c)]
    return lista

presidentes = json.load(open(os.path.join(CACHE, "tse_2026_BR_1.json"), encoding="utf-8"))["data"]
print(f"Partidos com posição publicada em data.js: {len(PARTIDOS)} de 30\n")
for pres in sorted(presidentes, key=lambda x: x["nomeUrna"]):
    if not ativo(pres):
        continue
    sigla = pres["partido"]["sigla"]
    det = os.path.join(CACHE, f"tse_detalhe_2026_BR_{pres['id']}.json")
    comp = json.load(open(det, encoding="utf-8"))["data"].get("composicaoColigacao") if os.path.exists(det) else None
    col = parse_coligacao(comp, sigla)
    fonte = "detalhe no cache" if comp is not None else "sem detalhe no cache"
    print(f"{pres['nomeUrna']} ({sigla}) - coligação: {', '.join(col)} [{fonte}]")
    for cod, nome in CARGOS:
        lst = carregar(cod)
        n = collections.Counter(faixa(afinidade(c["partido"]["sigla"], sigla, col)) for c in lst)
        tot = len(lst)
        cel = "  ".join(f"{k} {n[k]} ({round(100 * n[k] / tot)}%)" for k in ("alta", "moderada", "baixa", "sem"))
        print(f"   {nome:<18} n={tot:<5} {cel}")
    print()
