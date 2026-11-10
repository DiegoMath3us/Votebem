/**
 * VotoClaro — Camada de dados v6.1
 * ------------------------------
 *  - Posição ideológica dos partidos (Bolognesi et al., 2025, rodada de 2022)
 *  - Cálculo de afinidade com o partido do presidente escolhido
 *  - Acesso à API local (server.py → TSE DivulgaCandContas)
 *  - Fotos/resumos da Wikipédia e municípios do IBGE
 *  - Data de consulta dos dados do TSE (consultado_em)
 */

// --- CONFIG ---------------------------------------------------------------
// A API é servida pelo mesmo servidor da página (local, Codespaces ou outro host).
// Só quando o index.html é aberto direto do disco (file://) usa o servidor local.
const API_BASE = location.protocol.startsWith("http")
  ? `${location.origin}/api`
  : "http://127.0.0.1:8000/api";

const ESTADOS = [
  ["AC", "Acre"], ["AL", "Alagoas"], ["AP", "Amapá"], ["AM", "Amazonas"], ["BA", "Bahia"],
  ["CE", "Ceará"], ["DF", "Distrito Federal"], ["ES", "Espírito Santo"], ["GO", "Goiás"],
  ["MA", "Maranhão"], ["MT", "Mato Grosso"], ["MS", "Mato Grosso do Sul"], ["MG", "Minas Gerais"],
  ["PA", "Pará"], ["PB", "Paraíba"], ["PR", "Paraná"], ["PE", "Pernambuco"], ["PI", "Piauí"],
  ["RJ", "Rio de Janeiro"], ["RN", "Rio Grande do Norte"], ["RS", "Rio Grande do Sul"],
  ["RO", "Rondônia"], ["RR", "Roraima"], ["SC", "Santa Catarina"], ["SP", "São Paulo"],
  ["SE", "Sergipe"], ["TO", "Tocantins"],
];
const ESTADO_NOME = Object.fromEntries(ESTADOS);

