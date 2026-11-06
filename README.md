# VotoClaro 6.1

Plataforma web informativa sobre as eleições gerais de 2026. O eleitor escolhe um candidato à Presidência, conhece trajetória, propostas, realizações e controvérsias (com a fonte de cada item), informa o estado e vê os candidatos a governador, senador, deputado estadual e deputado federal daquela UF, em ordem alfabética, com um rótulo de afinidade entre o partido de cada um e o partido do presidente escolhido. Não há cadastro, login nem recomendação de voto.

Trabalho de Conclusão de Curso de Engenharia de Software, Universidade São Judas Tadeu. Orientador: Prof. Nelson Aguiar.

## Como executar

Requisitos: Python 3.10 ou superior e um navegador atual. Node.js 18 ou superior só é necessário para um dos testes.

```bash
pip install -r requirements.txt
python server.py --offline     # usa só o cache em disco (dados do artigo)
# ou
python server.py               # consulta o TSE e atualiza o cache
```

O navegador abre em http://127.0.0.1:8000 (porta 8000). Para não abrir o navegador, acrescente `--no-browser`. A documentação automática da API fica em http://127.0.0.1:8000/api/docs.

No Windows, use `py` no lugar de `python` se o comando `python` não existir.

## Estrutura

| Caminho | Conteúdo |
|---|---|
| `index.html`, `css/`, `js/` | Interface (HTML, CSS e JavaScript sem framework). `js/app.js`: etapas e listas; `js/data.js`: posições dos partidos, cálculo da afinidade (`calcAfinidade`) e acesso às APIs; `js/presidentes.js`: conteúdo das 13 candidaturas à Presidência, com fontes. |
| `server.py` | Servidor FastAPI: rotas `/api/*`, filtro de situação e arquivos estáticos. |
| `backend/api/tse_client.py` | Cliente da API DivulgaCandContas (TSE), com cache em disco e modo offline. |
| `backend/data/cache/tse_api/` | Cache do TSE usado no artigo: 45 arquivos, 32 consultados em 16/09/2026 e 13 em 22/10/2026. Hash de cada arquivo em `CACHE_SHA256.txt`. |
| `conferir_cache.py`, `conferir_afinidade.py`, `conferir_sensibilidade.py`, `conferir_equilibrio.mjs` | Scripts que recalculam as Tabelas 1, 3, 4 e 5 do artigo a partir do cache e do código. |
| `tests/` | Testes automatizados e roteiro de testes no navegador. |
| `css/fonts/` | Fontes Inter e Outfit (licença SIL OFL 1.1), servidas localmente. |

## Testes

```bash
python -m unittest discover -s tests      # servidor: siglas, coligação, filtro, API offline
node --test tests/test_afinidade.mjs      # fórmula de afinidade (js/data.js)
python server.py --offline --no-browser   # em outro terminal, para o roteiro abaixo
pip install playwright && playwright install chromium
python tests/roteiro_e2e.py               # 20 casos no navegador + capturas em tests/saida
```

## Reproduzir os números do artigo

```bash
python conferir_cache.py backend/data/cache/tse_api   # inventário: 45 arquivos, 4.697 registros
python conferir_afinidade.py                           # faixas de afinidade por presidenciável (Tabela 3)
python conferir_sensibilidade.py --csv saida           # análise de sensibilidade (Tabela 4)
node conferir_equilibrio.mjs                           # conteúdo e fontes por presidenciável (Tabela 5)
```

## Fontes de dados e privacidade

- Candidaturas: TSE, DivulgaCandContas (API não oficial, documentada por Herrmann, 2020). Cada lista mostra a data e a hora da consulta.
- Posições dos partidos: Bolognesi, Ribeiro, Codato e Silva (2025), *Opinião Pública*, v. 31, e31120, DOI 10.1590/1807-0191202531120 (rodada de 2022). O Partido Missão, registrado em 2025, tem posição estimada pela equipe: ponto médio da faixa "direita" da fonte (7,755), com teste de sensibilidade.
- Fotos e resumos: Wikipédia; municípios: IBGE. O navegador consulta esses dois serviços diretamente, e eles recebem o endereço IP de quem acessa.
- O presidente escolhido, a UF, a cidade e as reações às propostas ficam no `sessionStorage` do navegador e não são enviados ao servidor. O servidor escuta só em 127.0.0.1 e não grava registro de acesso.

## Licença e uso após o pleito

O cache fixa os dados de 16/09/2026 e 22/10/2026. Para outra eleição, troque `ELEICAO_2026_ID` e `ANO` em `backend/api/tse_client.py`, apague o cache e rode o servidor sem `--offline`; o conteúdo de `js/presidentes.js` e as posições em `js/data.js` precisam ser revistos à mão.
