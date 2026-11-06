"""
Análise de sensibilidade da afinidade (artigo, seção 4.4; feedback do orientador
de 03/11/2026, Parte 2, item 3).

Uso (na raiz do repositório do VotoClaro):
    python conferir_sensibilidade.py            # imprime as tabelas
    python conferir_sensibilidade.py --csv out  # grava também CSVs na pasta out

A plataforma (v6.1) usa as posições da rodada de 2022 publicadas por Bolognesi,
Ribeiro, Codato e Silva (2025), lidas de js/data.js; a do Partido Missão é
estimada pela equipe (ponto médio da faixa "direita", 7,755). O script varia, um de cada vez, os parâmetros da
função calcAfinidade e mede, para os candidatos a deputado federal em cache:
  - a parcela em alta afinidade para cada um dos 13 presidenciáveis ativos;
  - a correlação de ordem de Spearman entre a lista ordenada pela regra da
    plataforma e a lista ordenada pela variante (mediana e mínimo entre os 13).

Variantes:
  D   denominador da distância: 0,7 / 0,8 / 1,0 / 1,1 (base 0,9)
  F   cortes das faixas: 80/60 e 70/45 (base 75/50)
  P   piso da coligação: 75 e sem piso (base 85)
  M   posição estimada do Missão: 7,01 e 8,50 (limites da faixa "direita") e
      9,25 (ponto médio da faixa "extrema direita")
  R   posições da rodada de 2018 (Bolognesi, Ribeiro e Codato, 2023), sem UP
      e Missão
  E   estimativas da equipe usadas até a v6 (dois eixos, economia e costumes),
      com distância euclidiana (regra da v6) e de Manhattan (Louwerse e
      Rosema, 2014). Num eixo só, as duas distâncias coincidem.
"""
import collections, csv, glob, json, math, os, re, sys, unicodedata
from statistics import median

try:
    from scipy.stats import spearmanr
except ImportError:  # cálculo próprio, com postos médios para empates
    def _postos(v):
        ordem = sorted(range(len(v)), key=lambda i: v[i])
        r = [0.0] * len(v)
        i = 0
        while i < len(v):
            j = i
            while j + 1 < len(v) and v[ordem[j + 1]] == v[ordem[i]]:
                j += 1
            for k in range(i, j + 1):
                r[ordem[k]] = (i + j) / 2 + 1
            i = j + 1
        return r

    def spearmanr(a, b):
        ra, rb = _postos(a), _postos(b)
        ma, mb = sum(ra) / len(ra), sum(rb) / len(rb)
        num = sum((x - ma) * (y - mb) for x, y in zip(ra, rb))
        den = math.sqrt(sum((x - ma) ** 2 for x in ra) * sum((y - mb) ** 2 for y in rb))
        return (num / den if den else float("nan"), None)

RAIZ = "."
CACHE = os.path.join(RAIZ, "backend", "data", "cache", "tse_api")

src = open(os.path.join(RAIZ, "server.py"), encoding="utf-8").read()
ns = {"re": re, "unicodedata": unicodedata}
for nome in ("norm_sigla", "parse_coligacao"):
    exec(re.search(r"def %s\(.*?(?=\n\n\n|\ndef )" % nome, src, re.S).group(0), ns)
norm_sigla, parse_coligacao = ns["norm_sigla"], ns["parse_coligacao"]
EXCLUIDAS = eval(re.search(r"SITUACOES_EXCLUIDAS = (\(.*?\))", src).group(1))

js = open(os.path.join(RAIZ, "js", "data.js"), encoding="utf-8").read()
# posições da plataforma: Bolognesi, Ribeiro e Codato (2023), escala 0-10 / 10
BRC = {k: (float(v) / 10,) for k, v in re.findall(r"(\w+):\s*\{ ideologia: ([\d.]+)", js)}

def missao(v):
    d = dict(BRC); d["MISSAO"] = (v / 10,); return d