// --- POSIÇÃO DOS PARTIDOS ------------------------------------------------------
// ideologia: média da escala esquerda (0) – direita (10) atribuída por cientistas
// políticos na rodada de 2022 do survey (978 convidados, ABCP), Tabela 1 de:
//   BOLOGNESI, B.; RIBEIRO, E.; CODATO, A.; SILVA, B. F. da. O desaparecimento do
//   centro ideológico no sistema partidário brasileiro: a classificação mais
//   atualizada dos experts. Opinião Pública, v. 31, e31120, 2025.
//   DOI 10.1590/1807-0191202531120
// Regras da própria fonte: partido que só mudou de nome mantém o escore; fusão
// recebe a média dos fundidos (PRD = média de PTB e Patriota, regra aplicada pela
// equipe à fusão de 2023, posterior à pesquisa); partido incorporado sai da conta
// (Pros no Solidariedade, PSC no Podemos).
// Missão: registro no TSE em 04/11/2025, depois da pesquisa, sem escore publicado.
// Regra da equipe: líderes situam o partido na direita ("não somos a mesma direita",
// Folha de S.Paulo, 05/11/2025) e o estatuto o define como "de caráter liberal"
// (Gazeta do Povo, 30/01/2026);
// recebe o ponto médio da faixa "direita" da fonte (7,01 a 8,50) = 7,755, com
// estimada: true. A sensibilidade a esse valor está em conferir_sensibilidade.py.
// As posições de 2018 (Bolognesi, Ribeiro e Codato, 2023) e as estimativas da
// equipe usadas até a v6 ficam só na análise de sensibilidade.
const FONTE_POSICOES = {
  curta: "Bolognesi et al. (2025)",
  completa: "Bolognesi, Ribeiro, Codato e Silva, “O desaparecimento do centro ideológico no sistema partidário brasileiro: a classificação mais atualizada dos experts”, Opinião Pública, v. 31, 2025 (survey com cientistas políticos, rodada de 2022)",
  url: "https://doi.org/10.1590/1807-0191202531120",
  regraEstimada: "O Partido Missão foi registrado em 2025, depois da pesquisa. Como seus líderes situam o partido na direita, recebe o ponto médio da faixa “direita” da classificação (de 7,01 a 8,50), ou seja, 7,76. É uma estimativa da equipe, não uma medida da pesquisa.",
};
const PARTIDOS = {
  PT:            { ideologia: 2.68, nome: "Partido dos Trabalhadores", cor: "#ef4444" },
  PCDOB:         { ideologia: 1.78, nome: "Partido Comunista do Brasil", cor: "#b91c1c" },
  PV:            { ideologia: 4.12, nome: "Partido Verde", cor: "#16a34a" },
  PSOL:          { ideologia: 1.41, nome: "Partido Socialismo e Liberdade", cor: "#c026d3" },
  REDE:          { ideologia: 3.69, nome: "Rede Sustentabilidade", cor: "#10b981" },
  PSB:           { ideologia: 3.59, nome: "Partido Socialista Brasileiro", cor: "#f97316" },
  PDT:           { ideologia: 3.86, nome: "Partido Democrático Trabalhista", cor: "#dc2626" },
  PCB:           { ideologia: 0.69, nome: "Partido Comunista Brasileiro", cor: "#991b1b" },
  PSTU:          { ideologia: 0.51, nome: "Partido Socialista dos Trabalhadores Unificado", cor: "#b91c1c" },
  PCO:           { ideologia: 0.55, nome: "Partido da Causa Operária", cor: "#7f1d1d" },
  UP:            { ideologia: 1.63, nome: "Unidade Popular", cor: "#e11d48" },
  CIDADANIA:     { ideologia: 6.17, origem: "CDD na tabela", nome: "Cidadania", cor: "#ec4899" },
  SOLIDARIEDADE: { ideologia: 6.01, origem: "SDD na tabela", nome: "Solidariedade", cor: "#f59e0b" },
  AVANTE:        { ideologia: 6.47, nome: "Avante", cor: "#fb923c" },
  MOBILIZA:      { ideologia: 6.74, origem: "PMN na tabela", nome: "Mobiliza", cor: "#a3a3a3" },
  MDB:           { ideologia: 6.5, nome: "Movimento Democrático Brasileiro", cor: "#22c55e" },
  PSDB:          { ideologia: 6.76, nome: "Partido da Social Democracia Brasileira", cor: "#3b82f6" },
  PSD:           { ideologia: 6.94, nome: "Partido Social Democrático", cor: "#14b8a6" },
  PRD:           { ideologia: 8.16, origem: "média PTB 7,72 e Patriota 8,60 (fusão 2023)", nome: "Partido Renovação Democrática", cor: "#6366f1" },
  AGIR:          { ideologia: 7.55, nome: "Agir", cor: "#8b5cf6" },
  DEMOCRATA:     { ideologia: 7.29, origem: "PMB na tabela", nome: "Democrata", cor: "#0ea5e9" },
  PODE:          { ideologia: 7.44, nome: "Podemos", cor: "#22d3ee" },
  PP:            { ideologia: 8.15, origem: "PROGRE na tabela", nome: "Progressistas", cor: "#0891b2" },
  UNIAO:         { ideologia: 8.49, nome: "União Brasil", cor: "#eab308" },
  REPUBLICANOS:  { ideologia: 8.33, origem: "REP na tabela", nome: "Republicanos", cor: "#1d4ed8" },
  PL:            { ideologia: 8.8, nome: "Partido Liberal", cor: "#3b82f6" },
  DC:            { ideologia: 8.21, nome: "Democracia Cristã", cor: "#2563eb" },
  PRTB:          { ideologia: 7.49, nome: "Partido Renovador Trabalhista Brasileiro", cor: "#15803d" },
  MISSAO:        { ideologia: 7.755, estimada: true, origem: "estimada: ponto médio da faixa direita (7,01 a 8,50); registro em 2025, depois da pesquisa", nome: "Partido Missão", cor: "#facc15" },
  NOVO:          { ideologia: 8.67, nome: "Partido Novo", cor: "#f97316" },
};

