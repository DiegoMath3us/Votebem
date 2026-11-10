/**
 * VotoClaro — Aplicação (SPA em funil)
 * -------------------------------------
 * Início (todos os presidenciáveis com registro ativo no TSE) → Quem é →
 * Propostas → Realizações → Controvérsias → Seu estado → Governador → Senado → Dep. Estaduais →
 * Dep. Federais → Resumo
 */

// --- ETAPAS ---------------------------------------------------------------------
const STEPS = [
  { key: "quem",          label: "Quem é" },
  { key: "propostas",     label: "Propostas" },
  { key: "realizacoes",   label: "Realizações" },
  { key: "controversias", label: "Controvérsias" },
  { key: "local",         label: "Seu estado" },
  { key: "governador",    label: "Governador",     cargo: "governador",   titulo: "Governador",          plural: "governadores" },
  { key: "senado",        label: "Senado",         cargo: "senador",      titulo: "Senador",             plural: "senadores" },
  { key: "estadual",      label: "Dep. Estaduais", cargo: "dep-estadual", titulo: "Deputado Estadual",   plural: "deputados estaduais" },
  { key: "federal",       label: "Dep. Federais",  cargo: "dep-federal",  titulo: "Deputado Federal",    plural: "deputados federais" },
  { key: "fim",           label: "Resumo" },
];
const LOCAL_IDX = STEPS.findIndex((s) => s.key === "local");
const PAGE = 60;

// --- ESTADO ----------------------------------------------------------------------
const S = {
  pres: null,
  step: 0,
  uf: sessionStorage.getItem("vc:uf") || "",
  cidade: sessionStorage.getItem("vc:cidade") || "",
  presTSE: {},     // tse_id -> {totalizacao, situacao}
  presDet: {},     // slug -> detalhe (coligação, vice)
  presErr: {},     // slug -> detalhe indisponível no TSE
  votos: JSON.parse(sessionStorage.getItem("vc:votos") || "{}"),
  filtros: {},     // cargo -> {q, tier, partido, eleitos}
  shown: {},       // cargo -> quantidade renderizada
  ordem: sessionStorage.getItem("vc:ordem") || "alfabetica", // alfabetica | afinidade
};

const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

// --- UTIL DE UI ------------------------------------------------------------------
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("show"), 3200);
}

/** Fallback em cadeia para imagens: data-alt → remove (mostra iniciais). */
window.imgFail = function (img) {
  if (img.dataset.alt) {
    img.src = img.dataset.alt;
    delete img.dataset.alt;
  } else {
    img.remove();
  }
};

function avatar(nome, src, cls = "", alt = "") {
  return `<div class="avatar ${cls}"><span class="ini">${esc(iniciais(nome))}</span>${
    src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" ${alt ? "" : 'aria-hidden="true"'} onerror="imgFail(this)" onload="this.classList.add('ok')">` : ""
  }</div>`;
}

function ring(v, size = 56) {
  const r = 22, c = +(2 * Math.PI * r).toFixed(2);
  const off = +(c * (1 - (v || 0) / 100)).toFixed(2);
  return `<div class="ring" style="--size:${size}px"><svg viewBox="0 0 52 52" aria-hidden="true"><circle class="ring-bg" cx="26" cy="26" r="${r}"/><circle class="ring-fg" cx="26" cy="26" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${c}" data-off="${off}"/></svg><span>${v == null ? "—" : v + "<small>%</small>"}</span></div>`;
}

function animateRings(root = document) {
  requestAnimationFrame(() =>
    requestAnimationFrame(() => $$(".ring-fg[data-off]", root).forEach((c) => {
      c.style.strokeDashoffset = c.dataset.off;
      c.removeAttribute("data-off");
    }))
  );
}

function statusBadge(c) {
  const sit = (c.situacao || "").toLowerCase();
  const tot = (c.totalizacao || "").toLowerCase();
  const out = [];
  if (tot.startsWith("eleito")) out.push(`<span class="badge b-ok">Eleito</span>`);
  else if (tot.includes("2º turno") || tot.includes("2o turno")) out.push(`<span class="badge b-gold">2º turno</span>`);
  else if (tot.includes("suplente")) out.push(`<span class="badge b-dim">Suplente</span>`);
  else if (tot.includes("não eleito") || tot.includes("nao eleito")) out.push(`<span class="badge b-dim">Não eleito</span>`);
  if (sit.includes("indeferido")) out.push(`<span class="badge b-bad">Registro indeferido</span>`);
  else if (sit.includes("pendente")) out.push(`<span class="badge b-dim">Registro pendente</span>`);
  return out.join("");
}

function partyChip(sigla) {
  const p = partidoInfo(sigla);
  return `<span class="party-chip" style="--pc:${p?.cor || "#94a3b8"}"><i></i>${esc(sigla)}</span>`;
}

function motivoTexto(af, pres) {
  if (af.motivo === "mesmo") return `Mesmo partido de ${pres.urna}`;
  if (af.motivo === "coligacao") return `Partido integra a coligação de ${pres.urna}`;
  if (af.motivo === "sem-dados") return `Partido sem posição em ${FONTE_POSICOES.curta}`;
  return `Proximidade ideológica com o ${pres.partido}${af.estimada ? " (posição do Missão estimada)" : ""}`;
}


// --- PRESIDENCIÁVEIS: CONTEÚDO EDITORIAL + DADOS DO TSE (RN01) ---------------------------
// presidentes.js traz o conteúdo escrito pela equipe para alguns candidatos.
// Os demais candidatos com registro ativo no TSE entram com dados oficiais.
const AVISO_GENERICO = "O VotoClaro tem trajetória, propostas e realizações resumidas pela equipe para alguns candidatos. Para este, mostra apenas os dados oficiais do TSE.";

function urlTSE(p) {
  // Rota do DivulgaCandContas desde 2024: /candidato/{REGIÃO}/{UF}/{eleição}/{id}/{ano}/{localidade}
  return `https://divulgacandcontas.tse.jus.br/divulga/#/candidato/BRASIL/BR/20322002026/${p.tse_id}/2026/BR`;
}