# Rodada de 2018 (Bolognesi, Ribeiro e Codato, 2023, Tabela 1), usada na v6.1
# até 04/11/2026; nomes atuais, fusões pela média, UP e Missão sem escore.
R2018 = {k: (v / 10,) for k, v in {
    "PSTU": 0.51, "PCO": 0.61, "PCB": 0.91, "PSOL": 1.28, "PCDOB": 1.92, "PT": 2.97, "PDT": 3.92,
    "PSB": 4.05, "REDE": 4.77, "CIDADANIA": 4.92, "PV": 5.29, "AVANTE": 6.32, "SOLIDARIEDADE": 6.5,
    "MOBILIZA": 6.88, "DEMOCRATA": 6.9, "MDB": 7.01, "PSD": 7.09, "PSDB": 7.11, "PODE": 7.24,
    "PRTB": 7.45, "REPUBLICANOS": 7.78, "PL": 7.78, "AGIR": 7.86, "DC": 8.11, "NOVO": 8.13,
    "PP": 8.20, "PRD": 7.325, "UNIAO": 8.34}.items()}

# Estimativas da equipe usadas até a versão 6 (economia, costumes), sem fonte.
# Mantidas aqui só para comparação.
EQUIPE_V6 = {
    "PT": (0.18, 0.78), "PCDOB": (0.12, 0.85), "PV": (0.35, 0.80), "PSOL": (0.10, 0.90),
    "REDE": (0.32, 0.82), "PSB": (0.28, 0.75), "PDT": (0.25, 0.72), "PCB": (0.05, 0.85),
    "PSTU": (0.04, 0.88), "PCO": (0.03, 0.75), "UP": (0.05, 0.88), "CIDADANIA": (0.50, 0.62),
    "SOLIDARIEDADE": (0.45, 0.50), "AVANTE": (0.48, 0.50), "MOBILIZA": (0.50, 0.42),
    "MDB": (0.52, 0.48), "PSDB": (0.60, 0.55), "PSD": (0.62, 0.38), "PRD": (0.61, 0.30),
    "AGIR": (0.58, 0.30), "DEMOCRATA": (0.62, 0.30), "PODE": (0.63, 0.35), "PP": (0.62, 0.30),
    "UNIAO": (0.65, 0.30), "REPUBLICANOS": (0.62, 0.22), "PL": (0.72, 0.16), "DC": (0.58, 0.18),
    "PRTB": (0.70, 0.15), "MISSAO": (0.80, 0.32), "NOVO": (0.90, 0.42),
}


def ativo(c):
    sit = (c.get("descricaoSituacao") or "").lower()
    return not any(x in sit for x in EXCLUIDAS)


def faz_afinidade(pos, denom=0.9, piso=85, metrica="euclidiana"):
    def dist(a, b):
        if metrica == "manhattan":
            return sum(abs(x - y) for x, y in zip(a, b))
        return math.dist(a, b)

    def f(sc, sp, col):
        c, p = norm_sigla(sc), norm_sigla(sp)
        if c and c == p:
            return 100
        na_col = c in col
        if c not in pos or p not in pos:
            return (piso if piso is not None else None) if na_col else None
        v = round(max(0, 1 - dist(pos[c], pos[p]) / denom) * 100)
        return max(v, piso) if (na_col and piso is not None) else v
    return f


def faixa(v, alta=75, mod=50):
    if v is None:
        return "sem"
    return "alta" if v >= alta else "moderada" if v >= mod else "baixa"


VARIANTES = [
    ("Base (plataforma)", dict(pos=BRC), (75, 50)),
    ("D 0,7", dict(pos=BRC, denom=0.7), (75, 50)),
    ("D 0,8", dict(pos=BRC, denom=0.8), (75, 50)),
    ("D 1,0", dict(pos=BRC, denom=1.0), (75, 50)),
    ("D 1,1", dict(pos=BRC, denom=1.1), (75, 50)),
    ("F 80/60", dict(pos=BRC), (80, 60)),
    ("F 70/45", dict(pos=BRC), (70, 45)),
    ("P 75", dict(pos=BRC, piso=75), (75, 50)),
    ("P sem piso", dict(pos=BRC, piso=None), (75, 50)),
    ("M Missão 7,01", dict(pos=missao(7.01)), (75, 50)),
    ("M Missão 8,50", dict(pos=missao(8.50)), (75, 50)),
    ("M Missão 9,25", dict(pos=missao(9.25)), (75, 50)),
    ("R rodada 2018", dict(pos=R2018), (75, 50)),
    ("E equipe euclid.", dict(pos=EQUIPE_V6), (75, 50)),
    ("E equipe Manhattan", dict(pos=EQUIPE_V6, metrica="manhattan"), (75, 50)),
]


def carregar(cargo):
    lista = []
    for f in sorted(glob.glob(os.path.join(CACHE, f"tse_2026_*_{cargo}.json"))):
        if "_BR_" not in f:
            lista += [c for c in json.load(open(f, encoding="utf-8"))["data"] if ativo(c)]
    return lista


