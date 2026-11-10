"""
Testes automatizados do servidor (python -m unittest discover -s tests).

Cobrem: normalização de siglas (norm_sigla), leitura da coligação
(parse_coligacao), filtro de situação (ativo, RN01) e as respostas da API em
modo offline, com o cache do artigo (16/09 e 22/10/2026) (RF01, RF17, RN03).
Não fazem acesso à rede.
"""
import os
import sys
import unittest
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
os.environ["VOTOCLARO_OFFLINE"] = "1"
sys.path.insert(0, str(RAIZ))

import server  # noqa: E402


class NormSigla(unittest.TestCase):
    def test_acentos_espacos(self):
        self.assertEqual(server.norm_sigla("PC do B"), "PCDOB")
        self.assertEqual(server.norm_sigla("MISSÃO"), "MISSAO")
        self.assertEqual(server.norm_sigla("União"), "UNIAO")

    def test_vazio(self):
        self.assertEqual(server.norm_sigla(""), "")
        self.assertEqual(server.norm_sigla(None), "")


class Coligacao(unittest.TestCase):
    def test_federacao_e_partidos_soltos(self):
        comp = "PSB / PDT / FEDERAÇÃO BRASIL DA ESPERANÇA - FE BRASIL(13-PT/65-PC do B/43-PV)"
        self.assertEqual(server.parse_coligacao(comp, "PT"), ["PCDOB", "PDT", "PSB", "PT", "PV"])

    def test_sem_coligacao(self):
        self.assertEqual(server.parse_coligacao("", "NOVO"), ["NOVO"])
        self.assertEqual(server.parse_coligacao("**", "DC"), ["DC"])


class FiltroSituacao(unittest.TestCase):
    def test_retira(self):
        for sit in ("Renúncia", "Cancelado", "Falecido", "Cassado", "Não conhecimento do pedido"):
            self.assertFalse(server.ativo({"situacao": sit}), sit)

    def test_mantem(self):
        for sit in ("Deferido", "Indeferido", "Indeferido com recurso", "Aguardando julgamento"):
            self.assertTrue(server.ativo({"situacao": sit}), sit)


class ApiOffline(unittest.TestCase):
    def test_presidentes(self):
        r = server.presidentes()
        self.assertEqual(r["total"], 13)
        self.assertTrue(r["consultado_em"].startswith("2026-10-22"))
        self.assertNotIn("LEONARDO AVALANCHE", [c["urna"] for c in r["dados"]])

    def test_lista_com_data_de_consulta(self):
        r = server.eleicao("SP", "dep-federal")
        self.assertGreater(r["total"], 0)
        self.assertTrue(r["consultado_em"].startswith("2026-10-22"))
        nomes = [c["urna"] for c in r["dados"]]
        self.assertEqual(nomes, sorted(nomes))

    def test_data_de_consulta_por_lista(self):
        """Cada lista informa a própria data: BA (governador) foi consultada em 16/09/2026."""
        self.assertTrue(server.eleicao("BA", "governador")["consultado_em"].startswith("2026-09-16"))

    def test_uf_sem_cache(self):
        r = server.eleicao("MG", "dep-federal")
        self.assertEqual(r["total"], 0)
        self.assertIsNone(r["consultado_em"])
        # A resposta avisa que não há consulta gravada e lista as UFs que têm dados.
        self.assertTrue(r["sem_cache"])
        self.assertEqual(server.eleicao("GO", "senador")["ufs_com_dados"], ["BA", "SP"])
        self.assertNotIn("sem_cache", server.eleicao("SP", "senador"))

    def test_entradas_invalidas(self):
        self.assertEqual(server.eleicao("XX", "governador").status_code, 400)
        self.assertEqual(server.eleicao("SP", "prefeito").status_code, 400)

    def test_corpus_filtro(self):
        """Tabela 1 do artigo: 4.690 registros, 142 retirados, 4.548 exibidos."""
        import json
        cache = RAIZ / "backend" / "data" / "cache" / "tse_api"
        total = retirados = 0
        for f in cache.glob("tse_2026_*_*.json"):
            for c in json.loads(f.read_text(encoding="utf-8"))["data"]:
                total += 1
                sit = (c.get("descricaoSituacao") or "").lower()
                retirados += any(x in sit for x in server.SITUACOES_EXCLUIDAS)
        self.assertEqual((total, retirados, total - retirados), (4690, 142, 4548))


if __name__ == "__main__":
    unittest.main()
