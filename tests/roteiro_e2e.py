"""
Roteiro de testes de aceitação executado no navegador (Playwright + Chromium).

Uso, com o servidor rodando em modo offline em outro terminal:
    python server.py --offline --no-browser
    python tests/roteiro_e2e.py [pasta_de_saida] [--sem-fotos]

Gera, na pasta de saída (padrão: tests/saida):
  - roteiro_resultado.csv : caso, requisito, passos, esperado, obtido, situação, data
  - medidas.json          : p95 de /api/eleicao, cliques e tempo até a lista,
                            contraste de textos, hosts externos acessados
  - telas/*.png           : capturas das telas da versão 6.1

O presidenciável usado nas capturas é o primeiro card da página inicial
(ordem alfabética do nome de urna); a escolha não indica preferência. Sem acesso à
internet, as fotos não carregam e aparecem as iniciais.
"""
import csv
import json
import statistics
import sys
import time
import urllib.request
from datetime import datetime
from pathlib import Path
from urllib.parse import urlparse

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8000"
ARGS = [a for a in sys.argv[1:] if not a.startswith("--")]
SEM_FOTOS = "--sem-fotos" in sys.argv  # bloqueia Wikimedia e /api/foto (capturas com iniciais)
SAIDA = Path(ARGS[0] if ARGS else Path(__file__).parent / "saida")
TELAS = SAIDA / "telas"
TELAS.mkdir(parents=True, exist_ok=True)
HOJE = datetime.now().strftime("%d/%m/%Y")
RES = []


def caso(cid, req, passos, esperado, fn):
    try:
        obtido, ok = fn()
    except Exception as e:  # registra a falha e segue
        obtido, ok = f"erro: {e}", False
    RES.append([cid, req, passos, esperado, obtido, "Aprovado" if ok else "Reprovado", HOJE])
    print(f"{cid} {req:<12} {'OK ' if ok else 'FALHA'} {obtido}")


def foto(page, nome, full=False):
    page.wait_for_timeout(700)
    page.screenshot(path=str(TELAS / f"{nome}.png"), full_page=full)


def contraste(page, seletor):
    """Razão de contraste WCAG do primeiro elemento do seletor sobre o fundo do body."""
    return page.evaluate("""(sel) => {
      const el = document.querySelector(sel); if (!el) return null;
      const rgb = (s) => (s.match(/[\\d.]+/g) || []).map(Number);
      const lum = ([r, g, b]) => { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
      let fg = rgb(getComputedStyle(el).color);
      const bg = rgb(getComputedStyle(document.body).backgroundColor);
      if (fg.length === 4) { const a = fg[3]; fg = [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a)); }
      const L1 = lum(fg), L2 = lum(bg);
      return Math.round(((Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)) * 100) / 100;
    }""", seletor)