def main():
    out = sys.argv[sys.argv.index("--csv") + 1] if "--csv" in sys.argv else None
    deps = carregar("6")
    pres_all = json.load(open(os.path.join(CACHE, "tse_2026_BR_1.json"), encoding="utf-8"))["data"]
    pres = sorted([p for p in pres_all if ativo(p)], key=lambda x: x["nomeUrna"])
    print(f"Candidatos a deputado federal em cache (ativos): {len(deps)}")
    print(f"Presidenciáveis ativos: {len(pres)}\n")

    tabela = collections.OrderedDict()   # variante -> {pres: %alta}
    rhos = collections.OrderedDict()     # variante -> [rho por pres]
    base_vals = {}
    for nome, kw, (ca, cm) in VARIANTES:
        f = faz_afinidade(**kw)
        tabela[nome], rhos[nome] = {}, []
        for p in pres:
            sig = p["partido"]["sigla"]
            det = os.path.join(CACHE, f"tse_detalhe_2026_BR_{p['id']}.json")
            comp = json.load(open(det, encoding="utf-8"))["data"].get("composicaoColigacao") if os.path.exists(det) else None
            col = parse_coligacao(comp, sig)
            vals = [f(c["partido"]["sigla"], sig, col) for c in deps]
            num = [-1 if v is None else v for v in vals]   # sem valor fica no fim da lista
            n_alta = sum(1 for v in vals if faixa(v, ca, cm) == "alta")
            tabela[nome][p["nomeUrna"]] = (n_alta, round(100 * n_alta / len(deps)))
            if nome.startswith("Base"):
                base_vals[p["nomeUrna"]] = num
            else:
                rhos[nome].append(spearmanr(base_vals[p["nomeUrna"]], num)[0])

    nomes = [p["nomeUrna"] for p in pres]
    cab = ["Presidenciável", "Partido"] + [v[0] for v in VARIANTES]
    print("Parcela de candidatos a deputado federal em alta afinidade (%)")
    print(" | ".join(cab))
    linhas = []
    for p in pres:
        lin = [p["nomeUrna"], p["partido"]["sigla"]] + [str(tabela[v[0]][p["nomeUrna"]][1]) for v in VARIANTES]
        linhas.append(lin)
        print(" | ".join(lin))
    faixas = ["Amplitude (mín.-máx.)", ""] + [
        f"{min(t[n][1] for n in nomes)}-{max(t[n][1] for n in nomes)}" for t in tabela.values()]
    print(" | ".join(faixas))

    print("\nSpearman entre a ordem da plataforma e a da variante (13 listas de deputados federais)")
    resumo = []
    for v, r in rhos.items():
        if not r:
            continue
        r = [x for x in r if not math.isnan(x)]
        dif = [abs(tabela[v][n][1] - tabela["Base (plataforma)"][n][1]) for n in nomes]
        lin = [v, f"{median(r):.2f}", f"{min(r):.2f}", str(max(dif))]
        resumo.append(lin)
        print(f"{v:<14} mediana {lin[1]}  mínimo {lin[2]}  maior variação da parcela em alta: {lin[3]} p.p.")

    # ordem dos 13 presidenciáveis pela parcela em alta: plataforma x equipe (v6)
    b = [tabela["Base (plataforma)"][n][1] for n in nomes]
    c = [tabela["E equipe euclid."][n][1] for n in nomes]
    print(f"\nSpearman da parcela em alta entre os 13 presidenciáveis (plataforma x equipe v6): {spearmanr(b, c)[0]:.2f}")
    c18 = [tabela["R rodada 2018"][n][1] for n in nomes]
    print(f"Spearman da parcela em alta entre os 13 presidenciáveis (plataforma x rodada 2018): {spearmanr(b, c18)[0]:.2f}")

    if out:
        os.makedirs(out, exist_ok=True)
        with open(os.path.join(out, "sensibilidade_parcela_alta.csv"), "w", newline="", encoding="utf-8") as fh:
            w = csv.writer(fh); w.writerow(cab); w.writerows(linhas); w.writerow(faixas)
        with open(os.path.join(out, "sensibilidade_spearman.csv"), "w", newline="", encoding="utf-8") as fh:
            w = csv.writer(fh); w.writerow(["Variante", "Spearman mediana", "Spearman mínimo", "Maior variação (p.p.)"]); w.writerows(resumo)


if __name__ == "__main__":
    main()