function nomeFonte(f) {
  return String(f.nome || "").split(/ — | – | \(|: /)[0].trim() || "Fonte";
}

function fonteLinks(item) {
  const fs = [item.fonte, ...(item.fontesExtras || [])].filter((f) => f && f.url);
  return fs.length ? `<p class="src">Fonte: ${fs.map((f) => `<a href="${esc(f.url)}" target="_blank" rel="noopener nofollow">${esc(nomeFonte(f))} ↗</a>`).join(" · ")}</p>` : "";
}

function fontesHTML(itens) {
  const vistos = new Map();
  (itens || []).forEach((it) => [it.fonte, ...(it.fontesExtras || [])].forEach((f) => { if (f && f.url && !vistos.has(f.url)) vistos.set(f.url, f); }));
  if (!vistos.size) return "";
  return `<details class="fontes reveal"><summary>Fontes (${vistos.size}) · levantamento da equipe em ${esc(CONTEUDO_LEVANTADO_EM)}</summary><ul>${[...vistos.values()].map((f) => `<li><a href="${esc(f.url)}" target="_blank" rel="noopener nofollow">${esc(f.nome || f.url)} ↗</a></li>`).join("")}</ul></details>`;
}

function fotoWiki(p) {
  return p.wiki ? wikiResumo(p.wiki) : Promise.resolve({});
}

function presGenerico(c) {
  const pi = partidoInfo(c.partido);
  return {
    slug: "tse-" + c.id, tse_id: c.id, numero: c.numero,
    urna: titleCase(c.urna), nome: titleCase(c.nome || c.urna),
    partido: c.partido, partidoNome: pi?.nome || c.partido, cor: pi?.cor || "#94a3b8",
    wiki: null, generico: true, propostas: [], realizacoes: [], trajetoria: [],
  };
}

function carregarPresidentes() {
  return API.presidentes().then((lista) => {
    lista.forEach((c) => {
      S.presTSE[c.id] = c;
      if (!PRESIDENTES.some((p) => p.tse_id === c.id)) PRESIDENTES.push(presGenerico(c));
    });
  }).catch(() => {});
}

function erroTSE(p) {
  return `<p class="muted small">Dados do TSE indisponíveis no momento. Consulte a <a href="${urlTSE(p)}" target="_blank" rel="noopener">página do candidato no TSE ↗</a>.</p>`;
}

function dadosTSEHTML(d, p) {
  if (!d && S.presErr[p.slug]) return erroTSE(p);
  if (!d) return `<p class="muted small">Carregando dados do TSE…</p>`;
  const fatos = [["Partido", `${d.partido || p.partido} · ${titleCase(d.partido_nome || p.partidoNome)}`], ["Número", String(d.numero || p.numero)]];
  if (d.nascimento) fatos.push(["Idade", `${idade(d.nascimento)} anos`]);
  if (d.naturalidade) fatos.push(["Natural de", d.naturalidade]);
  if (d.instrucao) fatos.push(["Escolaridade", d.instrucao]);
  if (d.ocupacao) fatos.push(["Ocupação", titleCase(d.ocupacao)]);
  if (d.total_bens != null) fatos.push(["Patrimônio declarado", moeda(d.total_bens)]);
  if (d.coligacao) fatos.push(["Coligação", titleCase(d.coligacao)]);
  return `<dl class="facts">${fatos.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
    <p class="fine">Fonte: <a href="${urlTSE(p)}" target="_blank" rel="noopener">DivulgaCandContas (TSE) ↗</a></p>`;
}

function eleicoesHTML(d, p) {
  if (!d && S.presErr[p.slug]) return erroTSE(p);
  if (!d) return `<p class="muted small">Carregando dados do TSE…</p>`;
  const hist = (d.eleicoes || []).filter((e) => e.ano && e.ano < 2026);
  return hist.length
    ? `<ul class="hist">${hist.map((e) => `<li><span class="tl-year">${e.ano}</span><span>${esc(titleCase(e.cargo || ""))} · ${esc(titleCase(e.local || ""))} <em>(${esc(e.partido || "")})</em></span><span class="badge ${String(e.situacao).toLowerCase().startsWith("eleito") ? "b-ok" : "b-dim"}">${esc(e.situacao || "—")}</span></li>`).join("")}</ul>`
    : `<p class="muted small">Sem disputas anteriores registradas no TSE.</p>`;
}

function registroHTML(d) {
  if (!d) return `<p class="muted small">Carregando dados do TSE…</p>`;
  return `<dl class="facts">
    <div><dt>Situação do registro</dt><dd>${esc(d.situacao || "—")}</dd></div>
    <div><dt>Resultado</dt><dd>${esc(d.totalizacao || "—")}</dd></div>
  </dl>`;
}

function preencherSlotsTSE(p, d, falhou) {
  const erro = erroTSE(p);
  const s1 = $("#tse-slot"), s2 = $("#eleicoes-slot"), s3 = $("#reg-slot");
  if (s1) s1.innerHTML = falhou ? erro : dadosTSEHTML(d, p);
  if (s2) s2.innerHTML = falhou ? erro : eleicoesHTML(d, p);
  if (s3) s3.innerHTML = registroHTML(d || S.presTSE[p.tse_id]) + (falhou && !S.presTSE[p.tse_id] ? erro : "");
}

// --- ROTEAMENTO ------------------------------------------------------------------
function go(slug, stepKey) {
  location.hash = slug ? `#/p/${slug}/${stepKey || "quem"}` : "#/";
}

function route() {
  const m = location.hash.match(/^#\/p\/([\w-]+)\/([\w-]+)/);
  const pres = m && PRESIDENTES.find((p) => p.slug === m[1]);
  if (!pres) return showHome();
  let idx = STEPS.findIndex((s) => s.key === m[2]);
  if (idx < 0) idx = 0;
  if (idx > LOCAL_IDX && !S.uf) return go(pres.slug, "local");
  showFlow(pres, idx);
}

// --- INÍCIO ------------------------------------------------------------------------
function presOrdenados() {
  return [...PRESIDENTES].sort((a, b) => a.urna.localeCompare(b.urna, "pt-BR"));
}

function renderHome() {
  const grid = $("#pres-grid");
  const lista = presOrdenados();
  const comPerfil = lista.filter((p) => !p.generico);
  const soTSE = lista.filter((p) => p.generico);
  const cardHTML = (p, i) => {
    const pi = partidoInfo(p.partido);
    const v = S.votos[p.slug];
    const nV = v ? Object.values(v).filter((x) => x === 1).length : 0;
    return `
    <article class="pres-card" role="listitem" tabindex="0" data-slug="${p.slug}" style="--pc:${p.cor};--i:${i}" aria-label="${esc(p.urna)}, ${esc(p.partido)}. Conhecer candidato">
      <div class="pc-photo">
        <span class="ini">${esc(iniciais(p.urna))}</span>
        <img alt="Foto de ${esc(p.urna)}" data-pres="${p.slug}" data-alt="${API.foto("BR", p.tse_id)}" onerror="imgFail(this)" onload="this.classList.add('ok')" hidden>
      </div>
      <div class="pc-shade"></div>
      <div class="pc-shine"></div>
      <span class="pc-num">${p.numero}</span>
      <span class="pc-status" data-status="${p.tse_id}"></span>
      <div class="pc-info">
        <h2 class="pc-name">${esc(p.urna)}</h2>
        <span class="pc-party"><i></i>${esc(p.partido)} <em>${esc(pi?.nome || p.partidoNome)}</em></span>
        ${v ? `<span class="pc-visited">✓ Visitado · ${nV} proposta${nV === 1 ? "" : "s"} curtida${nV === 1 ? "" : "s"}</span>` : ""}
      </div>
      <span class="pc-cta">Conhecer <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
    </article>`;
  };
  grid.innerHTML = comPerfil.map(cardHTML).join("")
    + (soTSE.length ? `<h3 class="pres-group">Outros candidatos com registro ativo · somente dados do TSE</h3>${soTSE.map((p, i) => cardHTML(p, comPerfil.length + i)).join("")}` : "")
    + `<p class="pres-caption">Candidatos com registro ativo no TSE, em ordem alfabética · cada informação traz a fonte · fotos: Wikipédia / TSE</p>`;

  // Fotos (Wikipédia → TSE → iniciais)
  PRESIDENTES.forEach((p) => {
    const img = grid.querySelector(`img[data-pres="${p.slug}"]`);
    fotoWiki(p)
      .then((w) => { if (w.foto) img.src = w.foto; else imgFail(img); })
      .catch(() => imgFail(img))
      .finally(() => img.removeAttribute("hidden"));
  });

  // Situação no TSE (ex.: 2º turno)
  API.presidentes().then((lista) => {
    lista.forEach((c) => { S.presTSE[c.id] = c; });
    $$("[data-status]", grid).forEach((el) => {
      const c = S.presTSE[el.dataset.status];
      el.innerHTML = c ? statusBadge(c) : "";
    });
  }).catch(() => {});

  $$(".pres-card", grid).forEach(bindTilt);
}

function bindTilt(card) {
  const open = () => go(card.dataset.slug, "quem");
  card.addEventListener("click", open);
  card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  if (matchMedia("(hover: none)").matches) return;
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    card.style.setProperty("--ry", `${(x - 0.5) * 14}deg`);
    card.style.setProperty("--rx", `${(0.5 - y) * 12}deg`);
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
  });
  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  });
}

function showHome() {
  S.pres = null;
  document.title = "VotoClaro — Conheça os candidatos das Eleições 2026";
  $("#view-flow").hidden = true;
  $("#view-home").hidden = false;
  $("#btn-trocar").hidden = true;
  document.body.classList.remove("in-flow");
  renderHome();
  window.scrollTo(0, 0);
}

