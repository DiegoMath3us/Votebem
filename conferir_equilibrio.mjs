// Equilíbrio do conteúdo por presidenciável (artigo, Tabela 5): número de
// propostas, realizações e controvérsias e tipo de fonte dos links citados.
// Uso: node conferir_equilibrio.mjs
import { readFileSync } from "node:fs";
import vm from "node:vm";
const ctx = {}; vm.createContext(ctx);
vm.runInContext(readFileSync(new URL("./js/presidentes.js", import.meta.url), "utf8") + ";globalThis.P = PRESIDENTES;", ctx);
const oficial = /(\.jus\.br|\.leg\.br|\.gov\.br|\.mp\.br|\.def\.br)$/;
const tipo = (u) => { const h = new URL(u).hostname.replace(/^www\./, "");
  if (oficial.test(h)) return "oficial"; if (/wikipedia\.org$/.test(h)) return "wikipedia"; return "jornalistica"; };
const linhas = [];
for (const p of [...ctx.P].sort((a, b) => a.urna.localeCompare(b.urna, "pt-BR"))) {
  const itens = [...(p.trajetoria || []), ...(p.propostas || []), ...(p.realizacoes || []), ...(p.controversias || [])];
  const urls = new Set();
  itens.forEach((it) => [it.fonte, ...(it.fontesExtras || [])].forEach((f) => f?.url && urls.add(f.url)));
  (p.fontesExtras || []).forEach((f) => f?.url && urls.add(f.url));
  const c = { oficial: 0, jornalistica: 0, wikipedia: 0 };
  urls.forEach((u) => c[tipo(u)]++);
  const contr = p.controversias || [];
  const contrOf = contr.filter((x) => [x.fonte, ...(x.fontesExtras || [])].some((f) => f?.url && tipo(f.url) === "oficial")).length;
  linhas.push([p.urna, p.partido, (p.trajetoria || []).length, (p.propostas || []).length, (p.realizacoes || []).length, contr.length, contrOf, urls.size, c.oficial, c.jornalistica, c.wikipedia]);
}
console.log(["Presidenciável", "Partido", "Trajetória", "Propostas", "Realizações", "Controvérsias", "Contr. c/ fonte oficial", "Fontes distintas", "Oficiais", "Jornalísticas", "Wikipédia"].join(" | "));
linhas.forEach((l) => console.log(l.join(" | ")));