/** "PC do B" → "PCDOB" · "MISSÃO" → "MISSAO" */
function normSigla(s) {
  return (s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function partidoInfo(sigla) {
  return PARTIDOS[normSigla(sigla)] || null;
}

// --- AFINIDADE ---------------------------------------------------------------
const TIERS = {
  alta:     { label: "Alta afinidade",     curto: "Alta",     cor: "#34d399" },
  moderada: { label: "Afinidade moderada", curto: "Moderada", cor: "#fbbf24" },
  baixa:    { label: "Baixa afinidade",    curto: "Baixa",    cor: "#f87171" },
  sem:      { label: "Sem posição publicada", curto: "Sem posição", cor: "#94a3b8" },
};

/** Parâmetros da fórmula (variados em conferir_sensibilidade.py). */
const AFINIDADE = { denominador: 0.9, pisoColigacao: 85, corteAlta: 75, corteModerada: 50 };

/**
 * Afinidade (0–100) entre o partido do candidato e o do presidente.
 * Distância na escala esquerda–direita (0–10) dividida por 10, normalizada
 * pelo denominador. Partidos da coligação do presidente recebem no mínimo o piso.
 */
function calcAfinidade(siglaCand, siglaPres, coligacao = []) {
  const c = normSigla(siglaCand);
  const p = normSigla(siglaPres);
  if (c && c === p) return { valor: 100, tier: "alta", motivo: "mesmo" };

  const a = PARTIDOS[c]?.ideologia;
  const b = PARTIDOS[p]?.ideologia;
  const naColigacao = coligacao.includes(c);
  if (a == null || b == null) {
    return naColigacao
      ? { valor: AFINIDADE.pisoColigacao, tier: "alta", motivo: "coligacao" }
      : { valor: null, tier: "sem", motivo: "sem-dados" };
  }
  const estimada = !!(PARTIDOS[c]?.estimada || PARTIDOS[p]?.estimada);
  const d = Math.abs(a - b) / 10;
  let valor = Math.round(Math.max(0, 1 - d / AFINIDADE.denominador) * 100);
  if (naColigacao) valor = Math.max(valor, AFINIDADE.pisoColigacao);
  const tier = valor >= AFINIDADE.corteAlta ? "alta" : valor >= AFINIDADE.corteModerada ? "moderada" : "baixa";
  return { valor, tier, motivo: naColigacao ? "coligacao" : "ideologia", estimada };
}

// --- CACHE (memória + localStorage) -----------------------------------------
const MEM = new Map();
function lsGet(key, maxAgeMs) {
  try {
    const raw = localStorage.getItem("vc:" + key);
    if (!raw) return null;
    const { t, v } = JSON.parse(raw);
    return Date.now() - t < maxAgeMs ? v : null;
  } catch { return null; }
}
function lsSet(key, v) {
  try { localStorage.setItem("vc:" + key, JSON.stringify({ t: Date.now(), v })); } catch {}
}

async function fetchJSON(url, { timeout = 20000 } = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeout);
  try {
    const r = await fetch(url, { signal: ctrl.signal });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.json();
  } finally {
    clearTimeout(timer);
  }
}

/** Promessa memoizada: chamadas repetidas reaproveitam a mesma requisição. */
function memo(key, fn) {
  if (!MEM.has(key)) {
    const p = fn().catch((e) => { MEM.delete(key); throw e; });
    MEM.set(key, p);
  }
  return MEM.get(key);
}

// --- API LOCAL (TSE) ----------------------------------------------------------
const CONSULTA = {}; // "UF:cargo" -> data e hora da consulta ao TSE (ISO)
const SEM_CACHE = {}; // "UF:cargo" sem consulta gravada no modo offline -> UFs que têm dados
const API = {
  presidentes: () => memo("pres", () => fetchJSON(`${API_BASE}/presidentes`, { timeout: 8000 }).then((r) => r.dados || [])),
  eleicao: (uf, cargo) => memo(`el:${uf}:${cargo}`, () => fetchJSON(`${API_BASE}/eleicao/${uf}/${cargo}`, { timeout: 45000 })
    .then((r) => { CONSULTA[`${uf}:${cargo}`] = r.consultado_em || null; SEM_CACHE[`${uf}:${cargo}`] = r.sem_cache ? (r.ufs_com_dados || []) : null; return r.dados || []; })),
  consulta: (uf, cargo) => CONSULTA[`${uf}:${cargo}`] || null,
  semCache: (uf, cargo) => SEM_CACHE[`${uf}:${cargo}`] || null,
  detalhe: (uf, id) => memo(`det:${uf}:${id}`, () => fetchJSON(`${API_BASE}/detalhe/${uf}/${id}`).then((r) => r.dados)),
  foto: (uf, id) => `${API_BASE}/foto/${uf}/${id}`,
};

// --- WIKIPÉDIA ------------------------------------------------------------------
const WIKI_TTL = 7 * 24 * 3600 * 1000;

async function wikiResumo(titulo) {
  const key = "wiki:" + titulo;
  const cached = lsGet(key, WIKI_TTL);
  if (cached) return cached;
  return memo(key, async () => {
    const j = await fetchJSON(`https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(titulo)}`, { timeout: 8000 });
    const v = {
      titulo: j.title,
      descricao: j.description || "",
      extrato: j.extract || "",
      foto: j.thumbnail?.source || null,
      url: j.content_urls?.desktop?.page || `https://pt.wikipedia.org/wiki/${encodeURIComponent(titulo)}`,
      consultadoEm: new Date().toISOString(), // RN03: data da consulta à Wikipédia
    };
    lsSet(key, v);
    return v;
  });
}

const STOP = new Set(["de", "da", "do", "das", "dos", "e"]);
const tokens = (s) =>
  (s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/\(.*?\)/g, " ").split(/[^a-z]+/).filter((t) => t && !STOP.has(t));

/**
 * Procura o artigo da Wikipédia de um candidato pelo nome completo.
 * Só aceita o resultado se o título bater com o nome e for de um político.
 */
async function wikiBuscarPessoa(nomeCompleto) {
  const key = "wikiq:" + nomeCompleto;
  const cached = lsGet(key, WIKI_TTL);
  if (cached !== null) return cached || null;
  try {
    const j = await fetchJSON(
      `https://pt.wikipedia.org/w/rest.php/v1/search/page?q=${encodeURIComponent(nomeCompleto)}&limit=5`,
      { timeout: 8000 }
    );
    const nomeTok = new Set(tokens(nomeCompleto));
    for (const p of j.pages || []) {
      const tt = tokens(p.title);
      if (tt.length < 2 || !tt.every((t) => nomeTok.has(t))) continue;
      const resumo = await wikiResumo(p.key);
      const txt = (resumo.descricao + " " + resumo.extrato).toLowerCase();
      if (/pol[ií]tic|deputad|senador|governador|prefeit|vereador|ministr/.test(txt)) {
        lsSet(key, resumo);
        return resumo;
      }
    }
  } catch { return null; }
  lsSet(key, false);
  return null;
}

// --- IBGE (municípios) ----------------------------------------------------------
function municipios(uf) {
  const key = "mun:" + uf;
  const cached = lsGet(key, 30 * 24 * 3600 * 1000);
  if (cached) return Promise.resolve(cached);
  return memo(key, async () => {
    const j = await fetchJSON(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`, { timeout: 10000 });
    const nomes = j.map((m) => m.nome).sort((a, b) => a.localeCompare(b, "pt-BR"));
    lsSet(key, nomes);
    return nomes;
  });
}

// --- HELPERS ----------------------------------------------------------------------
function iniciais(nome) {
  return (nome || "?").split(/\s+/).filter(Boolean).slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

function titleCase(s) {
  return (s || "").toLowerCase().replace(/(^|\s|-)(\p{L})/gu, (m, a, b) => a + b.toUpperCase())
    .replace(/\b(De|Da|Do|Das|Dos|E)\b/g, (m) => m.toLowerCase());
}

function idade(dataISO) {
  if (!dataISO) return null;
  const d = new Date(dataISO);
  const n = new Date();
  let a = n.getFullYear() - d.getFullYear();
  if (n.getMonth() < d.getMonth() || (n.getMonth() === d.getMonth() && n.getDate() < d.getDate())) a--;
  return a;
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function moeda(v) {
  return v == null ? "—" : v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}