def main():
    medidas = {}
    # p95 do tempo de resposta de /api/eleicao (RNF05), 20 chamadas por rota
    tempos = []
    for _ in range(20):
        for rota in ("SP/dep-federal", "SP/dep-estadual", "BA/governador", "SP/senador"):
            t0 = time.perf_counter()
            urllib.request.urlopen(f"{BASE}/api/eleicao/{rota}").read()
            tempos.append(time.perf_counter() - t0)
    tempos.sort()
    medidas["api_eleicao_p95_s"] = round(tempos[int(0.95 * len(tempos)) - 1], 3)
    medidas["api_eleicao_mediana_s"] = round(statistics.median(tempos), 3)

    hosts = set()
    with sync_playwright() as pw:
        nav = pw.chromium.launch()
        ctx = nav.new_context(viewport={"width": 1366, "height": 900}, device_scale_factor=1)
        if SEM_FOTOS:
            for padrao in ("**/*wikimedia.org/**", "**/api/foto/**"):
                ctx.route(padrao, lambda r: r.abort())
        page = ctx.new_page()
        corpo_enviado = []
        page.on("request", lambda r: (hosts.add(urlparse(r.url).netloc),
                                      corpo_enviado.append(r.post_data) if r.post_data else None))
        erros_js = []
        page.on("pageerror", lambda e: erros_js.append(str(e)))

        page.goto(BASE)
        page.wait_for_selector(".pres-card")

        def t01():
            nomes = page.locator(".pres-card .pc-name").all_inner_texts()
            ordenado = nomes == sorted(nomes, key=lambda s: s.lower())
            return f"{len(nomes)} cards; ordem alfabética: {'sim' if ordenado else 'não'}", len(nomes) == 13
        caso("T01", "RF01, RN01", "Abrir a página inicial", "13 cards em ordem alfabética", t01)
        foto(page, "01_inicio")

        # cliques e tempo até a lista de deputados federais de SP e o mini card
        cliques = 0
        t_ini = time.perf_counter()
        primeiro = page.locator(".pres-card .pc-name").first.inner_text()
        medidas["presidenciavel_das_capturas"] = primeiro
        page.locator(".pres-card").first.click(); cliques += 1
        page.wait_for_selector(".st-title")

        def t02():
            n = page.locator(".step").count()
            return f"{n} etapas na barra de progresso", n == 10
        caso("T02", "RF02", "Clicar no primeiro card", "Etapa 1 aberta e barra com 10 etapas", t02)

        page.locator(".step[data-step='4']").click(); cliques += 1
        page.locator(".uf[data-uf='SP']").click(); cliques += 1
        page.locator(".step[data-step='8']").click(); cliques += 1
        page.wait_for_selector(".cand")
        page.locator(".cand").first.click(); cliques += 1
        page.wait_for_selector(".mini")
        medidas["cliques_ate_mini_card_dep_federal"] = cliques
        medidas["tempo_ate_mini_card_s_automatizado"] = round(time.perf_counter() - t_ini, 2)

        def t11():
            ok_tse = page.locator(".mini a[href*='divulgacandcontas']").count() == 1
            ok_not = "Busca de notícias (Google)" in page.locator(".mini").inner_text()
            ok_data = "consultado em 22/10/2026" in page.locator(".mini").inner_text()
            return f"link TSE: {ok_tse}; rótulo da busca: {ok_not}; data de consulta: {ok_data}", ok_tse and ok_not and ok_data
        caso("T11", "RF11, RN03", "Na lista de dep. federais de SP, tocar no primeiro nome",
             "Mini card com link do TSE, busca de notícias rotulada e data de consulta", t11)
        foto(page, "09_mini_card")
        page.locator("#modal-close").click()

        def t10():
            txt = page.locator("#count").inner_text()
            return txt, txt.startswith("1095")
        caso("T10", "RF10", "Abrir Dep. Federais em SP", "1095 candidatos listados", t10)

        # voltar ao começo do percurso para as capturas das etapas
        page.locator(".step[data-step='0']").click(); page.wait_for_selector(".timeline")

        def t03():
            ok = page.locator(".timeline li").count() > 0
            resumo = page.locator("details.fontes summary").first.inner_text()
            return f"trajetória: {ok}; {resumo}", ok and "levantamento da equipe em 31/10/2026" in resumo
        caso("T03", "RF03, RN03", "Etapa 1", "Trajetória e lista de fontes com data do levantamento", t03)
        foto(page, "02_quem_e")

        def t13():
            cap = page.locator(".cap-meters").inner_text()
            return cap.replace("\n", " "), "Bolognesi" in cap and "Esquerda" in cap
        caso("T13", "RF13", "Ver o card lateral do presidente", "Escala esquerda–direita com a fonte", t13)

        page.locator(".step[data-step='1']").click(); page.wait_for_selector(".prop")
        page.locator(".prop .vote.up").first.click()

        def t04():
            votos = page.evaluate("sessionStorage.getItem('vc:votos')")
            enviado = any(b and "vc:votos" in b for b in corpo_enviado)
            press = page.locator(".prop .vote.up").first.get_attribute("aria-pressed")
            return f"sessionStorage={votos}; enviado ao servidor: {enviado}", press == "true" and votos and not enviado
        caso("T04", "RF04, RN07", "Etapa 2: marcar Concordo na 1ª proposta",
             "Botão marcado, reação no sessionStorage e nada enviado ao servidor", t04)
        foto(page, "03_propostas")

        page.locator(".step[data-step='2']").click(); page.wait_for_selector("text=Etapa 3 ·"); page.wait_for_timeout(300)
        caso("T05", "RF05", "Etapa 3", "Realizações ou aviso de que não exerceu mandato",
             lambda: (f"{page.locator('.feat').count()} itens", page.locator(".feat").count() > 0 or page.locator(".callout").count() > 0))

        page.locator(".step[data-step='3']").click(); page.wait_for_selector("text=Etapa 4 ·"); page.wait_for_timeout(300)

        def t06():
            casos = page.locator(".acc-item").count()
            com_fonte = page.locator(".acc-item .src a").count()
            aviso = "não significa ser culpado" in page.locator("#stage").inner_text()
            return f"{casos} casos, {com_fonte} links de fonte, aviso: {aviso}", aviso and (casos == 0 or com_fonte >= casos)
        caso("T06", "RF06, RN04", "Etapa 4", "Aviso, critério e fonte com link em cada caso", t06)
        foto(page, "04_controversias")

        page.locator(".step[data-step='4']").click(); page.wait_for_selector(".uf")
        caso("T07", "RF07", "Etapa 5", "27 UFs e estado escolhido marcado",
             lambda: (f"{page.locator('.uf').count()} UFs; SP marcado: {page.locator('.uf.on').get_attribute('data-uf')}",
                      page.locator(".uf").count() == 27 and page.locator(".uf.on").get_attribute("data-uf") == "SP"))
        foto(page, "05_estado")

        page.locator(".step[data-step='5']").click(); page.wait_for_selector(".gov")

        def t08():
            nomes = page.locator(".gov h3").all_inner_texts()
            alfa = nomes == sorted(nomes, key=lambda s: s.lower())
            data = page.locator("#list-root .consulta").inner_text()
            page.locator(".ochip[data-ordem='afinidade']").click()
            page.wait_for_timeout(300)
            vals = [v for v in page.evaluate("[...document.querySelectorAll('#list-root')][0]._dados.map(c => c.af.valor ?? -1)")]
            desc = vals == sorted(vals, reverse=True)
            page.locator(".ochip[data-ordem='alfabetica']").click()
            return f"padrão alfabético: {alfa}; por afinidade decrescente: {desc}; {data}", alfa and desc and "22/10/2026" in data
        caso("T08", "RF08, RN05, RN03", "Etapa 6 em SP; alternar a ordem",
             "Ordem alfabética por padrão, ordem por afinidade opcional e data de consulta", t08)
        page.locator(".gov-toggle").first.click(); page.wait_for_selector(".tab-panels .panel")
        foto(page, "06_governador")

        page.locator(".step[data-step='6']").click(); page.wait_for_selector(".cand")

        def t09():
            total = int(page.locator("#count").inner_text().split()[0])
            nome = page.locator(".cand .cand-info strong").first.inner_text()
            page.fill("#q", nome[:6])
            page.wait_for_timeout(400)
            filtrado = int(page.locator("#count").inner_text().split()[0])
            page.fill("#q", "")
            page.wait_for_timeout(300)
            return f"{total} candidatos; busca '{nome[:6]}': {filtrado}", 0 < filtrado < total or total == 1
        caso("T09", "RF09", "Etapa 7 em SP; buscar parte de um nome", "Lista reduzida pela busca", t09)
        foto(page, "07_senado")

        page.locator(".step[data-step='7']").click(); page.wait_for_selector(".cand")
        page.locator(".fchip[data-tier='alta']").click(); page.wait_for_timeout(300)
        caso("T09b", "RF10", "Etapa 8 em SP; filtrar faixa Alta", "Só candidatos da faixa alta",
             lambda: (page.locator("#count").inner_text(),
                      page.evaluate("document.querySelector('#list-root')._filtrados.every(c => c.af.tier === 'alta')")))
        foto(page, "08_dep_estadual")
        page.locator(".fchip[data-tier='']").click()

        def t12():
            v = page.evaluate("[calcAfinidade('PDT','PT').valor, calcAfinidade('PL','PT').valor, calcAfinidade('PT','PT').valor, calcAfinidade('UP','PT').valor]")
            return f"PDT×PT={v[0]}, PL×PT={v[1]}, PT×PT={v[2]}, UP×PT={v[3]}", v == [87, 32, 100, 88]
        caso("T12", "RF12, RN02", "Calcular afinidades conhecidas no navegador", "87, 32, 100 e 88", t12)

        page.locator(".step[data-step='9']").click(); page.wait_for_selector(".sum-grid")
        caso("T14", "RF14", "Etapa 10", "Contagem de propostas e de alta afinidade por cargo",
             lambda: (f"{page.locator('.sum-stat').count()} indicadores", page.locator(".sum-stat").count() >= 2))
        foto(page, "10_resumo")

        page.locator(".swap").first.click(); page.wait_for_selector(".gov")
        caso("T15", "RF15", "No resumo, escolher outro presidente", "Lista de governador do mesmo estado com o novo presidente",
             lambda: (page.locator(".cap-name").inner_text(), page.locator(".cap-name").inner_text() != primeiro))

        page.locator("#btn-como").click(); page.wait_for_selector(".como")

        def t16():
            txt = page.locator(".como").inner_text()
            return "método, fonte, ordem e privacidade descritos", all(x in txt for x in ("Bolognesi", "alfabética", "sessionStorage", "IBGE"))
        caso("T16", "RF16, RNF07", "Abrir Como funciona", "Método, fonte das posições, ordem e privacidade", t16)
        foto(page, "11_como_funciona", full=False)
        page.locator("#modal-close").click()

        # contraste (RNF08) medido nos textos secundários
        medidas["contraste"] = {s: contraste(page, s) for s in ("body", ".st-lead", ".fine", ".consulta", ".muted", ".aff-line", ".footer")}

        # UF sem candidatos no cache (exceção)
        page.goto(BASE + "/#/p/lula/local"); page.wait_for_selector(".uf")
        page.locator(".uf[data-uf='MG']").click()
        page.locator(".step[data-step='8']").click(); page.wait_for_selector(".empty")
        caso("T18", "RNF06", "Dep. federais em MG (sem cache)", "Aviso de que não há dados no modo offline, com as UFs que têm dados",
             lambda: (page.locator(".empty").inner_text().split("\n")[0], "Sem dados de deputado federal em Minas Gerais" in page.locator(".empty").inner_text() and "São Paulo" in page.locator(".empty").inner_text()))

        # TSE/servidor indisponível (exceção): a rota da API falha
        page.route("**/api/eleicao/**", lambda r: r.abort())
        page.goto(BASE + "/#/p/lula/local"); page.wait_for_selector(".uf")
        page.evaluate("MEM.clear()")
        page.locator(".uf[data-uf='BA']").click()
        page.locator(".step[data-step='6']").click()
        page.wait_for_selector(".empty.err", timeout=60000)
        caso("T19", "RNF06", "Senado na BA com a API fora do ar", "Mensagem de erro e botão Tentar novamente",
             lambda: (page.locator(".empty.err strong").inner_text(), page.locator("#btn-retry").count() == 1))
        page.unroute("**/api/eleicao/**")

        medidas["hosts_externos"] = sorted(h for h in hosts if h and not h.startswith("127.0.0.1"))
        medidas["erros_js"] = erros_js

        # celular
        mob = nav.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=1, is_mobile=True, has_touch=True)
        if SEM_FOTOS:
            for padrao in ("**/*wikimedia.org/**", "**/api/foto/**"):
                mob.route(padrao, lambda r: r.abort())
        mp = mob.new_page()
        mp.goto(BASE); mp.wait_for_selector(".pres-card")
        foto(mp, "12_celular_inicio")
        slug = mp.locator(".pres-card").first.get_attribute("data-slug")
        mp.goto(BASE + f"/#/p/{slug}/local"); mp.wait_for_selector(".uf")
        mp.locator(".uf[data-uf='SP']").click()
        mp.goto(BASE + f"/#/p/{slug}/senado"); mp.wait_for_selector(".cand")
        mp.wait_for_timeout(1500)
        larg = mp.evaluate("document.documentElement.scrollWidth")
        caso("T20", "RNF04", "Abrir início e Senado em 390 px", "Sem rolagem horizontal",
             lambda: (f"largura do documento: {larg}px", larg <= 390))
        foto(mp, "13_celular_senado")
        nav.close()

    RES.sort(key=lambda r: (int("".join(ch for ch in r[0][1:] if ch.isdigit())), r[0]))
    with open(SAIDA / "roteiro_resultado.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["Caso", "Requisito", "Passos", "Resultado esperado", "Resultado obtido", "Situação", "Data"])
        w.writerows(RES)
    (SAIDA / "medidas.json").write_text(json.dumps(medidas, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(medidas, ensure_ascii=False, indent=2))
    print(f"\n{sum(r[5] == 'Aprovado' for r in RES)} de {len(RES)} casos aprovados")


if __name__ == "__main__":
    main()