// --- FLUXO ---------------------------------------------------------------------------
function showFlow(pres, idx) {
  const mudouPres = S.pres !== pres;
  const dir = mudouPres ? 1 : Math.sign(idx - S.step) || 1;
  S.pres = pres;
  S.step = idx;
  document.title = `${pres.urna} · ${STEPS[idx].label} — VotoClaro`;
  $("#view-home").hidden = true;
  $("#view-flow").hidden = false;
  $("#btn-trocar").hidden = false;
  document.body.classList.add("in-flow");
  document.body.style.setProperty("--pc", pres.cor);

  if (mudouPres) {
    renderCapsule();
    carregarDetalhePres(pres);
  }
  updateCapsuleLoc();
  renderStepper();
  renderStage(dir);
  const flow = $("#view-flow");
  if (flow.getBoundingClientRect().top < -40 || mudouPres) window.scrollTo({ top: 0, behavior: mudouPres ? "auto" : "smooth" });
}

function carregarDetalhePres(pres) {
  if (S.presDet[pres.slug]) return Promise.resolve(S.presDet[pres.slug]);
  return API.detalhe("BR", pres.tse_id).then((d) => {
    S.presDet[pres.slug] = d;
    if (S.pres === pres) {
      renderCapsuleStatus();
      const slot = $("#vice-slot");
      if (slot) slot.innerHTML = viceHTML(d);
      preencherSlotsTSE(pres, d);
    }
    return d;
  }).catch(() => {
    S.presErr[pres.slug] = true;
    if (S.pres === pres) preencherSlotsTSE(pres, null, true);
    return null;
  });
}

function coligacaoPres() {
  const d = S.presDet[S.pres.slug];
  return d?.coligacao_siglas?.length ? d.coligacao_siglas : [normSigla(S.pres.partido)];
}

// --- CÁPSULA DO PRESIDENTE ----------------------------------------------------------
function meter(label, esq, dir, v) {
  return `<div class="meter">
    <div class="meter-top"><strong>${label}</strong></div>
    <div class="meter-bar"><i style="left:${Math.round(v * 100)}%"></i></div>
    <div class="meter-labels"><span>${esq}</span><span>${dir}</span></div>
  </div>`;
}

function renderCapsule() {
  const p = S.pres;
  const pi = partidoInfo(p.partido);
  $("#capsule").innerHTML = `
    <div class="cap" style="--pc:${p.cor}">
      <div class="cap-photo">
        <span class="ini">${esc(iniciais(p.urna))}</span>
        <img id="cap-img" alt="Foto de ${esc(p.urna)}" data-alt="${API.foto("BR", p.tse_id)}" onerror="imgFail(this)" onload="this.classList.add('ok')" hidden>
        <span class="cap-num">${p.numero}</span>
      </div>
      <div class="cap-body">
        <p class="cap-kicker">Presidente escolhido</p>
        <p class="cap-name">${esc(p.urna)}</p>
        <p class="cap-party">${partyChip(p.partido)} <span>${esc(pi?.nome || p.partidoNome)}</span></p>
        <div id="cap-status"></div>
        ${pi ? `<div class="cap-meters">
          ${pi.ideologia != null
            ? `${meter("Escala esquerda–direita", "Esquerda (0)", "Direita (10)", pi.ideologia / 10)}
          <p class="cap-note">${pi.estimada
            ? `Posição estimada pela equipe: ${String(Math.round(pi.ideologia * 100) / 100).replace(".", ",")} (partido criado depois da pesquisa)`
            : `Posição do partido: ${String(pi.ideologia).replace(".", ",")} em ${esc(FONTE_POSICOES.curta)}`} · <button class="link" data-como>entenda</button></p>`
            : `<p class="cap-note">Partido sem posição em ${esc(FONTE_POSICOES.curta)}: a afinidade considera só o mesmo partido e a coligação · <button class="link" data-como>entenda</button></p>`}
        </div>` : ""}
        <div class="cap-loc" id="cap-loc"></div>
      </div>
    </div>`;
  const img = $("#cap-img");
  fotoWiki(p).then((w) => { if (w.foto) img.src = w.foto; else imgFail(img); })
    .catch(() => imgFail(img)).finally(() => img.removeAttribute("hidden"));
  renderCapsuleStatus();
}

function renderCapsuleStatus() {
  const el = $("#cap-status");
  if (!el) return;
  const d = S.presDet[S.pres.slug] || S.presTSE[S.pres.tse_id];
  el.innerHTML = d ? `<div class="cap-tse"><span>Situação no TSE</span>${statusBadge(d) || `<span class="badge b-dim">${esc(d.totalizacao || "—")}</span>`}</div>` : "";
}

function updateCapsuleLoc() {
  const el = $("#cap-loc");
  if (!el) return;
  el.innerHTML = S.uf
    ? `<span class="loc-pin">📍</span><span>${esc(S.cidade ? S.cidade + " · " : "")}${esc(ESTADO_NOME[S.uf])}</span><button class="link" data-goto="local">alterar</button>`
    : "";
}

// --- STEPPER --------------------------------------------------------------------------
function renderStepper() {
  const el = $("#stepper");
  el.style.setProperty("--progress", `${(S.step / (STEPS.length - 1)) * 100}%`);
  el.innerHTML = `<div class="stepper-track"><div class="stepper-fill"></div></div><ol>${STEPS.map((s, i) => {
    const locked = i > LOCAL_IDX && !S.uf;
    const cls = i === S.step ? "current" : i < S.step ? "done" : "";
    return `<li><button class="step ${cls}" data-step="${i}" ${locked ? "disabled" : ""} ${i === S.step ? 'aria-current="step"' : ""}>
      <span class="step-dot">${i < S.step ? "✓" : i + 1}</span><span class="step-label">${s.label}</span></button></li>`;
  }).join("")}</ol>`;
  const cur = el.querySelector(".current");
  if (cur) cur.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
}

// --- PALCO ----------------------------------------------------------------------------
function renderStage(dir = 1) {
  const st = STEPS[S.step];
  const stage = $("#stage");
  const fn = RENDER[st.key] || RENDER.lista;
  stage.innerHTML = fn(st);
  stage.classList.remove("enter-r", "enter-l");
  void stage.offsetWidth;
  stage.classList.add(dir >= 0 ? "enter-r" : "enter-l");
  (AFTER[st.key] || AFTER.lista)?.(st);
  animateRings(stage);
  updateNav();
}

function updateNav() {
  const st = STEPS[S.step];
  const next = STEPS[S.step + 1];
  $("#btn-prev").disabled = false;
  $("#btn-prev span").textContent = S.step === 0 ? "Início" : "Voltar";
  $("#step-count").textContent = `${S.step + 1} / ${STEPS.length}`;
  const btn = $("#btn-next");
  if (!next) {
    $("#btn-next-label").textContent = "Escolher outro presidente";
    btn.disabled = false;
  } else {
    $("#btn-next-label").textContent = st.key === "local" ? "Ver candidatos" : `Próximo: ${next.label}`;
    btn.disabled = st.key === "local" && !S.uf;
  }
}

function nextStep() {
  if (S.step >= STEPS.length - 1) return go();
  if (STEPS[S.step].key === "local" && !S.uf) return toast("Escolha seu estado para continuar.");
  go(S.pres.slug, STEPS[S.step + 1].key);
}
function prevStep() {
  if (S.step === 0) return go();
  go(S.pres.slug, STEPS[S.step - 1].key);
}

function head(kicker, titulo, lead) {
  return `<header class="st-head"><p class="st-kicker">${kicker}</p><h2 class="st-title">${titulo}</h2>${lead ? `<p class="st-lead">${lead}</p>` : ""}</header>`;
}

function viceHTML(d) {
  const v = d?.vices?.[0];
  return v ? `<div class="vice"><span>Vice na chapa</span><strong>${esc(titleCase(v.nome))}</strong>${partyChip(v.partido)}</div>` : "";
}

