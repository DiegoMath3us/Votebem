// Testes da função calcAfinidade (js/data.js) com o executor nativo do Node.
// Uso: node --test tests/
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const ctx = { location: { protocol: "file:", port: "" }, console };
vm.createContext(ctx);
vm.runInContext(readFileSync(new URL("../js/data.js", import.meta.url), "utf8") +
  "\n;globalThis.__t = { calcAfinidade, PARTIDOS, AFINIDADE, normSigla };", ctx);
const { calcAfinidade, PARTIDOS, AFINIDADE, normSigla } = ctx.__t;

test("mesmo partido vale 100", () => {
  assert.deepEqual({ ...calcAfinidade("PT", "PT") }, { valor: 100, tier: "alta", motivo: "mesmo" });
  assert.equal(calcAfinidade("PC do B", "PCdoB").valor, 100);
});

test("fórmula: PT (2,68) x PDT (3,86) = 87, alta", () => {
  const r = calcAfinidade("PDT", "PT");
  assert.equal(r.valor, Math.round((1 - 0.118 / 0.9) * 100));
  assert.equal(r.valor, 87);
  assert.equal(r.tier, "alta");
});

test("faixas nos cortes 75 e 50", () => {
  // PT x Cidadania: |6,17 - 2,68| = 3,49 -> 1 - 0,349/0,9 = 0,612 -> 61, moderada
  assert.equal(calcAfinidade("CIDADANIA", "PT").valor, 61);
  assert.equal(calcAfinidade("CIDADANIA", "PT").tier, "moderada");
  // PT x PL: |8,80 - 2,68| = 6,12 -> 1 - 0,612/0,9 = 0,32 -> 32, baixa
  assert.equal(calcAfinidade("PL", "PT").valor, 32);
  assert.equal(calcAfinidade("PL", "PT").tier, "baixa");
});

test("coligação tem piso de 85", () => {
  const r = calcAfinidade("CIDADANIA", "PT", ["PT", "CIDADANIA"]);
  assert.equal(r.valor, AFINIDADE.pisoColigacao);
  assert.equal(r.motivo, "coligacao");
});

test("os 30 partidos têm posição; só a Missão é estimada", () => {
  const siglas = Object.keys(PARTIDOS);
  assert.equal(siglas.length, 30);
  assert.ok(siglas.every((k) => typeof PARTIDOS[k].ideologia === "number"));
  assert.deepEqual(siglas.filter((k) => PARTIDOS[k].estimada), ["MISSAO"]);
  assert.equal(PARTIDOS.MISSAO.ideologia, (7.01 + 8.5) / 2);
  assert.equal(calcAfinidade("UP", "PT").valor, 88);
  assert.equal(calcAfinidade("NOVO", "MISSÃO").estimada, true);
  assert.equal(calcAfinidade("NOVO", "PL").estimada, false);
});

test("sigla desconhecida: sem valor, salvo coligação", () => {
  assert.equal(calcAfinidade("XYZ", "PT").valor, null);
  assert.equal(calcAfinidade("XYZ", "PT").tier, "sem");
  assert.equal(calcAfinidade("XYZ", "PT", ["PT", "XYZ"]).valor, 85);
});

test("simetria e intervalo 0-100", () => {
  const siglas = Object.keys(PARTIDOS);
  for (const a of siglas) for (const b of siglas) {
    const x = calcAfinidade(a, b).valor, y = calcAfinidade(b, a).valor;
    assert.equal(x, y);
    if (x != null) assert.ok(x >= 0 && x <= 100);
  }
});

test("normalização de siglas", () => {
  assert.equal(normSigla("União"), "UNIAO");
  assert.equal(normSigla("MISSÃO"), "MISSAO");
});
