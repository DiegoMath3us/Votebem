/**
 * VotoClaro — Conteúdo dos candidatos à Presidência (Eleições 2026)
 * ------------------------------------------------------------------
 * Versão 6 (31/10/2026). Perfis das 13 candidaturas com registro ativo no TSE,
 * levantados em fontes oficiais (TSE, tribunais, MP, PF, CGU) e jornalísticas.
 * Cada item de trajetória, proposta, realização e controvérsia tem "fonte"
 * ({nome, url}) e, quando houver, "fontesExtras".
 *
 * Critério das controvérsias (RN04), igual para todos: o caso só entra se houver
 * registro em órgão oficial ou em veículo jornalístico de grande circulação, com
 * link; o texto informa a situação atual e a versão do candidato, quando existe.
 *
 * Campos:
 *  - tse_id:   sequencial do candidato no DivulgaCandContas (fotos/status)
 *  - wiki:     título do artigo na Wikipédia em português (foto) ou null
 *  - controversias[].status: anulado | revertido | arquivado | andamento | negado | multa | info
 */

/** Data do levantamento do conteúdo editorial (RN03: fonte e data de consulta). */
const CONTEUDO_LEVANTADO_EM = "31/10/2026";

const PRESIDENTES = [
  {
    "slug": "lula",
    "tse_id": "280002542548",
    "numero": 13,
    "urna": "Lula",
    "nome": "Luiz Inácio Lula da Silva",
    "partido": "PT",
    "partidoNome": "Partido dos Trabalhadores",
    "cor": "#ef4444",
    "wiki": "Luiz_Inácio_Lula_da_Silva",
    "frase": "Ex-metalúrgico, fundador do PT e eleito presidente quatro vezes.",
    "resumo": "Nascido no agreste pernambucano, migrou para São Paulo ainda criança e tornou-se torneiro mecânico. Ganhou projeção nacional como líder sindical no ABC paulista no fim dos anos 1970, ajudou a fundar o PT e chegou à Presidência em 2002, após três derrotas. Em 2022, voltou a ser eleito, tornando-se o primeiro presidente brasileiro com três mandatos. Em 2026, foi reeleito no 2º turno contra Flávio Bolsonaro, com 51,79% dos votos válidos.",
    "trajetoria": [
      {
        "ano": "1945",
        "texto": "Nasce em Caetés (então distrito de Garanhuns), Pernambuco.",
        "fonte": {
          "nome": "InfoMoney — Lula: conheça a história do ex-presidente que ganhou as eleições e retorna para o terceiro mandato",
          "url": "https://www.infomoney.com.br/?p=1751719"
        }
      },
      {
        "ano": "1975",
        "texto": "Assume a presidência do Sindicato dos Metalúrgicos de São Bernardo do Campo e Diadema.",
        "fonte": {
          "nome": "InfoMoney — Lula: conheça a história do ex-presidente que ganhou as eleições e retorna para o terceiro mandato",
          "url": "https://www.infomoney.com.br/?p=1751719"
        }
      },
      {
        "ano": "1980",
        "texto": "Participa da fundação do Partido dos Trabalhadores (PT).",
        "fonte": {
          "nome": "InfoMoney — Lula: conheça a história do ex-presidente que ganhou as eleições e retorna para o terceiro mandato",
          "url": "https://www.infomoney.com.br/?p=1751719"
        }
      },
      {
        "ano": "1986",
        "texto": "Eleito deputado federal constituinte, o mais votado do país.",
        "fonte": {
          "nome": "InfoMoney — Lula: conheça a história do ex-presidente que ganhou as eleições e retorna para o terceiro mandato",
          "url": "https://www.infomoney.com.br/?p=1751719"
        }
      },
      {
        "ano": "2002",
        "texto": "Eleito presidente da República; reeleito em 2006.",
        "fonte": {
          "nome": "InfoMoney — Lula: conheça a história do ex-presidente que ganhou as eleições e retorna para o terceiro mandato",
          "url": "https://www.infomoney.com.br/?p=1751719"
        }
      },
      {
        "ano": "2018",
        "texto": "Preso após condenação na Lava Jato e impedido de concorrer.",
        "fonte": {
          "nome": "Migalhas — TSE indefere registro de candidatura de Lula (31/08/2018)",
          "url": "https://www.migalhas.com.br/quentes/286709/tse-indefere-registro-de-candidatura-de-lula"
        },
        "fontesExtras": [
          {
            "nome": "InfoMoney — Lula: conheça a história do ex-presidente que ganhou as eleições e retorna para o terceiro mandato",
            "url": "https://www.infomoney.com.br/?p=1751719"
          }
        ]
      },
      {
        "ano": "2021",
        "texto": "STF anula as condenações e recupera seus direitos políticos.",
        "fonte": {
          "nome": "InfoMoney — Lula: conheça a história do ex-presidente que ganhou as eleições e retorna para o terceiro mandato",
          "url": "https://www.infomoney.com.br/?p=1751719"
        },
        "fontesExtras": [
          {
            "nome": "Metrópoles — Por 7 votos a 4, STF declara Moro parcial em caso de Lula (23/06/2021)",
            "url": "https://www.metropoles.com/brasil/justica/por-7-votos-a-4-stf-declara-moro-parcial-em-caso-de-lula"
          }
        ]
      },
      {
        "ano": "2022",
        "texto": "Eleito para o terceiro mandato presidencial (2023–2026).",
        "fonte": {
          "nome": "InfoMoney — Lula: conheça a história do ex-presidente que ganhou as eleições e retorna para o terceiro mandato",
          "url": "https://www.infomoney.com.br/?p=1751719"
        }
      },
      {
        "ano": "2026",
        "texto": "Reeleito no 2º turno, contra Flávio Bolsonaro, para o mandato 2027–2030.",
        "fonte": {
          "nome": "Brasil 61 — Lula é reeleito presidente (25/10/2026)",
          "url": "https://brasil61.com/n/lula-e-reeleito-presidente-com-vantagem-no-nordeste-flavio-liderou-no-sul-e-centro-oeste-bras2617371"
        }
      }
    ],
    "crencas": {
      "espectro": "Centro-esquerda",
      "texto": "Defende um Estado ativo na economia e na redução das desigualdades, com programas de transferência de renda, valorização do salário mínimo, investimento público em infraestrutura e políticas ambientais e de inclusão social.",
      "tags": [
        "Programas sociais",
        "Estado indutor",
        "Salário mínimo",
        "Meio ambiente",
        "Direitos trabalhistas"
      ]
    },
    "propostas": [
      {
        "icone": "🤝",
        "titulo": "Programas sociais",
        "texto": "Ampliar o Bolsa Família e fortalecer o Pé-de-Meia e a Farmácia Popular.",
        "fonte": {
          "nome": "Estadão, via Diário do Grande ABC — Documentadas no TSE, as propostas dos postulantes ao Palácio do Planalto (04/10/2026)",
          "url": "https://www.dgabc.com.br/Noticia/4350716/documentadas-no-tse-as-propostas-dos-postulantes-ao-palacio-do-planalto"
        },
        "fontesExtras": [
          {
            "nome": "TSE — Lula: propostas de governo (índice temático do plano registrado)",
            "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/lula-propostas-de-governo"
          },
          {
            "nome": "Congresso em Foco — O que Lula promete fazer se for reeleito presidente",
            "url": "https://www.congressoemfoco.com.br/noticia/123519/o-que-lula-promete-fazer-se-for-reeleito-presidente"
          }
        ]
      },
      {
        "icone": "⏱️",
        "titulo": "Jornada de trabalho",
        "texto": "Propôs o fim da escala 6x1 e a redução da jornada para 40 horas semanais, sem corte de salário. A emenda constitucional sobre o tema foi promulgada pelo Congresso em 16/10/2026, com implantação gradual.",
        "fonte": {
          "nome": "Estadão, via Diário do Grande ABC — Documentadas no TSE, as propostas dos postulantes ao Palácio do Planalto (04/10/2026)",
          "url": "https://www.dgabc.com.br/Noticia/4350716/documentadas-no-tse-as-propostas-dos-postulantes-ao-palacio-do-planalto"
        },
        "fontesExtras": [
          {
            "nome": "Diário do Nordeste — Fim da escala 6x1 é oficializado pelo Congresso (16/10/2026)",
            "url": "https://diariodonordeste.verdesmares.com.br/pontopoder/fim-da-escala-6x1-e-oficializado-pelo-congresso-1.3799085"
          }
        ]
      },
      {
        "icone": "🏗️",
        "titulo": "Investimento público",
        "texto": "Nova etapa do PAC, combinando obras públicas, concessões e investimento privado em transportes, energia e saneamento.",
        "fonte": {
          "nome": "Congresso em Foco — O que Lula promete fazer se for reeleito presidente",
          "url": "https://www.congressoemfoco.com.br/noticia/123519/o-que-lula-promete-fazer-se-for-reeleito-presidente"
        },
        "fontesExtras": [
          {
            "nome": "TSE — Lula: propostas de governo (índice temático do plano registrado)",
            "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/lula-propostas-de-governo"
          }
        ]
      },
      {
        "icone": "🏭",
        "titulo": "Indústria e transição energética",
        "texto": "Política de neoindustrialização e incentivo a energia limpa e combustíveis verdes.",
        "fonte": {
          "nome": "Congresso em Foco — O que Lula promete fazer se for reeleito presidente",
          "url": "https://www.congressoemfoco.com.br/noticia/123519/o-que-lula-promete-fazer-se-for-reeleito-presidente"
        },
        "fontesExtras": [
          {
            "nome": "TSE — Lula: propostas de governo (índice temático do plano registrado)",
            "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/lula-propostas-de-governo"
          }
        ]
      },
      {
        "icone": "🌳",
        "titulo": "Amazônia",
        "texto": "Meta de desmatamento líquido zero na Amazônia até 2030.",
        "fonte": {
          "nome": "SBT News — Meio ambiente e energia: veja propostas de Lula na íntegra",
          "url": "https://sbtnews.sbt.com.br/noticia/eleicoes/meio-ambiente-e-energia-veja-propostas-de-lula-na-integra"
        }
      },
      {
        "icone": "🛡️",
        "titulo": "Segurança pública",
        "texto": "Ampliar a integração das polícias e criar o Ministério da Segurança Pública após a aprovação da PEC da Segurança.",
        "fonte": {
          "nome": "Congresso em Foco — O que Lula promete fazer se for reeleito presidente",
          "url": "https://www.congressoemfoco.com.br/noticia/123519/o-que-lula-promete-fazer-se-for-reeleito-presidente"
        },
        "fontesExtras": [
          {
            "nome": "TSE — Lula: propostas de governo (índice temático do plano registrado)",
            "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/lula-propostas-de-governo"
          }
        ]
      }
    ],
    "realizacoes": [
      {
        "ano": "2003",
        "titulo": "Bolsa Família",
        "texto": "Unificou programas de transferência de renda em um só programa nacional.",
        "fonte": {
          "nome": "Câmara dos Deputados — Medida Provisória 132, de 20/10/2003 (cria o Bolsa Família)",
          "url": "https://www2.camara.leg.br/legin/fed/medpro/2003/medidaprovisoria-132-20-outubro-2003-497302-norma-pe.html"
        },
        "fontesExtras": [
          {
            "nome": "Câmara dos Deputados — Lei 10.836/2004 (art. 1º, parágrafo único: unificação do Bolsa Escola, Bolsa Alimentação, Auxílio-Gás e PNAA)",
            "url": "https://www2.camara.leg.br/legin/fed/lei/2004/lei-10836-9-janeiro-2004-490604-normaatualizada-pl.html"
          }
        ]
      },
      {
        "ano": "2004",
        "titulo": "ProUni",
        "texto": "Bolsas em universidades privadas para estudantes de baixa renda.",
        "fonte": {
          "nome": "Correio Braziliense — O que é o ProUni, citado pelo presidenciável no podcast (2022)",
          "url": "https://www.correiobraziliense.com.br/politica/2022/10/5045359-lula-no-flow-o-que-e-o-prouni-citado-pelo-presidenciavel-no-podcast.html"
        }
      },
      {
        "ano": "2007",
        "titulo": "PAC",
        "texto": "Programa de Aceleração do Crescimento, com obras de infraestrutura.",
        "fonte": {
          "nome": "InfoMoney — Lula: conheça a história do ex-presidente que ganhou as eleições e retorna para o terceiro mandato",
          "url": "https://www.infomoney.com.br/?p=1751719"
        }
      },
      {
        "ano": "2009",
        "titulo": "Minha Casa, Minha Vida",
        "texto": "Programa habitacional para famílias de baixa e média renda.",
        "fonte": {
          "nome": "InfoMoney — Lula: conheça a história do ex-presidente que ganhou as eleições e retorna para o terceiro mandato",
          "url": "https://www.infomoney.com.br/?p=1751719"
        }
      },
      {
        "ano": "2023",
        "titulo": "Reforma tributária e arcabouço fiscal",
        "texto": "Aprovação da EC 132/2023 (tributos sobre consumo) e da nova regra fiscal (LC 200/2023).",
        "fonte": {
          "nome": "Agência Brasil, via Diário do Nordeste — Congresso promulga emenda constitucional da reforma tributária (20/12/2023)",
          "url": "https://diariodonordeste.verdesmares.com.br/pontopoder/congresso-promulga-emenda-constitucional-da-reforma-tributaria-1.3458198"
        },
        "fontesExtras": [
          {
            "nome": "Agência Gov — Presidente Lula sanciona a lei do novo arcabouço fiscal (31/08/2023)",
            "url": "https://agenciagov.ebc.com.br/noticias/202308/presidente-lula-sanciona-a-lei-do-novo-arcabouco-fiscal"
          }
        ]
      },
      {
        "ano": "2025",
        "titulo": "Isenção do IR até R$ 5 mil",
        "texto": "Lei aprovada pelo Congresso isentando do Imposto de Renda quem ganha até R$ 5 mil por mês, a partir de 2026.",
        "fonte": {
          "nome": "Exame — Lula sanciona isenção do Imposto de Renda para salários de até R$ 5 mil (26/11/2025)",
          "url": "https://exame.com/brasil/lula-sanciona-isencao-do-imposto-de-renda-para-salarios-de-ate-r-5-mil"
        }
      }
    ],
    "controversias": [
      {
        "titulo": "Mensalão",
        "ano": "2005",
        "status": "info",
        "statusLabel": "Não foi réu",
        "texto": "Esquema de pagamentos a parlamentares em troca de apoio no Congresso durante o 1º mandato. O STF condenou dirigentes do PT e aliados em 2012 (AP 470). Lula não foi denunciado, e o STF recusou pedido de defesa de um réu para incluí-lo no processo, por ser atribuição exclusiva da Procuradoria-Geral da República.",
        "fonte": {
          "nome": "Congresso em Foco — STF rejeita novamente inclusão de Lula no mensalão (15/08/2012)",
          "url": "https://www.congressoemfoco.com.br/noticia/59918/stf-rejeita-novamente-inclusao-de-lula-no-mensalao"
        }
      },
      {
        "titulo": "Lava Jato — caso do tríplex",
        "ano": "2017–2021",
        "status": "anulado",
        "statusLabel": "Condenações anuladas",
        "texto": "Condenado por corrupção passiva e lavagem de dinheiro, ficou preso por 580 dias (2018–2019). Em 2021, o STF anulou as condenações por incompetência da Justiça Federal de Curitiba e declarou a suspeição do ex-juiz Sergio Moro.",
        "fonte": {
          "nome": "Metrópoles — Por 7 votos a 4, STF declara Moro parcial em caso de Lula (23/06/2021)",
          "url": "https://www.metropoles.com/brasil/justica/por-7-votos-a-4-stf-declara-moro-parcial-em-caso-de-lula"
        },
        "fontesExtras": [
          {
            "nome": "InfoMoney — Lula: conheça a história do ex-presidente que ganhou as eleições e retorna para o terceiro mandato",
            "url": "https://www.infomoney.com.br/?p=1751719"
          }
        ]
      },
      {
        "titulo": "Descontos indevidos no INSS",
        "ano": "2025–2026",
        "status": "andamento",
        "statusLabel": "Investigação em andamento",
        "texto": "A Operação Sem Desconto, da PF e da CGU (abril de 2025), revelou descontos associativos não autorizados em aposentadorias e pensões, ocorridos principalmente entre 2019 e 2024. O presidente do INSS foi demitido e o ministro da Previdência, Carlos Lupi, deixou o cargo. Até dezembro de 2025, o INSS informou ter devolvido R$ 2,74 bilhões a cerca de 3,9 milhões de beneficiários. A CPMI do INSS terminou em março de 2026 sem relatório final aprovado; as apurações seguem em outras instâncias.",
        "fonte": {
          "nome": "BBC News Brasil, via O Povo — O que se sabe sobre fraude no INSS que levou Lula a demitir presidente do órgão (03/05/2025)",
          "url": "https://www.opovo.com.br/agencia/bbc/2025/05/03/o-que-se-sabe-sobre-fraude-no-inss-que-levou-lula-a-demitir-presidente-do-orgao.html"
        },
        "fontesExtras": [
          {
            "nome": "Diário do Comércio — Ressarcimento dos descontos do INSS chega a R$ 2,74 bilhões (15/12/2025)",
            "url": "https://diariodocomercio.com.br/legislacao/ressarcimento-descontos-inss-chega-r-274-bilhoes/"
          },
          {
            "nome": "Agência Brasil — CPMI do INSS termina sem relatório final (28/03/2026)",
            "url": "https://agenciabrasil.ebc.com.br/politica/noticia/2026-03/cpmi-do-inss-termina-sem-relatorio-final/"
          },
          {
            "nome": "CNN Brasil — Lupi se defende após deixar ministério",
            "url": "https://www.cnnbrasil.com.br/politica/lupi-declaracao-demissao-lula/"
          }
        ]
      },
      {
        "titulo": "Multa por propaganda eleitoral antecipada",
        "ano": "2026",
        "status": "multa",
        "statusLabel": "Multa aplicada (cabe recurso)",
        "texto": "Em julho de 2026, o TRE-SP multou Lula em R$ 15 mil por propaganda antecipada, ao entender que ele pediu votos explicitamente para as pré-candidatas ao Senado Simone Tebet e Marina Silva em evento realizado em maio. A ação foi movida pelo partido Missão; cabia recurso ao TSE.",
        "fonte": {
          "nome": "Itatiaia — Lula é multado em R$ 15 mil por propaganda eleitoral antecipada (29/07/2026)",
          "url": "https://www.itatiaia.com.br/politica/eleicoes/lula-e-multado-em-r-15-mil-por-propaganda-eleitoral-antecipada/"
        }
      }
    ]
  },
  {
    "slug": "flavio-bolsonaro",
    "tse_id": "280002551544",
    "numero": 22,
    "urna": "Flávio Bolsonaro",
    "nome": "Flávio Nantes Bolsonaro",
    "partido": "PL",
    "partidoNome": "Partido Liberal",
    "cor": "#3b82f6",
    "wiki": "Flávio_Bolsonaro",
    "frase": "Senador pelo Rio de Janeiro e filho mais velho de Jair Bolsonaro.",
    "resumo": "Advogado, foi deputado estadual no Rio de Janeiro por quatro mandatos seguidos e é senador pelo estado desde 2019. Com o pai, Jair Bolsonaro, inelegível, tornou-se o candidato do PL à Presidência em 2026, com o apoio da família e da base bolsonarista. Foi o candidato do PL à Presidência em 2026 e perdeu o 2º turno para Lula, com 48,21% dos votos válidos.",
    "trajetoria": [
      {
        "ano": "1981",
        "texto": "Nasce em Resende, no estado do Rio de Janeiro.",
        "fonte": {
          "nome": "Itatiaia — Conheça a carreira política de Flávio Bolsonaro, pré-candidato à Presidência",
          "url": "https://www.itatiaia.com.br/politica/eleicoes/conheca-a-carreira-politica-de-flavio-bolsonaro-pre-candidato-a-presidencia/"
        },
        "fontesExtras": [
          {
            "nome": "Correio (BA) — Derrotado, Flávio Bolsonaro ficará sem cargo e sem foro privilegiado em 2027 (26/10/2026)",
            "url": "https://www.correio24horas.com.br/eleicoes/derrotado-flavio-bolsonaro-ficara-sem-cargo-e-sem-foro-privilegiado-em-2027-1026"
          }
        ]
      },
      {
        "ano": "2002",
        "texto": "Eleito deputado estadual no Rio de Janeiro; reeleito em 2006, 2010 e 2014.",
        "fonte": {
          "nome": "Correio (BA) — Derrotado, Flávio Bolsonaro ficará sem cargo e sem foro privilegiado em 2027 (26/10/2026)",
          "url": "https://www.correio24horas.com.br/eleicoes/derrotado-flavio-bolsonaro-ficara-sem-cargo-e-sem-foro-privilegiado-em-2027-1026"
        },
        "fontesExtras": [
          {
            "nome": "Itatiaia — Conheça a carreira política de Flávio Bolsonaro, pré-candidato à Presidência",
            "url": "https://www.itatiaia.com.br/politica/eleicoes/conheca-a-carreira-politica-de-flavio-bolsonaro-pre-candidato-a-presidencia/"
          }
        ]
      },
      {
        "ano": "2016",
        "texto": "Disputa a Prefeitura do Rio pelo PSC e fica em 4º lugar no 1º turno, com cerca de 424 mil votos.",
        "fonte": {
          "nome": "Itatiaia — Conheça a carreira política de Flávio Bolsonaro, pré-candidato à Presidência",
          "url": "https://www.itatiaia.com.br/politica/eleicoes/conheca-a-carreira-politica-de-flavio-bolsonaro-pre-candidato-a-presidencia/"
        },
        "fontesExtras": [
          {
            "nome": "Gazeta do Povo — Com derrota do PMDB, Crivella e Freixo vão para o 2º turno no Rio (2016)",
            "url": "https://www.gazetadopovo.com.br/vida-publica/eleicoes/2016/com-derrota-do-pmdb-crivella-e-freixo-vao-para-o-2-turno-no-rio-8cwy19ykz59hv6q1o69jysr4k"
          }
        ]
      },
      {
        "ano": "2018",
        "texto": "Eleito senador pelo Rio de Janeiro (mandato 2019–2027).",
        "fonte": {
          "nome": "Itatiaia — Conheça a carreira política de Flávio Bolsonaro, pré-candidato à Presidência",
          "url": "https://www.itatiaia.com.br/politica/eleicoes/conheca-a-carreira-politica-de-flavio-bolsonaro-pre-candidato-a-presidencia/"
        },
        "fontesExtras": [
          {
            "nome": "Correio (BA) — Derrotado, Flávio Bolsonaro ficará sem cargo e sem foro privilegiado em 2027 (26/10/2026)",
            "url": "https://www.correio24horas.com.br/eleicoes/derrotado-flavio-bolsonaro-ficara-sem-cargo-e-sem-foro-privilegiado-em-2027-1026"
          }
        ]
      },
      {
        "ano": "2026",
        "texto": "Lançado candidato do PL à Presidência da República em convenção nacional, em São Paulo, em julho.",
        "fonte": {
          "nome": "Jornal do Brasil — PL oficializa Flávio Bolsonaro candidato à Presidência em 2026 (25/07/2026)",
          "url": "https://www.jb.com.br/brasil/politica/2026/07/1060401-pl-oficializa-flavio-bolsonaro-candidato-a-presidencia-em-2026.html"
        }
      },
      {
        "ano": "2026",
        "texto": "Vence o 1º turno com 47,03% dos votos válidos e perde o 2º turno para Lula.",
        "fonte": {
          "nome": "Brasil 61 — Lula é reeleito presidente (25/10/2026)",
          "url": "https://brasil61.com/n/lula-e-reeleito-presidente-com-vantagem-no-nordeste-flavio-liderou-no-sul-e-centro-oeste-bras2617371"
        }
      }
    ],
    "crencas": {
      "espectro": "Direita",
      "texto": "Defende pauta conservadora nos costumes, endurecimento no combate ao crime, ampliação do acesso a armas para cidadãos e redução do papel do Estado na economia.",
      "tags": [
        "Segurança pública",
        "Armas",
        "Família tradicional",
        "Liberdade econômica",
        "Agronegócio"
      ]
    },
    "propostas": [
      {
        "icone": "🚔",
        "titulo": "Combate ao crime",
        "texto": "Endurecimento penal, com redução da maioridade penal e fim da progressão de regime para crimes hediondos, e classificação de facções como PCC e Comando Vermelho como organizações narcoterroristas.",
        "fonte": {
          "nome": "Congresso em Foco — O que Flávio Bolsonaro promete fazer se for eleito presidente",
          "url": "https://www.congressoemfoco.com.br/noticia/123522/o-que-flavio-bolsonaro-promete-fazer-se-for-eleito-presidente"
        },
        "fontesExtras": [
          {
            "nome": "Estadão, via Diário do Grande ABC — Documentadas no TSE, as propostas dos postulantes ao Palácio do Planalto (04/10/2026)",
            "url": "https://www.dgabc.com.br/Noticia/4350716/documentadas-no-tse-as-propostas-dos-postulantes-ao-palacio-do-planalto"
          }
        ]
      },
      {
        "icone": "⚖️",
        "titulo": "Anistia",
        "texto": "Defende anistia aos condenados pelos atos de 8 de janeiro de 2023.",
        "fonte": {
          "nome": "InfoMoney — Flávio diz que não apenas Bolsonaro, mas todos perseguidos subirão rampa do Planalto (11/04/2026)",
          "url": "https://www.infomoney.com.br/?p=3289129"
        }
      },
      {
        "icone": "💰",
        "titulo": "Menos impostos",
        "texto": "Corte de impostos e revisão da reforma tributária para reduzir a alíquota do IVA, redução de ministérios e cargos e retomada das privatizações.",
        "fonte": {
          "nome": "Congresso em Foco — O que Flávio Bolsonaro promete fazer se for eleito presidente",
          "url": "https://www.congressoemfoco.com.br/noticia/123522/o-que-flavio-bolsonaro-promete-fazer-se-for-eleito-presidente"
        },
        "fontesExtras": [
          {
            "nome": "Estadão, via Diário do Grande ABC — Documentadas no TSE, as propostas dos postulantes ao Palácio do Planalto (04/10/2026)",
            "url": "https://www.dgabc.com.br/Noticia/4350716/documentadas-no-tse-as-propostas-dos-postulantes-ao-palacio-do-planalto"
          }
        ]
      },
      {
        "icone": "🎯",
        "titulo": "Armas",
        "texto": "Defende rever o Estatuto do Desarmamento e as regras de legítima defesa, criticando as restrições atuais ao porte de armas.",
        "fonte": {
          "nome": "Congresso em Foco — Pollon comandará política de armas em eventual governo de Flávio (23/10/2026)",
          "url": "https://www.congressoemfoco.com.br/noticia/123556/pollon-comandara-politica-de-armas-em-eventual-governo-de-flavio"
        },
        "fontesExtras": [
          {
            "nome": "SBT News — Flávio defende mudanças no Estatuto do Desarmamento",
            "url": "https://sbtnews.sbt.com.br/noticia/eleicoes/flavio-defende-mudancas-no-estatuto-do-desarmamento"
          }
        ]
      },
      {
        "icone": "👨‍👩‍👧",
        "titulo": "Costumes",
        "texto": "Promete indicar ao STF ministros contrários ao aborto e à legalização das drogas.",
        "fonte": {
          "nome": "Agora RN — Flávio diz que indicará ministros do STF contra aborto e drogas (16/08/2026)",
          "url": "https://agorarn.com.br/politica/flavio-ministros-stf-aborto-drogas/"
        }
      },
      {
        "icone": "🌾",
        "titulo": "Agro",
        "texto": "Segurança jurídica no campo e defesa do marco temporal para terras indígenas.",
        "fonte": {
          "nome": "InfoMoney — Flávio acena ao agro, defende marco temporal e exploração em terras indígenas (2026)",
          "url": "https://www.infomoney.com.br/politica/flavio-acena-ao-agro-defende-marco-temporal-e-exploracao-em-terras-indigenas/"
        }
      }
    ],
    "realizacoes": [
      {
        "ano": "2003–2019",
        "titulo": "Deputado estadual (RJ)",
        "texto": "Quatro mandatos na Assembleia Legislativa do Rio de Janeiro.",
        "fonte": {
          "nome": "Correio (BA) — Derrotado, Flávio Bolsonaro ficará sem cargo e sem foro privilegiado em 2027 (26/10/2026)",
          "url": "https://www.correio24horas.com.br/eleicoes/derrotado-flavio-bolsonaro-ficara-sem-cargo-e-sem-foro-privilegiado-em-2027-1026"
        }
      },
      {
        "ano": "2019–2027",
        "titulo": "Senador da República",
        "texto": "Senador pelo Rio de Janeiro desde 2019, com mandato até fevereiro de 2027. A lista completa de projetos está no portal do Senado.",
        "fonte": {
          "nome": "Correio (BA) — Derrotado, Flávio Bolsonaro ficará sem cargo e sem foro privilegiado em 2027 (26/10/2026)",
          "url": "https://www.correio24horas.com.br/eleicoes/derrotado-flavio-bolsonaro-ficara-sem-cargo-e-sem-foro-privilegiado-em-2027-1026"
        },
        "fontesExtras": [
          {
            "nome": "Itatiaia — Conheça a carreira política de Flávio Bolsonaro, pré-candidato à Presidência",
            "url": "https://www.itatiaia.com.br/politica/eleicoes/conheca-a-carreira-politica-de-flavio-bolsonaro-pre-candidato-a-presidencia/"
          }
        ]
      }
    ],
    "realizacoesNota": "Não exerceu cargo no Executivo. Projetos de autoria podem ser consultados no portal do Senado Federal.",
    "controversias": [
      {
        "titulo": "Caso das “rachadinhas” (Caso Queiroz)",
        "ano": "2018–2022",
        "status": "arquivado",
        "statusLabel": "Denúncia arquivada",
        "texto": "Investigado por suposto desvio de salários de assessores em seu gabinete na Alerj, foi denunciado pelo MP-RJ em 2020. Em 2021, o STJ anulou a quebra de sigilo e as demais provas autorizadas pela primeira instância, por entender que o caso cabia ao Órgão Especial do TJ-RJ. Sem essas provas, a denúncia foi arquivada pelo Órgão Especial em maio de 2022. Ele nega irregularidades.",
        "fonte": {
          "nome": "Folhapress, via NSC Total — Tribunal do Rio arquiva denúncia contra Flávio Bolsonaro no caso das rachadinhas (16/05/2022)",
          "url": "https://www.nsctotal.com.br/?p=2445915"
        },
        "fontesExtras": [
          {
            "nome": "CNN Brasil — STJ anula decisões contra Flávio Bolsonaro no caso das rachadinhas",
            "url": "https://www.cnnbrasil.com.br/politica/stj-anula-decisoes-contra-flavio-bolsonaro-no-caso-das-rachadinhas/"
          },
          {
            "nome": "Estado de Minas — STJ anula investigação das rachadinhas (09/11/2021)",
            "url": "https://www.em.com.br/app/noticia/politica/2021/11/09/interna_politica,1321402/amp.html"
          }
        ]
      },
      {
        "titulo": "Compra de mansão em Brasília",
        "ano": "2021",
        "status": "negado",
        "statusLabel": "Nega irregularidades",
        "texto": "A compra de uma casa de R$ 5,97 milhões no Lago Sul, com financiamento de R$ 3,1 milhões do BRB (banco público do Distrito Federal), levantou questionamentos sobre a compatibilidade com sua renda declarada. O senador afirma que usou recursos próprios, sobretudo da venda de um imóvel no Rio, e que a operação foi regular.",
        "fonte": {
          "nome": "BBC News Brasil, via Correio Braziliense — Quatro perguntas sobre a nova mansão de Flávio Bolsonaro (02/03/2021)",
          "url": "https://www.correiobraziliense.com.br/politica/2021/03/4909677-quatro-perguntas-sobre-a-nova-mansao-de-flavio-bolsonaro-e-o-caso-da-rachadinha.html"
        }
      },
      {
        "titulo": "“Abin paralela”",
        "ano": "2024",
        "status": "info",
        "statusLabel": "Citado em investigação",
        "texto": "Relatório da PF divulgado em julho de 2024 apontou que a cúpula da Abin no governo Jair Bolsonaro discutiu medidas contra auditores da Receita que haviam atuado no caso das rachadinhas, com o objetivo de anular a investigação sobre o senador. Os indiciados no inquérito, concluído em 2025, foram Alexandre Ramagem e Carlos Bolsonaro. Flávio afirma ter sido vítima de acesso criminoso aos seus dados.",
        "fonte": {
          "nome": "SBT News — Ramagem sugeriu investigar auditores para proteger Flávio Bolsonaro, diz PF (11/07/2024)",
          "url": "https://sbtnews.sbt.com.br/noticia/politica/ramagem-sugeriu-investigar-auditores-para-proteger-flavio-bolsonaro-diz-pf"
        },
        "fontesExtras": [
          {
            "nome": "SBT News — Abin paralela: PF indicia Carlos e Ramagem e envia relatório ao STF (17/06/2025)",
            "url": "https://sbtnews.sbt.com.br/noticia/politica/abin-paralela-pf-indicia-bolsonaro-carlos-e-ramagem-e-envia-relatorio-ao-stf"
          }
        ]
      },
      {
        "titulo": "Caso Dark Horse / Banco Master",
        "ano": "2026",
        "status": "andamento",
        "statusLabel": "Inquérito em andamento",
        "texto": "Em maio de 2026, mensagens e áudios mostraram o senador pedindo recursos ao banqueiro Daniel Vorcaro, do Banco Master, para o filme 'Dark Horse', sobre Jair Bolsonaro. Em julho, o ministro André Mendonça, do STF, autorizou inquérito da PF, com aval da PGR, e incluiu Flávio entre os investigados; a apuração envolve suspeitas de lavagem de dinheiro, evasão de divisas e corrupção. Flávio admite ter pedido patrocínio privado e nega irregularidades.",
        "fonte": {
          "nome": "Agência Brasil, via Diário do Grande ABC — Mendonça incluiu Flávio Bolsonaro como investigado no caso Dark Horse (11/09/2026)",
          "url": "https://www.dgabc.com.br/Noticia/4346305/"
        },
        "fontesExtras": [
          {
            "nome": "Estadão, via Diário do Grande ABC — Flávio Bolsonaro conversou com Vorcaro quando investigações sobre o Master já eram públicas (13/05/2026)",
            "url": "https://www.dgabc.com.br/Noticia/4319087/flavio-bolsonaro-conversou-com-vorcaro-quando-investigacoes-sobre-o-master-ja-eram-publicas"
          },
          {
            "nome": "Agência Estado, via O Povo — André Mendonça autoriza inquérito sobre repasses para 'Dark Horse' (23/07/2026)",
            "url": "https://www.opovo.com.br/noticias/politica/2026/07/23/amp/andre-mendonca-autoriza-inquerito-sobre-repasses-para-dark-horse-filme-sobre-jair-bolsonaro.html"
          }
        ]
      }
    ]
  },
  {
    "slug": "ronaldo-caiado",
    "tse_id": "280002551932",
    "numero": 55,
    "urna": "Ronaldo Caiado",
    "nome": "Ronaldo Ramos Caiado",
    "partido": "PSD",
    "partidoNome": "Partido Social Democrático",
    "cor": "#14b8a6",
    "wiki": "Ronaldo_Caiado",
    "frase": "Médico, ex-governador de Goiás e liderança histórica do agronegócio.",
    "resumo": "Médico ortopedista, ganhou projeção nos anos 1980 à frente da União Democrática Ruralista (UDR) e disputou a Presidência já em 1989. Foi deputado federal por cinco mandatos (1991–1995 e 1999–2015), senador e governador de Goiás por dois mandatos (2019–2026). Filiou-se ao PSD em 2026 para disputar a Presidência.",
    "trajetoria": [
      {
        "ano": "1949",
        "texto": "Nasce em Anápolis, Goiás.",
        "fonte": {
          "nome": "CNN Brasil — Quem é Ronaldo Caiado, que PSD oficializa candidato em convenção hoje (26/07/2026)",
          "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-ronaldo-caiado-que-psd-oficializa-candidato-em-convencao-hoje-26/"
        }
      },
      {
        "ano": "1987",
        "texto": "Preside a União Democrática Ruralista (UDR), entidade de produtores rurais da qual foi um dos fundadores, até 1989.",
        "fonte": {
          "nome": "Congresso em Foco — Quem é Ronaldo Caiado, aposta do PSD para o Planalto em 2026",
          "url": "https://www.congressoemfoco.com.br/noticia/117684/quem-e-ronaldo-caiado-aposta-do-psd-para-o-planalto-em-2026"
        },
        "fontesExtras": [
          {
            "nome": "InfoMoney — Quem é Ronaldo Caiado: do comando da UDR à candidatura do PSD ao Planalto",
            "url": "https://www.infomoney.com.br/?p=3420912"
          }
        ]
      },
      {
        "ano": "1989",
        "texto": "Candidato à Presidência da República pela primeira vez.",
        "fonte": {
          "nome": "CNN Brasil — Quem é Ronaldo Caiado, que PSD oficializa candidato em convenção hoje (26/07/2026)",
          "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-ronaldo-caiado-que-psd-oficializa-candidato-em-convencao-hoje-26/"
        }
      },
      {
        "ano": "1990",
        "texto": "Eleito deputado federal por Goiás; volta à Câmara em 1998 e exerce cinco mandatos até 2015.",
        "fonte": {
          "nome": "CNN Brasil — Quem é Ronaldo Caiado, que PSD oficializa candidato em convenção hoje (26/07/2026)",
          "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-ronaldo-caiado-que-psd-oficializa-candidato-em-convencao-hoje-26/"
        },
        "fontesExtras": [
          {
            "nome": "InfoMoney — Quem é Ronaldo Caiado",
            "url": "https://www.infomoney.com.br/?p=3420912"
          }
        ]
      },
      {
        "ano": "2014",
        "texto": "Eleito senador por Goiás; líder do DEM no Senado.",
        "fonte": {
          "nome": "CNN Brasil — Quem é Ronaldo Caiado, que PSD oficializa candidato em convenção hoje (26/07/2026)",
          "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-ronaldo-caiado-que-psd-oficializa-candidato-em-convencao-hoje-26/"
        }
      },
      {
        "ano": "2018",
        "texto": "Eleito governador de Goiás; reeleito em 2022 no 1º turno.",
        "fonte": {
          "nome": "CNN Brasil — Quem é Ronaldo Caiado, que PSD oficializa candidato em convenção hoje (26/07/2026)",
          "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-ronaldo-caiado-que-psd-oficializa-candidato-em-convencao-hoje-26/"
        },
        "fontesExtras": [
          {
            "nome": "Exame — Ronaldo Caiado é reeleito governador de Goiás com 51,68% dos votos válidos (02/10/2022)",
            "url": "https://exame.com/brasil/ronaldo-caiado-e-reeleito-governador-de-goias-com-5168-dos-votos-validos"
          }
        ]
      },
      {
        "ano": "2026",
        "texto": "Filia-se ao PSD em março, deixa o governo no fim do mês e tem a candidatura à Presidência oficializada em julho.",
        "fonte": {
          "nome": "Metrópoles — Caiado oficializa entrada no PSD e apoia vice como sucessor em Goiás (14/03/2026)",
          "url": "https://www.metropoles.com/brasil/caiado-oficializa-entrada-no-psd-e-apoia-vice-como-sucessor-em-goias"
        },
        "fontesExtras": [
          {
            "nome": "CNN Brasil — Quem é Ronaldo Caiado, que PSD oficializa candidato em convenção hoje (26/07/2026)",
            "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-ronaldo-caiado-que-psd-oficializa-candidato-em-convencao-hoje-26/"
          },
          {
            "nome": "Tribuna do Planalto — Daniel Vilela assume o governo de Goiás (31/03/2026)",
            "url": "https://tribunadoplanalto.com.br/daniel-vilela-assume-o-governo-de-goias-em-cerimonia-na-alego-apos-sete-anos-de-caiado/"
          }
        ]
      }
    ],
    "crencas": {
      "espectro": "Direita",
      "texto": "Ligado historicamente ao agronegócio, defende a propriedade privada, rigor no combate ao crime, responsabilidade fiscal e pautas conservadoras nos costumes.",
      "tags": [
        "Segurança pública",
        "Agronegócio",
        "Propriedade privada",
        "Responsabilidade fiscal",
        "Conservadorismo"
      ]
    },
    "propostas": [
      {
        "icone": "🚔",
        "titulo": "“Modelo Goiás” de segurança",
        "texto": "Levar ao país a política de enfrentamento ao crime adotada em seu governo, com criação do Ministério da Segurança Pública e enquadramento de facções como terrorismo doméstico.",
        "fonte": {
          "nome": "Congresso em Foco — Plano de Caiado mira facções, ajuste fiscal e fim da reeleição",
          "url": "https://www.congressoemfoco.com.br/noticia/121321/plano-de-caiado-mira-faccoes-ajuste-fiscal-e-fim-da-reeleicao"
        },
        "fontesExtras": [
          {
            "nome": "Estadão, via Diário do Grande ABC — Documentadas no TSE, as propostas dos postulantes ao Palácio do Planalto (04/10/2026)",
            "url": "https://www.dgabc.com.br/Noticia/4350716/documentadas-no-tse-as-propostas-dos-postulantes-ao-palacio-do-planalto"
          }
        ]
      },
      {
        "icone": "🌾",
        "titulo": "Agronegócio",
        "texto": "Plano Safra plurianual, de cinco anos, seguro rural permanente e redução da insegurança jurídica no campo.",
        "fonte": {
          "nome": "Plano de Governo Caiado–Kassab 2027–2030 (PDF publicado pelo Poder360)",
          "url": "https://static.poder360.com.br/uploads/2026/08/Plano-de-Governo-Ronaldo-Caiado-Presidente.pdf"
        }
      },
      {
        "icone": "📉",
        "titulo": "Ajuste fiscal",
        "texto": "Ajuste fiscal sem aumento sucessivo de impostos, com revisão de subsídios e benefícios tributários, contenção de despesas obrigatórias e combate aos supersalários.",
        "fonte": {
          "nome": "Congresso em Foco — Plano de Caiado mira facções, ajuste fiscal e fim da reeleição",
          "url": "https://www.congressoemfoco.com.br/noticia/121321/plano-de-caiado-mira-faccoes-ajuste-fiscal-e-fim-da-reeleicao"
        },
        "fontesExtras": [
          {
            "nome": "Agência Brasil, via Folha de Pernambuco — Caiado promete governo 'transformador' e reformas estruturais (19/09/2026)",
            "url": "https://www.folhape.com.br/politica/caiado-promete-governo-transformador-e-reformas-estruturais/513608/"
          }
        ]
      },
      {
        "icone": "🏥",
        "titulo": "Saúde regionalizada",
        "texto": "Organizar o SUS com fila transparente e atendimento regionalizado, com foco na prevenção.",
        "fonte": {
          "nome": "Plano de Governo Caiado–Kassab 2027–2030 (PDF publicado pelo Poder360)",
          "url": "https://static.poder360.com.br/uploads/2026/08/Plano-de-Governo-Ronaldo-Caiado-Presidente.pdf"
        },
        "fontesExtras": [
          {
            "nome": "Agência Brasil, via Folha de Pernambuco — Caiado promete governo 'transformador' e reformas estruturais (19/09/2026)",
            "url": "https://www.folhape.com.br/politica/caiado-promete-governo-transformador-e-reformas-estruturais/513608/"
          }
        ]
      },
      {
        "icone": "🎓",
        "titulo": "Educação",
        "texto": "Pacto nacional de alfabetização e matemática até o fim do 2º ano do ensino fundamental, ampliação do ensino em tempo integral e da educação profissional.",
        "fonte": {
          "nome": "Agência Brasil, via Folha de Pernambuco — Caiado promete governo 'transformador' e reformas estruturais (19/09/2026)",
          "url": "https://www.folhape.com.br/politica/caiado-promete-governo-transformador-e-reformas-estruturais/513608/"
        },
        "fontesExtras": [
          {
            "nome": "Congresso em Foco — Plano de Caiado mira facções, ajuste fiscal e fim da reeleição",
            "url": "https://www.congressoemfoco.com.br/noticia/121321/plano-de-caiado-mira-faccoes-ajuste-fiscal-e-fim-da-reeleicao"
          }
        ]
      }
    ],
    "realizacoes": [
      {
        "ano": "1991–1995; 1999–2015",
        "titulo": "Deputado federal",
        "texto": "Cinco mandatos na Câmara dos Deputados por Goiás.",
        "fonte": {
          "nome": "CNN Brasil — Quem é Ronaldo Caiado, que PSD oficializa candidato em convenção hoje (26/07/2026)",
          "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-ronaldo-caiado-que-psd-oficializa-candidato-em-convencao-hoje-26/"
        }
      },
      {
        "ano": "2015–2019",
        "titulo": "Senador",
        "texto": "Líder do DEM no Senado; votou a favor do impeachment de Dilma Rousseff (2016).",
        "fonte": {
          "nome": "Congresso em Foco — Como votaram os senadores (31/08/2016)",
          "url": "https://www.congressoemfoco.com.br/noticia/36036/como-votaram-os-senadores"
        },
        "fontesExtras": [
          {
            "nome": "CNN Brasil — Quem é Ronaldo Caiado, que PSD oficializa candidato em convenção hoje (26/07/2026)",
            "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-ronaldo-caiado-que-psd-oficializa-candidato-em-convencao-hoje-26/"
          }
        ]
      },
      {
        "ano": "2019–2026",
        "titulo": "Governador de Goiás",
        "texto": "Segundo dados do governo estadual, homicídios e roubos caíram de forma expressiva entre 2018 e 2025; o estado aderiu ao Regime de Recuperação Fiscal em 2021.",
        "fonte": {
          "nome": "Congresso em Foco — Quem é Ronaldo Caiado, aposta do PSD para o Planalto em 2026",
          "url": "https://www.congressoemfoco.com.br/noticia/117684/quem-e-ronaldo-caiado-aposta-do-psd-para-o-planalto-em-2026"
        },
        "fontesExtras": [
          {
            "nome": "O Hoje — Caiado se encontra com Bolsonaro para assinatura da adesão do estado ao RRF (23/12/2021)",
            "url": "https://ohoje.com/2021/12/23/caiado-se-encontra-com-bolsonaro-para-assinatura-da-adesao-do-estado-ao-rrf-em-brasilia/"
          }
        ]
      },
      {
        "ano": "2019–2026",
        "titulo": "Policlínicas regionais",
        "texto": "Abertura de unidades de saúde especializadas no interior goiano.",
        "fonte": {
          "nome": "Governo de Goiás — Em Posse, governador garante inauguração da Policlínica",
          "url": "https://goias.gov.br/administracao/em-posse-governador-garante-inauguracao-da-policlinica-em-fevereiro/"
        }
      }
    ],
    "controversias": [
      {
        "titulo": "Processo de inelegibilidade",
        "ano": "2024–2025",
        "status": "revertido",
        "statusLabel": "Revertido pelo TRE",
        "texto": "Em dezembro de 2024, a Justiça Eleitoral de Goiânia o declarou inelegível por abuso de poder político, pelo uso do Palácio das Esmeraldas em eventos da campanha de Sandro Mabel nas eleições municipais. Em abril de 2025, o TRE-GO derrubou a inelegibilidade por unanimidade, mas manteve multa de R$ 60 mil.",
        "fonte": {
          "nome": "Agência Brasil — TRE-GO afasta inelegibilidade de governador Ronaldo Caiado (09/04/2025)",
          "url": "https://agenciabrasil.ebc.com.br/justica/noticia/2025-04/tre-go-afasta-inelegibilidade-de-governador-ronaldo-caiado/"
        }
      },
      {
        "titulo": "Policiais militares como seguranças",
        "ano": "2026",
        "status": "andamento",
        "statusLabel": "Ação em andamento",
        "texto": "O Ministério Público de Goiás ajuizou ação de improbidade pelo uso de 51 policiais militares como seguranças do ex-governador e da família. Em julho de 2026, decisão provisória da 2ª Vara da Fazenda Pública estadual limitou o efetivo a quatro policiais.",
        "fonte": {
          "nome": "Folhapress, via Acessa.com — Ministério Público de Goiás entra com ação contra uso de policiais como seguranças de Caiado (27/06/2026)",
          "url": "https://www.acessa.com/politica/2026/06/332342-ministerio-publico-de-goias-entra-com-acao-contra-uso-de-policiais-como-segurancas-de-caiado.html"
        },
        "fontesExtras": [
          {
            "nome": "Agora RN — decisão de 06/07/2026 que limita a escolta a quatro PMs",
            "url": "https://agorarn.com.br/?p=1029621"
          }
        ]
      },
      {
        "titulo": "Acusações de Demóstenes Torres",
        "ano": "2015",
        "status": "negado",
        "statusLabel": "Nega as acusações",
        "texto": "O ex-senador cassado Demóstenes Torres afirmou que campanhas de Caiado teriam sido financiadas pelo esquema de Carlinhos Cachoeira. Caiado negou e classificou as acusações como mentirosas.",
        "fonte": {
          "nome": "Estado de Minas — Demóstenes acusa Caiado de receber dinheiro de Cachoeira (31/03/2015)",
          "url": "https://www.em.com.br/app/noticia/politica/2015/03/31/interna_politica,633208/amp.html"
        }
      }
    ]
  },
  {
    "slug": "romeu-zema",
    "tse_id": "280002539826",
    "numero": 30,
    "urna": "Romeu Zema",
    "nome": "Romeu Zema Neto",
    "partido": "NOVO",
    "partidoNome": "Partido Novo",
    "cor": "#f97316",
    "wiki": "Romeu_Zema",
    "frase": "Empresário e ex-governador de Minas Gerais por dois mandatos.",
    "resumo": "Empresário, comandou o Grupo Zema, empresa familiar de varejo e combustíveis de Araxá (MG). Estreou na política em 2018, quando foi eleito governador de Minas Gerais pelo Novo, e foi reeleito em 2022 no primeiro turno. Deixou o cargo em 2026 para disputar a Presidência.",
    "trajetoria": [
      {
        "ano": "1964",
        "texto": "Nasce em Araxá, Minas Gerais.",
        "fonte": {
          "nome": "CNN Brasil — Saiba quem é Romeu Zema, governador reeleito de Minas Gerais (2022)",
          "url": "https://www.cnnbrasil.com.br/politica/saiba-quem-e-romeu-zema-governador-reeleito-de-minas-gerais/"
        },
        "fontesExtras": [
          {
            "nome": "CNN Brasil — Quem é Romeu Zema, que o Novo oficializa candidato nesta segunda (27/07/2026)",
            "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-romeu-zema-que-o-novo-oficializa-candidato-nesta-segunda-27/"
          }
        ]
      },
      {
        "ano": "1991",
        "texto": "Assume a direção do Grupo Zema, expandindo a rede de lojas e postos.",
        "fonte": {
          "nome": "CNN Brasil — Quem é Romeu Zema, que o Novo oficializa candidato nesta segunda (27/07/2026)",
          "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-romeu-zema-que-o-novo-oficializa-candidato-nesta-segunda-27/"
        }
      },
      {
        "ano": "2018",
        "texto": "Em sua primeira eleição, é eleito governador de Minas Gerais.",
        "fonte": {
          "nome": "CNN Brasil — Quem é Romeu Zema, que o Novo oficializa candidato nesta segunda (27/07/2026)",
          "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-romeu-zema-que-o-novo-oficializa-candidato-nesta-segunda-27/"
        }
      },
      {
        "ano": "2022",
        "texto": "Reeleito governador no 1º turno.",
        "fonte": {
          "nome": "InfoMoney — Romeu Zema, do Novo, é reeleito ao governo de Minas Gerais em primeiro turno (02/10/2022)",
          "url": "https://www.infomoney.com.br/?p=1947769"
        }
      },
      {
        "ano": "2026",
        "texto": "Deixa o governo em março e é oficializado candidato do Novo à Presidência em julho.",
        "fonte": {
          "nome": "Congresso em Foco — Zema deixa governo de Minas para disputar o Planalto (22/03/2026)",
          "url": "https://www.congressoemfoco.com.br/noticia/117446/zema-deixa-governo-de-minas-para-disputar-ao-planalto"
        },
        "fontesExtras": [
          {
            "nome": "CNN Brasil — Quem é Romeu Zema, que o Novo oficializa candidato nesta segunda (27/07/2026)",
            "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-romeu-zema-que-o-novo-oficializa-candidato-nesta-segunda-27/"
          }
        ]
      }
    ],
    "crencas": {
      "espectro": "Direita liberal",
      "texto": "Liberal na economia, defende Estado enxuto, privatizações, corte de privilégios e gestão pública com perfil empresarial, com foco em equilíbrio fiscal.",
      "tags": [
        "Estado enxuto",
        "Privatizações",
        "Corte de privilégios",
        "Equilíbrio fiscal",
        "Empreendedorismo"
      ]
    },
    "propostas": [
      {
        "icone": "✂️",
        "titulo": "Corte de privilégios",
        "texto": "Reforma administrativa e fim de supersalários e benefícios no setor público, como férias acima de 30 dias e aposentadoria compulsória como punição.",
        "fonte": {
          "nome": "Agência Brasil, via Diário do Grande ABC — Zema propõe saída do Brics e redução de supersalários e de impostos (20/09/2026)",
          "url": "https://www.dgabc.com.br/Noticia/4348031/zema-propoe-saida-do-brics-e-reducao-de-supersalarios-e-de-impostos"
        },
        "fontesExtras": [
          {
            "nome": "Congresso em Foco — Plano de Zema prevê choque fiscal, limitação ao STF e saída do Brics",
            "url": "https://www.congressoemfoco.com.br/noticia/121274/plano-de-zema-preve-choque-fiscal--limitacao-ao-stf-e-saida-do-brics"
          }
        ]
      },
      {
        "icone": "🏦",
        "titulo": "Privatizações",
        "texto": "Privatização de todas as estatais, venda de imóveis públicos sem uso e ampliação de concessões e PPPs.",
        "fonte": {
          "nome": "Agência Brasil, via Diário do Grande ABC — Zema propõe saída do Brics e redução de supersalários e de impostos (20/09/2026)",
          "url": "https://www.dgabc.com.br/Noticia/4348031/zema-propoe-saida-do-brics-e-reducao-de-supersalarios-e-de-impostos"
        },
        "fontesExtras": [
          {
            "nome": "Congresso em Foco — Plano de Zema prevê choque fiscal, limitação ao STF e saída do Brics",
            "url": "https://www.congressoemfoco.com.br/noticia/121274/plano-de-zema-preve-choque-fiscal--limitacao-ao-stf-e-saida-do-brics"
          }
        ]
      },
      {
        "icone": "🧾",
        "titulo": "Menos burocracia",
        "texto": "Reduzir o IOF e o Imposto de Renda das empresas, digitalizar o governo federal e dar prioridade ao licenciamento de projetos de interesse nacional.",
        "fonte": {
          "nome": "Agência Brasil, via Diário do Grande ABC — Zema propõe saída do Brics e redução de supersalários e de impostos (20/09/2026)",
          "url": "https://www.dgabc.com.br/Noticia/4348031/zema-propoe-saida-do-brics-e-reducao-de-supersalarios-e-de-impostos"
        }
      },
      {
        "icone": "📊",
        "titulo": "Gestão por resultados",
        "texto": "Reforma administrativa com gestão por resultados, avaliação de desempenho dos servidores e possibilidade de demissão por baixo rendimento.",
        "fonte": {
          "nome": "Agência Brasil, via Diário do Grande ABC — Zema propõe saída do Brics e redução de supersalários e de impostos (20/09/2026)",
          "url": "https://www.dgabc.com.br/Noticia/4348031/zema-propoe-saida-do-brics-e-reducao-de-supersalarios-e-de-impostos"
        }
      },
      {
        "icone": "🚔",
        "titulo": "Segurança",
        "texto": "Classificar facções como organizações terroristas, reduzir a maioridade penal, construir presídios de segurança máxima em áreas remotas e substituir a progressão de regime por liberdade condicional monitorada.",
        "fonte": {
          "nome": "Congresso em Foco — Plano de Zema prevê choque fiscal, limitação ao STF e saída do Brics",
          "url": "https://www.congressoemfoco.com.br/noticia/121274/plano-de-zema-preve-choque-fiscal--limitacao-ao-stf-e-saida-do-brics"
        },
        "fontesExtras": [
          {
            "nome": "Agência Brasil, via Diário do Grande ABC — Zema propõe saída do Brics e redução de supersalários e de impostos (20/09/2026)",
            "url": "https://www.dgabc.com.br/Noticia/4348031/zema-propoe-saida-do-brics-e-reducao-de-supersalarios-e-de-impostos"
          }
        ]
      }
    ],
    "realizacoes": [
      {
        "ano": "2021",
        "titulo": "Salários em dia",
        "texto": "Pôs fim, a partir de agosto de 2021, ao parcelamento dos salários dos servidores estaduais, em vigor desde 2016.",
        "fonte": {
          "nome": "Tribuna de Minas — Governador Romeu Zema anuncia o fim do parcelamento dos salários (16/07/2021)",
          "url": "https://tribunademinas.com.br/noticias/minas/16-07-2021/governador-romeu-zema-anuncia-o-fim-do-parcelamento-dos-salarios.html?amp=1"
        }
      },
      {
        "ano": "2021",
        "titulo": "Acordo de Brumadinho",
        "texto": "Acordo de R$ 37,68 bilhões com a Vale para reparação dos danos do rompimento da barragem.",
        "fonte": {
          "nome": "Folhapress, via Diário do Nordeste — Vale fecha acordo de R$ 37,68 bilhões por desastre em Brumadinho (04/02/2021)",
          "url": "https://diariodonordeste.verdesmares.com.br/ultima-hora/pais/vale-fecha-acordo-de-r-3768-bilhoes-por-desastre-que-matou-272-pessoas-em-brumadinho-1.3042684"
        }
      },
      {
        "ano": "2025",
        "titulo": "Dívida com a União",
        "texto": "Em dezembro de 2025, Minas aderiu ao Propag, programa federal de renegociação das dívidas estaduais, e deixou o Regime de Recuperação Fiscal; a dívida, próxima de R$ 180 bilhões, poderá ser paga em até 30 anos.",
        "fonte": {
          "nome": "Estado de Minas — Como Minas Gerais vai pagar sua dívida de R$ 180 bilhões com a União (06/2026)",
          "url": "https://www.em.com.br/trends/2026/06/7438720-como-minas-gerais-vai-pagar-sua-divida-de-rs-180-bilhoes-com-a-uniao.html"
        }
      }
    ],
    "controversias": [
      {
        "titulo": "Reajuste do próprio salário",
        "ano": "2023",
        "status": "info",
        "statusLabel": "Apontado por conselho fiscal",
        "texto": "O salário do governador e dos secretários subiu, de forma escalonada, de R$ 10,5 mil para R$ 41,8 mil (cerca de 300%). Em 2024, o conselho do Regime de Recuperação Fiscal apontou que o reajuste descumpria as regras do regime.",
        "fonte": {
          "nome": "Metrópoles — Assembleia de Minas dá aval e Zema ganha reajuste de 298% no salário (04/04/2023)",
          "url": "https://www.metropoles.com/brasil/assembleia-de-minas-da-aval-e-zema-ganha-reajuste-de-298-no-salario"
        },
        "fontesExtras": [
          {
            "nome": "Congresso em Foco — Conselho veta aumento de 300% do salário de Zema (25/07/2024)",
            "url": "https://congressoemfoco.com.br/noticia/8404/conselho-veta-aumento-300-do-salario-de-zema"
          }
        ]
      },
      {
        "titulo": "Multa por propaganda institucional",
        "ano": "2024",
        "status": "multa",
        "statusLabel": "Multa aplicada",
        "texto": "Em maio de 2024, o TSE rejeitou a cassação e a acusação de abuso de poder, mas multou o então governador em R$ 5 mil por manter publicidade institucional em sites oficiais durante o período vedado das eleições de 2022.",
        "fonte": {
          "nome": "SBT News — TSE multa Zema por publicidade institucional nas eleições de 2022 (14/05/2024)",
          "url": "https://sbtnews.sbt.com.br/noticia/justica/tse-multa-zema-por-publicidade-institucional-nas-eleicoes-de-2022"
        }
      },
      {
        "titulo": "Denúncia por calúnia contra Gilmar Mendes",
        "ano": "2026",
        "status": "andamento",
        "statusLabel": "Denúncia em análise no STJ",
        "texto": "Em maio de 2026, a PGR denunciou Zema ao STJ por calúnia contra o ministro Gilmar Mendes, do STF, por vídeos da série 'Os intocáveis' que associavam ministros ao caso Banco Master. Cabe ao STJ decidir se recebe a denúncia. Zema afirma que se trata de crítica legítima e que não vai recuar.",
        "fonte": {
          "nome": "Congresso em Foco — PGR denuncia Romeu Zema ao STJ por calúnia contra Gilmar Mendes (18/05/2026)",
          "url": "https://congressoemfoco.com.br/noticia/118940/pgr-denuncia-romeu-zema-ao-stj-por-calunia-contra-gilmar-mendes"
        }
      }
    ]
  },
  {
    "slug": "renan-santos",
    "tse_id": "280002540694",
    "numero": 14,
    "urna": "Renan Santos",
    "nome": "Renan Antonio Ferreira dos Santos",
    "partido": "MISSÃO",
    "partidoNome": "Partido Missão",
    "cor": "#facc15",
    "wiki": "Renan_Santos",
    "frase": "Cofundador do MBL e presidente do Partido Missão.",
    "resumo": "Ativista político paulistano, cofundou o Movimento Brasil Livre (MBL) em 2014 e foi um dos organizadores das manifestações pelo impeachment de Dilma Rousseff. Liderou a criação do Partido Missão, aprovado pelo TSE em 2025, e disputa sua primeira eleição em 2026.",
    "trajetoria": [
      {
        "ano": "1984",
        "texto": "Nasce em São Paulo (SP).",
        "fonte": {
          "nome": "CNN Brasil — Quem é Renan Santos, candidato do partido Missão à Presidência (01/08/2026)",
          "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-renan-santos-candidato-do-partido-missao-a-presidencia/"
        }
      },
      {
        "ano": "2014",
        "texto": "Cofunda o Movimento Brasil Livre (MBL).",
        "fonte": {
          "nome": "CNN Brasil — Quem é Renan Santos, candidato do partido Missão à Presidência (01/08/2026)",
          "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-renan-santos-candidato-do-partido-missao-a-presidencia/"
        },
        "fontesExtras": [
          {
            "nome": "Itatiaia — Conheça a carreira de Renan Santos, pré-candidato à Presidência",
            "url": "https://www.itatiaia.com.br/politica/eleicoes/conheca-a-carreira-de-renan-santos-pre-candidato-a-presidencia/"
          }
        ]
      },
      {
        "ano": "2015",
        "texto": "Organiza protestos nacionais pelo impeachment de Dilma Rousseff.",
        "fonte": {
          "nome": "Itatiaia — Conheça a carreira de Renan Santos, pré-candidato à Presidência",
          "url": "https://www.itatiaia.com.br/politica/eleicoes/conheca-a-carreira-de-renan-santos-pre-candidato-a-presidencia/"
        },
        "fontesExtras": [
          {
            "nome": "Estado de Minas — Organizadores de protestos planejam ida ao Congresso para pedir impeachment (13/04/2015)",
            "url": "https://www.em.com.br/app/noticia/politica/2015/04/13/interna_politica,636988/amp.html"
          }
        ]
      },
      {
        "ano": "2023",
        "texto": "Inicia a mobilização para criar o Partido Missão, desdobramento institucional do MBL.",
        "fonte": {
          "nome": "CNN Brasil — Quem é Renan Santos, candidato do partido Missão à Presidência (01/08/2026)",
          "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-renan-santos-candidato-do-partido-missao-a-presidencia/"
        }
      },
      {
        "ano": "2025",
        "texto": "TSE aprova o registro do Missão, 30º partido do país.",
        "fonte": {
          "nome": "CNN Brasil — TSE aprova registro do Missão, partido do MBL e 30º do país (04/11/2025)",
          "url": "https://www.cnnbrasil.com.br/politica/tse-aprova-registro-do-missao-partido-do-mbl-e-30o-do-pais/"
        }
      },
      {
        "ano": "2026",
        "texto": "Candidato à Presidência em sua primeira disputa eleitoral, oficializado em convenção em agosto.",
        "fonte": {
          "nome": "Diário do Nordeste — Missão oficializa Renan Santos como candidato à presidência (01/08/2026)",
          "url": "https://diariodonordeste.verdesmares.com.br/pontopoder/missao-oficializa-renan-santos-como-candidato-a-presidencia-nos-construimos-o-proprio-caminho-1.3781062"
        },
        "fontesExtras": [
          {
            "nome": "CNN Brasil — Quem é Renan Santos, candidato do partido Missão à Presidência (01/08/2026)",
            "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-renan-santos-candidato-do-partido-missao-a-presidencia/"
          }
        ]
      }
    ],
    "crencas": {
      "espectro": "Direita",
      "texto": "Define o Missão como “um partido no campo da direita altamente pragmático”. Defende renovação política, combate à corrupção, Estado menor e endurecimento contra o crime organizado.",
      "tags": [
        "Renovação política",
        "Anticorrupção",
        "Estado menor",
        "Segurança pública",
        "Austeridade fiscal"
      ]
    },
    "propostas": [
      {
        "icone": "🚔",
        "titulo": "Crime organizado",
        "texto": "Endurecimento penal e prioridade no combate às facções.",
        "fonte": {
          "nome": "Estadão, via Diário do Grande ABC — Documentadas no TSE, as propostas dos postulantes ao Palácio do Planalto (04/10/2026)",
          "url": "https://www.dgabc.com.br/Noticia/4350716/documentadas-no-tse-as-propostas-dos-postulantes-ao-palacio-do-planalto"
        },
        "fontesExtras": [
          {
            "nome": "InfoMoney — 'Livro Amarelo': a doutrina que Renan Santos diz ser a base do projeto do Missão",
            "url": "https://www.infomoney.com.br/?p=3434770"
          }
        ]
      },
      {
        "icone": "🗳️",
        "titulo": "Reforma política",
        "texto": "Condicionar o acesso dos partidos aos fundos partidário e eleitoral ao cumprimento de metas em saúde, educação e saneamento.",
        "fonte": {
          "nome": "Estadão, via Diário do Grande ABC — Documentadas no TSE, as propostas dos postulantes ao Palácio do Planalto (04/10/2026)",
          "url": "https://www.dgabc.com.br/Noticia/4350716/documentadas-no-tse-as-propostas-dos-postulantes-ao-palacio-do-planalto"
        }
      },
      {
        "icone": "🏦",
        "titulo": "Privatizações seletivas",
        "texto": "Privatizar estatais que considera dispensáveis, como os Correios, e manter empresas que vê como estratégicas, como Petrobras e Embrapa.",
        "fonte": {
          "nome": "Diário do Grande ABC — Renan Santos diz que é contra privatização da Petrobras e Embrapa, mas não dos Correios (08/09/2026)",
          "url": "https://www.dgabc.com.br/Noticia/4345652/renan-santos-diz-que-e-contra-privatizacao-da-petrobras-e-embrapa-mas-nao-dos-correios"
        }
      },
      {
        "icone": "✂️",
        "titulo": "Estado menor",
        "texto": "Reformas fiscal e administrativa, com corte de gastos e fusão de municípios financeiramente inviáveis, que reduziria em até 70% o número de cidades.",
        "fonte": {
          "nome": "Estadão, via Diário do Grande ABC — Documentadas no TSE, as propostas dos postulantes ao Palácio do Planalto (04/10/2026)",
          "url": "https://www.dgabc.com.br/Noticia/4350716/documentadas-no-tse-as-propostas-dos-postulantes-ao-palacio-do-planalto"
        },
        "fontesExtras": [
          {
            "nome": "CNN Brasil — Quem é Renan Santos, candidato do partido Missão à Presidência (01/08/2026)",
            "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-renan-santos-candidato-do-partido-missao-a-presidencia/"
          }
        ]
      }
    ],
    "realizacoes": [
      {
        "ano": "2015",
        "titulo": "Marcha pela Liberdade",
        "texto": "Caminhada de São Paulo a Brasília em defesa do impeachment.",
        "fonte": {
          "nome": "Estado de Minas — Organizadores de protestos planejam ida ao Congresso para pedir impeachment (13/04/2015)",
          "url": "https://www.em.com.br/app/noticia/politica/2015/04/13/interna_politica,636988/amp.html"
        }
      },
      {
        "ano": "2016–2018",
        "titulo": "Candidaturas do MBL",
        "texto": "Integrantes do movimento foram eleitos por outros partidos, como Fernando Holiday (vereador em São Paulo, 2016) e Kim Kataguiri e Arthur do Val (2018), todos pelo DEM.",
        "fonte": {
          "nome": "Diário de Pernambuco — MBL se aproxima do Novo por eleição em 2020 (27/09/2019)",
          "url": "https://www.diariodepernambuco.com.br/noticia/politica/2019/09/mbl-se-aproxima-do-novo-por-eleicao-em-2020.html"
        }
      },
      {
        "ano": "2025",
        "titulo": "Partido Missão",
        "texto": "Obteve o registro do partido no TSE e assumiu sua presidência.",
        "fonte": {
          "nome": "Itatiaia — Conheça a carreira de Renan Santos, pré-candidato à Presidência",
          "url": "https://www.itatiaia.com.br/politica/eleicoes/conheca-a-carreira-de-renan-santos-pre-candidato-a-presidencia/"
        },
        "fontesExtras": [
          {
            "nome": "CNN Brasil — Quem é Renan Santos, candidato do partido Missão à Presidência (01/08/2026)",
            "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-renan-santos-candidato-do-partido-missao-a-presidencia/"
          }
        ]
      }
    ],
    "realizacoesNota": "Não exerceu mandato público. A trajetória é ligada ao ativismo político e à organização do MBL e do Partido Missão.",
    "controversias": [
      {
        "titulo": "Processos e dívidas",
        "ano": "2016–2022",
        "status": "info",
        "statusLabel": "Reportagens",
        "texto": "Em 2016, reportagem do UOL apontou que ele respondia a 61 processos, em sua maioria cíveis, fiscais e trabalhistas ligados a empresas de que era sócio, com cobranças de cerca de R$ 4,9 milhões. Em 2022, o Metrópoles noticiou dívidas de R$ 6,3 milhões com a União, quase todas de tributos federais. Ele atribui os débitos a empresas que adquiriu já endividadas, antes de fundar o MBL.",
        "fonte": {
          "nome": "Metrópoles (coluna Guilherme Amado) — Coordenador do MBL tem dívidas de R$ 6,3 milhões com a União (11/03/2022)",
          "url": "https://www.metropoles.com/colunas/guilherme-amado/coordenador-do-mbl-tem-dividas-de-r-63-milhoes-com-a-uniao"
        },
        "fontesExtras": [
          {
            "nome": "UOL, reproduzido pelo IHU-Unisinos — Líder do MBL responde a mais de 60 processos e sofre cobrança de R$ 4,9 mi (08/05/2016)",
            "url": "https://www.ihu.unisinos.br/noticias/554735-lider-do-mbl-responde-a-mais-de-60-processos-e-sofre-cobranca-de-r-49-mi"
          },
          {
            "nome": "SBT News — Renan minimiza dívidas trabalhistas: 'não é crime' (22/09/2026)",
            "url": "https://sbtnews.sbt.com.br/noticia/eleicoes/renan-minimiza-dividas-trabalhistas-nao-e-crime"
          }
        ]
      },
      {
        "titulo": "Remoção de rede no Facebook",
        "ano": "2018",
        "status": "info",
        "statusLabel": "Ação da plataforma",
        "texto": "O Facebook removeu 196 páginas e 87 perfis por violar suas regras de autenticidade, entre eles páginas ligadas ao MBL. O movimento contestou a medida e afirmou que suas páginas não eram falsas.",
        "fonte": {
          "nome": "Agência Brasil — MPF pede informações ao Facebook por remoção de perfis suspeitos (25/07/2018)",
          "url": "https://agenciabrasil.ebc.com.br/justica/noticia/2018-07/mpf-pede-informacoes-ao-facebook-por-remocao-de-perfis-suspeitos"
        }
      },
      {
        "titulo": "Denúncia por tráfico de influência",
        "ano": "2020–2021",
        "status": "arquivado",
        "statusLabel": "Denúncia rejeitada",
        "texto": "Em outubro de 2020, o Ministério Público de São Paulo o denunciou por tráfico de influência, sob acusação de usar sua influência para que um aliado fosse nomeado na Imprensa Oficial do estado. A denúncia foi rejeitada, e em novembro de 2021 o TJ-SP manteve a rejeição por unanimidade, por falta de descrição de conduta concreta. Ele negou envolvimento.",
        "fonte": {
          "nome": "Folhapress, via Banda B — Líder do MBL é denunciado sob a acusação de tráfico de influência (26/10/2020)",
          "url": "https://www.bandab.com.br/politica/lider-do-mbl-e-denunciado-sob-a-acusacao-de-trafico-de-influencia/amp/"
        },
        "fontesExtras": [
          {
            "nome": "TJ-SP, 4ª Câmara de Direito Criminal — acórdão no RESE 0037788-97.2020.8.26.0050 (23/11/2021), PDF publicado pelo Conjur",
            "url": "https://www.conjur.com.br/wp-content/uploads/2023/09/tj-sp-rejeita-denuncia-lider-mbl.pdf"
          }
        ]
      }
    ]
  },
  {
    "slug": "augusto-cury",
    "tse_id": "280002551547",
    "numero": 70,
    "urna": "Augusto Cury",
    "nome": "Augusto Jorge Cury",
    "partido": "AVANTE",
    "partidoNome": "Avante",
    "cor": "#fb923c",
    "wiki": "Augusto_Cury",
    "frase": "Psiquiatra e escritor de best-sellers que estreou em eleições em 2026.",
    "resumo": "Médico psiquiatra formado em São José do Rio Preto, tornou-se conhecido como autor de livros sobre emoção e comportamento e criou um programa de educação socioemocional usado por escolas. Em 2026 disputou sua primeira eleição, pelo Avante, com um plano que propunha semipresidencialismo, fim da reeleição e mudanças no STF. Terminou o 1º turno em 3º lugar, com 2,89% dos votos válidos, e no 2º turno declarou apoio a Flávio Bolsonaro mediante um termo de compromissos.",
    "trajetoria": [
      {
        "ano": "1958",
        "texto": "Nasce em Colina, no interior de São Paulo.",
        "fonte": {
          "nome": "InvestNews",
          "url": "https://investnews.com.br/economia/quem-e-augusto-cury/"
        }
      },
      {
        "ano": "1984",
        "texto": "Conclui o curso de Medicina na faculdade de São José do Rio Preto (atual Famerp) e passa a atuar como psiquiatra.",
        "fonte": {
          "nome": "InvestNews",
          "url": "https://investnews.com.br/economia/quem-e-augusto-cury/"
        }
      },
      {
        "ano": "2010",
        "texto": "Lança a Escola da Inteligência, programa de material didático e formação de professores baseado em sua teoria.",
        "fonte": {
          "nome": "Gazeta do Povo",
          "url": "https://www.gazetadopovo.com.br/ideias/como-augusto-cury-ergueu-imperio-comercial-com-teoria-controversa"
        }
      },
      {
        "ano": "2020",
        "texto": "Vende 60% da operação privada da Escola da Inteligência ao grupo Arco Educação.",
        "fonte": {
          "nome": "Gazeta do Povo",
          "url": "https://www.gazetadopovo.com.br/ideias/como-augusto-cury-ergueu-imperio-comercial-com-teoria-controversa"
        }
      },
      {
        "ano": "2026",
        "texto": "Em abril, o Avante anuncia sua pré-candidatura à Presidência; em agosto, a convenção do partido oficializa a chapa, com Júlio Delgado como vice.",
        "fonte": {
          "nome": "CNN Brasil",
          "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-o-escritor-augusto-cury-candidato-do-avante-a-presidencia/"
        }
      },
      {
        "ano": "2026",
        "texto": "Fica em 3º lugar no 1º turno (4 de outubro), com 2,89% dos votos válidos.",
        "fonte": {
          "nome": "SBT News",
          "url": "https://sbtnews.sbt.com.br/noticia/eleicoes/3-mais-votado-cury-diz-que-seguira-ajudando-pais-a-sonhar"
        }
      },
      {
        "ano": "2026",
        "texto": "Em 8 de outubro, anuncia apoio a Flávio Bolsonaro no 2º turno, condicionado a oito compromissos assinados pelo senador.",
        "fonte": {
          "nome": "SBT News",
          "url": "https://sbtnews.sbt.com.br/noticia/eleicoes/cury-apoia-flavio-e-alerta-nao-e-cheque-em-branco"
        }
      }
    ],
    "crencas": {
      "espectro": "Centro-direita",
      "texto": "Apresentou-se como alternativa à polarização, com o lema \"mente capitalista e coração social\", defendendo responsabilidade fiscal, empreendedorismo e reformas no sistema político e no Judiciário. Deu ênfase a educação socioemocional, saúde mental e proteção às mulheres, e no 2º turno apoiou o candidato do PL.",
      "tags": [
        "Semipresidencialismo",
        "Empreendedorismo",
        "Saúde mental",
        "Educação integral",
        "Responsabilidade fiscal"
      ]
    },
    "propostas": [
      {
        "icone": "🏛️",
        "titulo": "Semipresidencialismo",
        "texto": "Presidente cuidaria das funções de Estado e um primeiro-ministro, apoiado pela maioria do Congresso, conduziria a administração cotidiana.",
        "fonte": {
          "nome": "Congresso em Foco",
          "url": "https://www.congressoemfoco.com.br/noticia/121272/augusto-cury-propoe-semipresidencialismo-e-mandato-de-8-anos-no-stf"
        }
      },
      {
        "icone": "⚖️",
        "titulo": "Mudanças no STF e fim da reeleição",
        "texto": "Mandato de 8 anos para ministros do Supremo, sem indicação pelo presidente, e mandato presidencial sem direito a reeleição.",
        "fonte": {
          "nome": "Congresso em Foco",
          "url": "https://www.congressoemfoco.com.br/noticia/121272/augusto-cury-propoe-semipresidencialismo-e-mandato-de-8-anos-no-stf"
        }
      },
      {
        "icone": "🚔",
        "titulo": "Segurança integrada",
        "texto": "Recriar o Ministério da Segurança Pública e integrar PF, polícias estaduais e guardas municipais, com foco no patrimônio das facções.",
        "fonte": {
          "nome": "Congresso em Foco",
          "url": "https://www.congressoemfoco.com.br/noticia/121272/augusto-cury-propoe-semipresidencialismo-e-mandato-de-8-anos-no-stf"
        }
      },
      {
        "icone": "💼",
        "titulo": "Empreendedorismo",
        "texto": "Criar 10 mil clubes de empreendedorismo e um banco para pequenos negócios, com crédito de até R$ 20 mil.",
        "fonte": {
          "nome": "Congresso em Foco",
          "url": "https://www.congressoemfoco.com.br/noticia/121272/augusto-cury-propoe-semipresidencialismo-e-mandato-de-8-anos-no-stf"
        }
      },
      {
        "icone": "🎓",
        "titulo": "Educação",
        "texto": "Ampliar o ensino em tempo integral, incluir gestão da emoção e educação financeira no currículo e aproximar o ensino médio da formação técnica.",
        "fonte": {
          "nome": "Congresso em Foco",
          "url": "https://www.congressoemfoco.com.br/noticia/121272/augusto-cury-propoe-semipresidencialismo-e-mandato-de-8-anos-no-stf"
        }
      },
      {
        "icone": "🛡️",
        "titulo": "Mulheres Vivas",
        "texto": "Programa contra o feminicídio, com botões de emergência georreferenciados e prioridade a vítimas em emprego e microcrédito.",
        "fonte": {
          "nome": "Congresso em Foco",
          "url": "https://www.congressoemfoco.com.br/noticia/121272/augusto-cury-propoe-semipresidencialismo-e-mandato-de-8-anos-no-stf"
        }
      }
    ],
    "realizacoes": [
      {
        "ano": "—",
        "titulo": "Obra literária",
        "texto": "Autor de livros como \"O Vendedor de Sonhos\" e \"Ansiedade\"; segundo seu site, são mais de 40 milhões de exemplares vendidos no Brasil e edições em mais de 70 países.",
        "fonte": {
          "nome": "CNN Brasil",
          "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-o-escritor-augusto-cury-candidato-do-avante-a-presidencia/"
        }
      },
      {
        "ano": "2010",
        "titulo": "Escola da Inteligência",
        "texto": "Programa de educação socioemocional aplicado em escolas privadas e redes públicas municipais.",
        "fonte": {
          "nome": "Gazeta do Povo",
          "url": "https://www.gazetadopovo.com.br/ideias/como-augusto-cury-ergueu-imperio-comercial-com-teoria-controversa"
        }
      },
      {
        "ano": "2020",
        "titulo": "Venda à Arco Educação",
        "texto": "A Arco adquiriu 60% do negócio privado da Escola da Inteligência por R$ 288 milhões; o programa atendia cerca de 330 mil alunos em 900 escolas.",
        "fonte": {
          "nome": "Arco Platform (comunicado ao mercado, via Stock Titan)",
          "url": "https://www.stocktitan.net/news/ARCE/arco-platform-limited-closes-the-acquisition-of-escola-da-u9tp74lbotjp.html"
        }
      },
      {
        "ano": "—",
        "titulo": "Adaptação para o cinema",
        "texto": "O livro \"O Vendedor de Sonhos\" foi levado ao cinema pela Warner, com direção de Jayme Monjardim.",
        "fonte": {
          "nome": "CNN Brasil",
          "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-o-escritor-augusto-cury-candidato-do-avante-a-presidencia/"
        }
      }
    ],
    "controversias": [
      {
        "titulo": "Doutorado informado no plano de governo",
        "ano": "2026",
        "status": "info",
        "statusLabel": "Divergência apontada pela imprensa",
        "texto": "O plano entregue ao TSE cita um doutorado em \"Psicologia Multifocal\" pela Florida Christian University, mas o currículo Lattes registra, na mesma instituição, um PhD em Administração (2013). Cury afirma que não apresenta o título como doutorado acadêmico em Psicologia.",
        "fonte": {
          "nome": "Gazeta do Povo",
          "url": "https://www.gazetadopovo.com.br/ideias/como-augusto-cury-ergueu-imperio-comercial-com-teoria-controversa"
        },
        "fontesExtras": [
          {
            "nome": "A Tarde",
            "url": "https://atarde.com.br/eleicoes/augusto-cury-diz-ter-doutorado-nao-feito-em-plano-de-governo-1400487"
          }
        ]
      },
      {
        "titulo": "Base científica da Teoria da Inteligência Multifocal",
        "ano": "2026",
        "status": "info",
        "statusLabel": "Questionamento acadêmico",
        "texto": "Psiquiatras ouvidos pela imprensa afirmaram que a teoria que fundamenta seus livros e programas não passou por validação em revistas científicas e não é usada na prática clínica. Cury sustenta que se trata de uma construção própria, desenvolvida ao longo da carreira.",
        "fonte": {
          "nome": "Gazeta do Povo",
          "url": "https://www.gazetadopovo.com.br/ideias/como-augusto-cury-ergueu-imperio-comercial-com-teoria-controversa"
        }
      }
    ],
    "realizacoesNota": "Nunca exerceu mandato eletivo nem cargo público; 2026 foi sua primeira disputa eleitoral. As realizações listadas são profissionais.",
    "fontesGerais": [
      {
        "nome": "CNN Brasil — Quem é o escritor Augusto Cury",
        "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-o-escritor-augusto-cury-candidato-do-avante-a-presidencia/"
      },
      {
        "nome": "Congresso em Foco — plano de governo",
        "url": "https://www.congressoemfoco.com.br/noticia/121272/augusto-cury-propoe-semipresidencialismo-e-mandato-de-8-anos-no-stf"
      },
      {
        "nome": "O Povo (Agência Estado) — convenção do Avante",
        "url": "https://www.opovo.com.br/noticias/politica/2026/08/03/augusto-cury-propoe-semipresidencialismo-e-diz-que-chamaria-tarcisio-para-ser-primeiro-ministro.html"
      },
      {
        "nome": "CNN Brasil — cancelamento de debate e 2º turno",
        "url": "https://www.cnnbrasil.com.br/eleicoes/cury-avalia-pedir-adiamento-da-eleicao-e-descarta-apoiar-lula-ou-flavio/"
      },
      {
        "nome": "RTP / Lusa — apoio a Flávio Bolsonaro",
        "url": "https://www.rtp.pt/noticias/mundo/augusto-cury-declara-apoio-a-flavio-bolsonaro-que-promete-cumprir-lista-de-exigencias_n1770534"
      },
      {
        "nome": "Brazil Journal — negociação com a Arco (2020)",
        "url": "https://braziljournal.com/exclusivo-arco-negocia-a-escola-da-inteligencia-de-augusto-cury"
      }
    ]
  },
  {
    "slug": "pablo-marcal",
    "tse_id": "280002553884",
    "numero": 28,
    "urna": "Pablo Marçal",
    "nome": "Pablo Henrique Costa Marçal",
    "partido": "PRTB",
    "partidoNome": "Partido Renovador Trabalhista Brasileiro",
    "cor": "#15803d",
    "wiki": "Pablo_Marçal",
    "frase": "Empresário e influenciador digital; teve o registro negado pelo TSE em 2026.",
    "resumo": "Goiano, formado em Direito, ganhou projeção nas redes sociais com cursos de desenvolvimento pessoal e negócios digitais. Disputou a Prefeitura de São Paulo em 2024 pelo PRTB e ficou em 3º lugar, com 28,14% dos votos válidos. Condenado pela Justiça Eleitoral paulista por condutas daquela campanha, está inelegível até 2032. Em setembro de 2026, o TSE negou por unanimidade o registro de sua candidatura à Presidência, e o PRTB indicou outro nome.",
    "trajetoria": [
      {
        "ano": "1987",
        "texto": "Nasce em Goiânia, Goiás.",
        "fonte": {
          "nome": "InfoMoney",
          "url": "https://infomoney.com.br/politica/coach-influencer-e-outsider-quem-e-pablo-marcal-pre-candidato-a-prefeitura-de-sp/"
        }
      },
      {
        "ano": "2010",
        "texto": "É condenado pela Justiça Federal em Goiás por furto qualificado, em caso de fraudes bancárias de meados dos anos 2000; a pena foi declarada prescrita em 2018.",
        "fonte": {
          "nome": "InfoMoney",
          "url": "https://www.infomoney.com.br/?p=2560546"
        }
      },
      {
        "ano": "2022",
        "texto": "Pré-candidato à Presidência pelo PROS, desiste após disputa interna no partido e concorre a deputado federal por SP; obtém cerca de 243 mil votos, mas o TSE nega o registro.",
        "fonte": {
          "nome": "InfoMoney",
          "url": "https://infomoney.com.br/politica/coach-influencer-e-outsider-quem-e-pablo-marcal-pre-candidato-a-prefeitura-de-sp/"
        }
      },
      {
        "ano": "2024",
        "texto": "Candidato a prefeito de São Paulo pelo PRTB, fica em 3º lugar no 1º turno, com 28,14% dos votos válidos.",
        "fonte": {
          "nome": "Agência Brasil",
          "url": "https://agenciabrasil.ebc.com.br/politica/noticia/2024-10/nunes-e-boulos-seguem-para-segundo-turno-em-sao-paulo"
        }
      },
      {
        "ano": "2025",
        "texto": "Recebe as primeiras condenações da Justiça Eleitoral de SP à inelegibilidade por condutas na campanha municipal.",
        "fonte": {
          "nome": "Agência Brasil",
          "url": "https://agenciabrasil.ebc.com.br/justica/noticia/2025-02/influenciador-pablo-marcal-e-condenado-oito-anos-de-inelegibilidade"
        }
      },
      {
        "ano": "2026",
        "texto": "Em agosto, amparado por liminar sobre sua filiação, tem a candidatura à Presidência registrada pelo PRTB.",
        "fonte": {
          "nome": "Estado de Minas",
          "url": "https://www.em.com.br/politica/2026/08/7480870-marcal-registra-candidatura-a-presidencia-e-declara-patrimonio-de-rs-74-bi.html"
        }
      },
      {
        "ano": "2026",
        "texto": "Em 11 de setembro, o TSE indefere o registro por 7 votos a 0; em 14 de setembro, o PRTB o substitui por Leonardo Avalanche.",
        "fonte": {
          "nome": "Agência Brasil",
          "url": "https://agenciabrasil.ebc.com.br/politica/noticia/2026-09/tse-rejeita-por-unanimidade-o-registro-de-candidatura-de-pablo-marcal"
        }
      }
    ],
    "crencas": {
      "espectro": "Direita",
      "texto": "Concorre por um partido que se define como conservador nos costumes e defensor da liberdade econômica. Tem o empreendedorismo como principal bandeira e, na campanha de 2024, defendeu gestão pública digital e ampliação da guarda municipal.",
      "tags": [
        "Empreendedorismo",
        "Liberdade econômica",
        "Conservadorismo",
        "Governo digital",
        "Segurança pública"
      ]
    },
    "propostas": [
      {
        "icone": "🚀",
        "titulo": "Empreendedorismo",
        "texto": "Ao anunciar a pré-candidatura presidencial, apontou o empreendedorismo como caminho para o desenvolvimento econômico.",
        "fonte": {
          "nome": "InfoMoney",
          "url": "https://www.infomoney.com.br/politica/pablo-marcal-confirma-que-pretende-disputar-a-presidencia-em-2026-serei-candidato/"
        }
      },
      {
        "icone": "📱",
        "titulo": "Prefeitura digital (SP, 2024)",
        "texto": "Digitalizar serviços, integrar dados municipais e ampliar as subprefeituras de 32 para 96.",
        "fonte": {
          "nome": "InfoMoney",
          "url": "https://www.infomoney.com.br/?p=2618301"
        }
      },
      {
        "icone": "🚔",
        "titulo": "Guarda municipal (SP, 2024)",
        "texto": "Triplicar o efetivo da GCM, de 7 mil para 21 mil agentes, com central integrada de operações.",
        "fonte": {
          "nome": "InfoMoney",
          "url": "https://www.infomoney.com.br/?p=2618301"
        }
      },
      {
        "icone": "🚡",
        "titulo": "Teleféricos (SP, 2024)",
        "texto": "Rede de teleféricos ligando favelas e periferias entre si e a pontos estratégicos da cidade.",
        "fonte": {
          "nome": "InfoMoney",
          "url": "https://www.infomoney.com.br/?p=2618301"
        }
      },
      {
        "icone": "🎓",
        "titulo": "Escola e trabalho (SP, 2024)",
        "texto": "Incluir empreendedorismo e programação no currículo e criar programas de capacitação para jovens.",
        "fonte": {
          "nome": "O Povo",
          "url": "https://www.opovo.com.br/noticias/politica/eleicoes/2024/08/20/pablo-marcal-propostas-do-candidato-a-prefeito-de-sao-paulo-sp.html"
        }
      },
      {
        "icone": "🏙️",
        "titulo": "Arranha-céu de 1 km (SP, 2024)",
        "texto": "Construir em São Paulo um edifício de 1 km de altura, o mais alto do mundo.",
        "fonte": {
          "nome": "O Povo",
          "url": "https://www.opovo.com.br/noticias/politica/eleicoes/2024/08/20/pablo-marcal-propostas-do-candidato-a-prefeito-de-sao-paulo-sp.html"
        }
      }
    ],
    "realizacoes": [
      {
        "ano": "—",
        "titulo": "Negócios digitais",
        "texto": "Ganhou projeção nacional vendendo cursos de desenvolvimento pessoal pela internet.",
        "fonte": {
          "nome": "InfoMoney",
          "url": "https://infomoney.com.br/politica/coach-influencer-e-outsider-quem-e-pablo-marcal-pre-candidato-a-prefeitura-de-sp/"
        }
      },
      {
        "ano": "2026",
        "titulo": "Patrimônio declarado",
        "texto": "Declarou ao TSE R$ 7,4 bilhões em bens, majoritariamente aplicações financeiras, além de participações em empresas como a Marçal Holding.",
        "fonte": {
          "nome": "Estado de Minas",
          "url": "https://www.em.com.br/politica/2026/08/7480870-marcal-registra-candidatura-a-presidencia-e-declara-patrimonio-de-rs-74-bi.html"
        }
      }
    ],
    "controversias": [
      {
        "titulo": "Registro indeferido pelo TSE",
        "ano": "2026",
        "status": "info",
        "statusLabel": "Candidatura barrada (7 a 0)",
        "texto": "Em 11/09/2026, o TSE negou por unanimidade o registro, seguindo a relatora Estela Aranha, por dois motivos: inelegibilidade até 2032, decorrente de condenação da Justiça Eleitoral de São Paulo relativa às eleições de 2024, e falta de filiação válida ao PRTB no prazo legal (em abril ele estava filiado ao União Brasil). Antes, em agosto, o tribunal já o havia impedido de usar fundo eleitoral, fazer propaganda e ir a debates. A defesa classificou a decisão como injusta.",
        "fonte": {
          "nome": "Agência Brasil",
          "url": "https://agenciabrasil.ebc.com.br/politica/noticia/2026-09/tse-rejeita-por-unanimidade-o-registro-de-candidatura-de-pablo-marcal"
        },
        "fontesExtras": [
          {
            "nome": "SBT News (cautelar de agosto)",
            "url": "https://sbtnews.sbt.com.br/noticia/politica/tse-impede-marcal-de-usar-fundo-eleitoral-e-fazer-campanha"
          },
          {
            "nome": "SBT News (substituição por Leonardo Avalanche)",
            "url": "https://sbtnews.sbt.com.br/noticia/politica/prtb-lanca-avalanche-a-presidencia-apos-tse-recusar-marcal-1"
          }
        ]
      },
      {
        "titulo": "\"Campeonato de cortes\" — inelegibilidade até 2032",
        "ano": "2025–2026",
        "status": "multa",
        "statusLabel": "Inelegível e multado",
        "texto": "A Justiça Eleitoral de SP o condenou por uso indevido dos meios de comunicação na campanha de 2024, por promover concursos com prêmios para produção de vídeos de campanha. O TRE-SP manteve a inelegibilidade por oito anos e a multa de R$ 420 mil, e rejeitou recursos em agosto de 2026. A defesa sustenta que não houve prova de conteúdo eleitoral nos vídeos.",
        "fonte": {
          "nome": "SBT News",
          "url": "https://sbtnews.sbt.com.br/noticia/politica/tre-sp-rejeita-recursos-de-marcal-e-mantem-inelegibilidade"
        }
      },
      {
        "titulo": "Vídeos de apoio em troca de doações (Pix de R$ 5 mil)",
        "ano": "2025–2026",
        "status": "revertido",
        "statusLabel": "Revertido no TRE-SP",
        "texto": "Em fevereiro de 2025, a 1ª instância o declarou inelegível por oferecer vídeos de apoio a candidatos a vereador em troca de doação de R$ 5 mil à sua campanha. O TRE-SP reverteu essa condenação; a coligação autora recorreu ao TSE. Marçal afirma não ter gravado vídeo em troca de apoio financeiro.",
        "fonte": {
          "nome": "Agência Brasil",
          "url": "https://agenciabrasil.ebc.com.br/justica/noticia/2025-02/influenciador-pablo-marcal-e-condenado-oito-anos-de-inelegibilidade"
        },
        "fontesExtras": [
          {
            "nome": "Congresso em Foco",
            "url": "https://www.congressoemfoco.com.br/noticia/121646/tre-sp-reverte-uma-das-condenacoes-que-tornaram-marcal-inelegivel"
          }
        ]
      },
      {
        "titulo": "Laudo falso contra Guilherme Boulos",
        "ano": "2024–2026",
        "status": "andamento",
        "statusLabel": "Ação penal suspensa; indenização em recurso",
        "texto": "Na véspera do 1º turno de 2024, divulgou laudo médico falso atribuindo uso de drogas a Boulos. A PF o indiciou; em 2026, um acordo suspendeu a ação penal por dois anos mediante condições, e a Justiça cível o condenou em 1ª instância a pagar R$ 100 mil. Marçal discorda da sentença e recorre.",
        "fonte": {
          "nome": "Agência Brasil",
          "url": "https://agenciabrasil.ebc.com.br/justica/noticia/2026-02/justica-condena-marcal-pagar-indenizacao-boulos-por-desinformacao"
        },
        "fontesExtras": [
          {
            "nome": "Agência Brasil (indiciamento pela PF)",
            "url": "https://agenciabrasil.ebc.com.br/politica/noticia/2024-11/pf-indicia-pablo-marcal-por-laudo-falso-contra-guilherme-boulos"
          },
          {
            "nome": "InfoMoney (acordo de suspensão)",
            "url": "https://www.infomoney.com.br/?p=3224479"
          }
        ]
      },
      {
        "titulo": "Difamação eleitoral contra Tabata Amaral",
        "ano": "2025",
        "status": "multa",
        "statusLabel": "Condenado em 1ª instância",
        "texto": "A Justiça Eleitoral de SP o condenou por difamação após declarações em podcast que responsabilizavam a deputada pela morte do pai. A pena foi convertida em pagamentos que somam 235 salários mínimos. A assessoria não se manifestou à época.",
        "fonte": {
          "nome": "SBT News",
          "url": "https://sbtnews.sbt.com.br/noticia/politica/pablo-marcal-e-condenado-a-pagar-mais-de-r-280-mil-a-tabata-amaral-por-difamacao-1"
        }
      },
      {
        "titulo": "Denúncia por ofensas a José Luiz Datena",
        "ano": "2025",
        "status": "info",
        "statusLabel": "Denunciado pelo MP Eleitoral",
        "texto": "O Ministério Público Eleitoral de SP o denunciou por injúria e difamação por acusações feitas a Datena em transmissões nas redes durante a campanha de 2024. Ele não se manifestou à época.",
        "fonte": {
          "nome": "Agência Brasil",
          "url": "https://agenciabrasil.ebc.com.br/politica/noticia/2025-11/pablo-marcal-e-denunciado-por-injuria-e-difamacao-contra-datena"
        }
      },
      {
        "titulo": "Fraudes bancárias nos anos 2000",
        "ano": "2010–2018",
        "status": "arquivado",
        "statusLabel": "Pena extinta por prescrição",
        "texto": "Condenado em 2010 a 4 anos e 5 meses por furto qualificado ligado a um grupo que desviava dinheiro de contas bancárias pela internet. Em 2018, o TRF-1 declarou a pena prescrita. Marçal diz que prestava apenas serviços técnicos e não sabia das ilegalidades.",
        "fonte": {
          "nome": "InfoMoney",
          "url": "https://www.infomoney.com.br/?p=2560546"
        },
        "fontesExtras": [
          {
            "nome": "Diário do Grande ABC (Agência Estado)",
            "url": "https://www.dgabc.com.br/Noticia/4163742/qual-a-participacao-de-marcal-em-furto-a-banco-e-por-que-o-caso-prescreveu-entenda"
          }
        ]
      }
    ],
    "realizacoesNota": "Nunca exerceu mandato eletivo nem cargo público. Não foi localizado em fonte jornalística o conteúdo do plano de governo registrado em 2026; as propostas marcadas \"SP, 2024\" são do plano para a Prefeitura de São Paulo.",
    "fontesGerais": [
      {
        "nome": "Agência Brasil — PRTB lança Marçal à Presidência",
        "url": "https://agenciabrasil.ebc.com.br/politica/noticia/2026-08/prtb-traz-pablo-marcal-para-disputar-presidencia"
      },
      {
        "nome": "Agência Brasil — TSE nega registro a deputado federal (2022)",
        "url": "https://agenciabrasil.ebc.com.br/justica/noticia/2022-10/ministro-do-tse-nega-registro-de-marcal-e-deputado-do-pt-e-eleito"
      },
      {
        "nome": "SBT News — TSE forma maioria contra o registro",
        "url": "https://sbtnews.sbt.com.br/noticia/eleicoes/tse-forma-maioria-para-barrar-candidatura-de-pablo-marcal"
      },
      {
        "nome": "InfoMoney — perfil (2024)",
        "url": "https://infomoney.com.br/politica/coach-influencer-e-outsider-quem-e-pablo-marcal-pre-candidato-a-prefeitura-de-sp/"
      }
    ]
  },
  {
    "slug": "clariana-barao",
    "tse_id": "280002552484",
    "numero": 27,
    "urna": "Clariana Barão",
    "nome": "Clariana Zacarkim Barão",
    "partido": "DC",
    "partidoNome": "Democracia Cristã",
    "cor": "#2563eb",
    "wiki": null,
    "frase": "Advogada mato-grossense que disputou sua primeira eleição já para a Presidência.",
    "resumo": "Natural de Cuiabá, é advogada formada pelo Univag, com atuação em direito administrativo e gestão pública, e presidiu a Comissão de Solidariedade e Assistência Social da OAB de Várzea Grande. Assumiu em 2026 o comando do DC em Mato Grosso e foi escolhida candidata do partido após a desistência de Joaquim Barbosa, a primeira vez desde 1995 que o DC lançou à Presidência um nome diferente de José Maria Eymael. Formou uma chapa só de mulheres, com Fabiana Torquato como vice, e terminou o 1º turno em 9º lugar. No 2º turno, declarou apoio a Flávio Bolsonaro.",
    "trajetoria": [
      {
        "ano": "1987",
        "texto": "Nasce em Cuiabá, Mato Grosso.",
        "fonte": {
          "nome": "Agência Brasil, via Acessa.com (17/09/2026)",
          "url": "https://www.acessa.com/politica/2026/09/339917-clariana-barao-prioriza-propostas-de-protecao-a-mulher-e-a-infancia.html"
        }
      },
      {
        "ano": "Formação",
        "texto": "Gradua-se em Direito pelo Centro Universitário de Várzea Grande (Univag); depois se especializa em direito administrativo e gestão pública.",
        "fonte": {
          "nome": "Agência Brasil (17/08/2026)",
          "url": "https://agenciabrasil.ebc.com.br/politica/noticia/2026-08/clariana-barao-e-candidata-do-democracia-crista-presidencia"
        }
      },
      {
        "ano": "Antes de 2026",
        "texto": "Preside a Comissão de Solidariedade e Assistência Social da OAB de Várzea Grande.",
        "fonte": {
          "nome": "Congresso em Foco (06/08/2026)",
          "url": "https://www.congressoemfoco.com.br/noticia/121056/dc-define-chapa-feminina-com-a-advogada-clariana-barao-para-presidente"
        }
      },
      {
        "ano": "2024",
        "texto": "Coordena um grupo de voluntários que ajudou vítimas das enchentes no Rio Grande do Sul.",
        "fonte": {
          "nome": "Agência Brasil (17/08/2026)",
          "url": "https://agenciabrasil.ebc.com.br/politica/noticia/2026-08/clariana-barao-e-candidata-do-democracia-crista-presidencia"
        }
      },
      {
        "ano": "2026",
        "texto": "Assume a presidência do diretório estadual do DC em Mato Grosso.",
        "fonte": {
          "nome": "Agência Brasil (17/08/2026)",
          "url": "https://agenciabrasil.ebc.com.br/politica/noticia/2026-08/clariana-barao-e-candidata-do-democracia-crista-presidencia"
        }
      },
      {
        "ano": "2026",
        "texto": "Oficializada candidata à Presidência na convenção do DC em São Paulo (5/8), em chapa só de mulheres, com Fabiana Torquato como vice.",
        "fonte": {
          "nome": "Congresso em Foco (06/08/2026)",
          "url": "https://www.congressoemfoco.com.br/noticia/121056/dc-define-chapa-feminina-com-a-advogada-clariana-barao-para-presidente"
        }
      },
      {
        "ano": "2026",
        "texto": "Fica em 9º lugar no 1º turno (0,03% dos votos válidos) e, em 7/10, anuncia apoio a Flávio Bolsonaro no 2º turno.",
        "fonte": {
          "nome": "Imirante (07/10/2026)",
          "url": "https://m.imirante.com/noticias/brasil/2026/10/07/ipolitica-clariana-barao-apoia-flavio-bolsonaro-eleicoes-2026"
        }
      }
    ],
    "crencas": {
      "espectro": "Centro-direita",
      "texto": "Em entrevista, definiu-se como de centro-direita, mas disse que adotaria propostas da esquerda que considera boas, como cotas para mulheres no Parlamento. Coloca a proteção de mulheres e crianças no centro do programa, defende a conciliação política, a responsabilidade fiscal e a revisão de despesas obrigatórias, e se disse favorável a processos de impeachment de ministros do STF.",
      "tags": [
        "Mulheres e crianças",
        "Primeira infância",
        "Responsabilidade fiscal",
        "Pequenos negócios",
        "Conciliação"
      ]
    },
    "propostas": [
      {
        "icone": "👩‍👧",
        "titulo": "Mulheres e crianças em primeiro lugar",
        "texto": "Rede nacional integrada de proteção contra a violência, autonomia econômica das mulheres com crédito e qualificação, e a primeira infância como prioridade nacional.",
        "fonte": {
          "nome": "TSE — Propostas de governo de Clariana Barão",
          "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/clariana-barao-propostas-de-governo"
        }
      },
      {
        "icone": "💼",
        "titulo": "Pequenos negócios",
        "texto": "Simplificar regras, digitalizar a abertura de empresas e ampliar o crédito com garantias para pequenos empreendedores.",
        "fonte": {
          "nome": "Agência Brasil, via Acessa.com (17/09/2026)",
          "url": "https://www.acessa.com/politica/2026/09/339917-clariana-barao-prioriza-propostas-de-protecao-a-mulher-e-a-infancia.html"
        }
      },
      {
        "icone": "🚔",
        "titulo": "Segurança com inteligência",
        "texto": "Combate ao narcotráfico e ao tráfico de armas com inteligência, monitoramento das fronteiras e rastreamento do dinheiro das facções.",
        "fonte": {
          "nome": "TSE — Propostas de governo de Clariana Barão",
          "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/clariana-barao-propostas-de-governo"
        }
      },
      {
        "icone": "🩺",
        "titulo": "Saúde",
        "texto": "Reforçar a atenção primária e usar telemedicina e regulação digital para organizar as filas do SUS.",
        "fonte": {
          "nome": "TSE — Propostas de governo de Clariana Barão",
          "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/clariana-barao-propostas-de-governo"
        }
      },
      {
        "icone": "📊",
        "titulo": "Gastos públicos",
        "texto": "Reforma fiscal e administrativa, com revisão contínua de despesas obrigatórias e de subsídios e combate a fraudes em pagamentos, especialmente na Previdência.",
        "fonte": {
          "nome": "SBT News (06/09/2026)",
          "url": "https://sbtnews.sbt.com.br/noticia/eleicoes/candidata-do-dc-defende-impeachment-de-ministros-do-stf"
        }
      },
      {
        "icone": "🌾",
        "titulo": "Agro e exportações",
        "texto": "Colocar a negociação sobre o tarifaço americano entre as prioridades dos 100 primeiros dias e reduzir a burocracia para exportar.",
        "fonte": {
          "nome": "Jovem Pan (02/08/2026)",
          "url": "https://jovempan.com.br/colunistas/bruno-pinheiro/pre-candidata-do-dc-clariana-barao-prega-brasil-de-conciliacao-e-critica-postura-do-governo-com-o-agronegocio/"
        }
      }
    ],
    "realizacoes": [
      {
        "ano": "Antes de 2026",
        "titulo": "Comissão da OAB em Várzea Grande",
        "texto": "Presidiu a Comissão de Solidariedade e Assistência Social da subseção da OAB em Várzea Grande (MT).",
        "fonte": {
          "nome": "Agência Brasil (17/08/2026)",
          "url": "https://agenciabrasil.ebc.com.br/politica/noticia/2026-08/clariana-barao-e-candidata-do-democracia-crista-presidencia"
        }
      },
      {
        "ano": "2024",
        "titulo": "Ajuda às vítimas das enchentes no RS",
        "texto": "Coordenou um grupo de voluntários que prestou auxílio às vítimas das enchentes no Rio Grande do Sul.",
        "fonte": {
          "nome": "Agência Brasil (17/08/2026)",
          "url": "https://agenciabrasil.ebc.com.br/politica/noticia/2026-08/clariana-barao-e-candidata-do-democracia-crista-presidencia"
        }
      }
    ],
    "controversias": [],
    "realizacoesNota": "Nunca exerceu mandato eletivo nem cargo no Executivo; 2026 foi a primeira eleição que disputou. Os itens acima referem-se à atuação profissional e voluntária.",
    "fontesGerais": [
      {
        "nome": "Agência Brasil (17/08/2026)",
        "url": "https://agenciabrasil.ebc.com.br/politica/noticia/2026-08/clariana-barao-e-candidata-do-democracia-crista-presidencia"
      },
      {
        "nome": "Congresso em Foco (06/08/2026)",
        "url": "https://www.congressoemfoco.com.br/noticia/121056/dc-define-chapa-feminina-com-a-advogada-clariana-barao-para-presidente"
      },
      {
        "nome": "Metrópoles (05/08/2026)",
        "url": "https://www.metropoles.com/brasil/dc-lanca-clariana-barao-como-candidata-a-presidencia-da-republica"
      },
      {
        "nome": "TSE — Propostas de governo de Clariana Barão",
        "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/clariana-barao-propostas-de-governo"
      },
      {
        "nome": "O Povo — apuração do 1º turno (04/10/2026)",
        "url": "https://www.opovo.com.br/aovivo/2026/10/04/apuracao-da-eleicao-2026-para-presidente-ao-vivo.html"
      },
      {
        "nome": "Imirante (13/10/2026)",
        "url": "https://m.imirante.com/noticias/brasil/2026/10/13/ipolitica-eleicoes-presidenciais-2026-veja-apoios-2-turno"
      }
    ]
  },
  {
    "slug": "wilson-grassi",
    "tse_id": "280002548139",
    "numero": 35,
    "urna": "Veterinário Wilson Grassi",
    "nome": "Wilson Grassi Júnior",
    "partido": "DEMOCRATA",
    "partidoNome": "Democrata",
    "cor": "#0ea5e9",
    "wiki": "Wilson_Grassi",
    "frase": "Veterinário paulistano que levou a causa animal à disputa presidencial.",
    "resumo": "Nascido em São Paulo, é médico veterinário e empresário, com atuação na causa animal: foi conselheiro da Anclivepa-SP no projeto do primeiro hospital público para cães e gatos do país, no Tatuapé. Antes de 2026, disputou sem sucesso eleições para deputado estadual, deputado federal e vereador por PFL, PV e PRTB. Foi o primeiro candidato próprio ao Planalto do Democrata, antigo Partido da Mulher Brasileira (PMB), tendo como vice a presidente da sigla, Suêd Haidar. Terminou o 1º turno em 11º lugar.",
    "trajetoria": [
      {
        "ano": "1970",
        "texto": "Nasce em São Paulo (SP), em 13 de março.",
        "fonte": {
          "nome": "Jovem Pan (08/09/2026)",
          "url": "https://jovempan.com.br/?p=278345"
        }
      },
      {
        "ano": "2006",
        "texto": "Primeira candidatura: deputado estadual por São Paulo pelo PFL; não é eleito.",
        "fonte": {
          "nome": "Jovem Pan (08/09/2026)",
          "url": "https://jovempan.com.br/?p=278345"
        }
      },
      {
        "ano": "Anos 2010",
        "texto": "Como conselheiro da Anclivepa-SP, atua na implantação e gestão do primeiro hospital público para cães e gatos do país, no Tatuapé (SP).",
        "fonte": {
          "nome": "Agência Brasil, via TNH1 (02/08/2026)",
          "url": "https://www.tnh1.com.br/noticia/nid/democrata-define-wilson-grassi-junior-candidato-a-presidencia/"
        }
      },
      {
        "ano": "2022",
        "texto": "Candidato a deputado federal pelo PV; recebe 6.580 votos e não é eleito.",
        "fonte": {
          "nome": "Congresso em Foco (04/08/2026)",
          "url": "https://www.congressoemfoco.com.br/noticia/120990/democrata-antigo-pmb-lanca-candidatura-de-wilson-grassi-ao-planalto"
        }
      },
      {
        "ano": "2024",
        "texto": "Candidato a vereador de São Paulo pelo PRTB; recebe 2.777 votos e não é eleito.",
        "fonte": {
          "nome": "Congresso em Foco (04/08/2026)",
          "url": "https://www.congressoemfoco.com.br/noticia/120990/democrata-antigo-pmb-lanca-candidatura-de-wilson-grassi-ao-planalto"
        }
      },
      {
        "ano": "2026",
        "texto": "Oficializado candidato à Presidência na convenção do Democrata no Rio de Janeiro (2/8), a primeira candidatura própria do partido ao cargo; a vice é Suêd Haidar.",
        "fonte": {
          "nome": "Agência Brasil, via Acessa.com (18/08/2026)",
          "url": "https://www.acessa.com/politica/2026/08/337239-democrata-tem-veterinario-wilson-grassi-na-disputa-presidencial.html"
        }
      },
      {
        "ano": "2026",
        "texto": "Termina o 1º turno em 11º lugar, com 0,01% dos votos válidos.",
        "fonte": {
          "nome": "O Povo — apuração do 1º turno (04/10/2026)",
          "url": "https://www.opovo.com.br/aovivo/2026/10/04/apuracao-da-eleicao-2026-para-presidente-ao-vivo.html"
        }
      }
    ],
    "crencas": {
      "espectro": "Não autodeclarado",
      "texto": "Seu plano de governo une simplificação tributária e desoneração da folha a medidas mais rígidas contra facções criminosas. A causa animal é central na candidatura: o programa integra saúde humana, animal e ambiental e propõe reforçar a defesa sanitária da agropecuária.",
      "tags": [
        "Causa animal",
        "Imposto único",
        "Desoneração da folha",
        "Segurança pública",
        "Defesa agropecuária"
      ]
    },
    "propostas": [
      {
        "icone": "🧾",
        "titulo": "Imposto Único Federal",
        "texto": "Trocar nove tributos federais por um imposto sobre movimentação financeira, isentar do IR quem ganha até cinco salários mínimos e acabar com a contribuição patronal sobre a folha.",
        "fonte": {
          "nome": "Agência Brasil, via Diário do Grande ABC (20/09/2026)",
          "url": "https://www.dgabc.com.br/Noticia/4348032/wilson-grassi-defende-imposto-unico-e-mais-rigor-contra-faccoes"
        }
      },
      {
        "icone": "🚔",
        "titulo": "Combate às facções",
        "texto": "Mais presídios federais de segurança máxima com bloqueio de celular, asfixia financeira do crime organizado e plebiscito sobre um modelo de encarceramento em larga escala inspirado em El Salvador.",
        "fonte": {
          "nome": "Agência Brasil, via Diário do Grande ABC (20/09/2026)",
          "url": "https://www.dgabc.com.br/Noticia/4348032/wilson-grassi-defende-imposto-unico-e-mais-rigor-contra-faccoes"
        }
      },
      {
        "icone": "🐾",
        "titulo": "Saúde Única e causa animal",
        "texto": "Integrar saúde humana, animal e ambiental, criar programa nacional de vigilância de zoonoses e ampliar o cadastro nacional de animais domésticos (SinPatinhas).",
        "fonte": {
          "nome": "TSE — Propostas de governo de Wilson Grassi",
          "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/wilson-grassi"
        }
      },
      {
        "icone": "🏥",
        "titulo": "Fila única na saúde",
        "texto": "Fila nacional e pública para cirurgias e exames eletivos, com critérios clínicos e consulta pelo próprio paciente.",
        "fonte": {
          "nome": "Agência Brasil, via Diário do Grande ABC (20/09/2026)",
          "url": "https://www.dgabc.com.br/Noticia/4348032/wilson-grassi-defende-imposto-unico-e-mais-rigor-contra-faccoes"
        }
      },
      {
        "icone": "🏠",
        "titulo": "Moradia",
        "texto": "Usar o histórico de pagamento de aluguel como comprovação de renda para financiamento e promover a titulação em massa de moradias.",
        "fonte": {
          "nome": "Agência Brasil, via Diário do Grande ABC (20/09/2026)",
          "url": "https://www.dgabc.com.br/Noticia/4348032/wilson-grassi-defende-imposto-unico-e-mais-rigor-contra-faccoes"
        }
      },
      {
        "icone": "💉",
        "titulo": "\"Meu Botox, Minha Vida\"",
        "texto": "Proposta apresentada na campanha, mas fora do programa oficial: aplicação de toxina botulínica em mulheres de baixa renda com recursos públicos.",
        "fonte": {
          "nome": "Congresso em Foco (03/09/2026)",
          "url": "https://www.congressoemfoco.com.br/noticia/121928/candidato-a-presidencia-propoe-programa-meu-botox-minha-vida"
        }
      }
    ],
    "realizacoes": [
      {
        "ano": "Anos 2010",
        "titulo": "Hospital público veterinário",
        "texto": "Como conselheiro da Anclivepa-SP, participou do projeto de implantação e gestão do primeiro hospital público para cães e gatos do país, no Tatuapé, zona leste de São Paulo.",
        "fonte": {
          "nome": "Agência Brasil, via TNH1 (02/08/2026)",
          "url": "https://www.tnh1.com.br/noticia/nid/democrata-define-wilson-grassi-junior-candidato-a-presidencia/"
        }
      }
    ],
    "controversias": [
      {
        "titulo": "Suspensão da campanha na internet pelo TSE",
        "ano": "2026",
        "status": "revertido",
        "statusLabel": "Decisão revista pelo próprio ministro",
        "texto": "Em 31/8, o ministro Dias Toffoli, do TSE, suspendeu a propaganda de Grassi na internet, os repasses do fundo eleitoral (FEFC) e a participação dele em debates, porque oito perfis de campanha foram informados à Justiça Eleitoral 17 dias depois do pedido de registro. A campanha chamou a medida de desproporcional e disse que recorreria. Em 2/9, depois dos esclarecimentos da defesa, Toffoli revogou a própria decisão e liberou a propaganda, os repasses e a ida a debates.",
        "fonte": {
          "nome": "Agência Brasil, via Acessa.com (03/09/2026)",
          "url": "https://www.acessa.com/noticias/2026/09/338657-toffoli-libera-propaganda-digital-do-candidato-a-presidente-grassi.html"
        }
      }
    ],
    "realizacoesNota": "Nunca ocupou cargo público. A realização listada refere-se à atuação profissional na causa animal.",
    "fontesGerais": [
      {
        "nome": "Congresso em Foco (04/08/2026)",
        "url": "https://www.congressoemfoco.com.br/noticia/120990/democrata-antigo-pmb-lanca-candidatura-de-wilson-grassi-ao-planalto"
      },
      {
        "nome": "Agência Brasil, via Acessa.com (18/08/2026)",
        "url": "https://www.acessa.com/politica/2026/08/337239-democrata-tem-veterinario-wilson-grassi-na-disputa-presidencial.html"
      },
      {
        "nome": "Jovem Pan (08/09/2026)",
        "url": "https://jovempan.com.br/?p=278345"
      },
      {
        "nome": "TSE — Propostas de governo de Wilson Grassi",
        "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/wilson-grassi"
      },
      {
        "nome": "Agência Brasil (31/08/2026)",
        "url": "https://agenciabrasil.ebc.com.br/justica/noticia/2026-08/toffoli-suspende-campanha-digital-de-grassi-presidencia"
      },
      {
        "nome": "Wikipédia — Wilson Grassi",
        "url": "https://pt.wikipedia.org/wiki/Wilson_Grassi"
      },
      {
        "nome": "Imirante (13/10/2026)",
        "url": "https://m.imirante.com/noticias/brasil/2026/10/13/ipolitica-eleicoes-presidenciais-2026-veja-apoios-2-turno"
      }
    ]
  },
  {
    "slug": "samara-martins",
    "tse_id": "280002538811",
    "numero": 80,
    "urna": "Samara",
    "nome": "Samara Martins da Silva Feitosa",
    "partido": "UP",
    "partidoNome": "Unidade Popular",
    "cor": "#e11d48",
    "wiki": "Samara_Martins",
    "frase": "Dentista do SUS e vice-presidente nacional da Unidade Popular.",
    "resumo": "Mineira de Belo Horizonte, formou-se em Odontologia pela UFRN e trabalha como dentista do SUS no Rio Grande do Norte. Começou a militar no movimento estudantil, foi diretora de mulheres da UNE e hoje é vice-presidente nacional da Unidade Popular. Já havia disputado a Câmara de Natal em 2020 e a Vice-Presidência em 2022, na chapa de Léo Péricles. Em 2026, encabeçou uma chapa só de mulheres, com Raquel Bricio como vice, e ficou em 7º lugar no 1º turno.",
    "trajetoria": [
      {
        "ano": "Juventude",
        "texto": "Inicia a militância no movimento estudantil secundarista em Belo Horizonte (AMES-BH) e depois é diretora de mulheres da UNE.",
        "fonte": {
          "nome": "CNN Brasil (07/04/2026)",
          "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-samara-martins-unica-pre-candidata-mulher-a-presidencia/"
        }
      },
      {
        "ano": "Formação",
        "texto": "Forma-se em Odontologia pela Universidade Federal do Rio Grande do Norte (UFRN) e passa a atuar como dentista no SUS.",
        "fonte": {
          "nome": "Agência Brasil, via Acessa.com (18/08/2026)",
          "url": "https://www.acessa.com/politica/2026/08/amp/337273-samara-martins-e-a-candidata-do-unidade-popular-ao-pleito-presidencial.html"
        }
      },
      {
        "ano": "2020",
        "texto": "Candidata a vereadora em Natal (RN); não é eleita.",
        "fonte": {
          "nome": "O Povo (02/04/2026)",
          "url": "https://www.opovo.com.br/noticias/politica/eleicoes/2026/04/02/amp/pre-candidata-a-presidencia-pelo-up-samara-martins-defende-projeto-socialista-para-o-brasil.html"
        }
      },
      {
        "ano": "2022",
        "texto": "Candidata a vice-presidente na chapa de Léo Péricles (UP), que recebe 53.519 votos (0,05%) no 1º turno.",
        "fonte": {
          "nome": "Gazeta do Povo (10/04/2026)",
          "url": "https://www.gazetadopovo.com.br/eleicoes/2026/quem-e-samara-martins-pre-candidata-a-presidente-pelo-unidade-popular/"
        }
      },
      {
        "ano": "2026",
        "texto": "Em fevereiro, o diretório nacional da UP aprova por unanimidade sua pré-candidatura à Presidência.",
        "fonte": {
          "nome": "O Povo / Agência Estado (22/05/2026)",
          "url": "https://www.opovo.com.br/noticias/politica/2026/05/22/samara-martins-pre-candidata-a-presidencia-pelo-up-aparece-empatada-com-zema-em-pesquisa.html"
        }
      },
      {
        "ano": "2026",
        "texto": "Oficializada candidata em convenção na Universidade Zumbi dos Palmares, em São Paulo, com a sindicalista Raquel Bricio como vice.",
        "fonte": {
          "nome": "Diario de Pernambuco (26/07/2026)",
          "url": "https://www.diariodepernambuco.com.br/politica/2026/07/11719597-unidade-popular-oficializa-candidatura-de-samara-martins-a-presidencia-da-republica.html"
        }
      },
      {
        "ano": "2026",
        "texto": "Fica em 7º lugar no 1º turno (0,10% dos votos válidos); no 2º turno, a UP orienta o voto em Lula.",
        "fonte": {
          "nome": "Imirante (13/10/2026)",
          "url": "https://m.imirante.com/noticias/brasil/2026/10/13/ipolitica-eleicoes-presidenciais-2026-veja-apoios-2-turno"
        }
      }
    ],
    "crencas": {
      "espectro": "Esquerda (socialista)",
      "texto": "Defende um projeto socialista, com socialização das riquezas e dos meios de produção, estatização de setores estratégicos e do sistema financeiro, e oposição às privatizações. Prioriza direitos trabalhistas, combate à violência contra mulheres e população negra, e uma política externa anti-imperialista.",
      "tags": [
        "Socialismo",
        "Estatização",
        "Direitos trabalhistas",
        "Direitos das mulheres",
        "Anti-imperialismo"
      ]
    },
    "propostas": [
      {
        "icone": "💰",
        "titulo": "Salário e jornada",
        "texto": "Dobrar de imediato o salário mínimo, para R$ 3.242, acabar com a escala 6x1 e adotar a escala 4x3, com redução da jornada sem corte salarial.",
        "fonte": {
          "nome": "Agência Brasil, via Acessa.com (20/09/2026)",
          "url": "https://www.acessa.com/politica/2026/09/340244-samara-martins-propoe-dobrar-salario-minimo-e-instituir-escala-4x3.html"
        }
      },
      {
        "icone": "🏦",
        "titulo": "Bancos e dívida pública",
        "texto": "Nacionalizar os bancos, acabar com a autonomia do Banco Central e suspender o pagamento da dívida pública, com auditoria.",
        "fonte": {
          "nome": "Agência Brasil, via Acessa.com (20/09/2026)",
          "url": "https://www.acessa.com/politica/2026/09/340244-samara-martins-propoe-dobrar-salario-minimo-e-instituir-escala-4x3.html"
        }
      },
      {
        "icone": "🏭",
        "titulo": "Reestatização",
        "texto": "Petrobras e Eletrobras 100% estatais, retomada da Vale e de empresas de ferrovias, saneamento e telecomunicações, e fim das privatizações e dos leilões de petróleo.",
        "fonte": {
          "nome": "Agência Brasil, via Acessa.com (20/09/2026)",
          "url": "https://www.acessa.com/politica/2026/09/340244-samara-martins-propoe-dobrar-salario-minimo-e-instituir-escala-4x3.html"
        }
      },
      {
        "icone": "🛡️",
        "titulo": "Segurança pública",
        "texto": "Desmilitarizar as polícias, abandonar a política de guerra às drogas e reformular o sistema prisional.",
        "fonte": {
          "nome": "TSE — Propostas de governo de Samara Martins",
          "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/samara-propostas-de-governo"
        }
      },
      {
        "icone": "🎓",
        "titulo": "Educação",
        "texto": "Destinar 10% do PIB à educação pública, acabar com o vestibular e revogar o Novo Ensino Médio.",
        "fonte": {
          "nome": "TSE — Propostas de governo de Samara Martins",
          "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/samara-propostas-de-governo"
        }
      },
      {
        "icone": "♀️",
        "titulo": "Direitos das mulheres",
        "texto": "Criminalizar a misoginia, ampliar a rede de atendimento, criar uma rede pública de cuidados e legalizar o aborto.",
        "fonte": {
          "nome": "Agência Brasil, via Acessa.com (20/09/2026)",
          "url": "https://www.acessa.com/politica/2026/09/340244-samara-martins-propoe-dobrar-salario-minimo-e-instituir-escala-4x3.html"
        }
      }
    ],
    "realizacoes": [
      {
        "ano": "Atual",
        "titulo": "Dentista no SUS",
        "texto": "Atua como cirurgiã-dentista no programa Saúde da Família, no Rio Grande do Norte.",
        "fonte": {
          "nome": "O Povo / Agência Estado (22/05/2026)",
          "url": "https://www.opovo.com.br/noticias/politica/2026/05/22/samara-martins-pre-candidata-a-presidencia-pelo-up-aparece-empatada-com-zema-em-pesquisa.html"
        }
      },
      {
        "ano": "Movimento estudantil",
        "titulo": "Diretora de mulheres da UNE",
        "texto": "Integrou a diretoria da União Nacional dos Estudantes na pasta de mulheres.",
        "fonte": {
          "nome": "CNN Brasil (07/04/2026)",
          "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-samara-martins-unica-pre-candidata-mulher-a-presidencia/"
        }
      },
      {
        "ano": "Atual",
        "titulo": "Movimentos sociais",
        "texto": "Coordenadora nacional da Frente Negra Revolucionária e integrante do Movimento de Mulheres Olga Benário.",
        "fonte": {
          "nome": "O Povo / Agência Estado (22/05/2026)",
          "url": "https://www.opovo.com.br/noticias/politica/2026/05/22/samara-martins-pre-candidata-a-presidencia-pelo-up-aparece-empatada-com-zema-em-pesquisa.html"
        }
      }
    ],
    "controversias": [],
    "realizacoesNota": "Nunca exerceu mandato eletivo nem cargo público; perdeu as disputas de 2020 (vereadora em Natal) e 2022 (vice-presidente). Os itens acima referem-se à atuação profissional e de militância.",
    "fontesGerais": [
      {
        "nome": "CNN Brasil (07/04/2026)",
        "url": "https://www.cnnbrasil.com.br/eleicoes/quem-e-samara-martins-unica-pre-candidata-mulher-a-presidencia/"
      },
      {
        "nome": "CNN Brasil (27/07/2026)",
        "url": "https://www.cnnbrasil.com.br/eleicoes/up-oficializa-candidatura-de-samara-martins-a-presidencia/"
      },
      {
        "nome": "Diário do Nordeste (26/07/2026)",
        "url": "https://diariodonordeste.verdesmares.com.br/pontopoder/quem-e-samara-martins-candidata-da-up-a-presidencia-da-republica-em-2026-1.3779598"
      },
      {
        "nome": "Gazeta do Povo (10/04/2026)",
        "url": "https://www.gazetadopovo.com.br/eleicoes/2026/quem-e-samara-martins-pre-candidata-a-presidente-pelo-unidade-popular/"
      },
      {
        "nome": "Agência Brasil, via Acessa.com (18/08/2026)",
        "url": "https://www.acessa.com/politica/2026/08/amp/337273-samara-martins-e-a-candidata-do-unidade-popular-ao-pleito-presidencial.html"
      },
      {
        "nome": "TSE — Propostas de governo de Samara Martins",
        "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/samara-propostas-de-governo"
      },
      {
        "nome": "Wikipédia — Samara Martins",
        "url": "https://pt.wikipedia.org/wiki/Samara_Martins"
      },
      {
        "nome": "O Povo — apuração do 1º turno (04/10/2026)",
        "url": "https://www.opovo.com.br/aovivo/2026/10/04/apuracao-da-eleicao-2026-para-presidente-ao-vivo.html"
      }
    ]
  },
  {
    "slug": "edmilson-costa",
    "tse_id": "280002551975",
    "numero": 21,
    "urna": "Edmilson Costa",
    "nome": "Edmilson Silva Costa",
    "partido": "PCB",
    "partidoNome": "Partido Comunista Brasileiro",
    "cor": "#991b1b",
    "wiki": "Edmilson_Costa",
    "frase": "Economista maranhense e secretário-geral do PCB, em sua primeira disputa presidencial.",
    "resumo": "Natural de Pedreiras (MA), formou-se em Comunicação Social pela UFMA e trabalhou como jornalista antes de se doutorar em Economia pela Unicamp, onde também fez pós-doutorado. Militante do PCB desde o movimento estudantil dos anos 1970, é secretário-geral do partido desde 2016. Já havia disputado a Prefeitura de São Paulo (2008) e a Vice-Presidência (2010). Em 2026, encabeçou a chapa do PCB ao Planalto, com Cleusa Santos de vice, e ficou em 10º lugar no 1º turno.",
    "trajetoria": [
      {
        "ano": "Anos 1970",
        "texto": "Atua no movimento estudantil e passa a militar no PCB; segundo o partido, foi perseguido durante a ditadura militar.",
        "fonte": {
          "nome": "O Povo — PCB oficializa candidatura de Edmilson Costa à Presidência (01/08/2026)",
          "url": "https://www.opovo.com.br/noticias/politica/2026/08/01/pcb-oficializa-candidatura-de-edmilson-costa-a-presidencia.html"
        }
      },
      {
        "ano": "Anos 1990",
        "texto": "Conclui o doutorado em Economia na Unicamp, com tese sobre a política salarial brasileira.",
        "fonte": {
          "nome": "IstoÉ — Edmilson Costa (PCB) é candidato à Presidência em 2026",
          "url": "https://istoe.com.br/edmilson-costa-pcb-candidato-presidencia-2026"
        }
      },
      {
        "ano": "2008",
        "texto": "Candidato a prefeito de São Paulo pelo PCB; recebe cerca de 4,3 mil votos (0,07%).",
        "fonte": {
          "nome": "O Povo — PCB oficializa candidatura de Edmilson Costa à Presidência (01/08/2026)",
          "url": "https://www.opovo.com.br/noticias/politica/2026/08/01/pcb-oficializa-candidatura-de-edmilson-costa-a-presidencia.html"
        }
      },
      {
        "ano": "2010",
        "texto": "Candidato a vice-presidente na chapa de Ivan Pinheiro (PCB), que soma 39.136 votos (0,04%).",
        "fonte": {
          "nome": "O Povo — PCB oficializa candidatura de Edmilson Costa à Presidência (01/08/2026)",
          "url": "https://www.opovo.com.br/noticias/politica/2026/08/01/pcb-oficializa-candidatura-de-edmilson-costa-a-presidencia.html"
        }
      },
      {
        "ano": "2016",
        "texto": "Assume a secretaria-geral do PCB, sucedendo Ivan Pinheiro.",
        "fonte": {
          "nome": "Itatiaia — Conheça a carreira política de Edmilson Costa",
          "url": "https://www.itatiaia.com.br/politica/eleicoes/conheca-a-carreira-politica-de-edmilson-costa-pre-candidato-a-presidencia/"
        }
      },
      {
        "ano": "2026",
        "texto": "Lançado pré-candidato pelo Comitê Central do PCB em fevereiro; candidatura oficializada em convenção em 1º de agosto, com Cleusa Santos como vice.",
        "fonte": {
          "nome": "Metrópoles — Em convenção, PCB confirma Edmilson Costa como candidato (01/08/2026)",
          "url": "https://metropoles.com/brasil/em-convencao-pcb-confirma-edmilson-costa-como-candidato-a-presidencia"
        }
      },
      {
        "ano": "2026",
        "texto": "Termina o 1º turno da eleição presidencial em 10º lugar, com 0,02% dos votos válidos.",
        "fonte": {
          "nome": "O Povo — Apuração da eleição 2026 para presidente (04/10/2026)",
          "url": "https://www.opovo.com.br/aovivo/2026/10/04/apuracao-da-eleicao-2026-para-presidente-ao-vivo.html"
        }
      }
    ],
    "crencas": {
      "espectro": "Esquerda (comunista)",
      "texto": "Defende a superação do capitalismo e a construção do socialismo, com controle estatal do sistema financeiro e dos setores estratégicos da economia. Propõe ampliar a participação popular direta por meio de conselhos e orçamento deliberativo, além de uma política externa anti-imperialista.",
      "tags": [
        "Socialismo",
        "Estatização",
        "Poder popular",
        "Direitos trabalhistas",
        "Anti-imperialismo"
      ]
    },
    "propostas": [
      {
        "icone": "⏱️",
        "titulo": "Jornada de 30 horas",
        "texto": "Reduzir a jornada para 30 horas semanais sem corte de salário e acabar com a escala 6x1.",
        "fonte": {
          "nome": "TSE — Propostas de governo de Edmilson Costa (Eleições 2026)",
          "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/edmilson-costa-propostas-de-governo"
        }
      },
      {
        "icone": "🏦",
        "titulo": "Sistema financeiro estatal",
        "texto": "Estatizar bancos e sistema financeiro, criando um Banco dos Trabalhadores, e encerrar a autonomia do Banco Central.",
        "fonte": {
          "nome": "TSE/DivulgaCandContas — Programa do PCB para as eleições presidenciais de 2026",
          "url": "https://divulgacandcontas.tse.jus.br/divulga/rest/arquivo/doc/280017107286"
        }
      },
      {
        "icone": "📊",
        "titulo": "Dívida pública",
        "texto": "Auditar a dívida pública e suspender o pagamento de juros enquanto durar a auditoria.",
        "fonte": {
          "nome": "TSE — Propostas de governo de Edmilson Costa (Eleições 2026)",
          "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/edmilson-costa-propostas-de-governo"
        }
      },
      {
        "icone": "🏛️",
        "titulo": "Reforma do sistema político",
        "texto": "Convocar uma Constituinte de novo tipo, extinguir o Senado (Legislativo unicameral) e criar conselhos populares deliberativos.",
        "fonte": {
          "nome": "TSE/DivulgaCandContas — Programa do PCB para as eleições presidenciais de 2026",
          "url": "https://divulgacandcontas.tse.jus.br/divulga/rest/arquivo/doc/280017107286"
        }
      },
      {
        "icone": "🏥",
        "titulo": "Saúde e educação públicas",
        "texto": "Saúde e educação 100% públicas e gratuitas, com 10% do PIB para a saúde e fim do vestibular nas universidades federais.",
        "fonte": {
          "nome": "TSE — Propostas de governo de Edmilson Costa (Eleições 2026)",
          "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/edmilson-costa-propostas-de-governo"
        }
      },
      {
        "icone": "🌎",
        "titulo": "Política externa",
        "texto": "Romper relações com Israel, fortalecer ALBA e UNASUL e manter solidariedade a Cuba, Venezuela, Palestina e Irã.",
        "fonte": {
          "nome": "TSE — Propostas de governo de Edmilson Costa (Eleições 2026)",
          "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/edmilson-costa-propostas-de-governo"
        }
      }
    ],
    "realizacoes": [
      {
        "ano": "Anos 1990",
        "titulo": "Doutorado em Economia",
        "texto": "Doutor em Economia pela Unicamp, com pós-doutorado no Instituto de Filosofia e Ciências Humanas da mesma universidade.",
        "fonte": {
          "nome": "O Povo — PCB oficializa candidatura de Edmilson Costa à Presidência (01/08/2026)",
          "url": "https://www.opovo.com.br/noticias/politica/2026/08/01/pcb-oficializa-candidatura-de-edmilson-costa-a-presidencia.html"
        }
      },
      {
        "ano": "—",
        "titulo": "Obras publicadas",
        "texto": "Autor de livros como \"O Imperialismo\" e \"Reflexões Sobre a Crise Brasileira\", além de obras de poesia.",
        "fonte": {
          "nome": "Itatiaia — Conheça a carreira política de Edmilson Costa",
          "url": "https://www.itatiaia.com.br/politica/eleicoes/conheca-a-carreira-politica-de-edmilson-costa-pre-candidato-a-presidencia/"
        }
      },
      {
        "ano": "—",
        "titulo": "Instituto Caio Prado",
        "texto": "Diretor de pesquisa e formação do Instituto Caio Prado.",
        "fonte": {
          "nome": "Itatiaia — Conheça a carreira política de Edmilson Costa",
          "url": "https://www.itatiaia.com.br/politica/eleicoes/conheca-a-carreira-politica-de-edmilson-costa-pre-candidato-a-presidencia/"
        }
      },
      {
        "ano": "2016",
        "titulo": "Direção nacional do PCB",
        "texto": "Secretário-geral do Partido Comunista Brasileiro desde 2016.",
        "fonte": {
          "nome": "Itatiaia — Conheça a carreira política de Edmilson Costa",
          "url": "https://www.itatiaia.com.br/politica/eleicoes/conheca-a-carreira-politica-de-edmilson-costa-pre-candidato-a-presidencia/"
        }
      }
    ],
    "controversias": [],
    "realizacoesNota": "Nunca exerceu mandato público. A trajetória é acadêmica (economista e professor universitário), jornalística e de militância partidária no PCB.",
    "fontesGerais": [
      {
        "nome": "O Povo — PCB oficializa candidatura de Edmilson Costa à Presidência (01/08/2026)",
        "url": "https://www.opovo.com.br/noticias/politica/2026/08/01/pcb-oficializa-candidatura-de-edmilson-costa-a-presidencia.html"
      },
      {
        "nome": "O Povo+ — Candidato à Presidência do PCB destaca propostas (07/08/2026)",
        "url": "https://mais.opovo.com.br/jornal/politica/2026/08/07/candidato-a-presidencia-do-pcb-destaca-propostas.html"
      },
      {
        "nome": "Itatiaia — Conheça a carreira política de Edmilson Costa",
        "url": "https://www.itatiaia.com.br/politica/eleicoes/conheca-a-carreira-politica-de-edmilson-costa-pre-candidato-a-presidencia/"
      },
      {
        "nome": "Metrópoles — Em convenção, PCB confirma Edmilson Costa como candidato (01/08/2026)",
        "url": "https://metropoles.com/brasil/em-convencao-pcb-confirma-edmilson-costa-como-candidato-a-presidencia"
      },
      {
        "nome": "IstoÉ — Edmilson Costa (PCB) é candidato à Presidência em 2026",
        "url": "https://istoe.com.br/edmilson-costa-pcb-candidato-presidencia-2026"
      },
      {
        "nome": "TSE — Propostas de governo de Edmilson Costa (Eleições 2026)",
        "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/edmilson-costa-propostas-de-governo"
      },
      {
        "nome": "TSE/DivulgaCandContas — Programa do PCB para as eleições presidenciais de 2026",
        "url": "https://divulgacandcontas.tse.jus.br/divulga/rest/arquivo/doc/280017107286"
      },
      {
        "nome": "O Povo — Apuração da eleição 2026 para presidente (04/10/2026)",
        "url": "https://www.opovo.com.br/aovivo/2026/10/04/apuracao-da-eleicao-2026-para-presidente-ao-vivo.html"
      }
    ]
  },
  {
    "slug": "hertz-dias",
    "tse_id": "280002541457",
    "numero": 16,
    "urna": "Hertz Dias",
    "nome": "Hertz da Conceição Dias",
    "partido": "PSTU",
    "partidoNome": "Partido Socialista dos Trabalhadores Unificado",
    "cor": "#b91c1c",
    "wiki": null,
    "frase": "Professor de História, rapper e militante do movimento negro no Maranhão.",
    "resumo": "Nascido em São José de Ribamar (MA), é formado em História pela Uema e leciona na rede pública estadual do Maranhão. Vocalista do grupo de rap Gíria Vermelha, ajudou a fundar o Movimento Quilombo Urbano, ligado ao hip-hop e ao combate ao racismo. Pelo PSTU, disputou os cargos de vice-governador (2010), vice-presidente (2018), prefeito de São Luís (2020) e governador (2022), sem se eleger. Em 2026, concorreu à Presidência com Vanessa Portugal de vice e ficou em 8º lugar no 1º turno.",
    "trajetoria": [
      {
        "ano": "Início dos anos 1990",
        "texto": "Participa da fundação do Movimento Quilombo Urbano, no Maranhão, ligado ao movimento negro e à cultura hip-hop.",
        "fonte": {
          "nome": "Itatiaia — Conheça a carreira política de Hertz Dias",
          "url": "https://www.itatiaia.com.br/politica/eleicoes/conheca-a-carreira-politica-de-hertz-dias-pre-candidato-a-presidencia/"
        }
      },
      {
        "ano": "2010",
        "texto": "Candidato a vice-governador do Maranhão pelo PSTU.",
        "fonte": {
          "nome": "Metrópoles — PSTU oficializa Hertz Dias como candidato à Presidência (31/07/2026)",
          "url": "https://metropoles.com/brasil/pstu-oficializa-hertz-dias-como-candidato-a-presidencia-da-republica"
        }
      },
      {
        "ano": "2018",
        "texto": "Candidato a vice-presidente na chapa de Vera Lúcia (PSTU), descrita como a primeira chapa presidencial formada só por candidatos negros e nordestinos.",
        "fonte": {
          "nome": "O Imparcial — Maranhense Hertz Dias é pré-candidato à Presidência (26/02/2026)",
          "url": "https://oimparcial.com.br/noticias/2026/02/maranhense-hertz-dias-e-pre-candidato-a-presidencia-do-brasil/"
        }
      },
      {
        "ano": "2020",
        "texto": "Candidato a prefeito de São Luís (MA).",
        "fonte": {
          "nome": "Diário do Nordeste — Quem é Hertz Dias, candidato a presidente pelo PSTU em 2026",
          "url": "https://diariodonordeste.verdesmares.com.br/pontopoder/quem-e-hertz-dias-candidato-a-presidente-da-republica-pelo-pstu-em-2026-1.3781043"
        }
      },
      {
        "ano": "2022",
        "texto": "Candidato ao governo do Maranhão.",
        "fonte": {
          "nome": "O Povo — Veja o que defende o pré-candidato à Presidência do PSTU (12/06/2026)",
          "url": "https://www.opovo.com.br/noticias/politica/eleicoes/2026/06/12/veja-o-que-defende-o-pre-candidato-a-presidencia-do-pstu.html"
        }
      },
      {
        "ano": "2026",
        "texto": "Candidatura oficializada em convenção em 31 de julho, em São Paulo, com Vanessa Portugal como vice; é sua quinta disputa eleitoral.",
        "fonte": {
          "nome": "Metrópoles — PSTU oficializa Hertz Dias como candidato à Presidência (31/07/2026)",
          "url": "https://metropoles.com/brasil/pstu-oficializa-hertz-dias-como-candidato-a-presidencia-da-republica"
        }
      },
      {
        "ano": "2026",
        "texto": "Termina o 1º turno da eleição presidencial em 8º lugar, com 0,04% dos votos válidos.",
        "fonte": {
          "nome": "O Povo — Apuração da eleição 2026 para presidente (04/10/2026)",
          "url": "https://www.opovo.com.br/aovivo/2026/10/04/apuracao-da-eleicao-2026-para-presidente-ao-vivo.html"
        }
      }
    ],
    "crencas": {
      "espectro": "Esquerda (socialista revolucionária)",
      "texto": "Defende a ruptura com o capitalismo e um governo socialista dos trabalhadores, baseado em conselhos populares. Apresenta a candidatura como alternativa tanto à extrema direita quanto ao governo Lula.",
      "tags": [
        "Socialismo",
        "Direitos trabalhistas",
        "Antirracismo",
        "Conselhos populares",
        "Reforma agrária"
      ]
    },
    "propostas": [
      {
        "icone": "⏱️",
        "titulo": "Fim da escala 6x1",
        "texto": "Encerrar a escala 6x1 sem corte de salário, adotar jornada de 36 horas e dobrar o salário mínimo rumo ao piso do Dieese.",
        "fonte": {
          "nome": "TSE — Propostas de governo de Hertz Dias (Eleições 2026)",
          "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/hertz-dias-propostas-de-governo"
        }
      },
      {
        "icone": "🏭",
        "titulo": "Expropriação e dívida",
        "texto": "Expropriar grandes empresas estratégicas, como Petrobras e Vale, controlar o sistema financeiro e suspender e auditar a dívida pública.",
        "fonte": {
          "nome": "TSE — Propostas de governo de Hertz Dias (Eleições 2026)",
          "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/hertz-dias-propostas-de-governo"
        }
      },
      {
        "icone": "🏥",
        "titulo": "SUS 100% estatal",
        "texto": "Acabar com OSs, fundações e PPPs na saúde, ampliar os CAPS e investir em produção pública de medicamentos.",
        "fonte": {
          "nome": "TSE — Propostas de governo de Hertz Dias (Eleições 2026)",
          "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/hertz-dias-propostas-de-governo"
        }
      },
      {
        "icone": "🛡️",
        "titulo": "Segurança pública",
        "texto": "Desmilitarizar a PM, unificar as polícias em instituição civil e usar câmeras corporais com controle de órgãos civis.",
        "fonte": {
          "nome": "TSE — Propostas de governo de Hertz Dias (Eleições 2026)",
          "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/hertz-dias-propostas-de-governo"
        }
      },
      {
        "icone": "🌾",
        "titulo": "Terra e meio ambiente",
        "texto": "Reforma agrária com expropriação de latifúndios, demarcação de terras indígenas e quilombolas e veto ao petróleo na Margem Equatorial.",
        "fonte": {
          "nome": "TSE — Propostas de governo de Hertz Dias (Eleições 2026)",
          "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/hertz-dias-propostas-de-governo"
        }
      },
      {
        "icone": "📚",
        "titulo": "Educação pública",
        "texto": "Revogar a BNCC e o Novo Ensino Médio e encerrar PPPs e terceirizações nas redes públicas.",
        "fonte": {
          "nome": "Diário do Nordeste — Quem é Hertz Dias, candidato a presidente pelo PSTU em 2026",
          "url": "https://diariodonordeste.verdesmares.com.br/pontopoder/quem-e-hertz-dias-candidato-a-presidente-da-republica-pelo-pstu-em-2026-1.3781043"
        }
      }
    ],
    "realizacoes": [
      {
        "ano": "Início dos anos 1990",
        "titulo": "Movimento Quilombo Urbano",
        "texto": "Um dos fundadores do Movimento Quilombo Urbano, criado no Maranhão no início dos anos 1990.",
        "fonte": {
          "nome": "Itatiaia — Conheça a carreira política de Hertz Dias",
          "url": "https://www.itatiaia.com.br/politica/eleicoes/conheca-a-carreira-politica-de-hertz-dias-pre-candidato-a-presidencia/"
        }
      },
      {
        "ano": "—",
        "titulo": "Gíria Vermelha",
        "texto": "Vocalista do grupo de rap maranhense Gíria Vermelha.",
        "fonte": {
          "nome": "Itatiaia — Conheça a carreira política de Hertz Dias",
          "url": "https://www.itatiaia.com.br/politica/eleicoes/conheca-a-carreira-politica-de-hertz-dias-pre-candidato-a-presidencia/"
        }
      },
      {
        "ano": "—",
        "titulo": "Magistério",
        "texto": "Graduado em História pela Uema, é professor da rede pública estadual do Maranhão.",
        "fonte": {
          "nome": "Itatiaia — Conheça a carreira política de Hertz Dias",
          "url": "https://www.itatiaia.com.br/politica/eleicoes/conheca-a-carreira-politica-de-hertz-dias-pre-candidato-a-presidencia/"
        }
      }
    ],
    "controversias": [],
    "realizacoesNota": "Nunca exerceu mandato público. A trajetória é ligada ao magistério, à cultura hip-hop, ao movimento negro e à militância no PSTU.",
    "fontesGerais": [
      {
        "nome": "Diário do Nordeste — Quem é Hertz Dias, candidato a presidente pelo PSTU em 2026",
        "url": "https://diariodonordeste.verdesmares.com.br/pontopoder/quem-e-hertz-dias-candidato-a-presidente-da-republica-pelo-pstu-em-2026-1.3781043"
      },
      {
        "nome": "Itatiaia — Conheça a carreira política de Hertz Dias",
        "url": "https://www.itatiaia.com.br/politica/eleicoes/conheca-a-carreira-politica-de-hertz-dias-pre-candidato-a-presidencia/"
      },
      {
        "nome": "Metrópoles — PSTU oficializa Hertz Dias como candidato à Presidência (31/07/2026)",
        "url": "https://metropoles.com/brasil/pstu-oficializa-hertz-dias-como-candidato-a-presidencia-da-republica"
      },
      {
        "nome": "O Povo — Veja o que defende o pré-candidato à Presidência do PSTU (12/06/2026)",
        "url": "https://www.opovo.com.br/noticias/politica/eleicoes/2026/06/12/veja-o-que-defende-o-pre-candidato-a-presidencia-do-pstu.html"
      },
      {
        "nome": "O Imparcial — Maranhense Hertz Dias é pré-candidato à Presidência (26/02/2026)",
        "url": "https://oimparcial.com.br/noticias/2026/02/maranhense-hertz-dias-e-pre-candidato-a-presidencia-do-brasil/"
      },
      {
        "nome": "CartaCapital — PSTU oficializa candidatura de Hertz Dias (01/08/2026)",
        "url": "https://www.cartacapital.com.br/politica/pstu-oficializa-candidatura-de-hertz-dias-a-presidencia-da-republica/"
      },
      {
        "nome": "TSE — Propostas de governo de Hertz Dias (Eleições 2026)",
        "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/hertz-dias-propostas-de-governo"
      },
      {
        "nome": "O Povo — Apuração da eleição 2026 para presidente (04/10/2026)",
        "url": "https://www.opovo.com.br/aovivo/2026/10/04/apuracao-da-eleicao-2026-para-presidente-ao-vivo.html"
      }
    ]
  },
  {
    "slug": "rui-costa-pimenta",
    "tse_id": "280002552487",
    "numero": 29,
    "urna": "Rui Costa Pimenta",
    "nome": "Rui Costa Pimenta",
    "partido": "PCO",
    "partidoNome": "Partido da Causa Operária",
    "cor": "#7f1d1d",
    "wiki": null,
    "frase": "Jornalista paulistano, fundador e presidente do PCO desde os anos 1990.",
    "resumo": "Nascido em São Paulo em 1957, estudou jornalismo na Cásper Líbero e letras na USP e trabalha na imprensa sindical e partidária, como editor do jornal Causa Operária. Participou da fundação do PT em 1980 e, após deixar o partido, fundou o PCO, que preside desde então. Disputou a Presidência em 2002, 2006, 2010 e 2014; em 2026, em sua quinta candidatura, ficou em último lugar no 1º turno, com 0,01% dos votos válidos. Durante a campanha, foi alvo de operação da Polícia Federal sobre o uso de verbas partidárias e eleitorais.",
    "trajetoria": [
      {
        "ano": "1957",
        "texto": "Nasce em São Paulo (SP), em 25 de junho.",
        "fonte": {
          "nome": "Gazeta do Povo — Rui Costa Pimenta, o candidato a presidente pelo PCO (2014)",
          "url": "https://www.gazetadopovo.com.br/vida-publica/eleicoes/2014/rui-costa-pimenta-o-candidato-a-presidente-pelo-pco-eegkcuc72gv2otazata7568um"
        }
      },
      {
        "ano": "1980",
        "texto": "Participa da fundação do PT e da organização trotskista que daria origem à tendência Causa Operária.",
        "fonte": {
          "nome": "Gazeta do Povo — Rui Costa Pimenta, o candidato a presidente pelo PCO (2014)",
          "url": "https://www.gazetadopovo.com.br/vida-publica/eleicoes/2014/rui-costa-pimenta-o-candidato-a-presidente-pelo-pco-eegkcuc72gv2otazata7568um"
        }
      },
      {
        "ano": "1995",
        "texto": "Funda o Partido da Causa Operária (PCO), que passa a presidir desde então.",
        "fonte": {
          "nome": "Itatiaia — Conheça a carreira política de Rui Costa Pimenta",
          "url": "https://www.itatiaia.com.br/politica/eleicoes/conheca-a-carreira-politica-de-rui-costa-pimenta-pre-candidato-a-presidencia/"
        }
      },
      {
        "ano": "1998–2000",
        "texto": "Candidato a deputado federal (1998) e a prefeito de São Paulo (2000), sem se eleger.",
        "fonte": {
          "nome": "Congresso em Foco — Rui Costa Pimenta: \"É preciso confiscar as grandes empresas\" (02/10/2014)",
          "url": "https://congressoemfoco.com.br/noticia/57694/rui-costa-pimenta-%e2%80%9ce-preciso-confiscar-as-grandes-empresas%e2%80%9d"
        }
      },
      {
        "ano": "2002",
        "texto": "Primeira candidatura à Presidência da República pelo PCO.",
        "fonte": {
          "nome": "Congresso em Foco — Rui Costa Pimenta: \"É preciso confiscar as grandes empresas\" (02/10/2014)",
          "url": "https://congressoemfoco.com.br/noticia/57694/rui-costa-pimenta-%e2%80%9ce-preciso-confiscar-as-grandes-empresas%e2%80%9d"
        }
      },
      {
        "ano": "2006",
        "texto": "Volta a disputar a Presidência; o TSE indefere o registro por falta de prestação de contas da campanha de 2002, e ele recorre.",
        "fonte": {
          "nome": "Congresso em Foco — PCO vai recorrer da decisão do TSE (16/08/2006)",
          "url": "https://www.congressoemfoco.com.br/noticia/92852/pco-vai-recorrer-da-decisao-do-tse"
        }
      },
      {
        "ano": "2010–2014",
        "texto": "Candidato à Presidência em 2010 e em 2014; nesta última, obtém 12.324 votos.",
        "fonte": {
          "nome": "Congresso em Foco — Saiba quantos votos cada presidenciável recebeu nos estados (06/10/2014)",
          "url": "https://congressoemfoco.com.br/noticia/49491/saiba-quantos-votos-cada-presidenciavel-recebeu-nos-estados"
        }
      },
      {
        "ano": "2026",
        "texto": "Quinta candidatura presidencial, com Antônio Carlos Silva de vice; termina em último lugar com 15.024 votos (0,01%) e o PCO orienta voto nulo no 2º turno.",
        "fonte": {
          "nome": "SBT News — PCO orienta voto nulo em 2º turno entre Flávio e Lula (13/10/2026)",
          "url": "https://sbtnews.sbt.com.br/noticia/eleicoes/pco-orienta-voto-nulo-em-2-turno-entre-flavio-e-lula"
        }
      }
    ],
    "crencas": {
      "espectro": "Esquerda (trotskista)",
      "texto": "Defende o socialismo, o confisco de grandes empresas e um governo das organizações operárias e camponesas. Critica tanto a direita quanto o PT e o Judiciário, em especial o STF, e propõe liberdade de expressão irrestrita.",
      "tags": [
        "Trotskismo",
        "Estatização",
        "Direitos trabalhistas",
        "Crítica ao STF",
        "Anti-imperialismo"
      ]
    },
    "propostas": [
      {
        "icone": "💰",
        "titulo": "Salários e renda",
        "texto": "Aumento emergencial de 50% nos salários, mínimo de R$ 7.500 e Bolsa Família de pelo menos um salário mínimo.",
        "fonte": {
          "nome": "TSE — Propostas de governo de Rui Costa Pimenta (Eleições 2026)",
          "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/rui-costa-pimenta-propostas-de-governo"
        }
      },
      {
        "icone": "⏱️",
        "titulo": "Jornada e previdência",
        "texto": "Jornada máxima de 35 horas semanais e revogação das reformas trabalhista e da Previdência.",
        "fonte": {
          "nome": "Diário do Grande ABC/Agência Brasil — Rui Costa Pimenta quer ampliar direitos trabalhistas e verbas da saúde (19/09/2026)",
          "url": "https://www.dgabc.com.br/Noticia/4347909/rui-costa-pimenta-quer-ampliar-direitos-trabalhistas-e-verbas-da-saude"
        }
      },
      {
        "icone": "🏦",
        "titulo": "Estatização",
        "texto": "Estatizar o sistema financeiro, cancelar as dívidas interna e externa e reestatizar empresas como Petrobras, Eletrobras e Vale.",
        "fonte": {
          "nome": "TSE — Propostas de governo de Rui Costa Pimenta (Eleições 2026)",
          "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/rui-costa-pimenta-propostas-de-governo"
        }
      },
      {
        "icone": "🏥",
        "titulo": "Saúde",
        "texto": "Plano emergencial de construção de hospitais e postos, volta do Mais Médicos e cursos de medicina sem vestibular.",
        "fonte": {
          "nome": "Diário do Grande ABC/Agência Brasil — Rui Costa Pimenta quer ampliar direitos trabalhistas e verbas da saúde (19/09/2026)",
          "url": "https://www.dgabc.com.br/Noticia/4347909/rui-costa-pimenta-quer-ampliar-direitos-trabalhistas-e-verbas-da-saude"
        }
      },
      {
        "icone": "🎓",
        "titulo": "Educação",
        "texto": "Fim dos vestibulares, estatização do ensino privado e piso de R$ 8,5 mil para professores.",
        "fonte": {
          "nome": "TSE — Propostas de governo de Rui Costa Pimenta (Eleições 2026)",
          "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/rui-costa-pimenta-propostas-de-governo"
        }
      },
      {
        "icone": "⚖️",
        "titulo": "Reforma do Estado",
        "texto": "Extinguir o STF, eleger juízes e procuradores com mandatos revogáveis e acabar com a Lei da Ficha Limpa e a cláusula de barreira.",
        "fonte": {
          "nome": "TSE — Propostas de governo de Rui Costa Pimenta (Eleições 2026)",
          "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/rui-costa-pimenta-propostas-de-governo"
        }
      }
    ],
    "realizacoes": [
      {
        "ano": "1985",
        "titulo": "Direção sindical",
        "texto": "Eleito diretor da CUT na região da Grande São Paulo.",
        "fonte": {
          "nome": "Wikipédia (EN) — Rui Costa Pimenta",
          "url": "https://en.wikipedia.org/wiki/Rui_Costa_Pimenta"
        }
      },
      {
        "ano": "1995",
        "titulo": "Fundação do PCO",
        "texto": "Fundador do Partido da Causa Operária, que preside desde a criação.",
        "fonte": {
          "nome": "Itatiaia — Conheça a carreira política de Rui Costa Pimenta",
          "url": "https://www.itatiaia.com.br/politica/eleicoes/conheca-a-carreira-politica-de-rui-costa-pimenta-pre-candidato-a-presidencia/"
        }
      },
      {
        "ano": "—",
        "titulo": "Jornalismo e mídia",
        "texto": "Editor do jornal Causa Operária e apresentador de programas na Causa Operária TV; autor de livros sobre política, arte e teoria marxista.",
        "fonte": {
          "nome": "Itatiaia — Conheça a carreira política de Rui Costa Pimenta",
          "url": "https://www.itatiaia.com.br/politica/eleicoes/conheca-a-carreira-politica-de-rui-costa-pimenta-pre-candidato-a-presidencia/"
        }
      }
    ],
    "controversias": [
      {
        "titulo": "Registro presidencial indeferido em 2006",
        "ano": "2006",
        "status": "info",
        "statusLabel": "Registro indeferido pelo TSE",
        "texto": "Em agosto de 2006, o TSE rejeitou por unanimidade o registro de sua candidatura porque as contas da campanha de 2002 não foram prestadas no prazo legal. O PCO recorreu ao STF e o nome permaneceu na urna, com a ressalva de que os votos seriam anulados se o indeferimento fosse mantido. O desfecho final do recurso não foi localizado nas fontes consultadas.",
        "fonte": {
          "nome": "Congresso em Foco — Rui Pimenta estará nas urnas (29/09/2006)",
          "url": "https://www.congressoemfoco.com.br/noticia/1707/rui-pimenta-estara-nas-urnas"
        }
      },
      {
        "titulo": "Inclusão do PCO no inquérito das fake news",
        "ano": "2022",
        "status": "info",
        "statusLabel": "Investigação no STF",
        "texto": "Em junho de 2022, o ministro Alexandre de Moraes incluiu o PCO no inquérito das fake news e mandou bloquear os perfis do partido após publicações que defendiam a dissolução do STF e ofendiam ministros. Rui Costa Pimenta prestou depoimento à PF e classificou o bloqueio como censura, afirmando tratar-se de declarações políticas. Não foi localizada informação pública sobre o desfecho.",
        "fonte": {
          "nome": "Exame — Moraes dá 24h para redes bloquearem perfis do PCO (20/06/2022)",
          "url": "https://exame.com/brasil/fake-news-alexandre-de-moraes-da-24h-para-redes-bloquearem-perfis-do-pco/"
        },
        "fontesExtras": [
          {
            "nome": "Diario de Pernambuco — PCO é ouvido pela Polícia Federal (14/06/2022)",
            "url": "https://www.diariodepernambuco.com.br/noticia/politica/2022/06/pco-e-ouvido-pela-policia-federal-na-tarde-desta-terca-feira.html"
          }
        ]
      },
      {
        "titulo": "Ação penal por antissemitismo",
        "ano": "2026",
        "status": "andamento",
        "statusLabel": "Réu — processo em andamento",
        "texto": "Em maio de 2026, a Justiça acolheu acusação apresentada a partir de iniciativa da Confederação Israelita do Brasil (Conib) e tornou réus Rui Costa Pimenta e o dirigente Henrique Áreas, com base na Lei de Crimes Raciais, por manifestações públicas sobre Israel e o Hamas. Pimenta chama a acusação de perseguição política e diz que critica o sionismo, não o judaísmo. Não há condenação.",
        "fonte": {
          "nome": "Gazeta do Povo — Rui Pimenta vira réu por ofensas antissemitas e PCO culpa \"lobby sionista\" (18/05/2026)",
          "url": "https://gazetadopovo.com.br/vida-e-cidadania/rui-pimenta-vira-reu-por-ofensas-antissemitas-e-pco-culpa-lobby-sionista"
        }
      },
      {
        "titulo": "Operação Causa Própria (PF)",
        "ano": "2026",
        "status": "andamento",
        "statusLabel": "Investigação em andamento",
        "texto": "Em 11 de agosto de 2026, a PF cumpriu mandados de busca e apreensão em investigação sobre suposto desvio de recursos do Fundo Partidário e do Fundo Eleitoral pelo PCO; houve bloqueio de contas do candidato e do partido. Pimenta classificou a ação como arbitrária, disse que os gastos do partido são modestos e que contratar gráficas de militantes não é ilegal. Não há denúncia ou condenação noticiada nas fontes consultadas.",
        "fonte": {
          "nome": "SBT News — PF mira presidente do PCO por suspeita de desvio de dinheiro (11/08/2026)",
          "url": "https://sbtnews.sbt.com.br/noticia/politica/pf-mira-presidente-do-pco-por-suspeita-de-desvio-de-dinheiro"
        },
        "fontesExtras": [
          {
            "nome": "SBT News — Alvo da PF, PCO ataca Moraes e cita perseguição a Bolsonaro (11/08/2026)",
            "url": "https://sbtnews.sbt.com.br/noticia/politica/alvo-da-pf-pco-ataca-moraes-e-cita-perseguicao-a-bolsonaro"
          }
        ]
      }
    ],
    "realizacoesNota": "Nunca exerceu mandato público. A trajetória é ligada ao jornalismo, ao movimento sindical e à direção do PCO.",
    "fontesGerais": [
      {
        "nome": "Gazeta do Povo — Rui Costa Pimenta, o candidato a presidente pelo PCO (2014)",
        "url": "https://www.gazetadopovo.com.br/vida-publica/eleicoes/2014/rui-costa-pimenta-o-candidato-a-presidente-pelo-pco-eegkcuc72gv2otazata7568um"
      },
      {
        "nome": "Congresso em Foco — Rui Costa Pimenta: \"É preciso confiscar as grandes empresas\" (02/10/2014)",
        "url": "https://congressoemfoco.com.br/noticia/57694/rui-costa-pimenta-%e2%80%9ce-preciso-confiscar-as-grandes-empresas%e2%80%9d"
      },
      {
        "nome": "Congresso em Foco — Saiba quantos votos cada presidenciável recebeu nos estados (06/10/2014)",
        "url": "https://congressoemfoco.com.br/noticia/49491/saiba-quantos-votos-cada-presidenciavel-recebeu-nos-estados"
      },
      {
        "nome": "Congresso em Foco — PCO vai recorrer da decisão do TSE (16/08/2006)",
        "url": "https://www.congressoemfoco.com.br/noticia/92852/pco-vai-recorrer-da-decisao-do-tse"
      },
      {
        "nome": "Congresso em Foco — Rui Pimenta recorre contra decisão do TSE (05/09/2006)",
        "url": "https://www.congressoemfoco.com.br/noticia/88903/rui-pimenta-recorre-contra-decisao-do-tse"
      },
      {
        "nome": "Congresso em Foco — Rui Pimenta estará nas urnas (29/09/2006)",
        "url": "https://www.congressoemfoco.com.br/noticia/1707/rui-pimenta-estara-nas-urnas"
      },
      {
        "nome": "Itatiaia — Conheça a carreira política de Rui Costa Pimenta",
        "url": "https://www.itatiaia.com.br/politica/eleicoes/conheca-a-carreira-politica-de-rui-costa-pimenta-pre-candidato-a-presidencia/"
      },
      {
        "nome": "SBT News — PCO orienta voto nulo em 2º turno entre Flávio e Lula (13/10/2026)",
        "url": "https://sbtnews.sbt.com.br/noticia/eleicoes/pco-orienta-voto-nulo-em-2-turno-entre-flavio-e-lula"
      },
      {
        "nome": "SBT News — PF mira presidente do PCO por suspeita de desvio de dinheiro (11/08/2026)",
        "url": "https://sbtnews.sbt.com.br/noticia/politica/pf-mira-presidente-do-pco-por-suspeita-de-desvio-de-dinheiro"
      },
      {
        "nome": "SBT News — Alvo da PF, PCO ataca Moraes e cita perseguição a Bolsonaro (11/08/2026)",
        "url": "https://sbtnews.sbt.com.br/noticia/politica/alvo-da-pf-pco-ataca-moraes-e-cita-perseguicao-a-bolsonaro"
      },
      {
        "nome": "Diário do Grande ABC/Estadão — Candidato à Presidência pelo PCO é alvo da Polícia Federal (11/08/2026)",
        "url": "https://www.dgabc.com.br/Noticia/4340539/candidato-a-presidencia-pelo-pco-e-alvo-da-policia-federal"
      },
      {
        "nome": "Diário do Grande ABC/Agência Brasil — Rui Costa Pimenta quer ampliar direitos trabalhistas e verbas da saúde (19/09/2026)",
        "url": "https://www.dgabc.com.br/Noticia/4347909/rui-costa-pimenta-quer-ampliar-direitos-trabalhistas-e-verbas-da-saude"
      },
      {
        "nome": "TSE — Propostas de governo de Rui Costa Pimenta (Eleições 2026)",
        "url": "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/rui-costa-pimenta-propostas-de-governo"
      },
      {
        "nome": "Exame — Moraes dá 24h para redes bloquearem perfis do PCO (20/06/2022)",
        "url": "https://exame.com/brasil/fake-news-alexandre-de-moraes-da-24h-para-redes-bloquearem-perfis-do-pco/"
      },
      {
        "nome": "Diario de Pernambuco — PCO é ouvido pela Polícia Federal (14/06/2022)",
        "url": "https://www.diariodepernambuco.com.br/noticia/politica/2022/06/pco-e-ouvido-pela-policia-federal-na-tarde-desta-terca-feira.html"
      },
      {
        "nome": "Gazeta do Povo — Rui Pimenta vira réu por ofensas antissemitas e PCO culpa \"lobby sionista\" (18/05/2026)",
        "url": "https://gazetadopovo.com.br/vida-e-cidadania/rui-pimenta-vira-reu-por-ofensas-antissemitas-e-pco-culpa-lobby-sionista"
      },
      {
        "nome": "Wikipédia (EN) — Rui Costa Pimenta",
        "url": "https://en.wikipedia.org/wiki/Rui_Costa_Pimenta"
      }
    ]
  }
];

/** Espaço para complementar governadores manualmente (opcional).
 *  Chave: id do TSE. Ex.:
 *  GOVERNADORES_EXTRA["250002541303"] = { controversias: [{ titulo, ano, status, statusLabel, texto, fonte }] };
 */
const GOVERNADORES_EXTRA = {};