// --- RENDERIZADORES DE ETAPA --------------------------------------------------------------
const RENDER = {
  quem() {
    const p = S.pres;
    if (p.generico) return `
      ${head("Etapa 1 · Quem é", esc(p.nome), "Dados oficiais do registro de candidatura no TSE.")}
      <div class="callout neutral reveal">${AVISO_GENERICO}</div>
      <div id="vice-slot">${viceHTML(S.presDet[p.slug])}</div>
      <div id="tse-slot">${dadosTSEHTML(S.presDet[p.slug], p)}</div>`;
    return `
      ${head("Etapa 1 · Quem é", esc(p.nome), esc(p.frase))}
      <p class="resumo reveal">${esc(p.resumo)}</p>
      <div id="vice-slot">${viceHTML(S.presDet[p.slug])}</div>
      <section class="belief reveal" style="--d:1">
        <div class="belief-head"><h3>No que acredita</h3><span class="espectro">${esc(p.crencas.espectro)}</span></div>
        <p>${esc(p.crencas.texto)}</p>
        <div class="tags">${p.crencas.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      </section>
      <h3 class="sub">Trajetória política</h3>
      <ol class="timeline">
        ${p.trajetoria.map((t, i) => `<li class="reveal" style="--d:${i + 2}"><span class="tl-year">${esc(t.ano)}</span><p>${esc(t.texto)}</p></li>`).join("")}
      </ol>
      ${fontesHTML(p.trajetoria)}`;
  },

  propostas() {
    const p = S.pres;
    const v = S.votos[p.slug] || {};
    if (p.generico) return `
      ${head("Etapa 2 · Propostas", `O que ${esc(p.urna)} propõe`, "A íntegra das propostas está no plano de governo registrado no TSE.")}
      <div class="callout neutral reveal">${AVISO_GENERICO}</div>
      <a class="btn btn-primary sm" href="${urlTSE(p)}" target="_blank" rel="noopener">Ler plano de governo no TSE ↗</a>`;
    return `
      ${head("Etapa 2 · Propostas", `O que ${esc(p.urna)} propõe`, "Principais bandeiras defendidas na campanha. Reaja a cada uma — no final mostramos seu resultado.")}
      <div class="prop-grid">
        ${p.propostas.map((pr, i) => `
          <article class="prop reveal ${v[i] === 1 ? "liked" : v[i] === -1 ? "disliked" : ""}" style="--d:${i}" data-i="${i}">
            <span class="prop-ico" aria-hidden="true">${pr.icone}</span>
            <h3>${esc(pr.titulo)}</h3>
            <p>${esc(pr.texto)}</p>
            <div class="prop-vote" role="group" aria-label="Sua opinião">
              <button class="vote up" data-v="1" aria-pressed="${v[i] === 1}" title="Concordo">👍 <span>Concordo</span></button>
              <button class="vote down" data-v="-1" aria-pressed="${v[i] === -1}" title="Discordo">👎 <span>Discordo</span></button>
            </div>
          </article>`).join("")}
      </div>
      ${fontesHTML(p.propostas)}
      <p class="fine">Resumo informativo. A íntegra das propostas está no plano de governo registrado no <a href="${urlTSE(p)}" target="_blank" rel="noopener">TSE ↗</a>.</p>`;
  },

  realizacoes() {
    const p = S.pres;
    if (p.generico) return `
      ${head("Etapa 3 · Realizações", "Eleições anteriores", "Candidaturas anteriores registradas no TSE.")}
      <div class="callout neutral reveal">${AVISO_GENERICO}</div>
      <div id="eleicoes-slot">${eleicoesHTML(S.presDet[p.slug], p)}</div>`;
    return `
      ${head("Etapa 3 · Realizações", "Mandatos e projetos", "Cargos exercidos e principais programas, leis ou entregas associadas ao candidato.")}
      ${p.realizacoesNota ? `<div class="callout reveal">${esc(p.realizacoesNota)}</div>` : ""}
      <div class="feat-list">
        ${p.realizacoes.map((r, i) => `
          <article class="feat reveal" style="--d:${i}">
            <span class="feat-year">${esc(r.ano)}</span>
            <div><h3>${esc(r.titulo)}</h3><p>${esc(r.texto)}</p></div>
          </article>`).join("")}
      </div>
      ${fontesHTML(p.realizacoes)}`;
  },

  controversias() {
    const p = S.pres;
    const casos = p.controversias || [];
    return `
      ${head("Etapa 4 · Controvérsias", "Escândalos, processos e situação no TSE", "Casos públicos que envolvem o nome do candidato, com a situação atual e a fonte de cada um. Toque para abrir.")}
      <div id="reg-slot">${registroHTML(S.presDet[p.slug] || S.presTSE[p.tse_id])}</div>
      <div class="callout neutral reveal">⚖️ Ser investigado ou acusado não significa ser culpado. Um caso só aparece aqui se tiver registro em órgão oficial (tribunal, TSE, Ministério Público, Polícia Federal, CGU) ou em veículo jornalístico de grande circulação. O critério é o mesmo para todos os candidatos.</div>
      ${casos.length
        ? `<div class="acc">${casos.map((c, i) => accItem(c, i)).join("")}</div>`
        : `<p class="muted reveal">Nenhum caso encontrado pelo critério da plataforma.</p>`}
      <a class="btn btn-ghost sm" href="${urlTSE(p)}" target="_blank" rel="noopener">Certidões criminais e processos do registro no TSE ↗</a>`;
  },

  local() {
    return `
      ${head("Etapa 5 · Seu estado", "Onde você vota?", "Escolha seu estado para ver os candidatos a governador, senador e deputado.")}
      <div class="uf-grid" role="radiogroup" aria-label="Estado">
        ${ESTADOS.map(([uf, nome], i) => `
          <button class="uf ${S.uf === uf ? "on" : ""}" role="radio" aria-checked="${S.uf === uf}" data-uf="${uf}" style="--d:${i}" title="${nome}">
            <strong>${uf}</strong><span>${nome}</span>
          </button>`).join("")}
      </div>
      <div class="city ${S.uf ? "" : "off"}" id="city-box">
        <label for="city-input">Cidade <small>(opcional)</small></label>
        <div class="city-field">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          <input id="city-input" list="city-list" placeholder="${S.uf ? "Digite o nome da cidade" : "Escolha o estado primeiro"}" value="${esc(S.cidade)}" ${S.uf ? "" : "disabled"} autocomplete="off" />
          <datalist id="city-list"></datalist>
        </div>
        <p class="fine">Nas eleições de 2026, governador, senadores e deputados são eleitos pelo estado inteiro: todos os eleitores de um mesmo estado têm os mesmos candidatos, em qualquer cidade.</p>
      </div>`;
  },

  lista(st) {
    const p = S.pres;
    const n = STEPS.indexOf(st) + 1;
    const intro = {
      governador: `O governador comanda o estado. Os candidatos aparecem em ordem alfabética, com o rótulo de afinidade do partido com ${esc(p.urna)} (${esc(p.partido)}).`,
      senador: `Senadores votam leis e emendas constitucionais que o presidente precisa aprovar. Toque em um nome para ver o mini card.`,
      "dep-estadual": `Deputados estaduais atuam na Assembleia Legislativa e dão sustentação ao governador.`,
      "dep-federal": `Na Câmara dos Deputados, a base aliada define se as propostas do presidente avançam ou são barradas.`,
    }[st.cargo];
    return `
      ${head(`Etapa ${n} · ${esc(ESTADO_NOME[S.uf])}`, `Candidatos a ${st.titulo.toLowerCase()}`, intro)}
      <div class="aff-legend">
        ${Object.entries(TIERS).map(([k, t]) => `<span><i style="background:${t.cor}"></i>${t.label}</span>`).join("")}
        <button class="link" data-como>Como calculamos?</button>
      </div>
      <div id="list-root" data-cargo="${st.cargo}">${skeleton(st.cargo === "governador" ? 3 : 12, st.cargo === "governador")}</div>`;
  },

  fim() {
    const p = S.pres;
    const v = S.votos[p.slug] || {};
    const up = Object.values(v).filter((x) => x === 1).length;
    const down = Object.values(v).filter((x) => x === -1).length;
    const outros = presOrdenados().filter((o) => o !== p);
    const counts = STEPS.filter((s) => s.cargo).map((s) => {
      const lista = MEM_LISTAS[`${S.uf}:${s.cargo}`];
      if (!lista) return null;
      const alta = lista.filter((c) => calcAfinidade(c.partido, p.partido, coligacaoPres()).tier === "alta").length;
      return `<div class="sum-stat reveal"><strong data-count="${alta}">0</strong><span>${s.plural} com alta afinidade<br><small>de ${lista.length} candidatos</small></span></div>`;
    }).filter(Boolean).join("");
    return `
      ${head("Percurso concluído", `Você conheceu ${esc(p.urna)} 🎉`, `Veja o resumo do seu percurso em ${esc(ESTADO_NOME[S.uf])}.`)}
      <div class="sum-grid">
        ${p.propostas.length ? `<div class="sum-stat big reveal"><strong>${up}<small>/${p.propostas.length}</small></strong><span>propostas com que você concordou${down ? `<br><small>${down} com que discordou</small>` : ""}</span></div>` : ""}
        ${counts}
      </div>
      <h3 class="sub">Quer ver o mesmo estado com outro presidente?</h3>
      <div class="swap-row">
        ${outros.map((o) => `
          <button class="swap" data-swap="${o.slug}" style="--pc:${o.cor}">
            ${avatar(o.urna, null, "sm")}
            <span><strong>${esc(o.urna)}</strong><small>${esc(o.partido)}</small></span>
          </button>`).join("")}
      </div>
      <div class="end-actions">
        <button class="btn btn-primary" id="btn-restart">Voltar ao início</button>
        <button class="btn btn-ghost" data-goto="local">Alterar estado</button>
      </div>
      <p class="fine">O VotoClaro não recomenda votos. A afinidade é calculada por partido e coligação, a partir de uma classificação publicada; conheça cada candidato antes de decidir.</p>`;
  },
};

