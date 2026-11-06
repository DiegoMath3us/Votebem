"""
Recalcula o inventário do cache do TSE (Tabela 1 do documento de Instrumentos)
e o efeito do filtro de situação (Tabela 1 do ATCC, seção 4.2).

Uso (na raiz do repositório):
    python conferir_cache.py backend/data/cache/tse_api

Contabiliza tanto os arquivos de listagem por cargo (tse_<ano>_<UF>_<cargo>.json)
quanto os arquivos de detalhamento individual de candidatos (tse_detalhe_<ano>_<UF>_<sq>.json).
O filtro de situação é o mesmo de server.py (SITUACOES_EXCLUIDAS e função ativo).
"""
import json, os, re, sys, collections

pasta = sys.argv[1] if len(sys.argv) > 1 else "backend/data/cache/tse_api"
CARGOS = {
    "1": "Presidente (Cargo 1)",
    "3": "Governador (Cargo 3)",
    "5": "Senador (Cargo 5)",
    "6": "Deputado Federal (Cargo 6)",
    "7": "Deputado Estadual (Cargo 7)",
    "detalhe": "Detalhes (tse_detalhe)"
}
ID_KEYS = ("id", "sequencial", "sq_candidato", "numeroCandidato", "numero")

def extrair(obj):
    if isinstance(obj, list):
        return obj
    if isinstance(obj, dict):
        for k in ("candidatos", "candidates", "data", "items", "resultados"):
            if isinstance(obj.get(k), list):
                return obj[k]
        for v in obj.values():
            if isinstance(v, list) and v and isinstance(v[0], dict):
                return v
    return []

def chave(c, uf, cargo):
    if isinstance(c, dict):
        for k in ID_KEYS:
            if c.get(k) not in (None, ""):
                return (uf, cargo, str(c[k]))
    return (uf, cargo, json.dumps(c, sort_keys=True)[:200])

arquivos = collections.defaultdict(list)
registros = collections.Counter()
unicos = collections.defaultdict(set)
ufs = collections.defaultdict(set)
bytes_por_cargo = collections.Counter()
retirados = collections.Counter()
indeferidos = collections.Counter()
motivos = collections.Counter()
# mesmo critério de server.py
SITUACOES_EXCLUIDAS = ("renúncia", "renuncia", "cancel", "falec", "cassad", "não conhec", "nao conhec")

def situacao(c):
    return str((c.get("descricaoSituacao") or c.get("situacao") or "") if isinstance(c, dict) else "").lower()
ignorados = []

for nome in sorted(os.listdir(pasta)):
    caminho = os.path.join(pasta, nome)
    if not os.path.isfile(caminho):
        continue
    m_lista = re.fullmatch(r"tse_(\d{4})_([A-Z]{2})_(\d+)\.json", nome)
    m_det = re.fullmatch(r"tse_detalhe_(\d{4})_([A-Z]{2})_(\d+)\.json", nome)
    if m_lista:
        ano, uf, cargo = m_lista.groups()
        with open(caminho, encoding="utf-8") as f:
            lista = extrair(json.load(f))
        arquivos[cargo].append(nome)
        ufs[cargo].add(uf)
        registros[cargo] += len(lista)
        bytes_por_cargo[cargo] += os.path.getsize(caminho)
        for c in lista:
            unicos[cargo].add(chave(c, uf, cargo))
            sit = situacao(c)
            if any(x in sit for x in SITUACOES_EXCLUIDAS):
                retirados[cargo] += 1
                motivos[sit] += 1
            elif "indefer" in sit:
                indeferidos[cargo] += 1
    elif m_det:
        ano, uf, sq = m_det.groups()
        cargo = "detalhe"
        arquivos[cargo].append(nome)
        ufs[cargo].add(uf)
        registros[cargo] += 1
        unicos[cargo].add((uf, cargo, sq))
        bytes_por_cargo[cargo] += os.path.getsize(caminho)
    else:
        ignorados.append(nome)

ordem = [c for c in ("1", "3", "5", "6", "7", "detalhe") if c in arquivos]
print(f"Pasta auditada: {pasta}\n")
print(f"{'Cargo / Tipo':<28}{'Arquivos':>9}{'UFs':>6}{'Registros':>11}{'Únicos':>9}{'Bytes':>12}")
tot_a = tot_r = tot_u = tot_b = 0
for cargo in ordem:
    a, r, u, b = len(arquivos[cargo]), registros[cargo], len(unicos[cargo]), bytes_por_cargo[cargo]
    tot_a += a; tot_r += r; tot_u += u; tot_b += b
    print(f"{CARGOS.get(cargo, cargo):<28}{a:>9}{len(ufs[cargo]):>6}{r:>11}{u:>9}{b:>12,}")
print(f"{'TOTAL GERAL':<28}{tot_a:>9}{'':>6}{tot_r:>11}{tot_u:>9}{tot_b:>12,}")

maj = [c for c in ("1", "3", "5") if c in arquivos]
print("\nMajoritários (Presidente, Governador, Senador):",
      sum(len(arquivos[c]) for c in maj), "arquivos,",
      sum(len(unicos[c]) for c in maj), "candidatos únicos")
if "3" in arquivos:
    n_gov = registros["3"]
    n_arq_gov = len(arquivos["3"])
    print(f"Governador ({n_arq_gov} UFs): {', '.join(sorted(ufs.get('3', [])))} | Média: {n_gov/n_arq_gov:.2f} candidatos/UF")
print("\nEfeito do filtro de situação (server.py):")
print(f"{'Cargo':<28}{'Registros':>11}{'Retirados':>11}{'Exibidos':>10}{'Indeferidos mantidos':>22}")
tr = te = ti = tt = 0
for cargo in [c for c in ("1", "3", "5", "6", "7") if c in arquivos]:
    r = registros[cargo]; x = retirados[cargo]; i = indeferidos[cargo]
    tt += r; tr += x; te += r - x; ti += i
    print(f"{CARGOS.get(cargo, cargo):<28}{r:>11}{x:>11}{r - x:>10}{i:>22}")
print(f"{'TOTAL':<28}{tt:>11}{tr:>11}{te:>10}{ti:>22}")
print("Motivos de retirada:", dict(motivos))
if ignorados:
    print("\nArquivos ignorados (nome fora do padrão):", ", ".join(ignorados))