function accItem(c, i) {
  return `
    <div class="acc-item reveal" style="--d:${i}">
      <button class="acc-btn" aria-expanded="false">
        <span class="acc-title"><strong>${esc(c.titulo)}</strong><small>${esc(c.ano || "")}</small></span>
        <span class="st st-${esc(c.status)}">${esc(c.statusLabel)}</span>
        <span class="acc-chev" aria-hidden="true">▾</span>
      </button>
      <div class="acc-body"><div><p>${esc(c.texto)}</p>${fonteLinks(c)}</div></div>
    </div>`;
}

function skeleton(n, big) {
  return `<div class="${big ? "gov-list" : "cand-grid"}">${Array.from({ length: n }, () => `<div class="skel ${big ? "skel-big" : ""}"></div>`).join("")}</div>`;
}

// --- PÓS-RENDER ----------------------------------------------------------------------------
const AFTER = {
  quem() {},
  propostas() {},
  realizacoes() {},
  controversias() {},
  local() {
    if (S.uf) carregarCidades(S.uf);
  },
  lista(st) {
    carregarLista(st);
  },
  fim() {
    $$("[data-count]").forEach((el) => {
      const alvo = +el.dataset.count;
      const t0 = performance.now();
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / 900);
        el.textContent = Math.round(alvo * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    $$(".swap").forEach((b) => {
      const o = PRESIDENTES.find((x) => x.slug === b.dataset.swap);
      fotoWiki(o).then((w) => {
        if (w.foto) b.querySelector(".avatar").insertAdjacentHTML("beforeend", `<img src="${esc(w.foto)}" alt="" onerror="imgFail(this)" onload="this.classList.add('ok')">`);
      }).catch(() => {});
    });
  },
};

// --- LOCAL ------------------------------------------------------------------------------------
function escolherUF(uf) {
  if (S.uf !== uf) {
    S.cidade = "";
    sessionStorage.removeItem("vc:cidade");
  }
  S.uf = uf;
  sessionStorage.setItem("vc:uf", uf);
  $$(".uf").forEach((b) => {
    const on = b.dataset.uf === uf;
    b.classList.toggle("on", on);
    b.setAttribute("aria-checked", on);
  });
  const box = $("#city-box");
  box.classList.remove("off");
  const inp = $("#city-input");
  inp.disabled = false;
  inp.value = S.cidade;
  inp.placeholder = "Digite o nome da cidade";
  carregarCidades(uf);
  updateCapsuleLoc();
  renderStepper();
  updateNav();
  // Pré-carrega as listas do estado em segundo plano
  STEPS.filter((s) => s.cargo).forEach((s) => obterLista(uf, s.cargo).catch(() => {}));
}

function carregarCidades(uf) {
  municipios(uf).then((nomes) => {
    if (S.uf !== uf) return;
    const dl = $("#city-list");
    if (dl) dl.innerHTML = nomes.map((n) => `<option value="${esc(n)}">`).join("");
  }).catch(() => {});
}

// --- LISTAS DE CANDIDATOS ---------------------------------------------------------------------
const MEM_LISTAS = {};
function obterLista(uf, cargo) {
  return API.eleicao(uf, cargo).then((l) => (MEM_LISTAS[`${uf}:${cargo}`] = l));
}

function comAfinidade(lista) {
  const p = S.pres;
  const col = coligacaoPres();
  return lista
    .map((c) => ({ ...c, af: calcAfinidade(c.partido, p.partido, col) }))
    .sort((a, b) => S.ordem === "afinidade"
      ? (b.af.valor ?? -1) - (a.af.valor ?? -1) || a.urna.localeCompare(b.urna, "pt-BR")
      : a.urna.localeCompare(b.urna, "pt-BR"));
}

// Data de consulta ao TSE (RN03): vem do servidor, a partir do registro do cache
function dataConsulta(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function consultaHTML(iso) {
  return iso ? `<p class="consulta">Fonte: TSE, DivulgaCandContas · consultado em ${esc(dataConsulta(iso))}</p>` : "";
}

// Ordem de exibição (padrão: alfabética; a afinidade é rótulo e filtro)
function ordemHTML() {
  return `<div class="ordem" role="group" aria-label="Ordem da lista">
    <span>Ordem:</span>
    <button class="ochip ${S.ordem === "alfabetica" ? "on" : ""}" data-ordem="alfabetica" aria-pressed="${S.ordem === "alfabetica"}">Alfabética</button>
    <button class="ochip ${S.ordem === "afinidade" ? "on" : ""}" data-ordem="afinidade" aria-pressed="${S.ordem === "afinidade"}">Por afinidade</button>
  </div>`;
}

async function carregarLista(st) {
  const root = $("#list-root");
  const uf = S.uf;
  try {
    await carregarDetalhePres(S.pres); // garante coligação
    const lista = await obterLista(uf, st.cargo);
    if (!root.isConnected || S.uf !== uf) return;
    const dados = comAfinidade(lista);
    root._consulta = API.consulta(uf, st.cargo);
    if (!dados.length) {
      const comDados = API.semCache(uf, st.cargo);
      root.innerHTML = comDados
        ? `<div class="empty"><strong>Sem dados de ${esc(st.titulo.toLowerCase())} em ${esc(ESTADO_NOME[uf])} nesta versão.</strong><br>A plataforma está em modo offline e usa só as consultas ao TSE gravadas para o artigo. Para este cargo, há dados de: ${comDados.map((u) => esc(ESTADO_NOME[u] || u)).join(", ") || "nenhum estado"}. Para consultar o TSE, rode o servidor sem a opção --offline.</div>`
        : `<div class="empty">Nenhum candidato encontrado para ${esc(st.titulo.toLowerCase())} em ${esc(ESTADO_NOME[uf])}.</div>`;
      return;
    }
    if (st.cargo === "governador") renderGovernadores(root, dados);
    else renderGrade(root, dados, st);
  } catch (e) {
    if (!root.isConnected) return;
    root.innerHTML = `
      <div class="empty err">
        <strong>Não foi possível carregar os candidatos.</strong>
        <p>Os dados vêm do TSE pelo servidor do VotoClaro. Verifique se ele está rodando (<code>python server.py</code>) e tente novamente.</p>
        <button class="btn btn-ghost" id="btn-retry">Tentar novamente</button>
      </div>`;
    $("#btn-retry").onclick = () => { root.innerHTML = skeleton(6, st.cargo === "governador"); carregarLista(st); };
  }
}

// Governadores: cards completos
function renderGovernadores(root, dados) {
  root.innerHTML = `${ordemHTML()}${consultaHTML(root._consulta)}<div class="gov-list">${dados.map((c, i) => {
    const t = TIERS[c.af.tier];
    return `
    <article class="gov reveal" style="--d:${i};--tc:${t.cor}" data-id="${c.id}">
      <div class="gov-top">
        ${avatar(c.urna, API.foto(S.uf, c.id), "lg", `Foto de ${c.urna}`)}
        <div class="gov-id">
          <h3>${esc(titleCase(c.urna))}</h3>
          <p>${partyChip(c.partido)} <span class="num">nº ${esc(c.numero ?? "—")}</span></p>
          <div class="badges">${statusBadge(c)}</div>
        </div>
        ${ring(c.af.valor, 64)}
      </div>
      <p class="aff-line"><i></i><strong>${t.label}</strong> · ${esc(motivoTexto(c.af, S.pres))}</p>
      <button class="gov-toggle" aria-expanded="false">Conhecer candidato <span aria-hidden="true">▾</span></button>
      <div class="gov-more" hidden></div>
    </article>`;
  }).join("")}</div>`;
  root._dados = dados;
  animateRings(root);
}

async function abrirGovernador(card) {
  const more = card.querySelector(".gov-more");
  const btn = card.querySelector(".gov-toggle");
  const aberto = btn.getAttribute("aria-expanded") === "true";
  btn.setAttribute("aria-expanded", !aberto);
  btn.firstChild.textContent = aberto ? "Conhecer candidato " : "Fechar ";
  more.hidden = aberto;
  if (aberto || more.dataset.ok) return;
  more.dataset.ok = "1";
  const c = $("#list-root")._dados.find((x) => x.id === card.dataset.id);
  more.innerHTML = `<div class="tabs" role="tablist">
      <button class="tab on" data-tab="traj" role="tab">Trajetória</button>
      <button class="tab" data-tab="prop" role="tab">Propostas</button>
      <button class="tab" data-tab="proc" role="tab">Processos</button>
    </div><div class="tab-panels"><div class="loading-line"><span></span></div></div>`;

  const [det, wiki] = await Promise.all([
    API.detalhe(S.uf, c.id).catch(() => null),
    wikiBuscarPessoa(c.nome).catch(() => null),
  ]);
  const panels = more.querySelector(".tab-panels");
  panels.innerHTML = `
    <div class="panel" data-panel="traj">${painelTrajetoria(c, det, wiki)}</div>
    <div class="panel" data-panel="prop" hidden>${painelPropostas(c, det)}</div>
    <div class="panel" data-panel="proc" hidden>${painelProcessos(c, det, wiki)}</div>`;
}

function painelTrajetoria(c, d, w) {
  const fatos = [];
  if (d?.nascimento) fatos.push(["Idade", `${idade(d.nascimento)} anos`]);
  if (d?.naturalidade) fatos.push(["Natural de", d.naturalidade]);
  if (d?.instrucao) fatos.push(["Escolaridade", d.instrucao]);
  if (d?.ocupacao) fatos.push(["Ocupação", titleCase(d.ocupacao)]);
  if (d?.total_bens != null) fatos.push(["Patrimônio declarado", moeda(d.total_bens)]);
  const hist = (d?.eleicoes || []).filter((e) => e.ano && e.ano < 2026);
  return `
    ${w ? `<p class="wiki-ext">${esc(w.extrato)}</p><a class="src" href="${esc(w.url)}" target="_blank" rel="noopener">Fonte: Wikipédia${w.consultadoEm ? `, consultada em ${esc(dataConsulta(w.consultadoEm).slice(0, 10))}` : ""} ↗</a>` : `<p class="muted">${esc(titleCase(c.nome))}.</p>`}
    ${fatos.length ? `<dl class="facts">${fatos.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : ""}
    ${hist.length ? `<h4>Eleições anteriores</h4><ul class="hist">${hist.map((e) => `<li><span class="tl-year">${e.ano}</span><span>${esc(titleCase(e.cargo || ""))} · ${esc(titleCase(e.local || ""))} <em>(${esc(e.partido || "")})</em></span><span class="badge ${String(e.situacao).toLowerCase().startsWith("eleito") ? "b-ok" : "b-dim"}">${esc(e.situacao || "—")}</span></li>`).join("")}</ul>` : `<p class="muted small">Sem disputas anteriores registradas no TSE.</p>`}
    ${!d ? `<p class="muted small">Detalhes do TSE indisponíveis no momento.</p>` : ""}`;
}

function painelPropostas(c, d) {
  const col = coligacaoPres();
  const siglas = d?.coligacao_siglas || [normSigla(c.partido)];
  return `
    <p>O plano de governo completo é registrado pelo candidato no TSE.</p>
    <a class="btn btn-primary sm" href="${esc(c.tse_url)}" target="_blank" rel="noopener">${d?.tem_plano === false ? "Ver página no TSE" : "Ler plano de governo no TSE"} ↗</a>
    ${d?.coligacao ? `<h4>Coligação “${esc(titleCase(d.coligacao))}”</h4>` : `<h4>Partidos da chapa</h4>`}
    <div class="tags">${siglas.map((s) => `<span class="tag ${col.includes(s) ? "tag-hit" : ""}">${esc(s)}</span>`).join("")}</div>
    ${siglas.some((s) => col.includes(s)) ? `<p class="small muted">Em destaque: partidos que também apoiam ${esc(S.pres.urna)}.</p>` : ""}
    ${viceHTML(d)}
    ${d?.sites?.length ? `<h4>Canais oficiais</h4><div class="links">${d.sites.slice(0, 4).map((s) => `<a href="${esc(s.startsWith("http") ? s : "https://" + s)}" target="_blank" rel="noopener nofollow">${esc(s.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""))}</a>`).join("")}</div>` : ""}`;
}

function painelProcessos(c, d, w) {
  const sit = d?.situacao || c.situacao || "—";
  const expl = /indeferido/i.test(sit)
    ? "A Justiça Eleitoral negou o registro da candidatura (pode haver recurso)."
    : /deferido/i.test(sit)
      ? "Registro aprovado pela Justiça Eleitoral, que verifica requisitos como a Lei da Ficha Limpa."
      : "Registro ainda em análise pela Justiça Eleitoral.";
  const extra = GOVERNADORES_EXTRA[c.id]?.controversias || [];
  return `
    <div class="reg"><span>Registro de candidatura</span><strong>${esc(sit)}</strong></div>
    <p class="small">${expl}</p>
    ${extra.length ? `<div class="acc">${extra.map((x, i) => accItem(x, i)).join("")}</div>` : ""}
    <p>As certidões criminais e demais documentos entregues pelo candidato podem ser consultados na página oficial do TSE.</p>
    <div class="links">
      <a class="btn btn-ghost sm" href="${esc(c.tse_url)}" target="_blank" rel="noopener">Certidões no TSE ↗</a>
      ${w ? `<a class="btn btn-ghost sm" href="${esc(w.url)}" target="_blank" rel="noopener">Wikipédia ↗</a>` : ""}
      <a class="btn btn-ghost sm" href="https://www.google.com/search?tbm=nws&q=${encodeURIComponent(`"${titleCase(c.urna)}" ${c.partido} governador`)}" target="_blank" rel="noopener" title="Abre uma busca no Google Notícias. O resultado não é selecionado pelo VotoClaro e a origem das notícias varia de candidato para candidato.">Busca de notícias (Google) ↗</a>
    </div>`;
}

// Senado e deputados: grade com busca e filtros
function renderGrade(root, dados, st) {
  const f = (S.filtros[st.cargo] ||= { q: "", tier: "", partido: "", eleitos: false });
  const temEleitos = dados.some((c) => /^eleito/i.test(c.totalizacao || ""));
  const partidos = [...new Set(dados.map((c) => c.partido))].sort();
  const cont = { alta: 0, moderada: 0, baixa: 0, sem: 0 };
  dados.forEach((c) => cont[c.af.tier]++);
  root._dados = dados;
  root.innerHTML = `
    <div class="toolbar">
      <div class="search">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <input id="q" type="search" placeholder="Buscar por nome ou número" value="${esc(f.q)}" autocomplete="off" aria-label="Buscar candidato" />
      </div>
      <select id="f-partido" aria-label="Filtrar por partido">
        <option value="">Todos os partidos</option>
        ${partidos.map((p) => `<option value="${esc(p)}" ${f.partido === p ? "selected" : ""}>${esc(p)}</option>`).join("")}
      </select>
      ${temEleitos ? `<label class="toggle"><input type="checkbox" id="f-eleitos" ${f.eleitos ? "checked" : ""}><span></span>Só eleitos</label>` : ""}
    </div>
    <div class="chips" role="group" aria-label="Filtrar por faixa de afinidade">
      <button class="fchip ${!f.tier ? "on" : ""}" data-tier="" aria-pressed="${!f.tier}">Todos <b>${dados.length}</b></button>
      ${Object.entries(TIERS).filter(([k]) => k !== "sem" || cont.sem).map(([k, t]) => `<button class="fchip ${f.tier === k ? "on" : ""}" data-tier="${k}" aria-pressed="${f.tier === k}" style="--tc:${t.cor}"><i></i>${t.curto} <b>${cont[k]}</b></button>`).join("")}
    </div>
    ${ordemHTML()}
    ${consultaHTML(root._consulta)}
    <p class="count" id="count"></p>
    <div class="cand-grid" id="grid"></div>
    <div class="sentinel" id="sentinel"></div>`;
  aplicarFiltros(st);
}

function filtrar(dados, f) {
  const q = f.q.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  return dados.filter((c) => {
    if (f.tier && c.af.tier !== f.tier) return false;
    if (f.partido && c.partido !== f.partido) return false;
    if (f.eleitos && !/^eleito/i.test(c.totalizacao || "")) return false;
    if (q) {
      const alvo = `${c.urna} ${c.nome} ${c.numero}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      if (!alvo.includes(q)) return false;
    }
    return true;
  });
}

function aplicarFiltros(st) {
  const root = $("#list-root");
  const f = S.filtros[st.cargo];
  root._filtrados = filtrar(root._dados, f);
  S.shown[st.cargo] = 0;
  $("#grid").innerHTML = "";
  $("#count").textContent = root._filtrados.length
    ? `${root._filtrados.length} candidato${root._filtrados.length === 1 ? "" : "s"}`
    : "";
  if (!root._filtrados.length) {
    $("#grid").innerHTML = `<div class="empty">Nenhum candidato com esses filtros.</div>`;
    return;
  }
  renderMais(st);
  observarSentinela(st);
}

function renderMais(st) {
  const root = $("#list-root");
  const lista = root._filtrados;
  const ini = S.shown[st.cargo];
  const fim = Math.min(lista.length, ini + PAGE);
  if (ini >= fim) return;
  let html = "";
  for (let i = ini; i < fim; i++) {
    const c = lista[i];
    const prev = lista[i - 1];
    if (S.ordem === "afinidade" && !S.filtros[st.cargo].tier && (!prev || prev.af.tier !== c.af.tier)) {
      const t = TIERS[c.af.tier];
      const total = lista.filter((x) => x.af.tier === c.af.tier).length;
      html += `<h4 class="tier-sep" style="--tc:${t.cor}"><i></i>${t.label} <span>${total}</span></h4>`;
    }
    const t = TIERS[c.af.tier];
    html += `
      <button class="cand" data-id="${c.id}" style="--tc:${t.cor};--d:${(i - ini) % 24}">
        ${avatar(c.urna, API.foto(S.uf, c.id))}
        <span class="cand-info"><strong>${esc(titleCase(c.urna))}</strong><span>${esc(c.partido)} · ${esc(c.numero ?? "")}</span></span>
        <span class="cand-aff">${c.af.valor == null ? "—" : c.af.valor + "%"}</span>
        ${/^eleito/i.test(c.totalizacao || "") ? `<span class="cand-flag" title="Eleito">★</span>` : ""}
      </button>`;
  }
  $("#grid").insertAdjacentHTML("beforeend", html);
  S.shown[st.cargo] = fim;
}

let _obs;
function observarSentinela(st) {
  _obs?.disconnect();
  const s = $("#sentinel");
  if (!s) return;
  _obs = new IntersectionObserver((ents) => {
    if (ents.some((e) => e.isIntersecting)) renderMais(st);
  }, { rootMargin: "600px" });
  _obs.observe(s);
}

// Mini card
function abrirMini(id) {
  const root = $("#list-root");
  const c = root._dados.find((x) => x.id === id);
  if (!c) return;
  const st = STEPS[S.step];
  const t = TIERS[c.af.tier];
  const pi = partidoInfo(c.partido);
  openModal(`
    <div class="mini" style="--tc:${t.cor};--pc:${pi?.cor || "#94a3b8"}">
      ${avatar(c.urna, API.foto(S.uf, c.id), "xl", `Foto de ${c.urna}`)}
      <h3>${esc(titleCase(c.urna))}</h3>
      <p class="muted">${esc(titleCase(c.nome))}</p>
      <div class="mini-chips">
        ${partyChip(c.partido)}
        <span class="chip">nº ${esc(c.numero ?? "—")}</span>
        <span class="chip">${esc(st.titulo)} · ${esc(S.uf)}</span>
        ${statusBadge(c)}
      </div>
      <div class="aff-box">
        ${ring(c.af.valor, 72)}
        <div>
          <strong style="color:${t.cor}">${t.label}</strong>
          <p>${esc(motivoTexto(c.af, S.pres))}${pi ? ` · ${esc(pi.nome)}` : ""}.</p>
        </div>
      </div>
      <div class="mini-actions">
        <a class="btn btn-primary" href="${esc(c.tse_url)}" target="_blank" rel="noopener">Ver mais sobre o candidato ↗</a>
        <a class="btn btn-ghost" href="https://www.google.com/search?tbm=nws&q=${encodeURIComponent(`"${titleCase(c.urna)}" ${c.partido}`)}" target="_blank" rel="noopener" title="Abre uma busca no Google Notícias. O resultado não é selecionado pelo VotoClaro e a origem das notícias varia de candidato para candidato.">Busca de notícias (Google) ↗</a>
      </div>
      <p class="fine">Página oficial no DivulgaCandContas (TSE): bens, certidões, propostas e prestação de contas. A busca de notícias é externa e não tem seleção de fontes pelo VotoClaro.</p>
      ${consultaHTML(root._consulta)}
    </div>`);
}

// --- MODAL -----------------------------------------------------------------------------------
let _lastFocus;
function openModal(html) {
  _lastFocus = document.activeElement;
  $("#modal-body").innerHTML = html;
  const m = $("#modal");
  m.classList.add("open");
  m.setAttribute("aria-hidden", "false");
  m.removeAttribute("inert");
  const titulo = m.querySelector("#modal-body h2, #modal-body h3");
  if (titulo) { titulo.id = "modal-title"; m.setAttribute("aria-labelledby", "modal-title"); } else { m.removeAttribute("aria-labelledby"); m.setAttribute("aria-label", "Detalhes do candidato"); }
  document.body.classList.add("no-scroll");
  animateRings(m);
  setTimeout(() => $("#modal-close").focus(), 50);
}
function closeModal() {
  const m = $("#modal");
  m.classList.remove("open");
  m.setAttribute("aria-hidden", "true");
  m.setAttribute("inert", "");
  document.body.classList.remove("no-scroll");
  _lastFocus?.focus?.();
}

function abrirComoFunciona() {
  openModal(`
    <div class="como">
      <h3>Como funciona o VotoClaro</h3>
      <ol class="como-steps">
        <li><strong>Escolha um presidente</strong> e conheça trajetória, crenças, propostas, realizações e controvérsias, com a fonte de cada informação.</li>
        <li><strong>Informe seu estado</strong> (e, se quiser, sua cidade).</li>
        <li><strong>Veja os candidatos do estado</strong> (governador, senadores, deputados estaduais e federais) em ordem alfabética, cada um com o rótulo de afinidade com o presidente escolhido. Se quiser, você pode ordenar a lista pela afinidade ou filtrar por faixa.</li>
      </ol>
      <h4>Por que afinidade importa?</h4>
      <p>Para aprovar suas propostas, o presidente precisa de apoio no Senado e na Câmara, e de parceria com os governos estaduais. Candidatos de partidos com ideias próximas tendem a formar essa base.</p>
      <h4>Como calculamos</h4>
      <p>A posição de cada partido na escala esquerda (0) – direita (10) vem de <a href="${FONTE_POSICOES.url}" target="_blank" rel="noopener">${esc(FONTE_POSICOES.completa)}</a>. Partidos que mudaram de nome usam o escore da sigla anterior; partidos resultantes de fusão usam a média dos partidos fundidos. ${esc(FONTE_POSICOES.regraEstimada)} A afinidade é a proximidade entre o partido do candidato e o do presidente: 100% menos a distância entre eles (dividida por 10 e por 0,9), sem ficar abaixo de zero.</p>
      <ul class="tiers">
        ${[TIERS.alta, TIERS.moderada, TIERS.baixa].map((t, i) => `<li><i style="background:${t.cor}"></i><strong>${t.label}</strong> ${["75% ou mais", "de 50% a 74%", "abaixo de 50%"][i]}</li>`).join("")}
      </ul>
      <p>Mesmo partido conta 100%. Partidos da coligação oficial do presidente (registrada no TSE) contam no mínimo 85%. A pesquisa que deu origem às posições é de 2022; mudanças posteriores dos partidos não aparecem nela.</p>
      <h4>Por que a lista começa em ordem alfabética?</h4>
      <p>A posição de um nome numa lista pode influenciar a escolha. Por isso a ordem padrão é alfabética, e a afinidade aparece como rótulo e filtro.</p>
      <h4>Privacidade</h4>
      <p>O VotoClaro não tem cadastro. O presidente escolhido, o estado e as reações às propostas ficam só nesta aba do navegador (sessionStorage) e são apagados ao fechá-la; nada disso é enviado ao servidor. O navegador consulta a Wikipédia (fotos e resumos) e o IBGE (municípios), que recebem o endereço IP de quem acessa.</p>
      <p class="fine">É uma estimativa por partido, não uma avaliação individual de cada político. O VotoClaro é apartidário, não exige cadastro e não recomenda votos.</p>
    </div>`);
}

// --- EVENTOS ---------------------------------------------------------------------------------
document.addEventListener("click", (e) => {
  const t = e.target;
  if (t.closest("[data-close]")) return closeModal();
  if (t.closest("[data-como]")) return abrirComoFunciona();
  const gt = t.closest("[data-goto]");
  if (gt) { closeModal(); return go(S.pres.slug, gt.dataset.goto); }
  const stp = t.closest(".step[data-step]");
  if (stp && !stp.disabled) return go(S.pres.slug, STEPS[+stp.dataset.step].key);

  const uf = t.closest(".uf[data-uf]");
  if (uf) return escolherUF(uf.dataset.uf);

  const vote = t.closest(".vote");
  if (vote) {
    const card = vote.closest(".prop");
    const i = card.dataset.i;
    const v = +vote.dataset.v;
    const mapa = (S.votos[S.pres.slug] ||= {});
    mapa[i] = mapa[i] === v ? 0 : v;
    sessionStorage.setItem("vc:votos", JSON.stringify(S.votos));
    card.classList.toggle("liked", mapa[i] === 1);
    card.classList.toggle("disliked", mapa[i] === -1);
    $$(".vote", card).forEach((b) => b.setAttribute("aria-pressed", +b.dataset.v === mapa[i]));
    if (mapa[i]) { card.classList.remove("pop"); void card.offsetWidth; card.classList.add("pop"); }
    return;
  }

  const acc = t.closest(".acc-btn");
  if (acc) {
    const open = acc.getAttribute("aria-expanded") === "true";
    acc.setAttribute("aria-expanded", !open);
    acc.parentElement.classList.toggle("open", !open);
    return;
  }

  const gtog = t.closest(".gov-toggle");
  if (gtog) return abrirGovernador(gtog.closest(".gov"));

  const tab = t.closest(".tab[data-tab]");
  if (tab) {
    const box = tab.closest(".gov-more");
    $$(".tab", box).forEach((b) => b.classList.toggle("on", b === tab));
    $$(".panel", box).forEach((p) => (p.hidden = p.dataset.panel !== tab.dataset.tab));
    return;
  }

  const och = t.closest(".ochip[data-ordem]");
  if (och) {
    S.ordem = och.dataset.ordem;
    sessionStorage.setItem("vc:ordem", S.ordem);
    const root = $("#list-root");
    const st = STEPS[S.step];
    if (root?._dados) {
      root._dados = comAfinidade(root._dados);
      if (st.cargo === "governador") renderGovernadores(root, root._dados);
      else renderGrade(root, root._dados, st);
    }
    return;
  }

  const fchip = t.closest(".fchip");
  if (fchip) {
    const st = STEPS[S.step];
    S.filtros[st.cargo].tier = fchip.dataset.tier;
    $$(".fchip").forEach((b) => { b.classList.toggle("on", b === fchip); b.setAttribute("aria-pressed", String(b === fchip)); });
    return aplicarFiltros(st);
  }

  const cand = t.closest(".cand[data-id]");
  if (cand) return abrirMini(cand.dataset.id);

  const swap = t.closest("[data-swap]");
  if (swap) return go(swap.dataset.swap, "governador");

  if (t.closest("#btn-restart")) return go();
});

document.addEventListener("input", (e) => {
  if (e.target.id === "q") {
    const st = STEPS[S.step];
    S.filtros[st.cargo].q = e.target.value;
    clearTimeout(aplicarFiltros._t);
    aplicarFiltros._t = setTimeout(() => aplicarFiltros(st), 120);
  }
  if (e.target.id === "city-input") {
    S.cidade = e.target.value.trim();
    sessionStorage.setItem("vc:cidade", S.cidade);
    updateCapsuleLoc();
  }
});

document.addEventListener("change", (e) => {
  const st = STEPS[S.step];
  if (e.target.id === "f-partido") { S.filtros[st.cargo].partido = e.target.value; aplicarFiltros(st); }
  if (e.target.id === "f-eleitos") { S.filtros[st.cargo].eleitos = e.target.checked; aplicarFiltros(st); }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && $("#modal").classList.contains("open")) return closeModal();
  if (!S.pres || $("#modal").classList.contains("open")) return;
  if (/INPUT|SELECT|TEXTAREA/.test(document.activeElement?.tagName)) return;
  if (e.key === "ArrowRight") nextStep();
  if (e.key === "ArrowLeft") prevStep();
});

// Gesto de arrastar (mobile) nas etapas de conteúdo
(() => {
  let x0 = null, y0 = null;
  const stage = $("#stage");
  stage.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  stage.addEventListener("touchend", (e) => {
    if (x0 == null || STEPS[S.step].cargo || STEPS[S.step].key === "local") return (x0 = null);
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    x0 = null;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.6) (dx < 0 ? nextStep : prevStep)();
  }, { passive: true });
})();

$("#btn-next").addEventListener("click", nextStep);
$("#btn-prev").addEventListener("click", prevStep);
$("#btn-home").addEventListener("click", () => go());
$("#btn-trocar").addEventListener("click", () => go());
$("#btn-como").addEventListener("click", abrirComoFunciona);
window.addEventListener("hashchange", route);
window.addEventListener("scroll", () => $("#topbar").classList.toggle("scrolled", scrollY > 8), { passive: true });

carregarPresidentes().finally(route);
