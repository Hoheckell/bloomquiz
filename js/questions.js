window.BLOOM_DATA = {
  levels: [
    { id: 1, name: "Lembrar", floor: "Andar da Memoria", medal: "Medalha da Memoria", lore: "Quem lembra o nome da regra abre a primeira porta da torre." },
    { id: 2, name: "Entender", floor: "Andar do Sentido", medal: "Medalha do Sentido", lore: "Quem entende o porquê da regra sobe sem medo." },
    { id: 3, name: "Aplicar", floor: "Andar da Pratica", medal: "Medalha da Pratica", lore: "Quem usa a regra numa frase real ganha forca." },
    { id: 4, name: "Analisar", floor: "Andar da Lupa", medal: "Medalha da Lupa", lore: "Quem compara pecas e ve a diferenca vira detetive da lingua." },
    { id: 5, name: "Avaliar", floor: "Andar do Juiz", medal: "Medalha do Juizo", lore: "Quem julga se esta certo ou errado protege a torre." },
    { id: 6, name: "Criar", floor: "Andar da Criacao", medal: "Medalha da Criacao", lore: "Quem cria a propria frase vira mestre da Torre da Lingua." }
  ],
  shop: [
    { id: "hint", name: "Dica extra", desc: "Uma pista extra na pergunta atual.", cost: 8, type: "hint" },
    { id: "shield", name: "Escudo Safe-Fail", desc: "O proximo erro nao tira moeda.", cost: 12, type: "shield" },
    { id: "boost", name: "Boost de moedas", desc: "O proximo acerto vale o dobro.", cost: 15, type: "boost" },
    { id: "skip", name: "Pulo de checkpoint", desc: "Pula 1 pergunta deste andar (nao o nivel 6).", cost: 20, type: "skip" }
  ],
  bank: {
    1: [
      {
        id: "l1a",
        type: "mc",
        q: "O termo que se junta a um substantivo para explica-lo, lista-lo, resume-lo ou especifica-lo se chama:",
        options: ["Vocativo", "Aposto", "Periodo simples", "Conjuncao"],
        answer: 1,
        why: "Aposto se junta a um substantivo ou pronome para explica-lo, especifica-lo, resume-lo ou enumera-lo.",
        hint: "Nao e para chamar ninguem. E para explicar um nome que ja esta na frase.",
        retry: "Olhe o papel do termo: ele explica um nome. Qual nome da materia combina com isso?"
      },
      {
        id: "l1b",
        type: "mc",
        q: "O termo usado para chamar, invocar ou interpelar o ouvinte se chama:",
        options: ["Aposto explicativo", "Vocativo", "Periodo composto", "Oração aditiva"],
        answer: 1,
        why: "Vocativo chama, invoca ou interpela o ouvinte. Sempre vem separado por virgula ou exclamacao.",
        hint: "Pense em: 'Mae, posso ir?' Quem e chamado?",
        retry: "E o termo que chama a pessoa. Qual e o nome dele na materia?"
      },
      {
        id: "l1c",
        type: "mc",
        q: "Regra de ouro: o numero de oracoes em um periodo e igual ao numero de:",
        options: ["Virgulas", "Substantivos", "Verbos ou locucoes verbais", "Apostros"],
        answer: 2,
        why: "Cada verbo (ou locucao verbal) forma uma oracao. Conte os verbos.",
        hint: "Conte as acoes da frase. Cada acao e um verbo.",
        retry: "Nao conte virgula. Conte o que indica acao. O que e isso?"
      }
    ],
    2: [
      {
        id: "l2a",
        type: "mc",
        q: "Por que 'Goiânia, capital de Goias, e uma cidade linda' tem aposto explicativo?",
        options: [
          "Porque chama Goiania para conversar",
          "Porque explica ou detalha o termo anterior",
          "Porque lista varias sobremesas",
          "Porque resume tudo em uma palavra"
        ],
        answer: 1,
        why: "Aposto explicativo explica ou detalha um termo anterior. 'capital de Goias' explica Goiania.",
        hint: "O trecho entre virgulas diz o que Goiania e.",
        retry: "O trecho 'capital de Goias' explica Goiania. Qual tipo faz isso?"
      },
      {
        id: "l2b",
        type: "mc",
        q: "Por que o vocativo e obrigatoriamente separado por virgula ou exclamacao?",
        options: [
          "Porque e um termo isolado, usado para chamar o ouvinte",
          "Porque e um verbo",
          "Porque e um periodo composto",
          "Porque e aposto especificativo"
        ],
        answer: 0,
        why: "Vocativo e termo isolado. Sempre separado por virgula ou ponto de exclamacao.",
        hint: "Ele nao faz parte do resto da oracao. Ele so chama.",
        retry: "Vocativo chama alguem e fica isolado. Como a materia manda marcar isso?"
      },
      {
        id: "l2c",
        type: "mc",
        q: "O que torna um periodo composto (e nao simples)?",
        options: [
          "Ter muitas virgulas",
          "Ter 2 ou mais verbos / oracoes",
          "Ter um aposto",
          "Ter um vocativo"
        ],
        answer: 1,
        why: "Periodo simples tem 1 verbo/oracao. Periodo composto tem 2 ou mais.",
        hint: "Ignore o tamanho da frase. Conte verbos.",
        retry: "Simples = 1 verbo. Composto = 2 ou mais. Qual e a diferenca?"
      }
    ],
    3: [
      {
        id: "l3a",
        type: "mc",
        q: "Na frase 'Na festa tinha varias sobremesas: bolo, torta, pudim, sorvete.', o trecho em destaque e aposto:",
        options: ["Explicativo", "Enumerativo", "Resumidor", "Especificativo"],
        answer: 1,
        why: "Aposto enumerativo lista elementos que compoem o termo anterior. Aqui lista as sobremesas.",
        hint: "Tem dois-pontos e uma lista de itens.",
        retry: "A frase lista itens depois dos dois-pontos. Qual tipo lista?"
      },
      {
        id: "l3b",
        type: "mc",
        q: "Na frase 'Livros, filmes, series, tudo me interessa.', a palavra 'tudo' e aposto:",
        options: ["Enumerativo", "Distributivo", "Resumidor (recapitulativo)", "Vocativo"],
        answer: 2,
        why: "Aposto resumidor junta termos anteriores em uma so palavra, em geral 'tudo', 'nada', 'ninguem'.",
        hint: "Uma palavra so resume a lista de antes.",
        retry: "'Tudo' junta livros, filmes e series. Qual tipo resume?"
      },
      {
        id: "l3c",
        type: "mc",
        q: "Qual frase tem VOCATIVO?",
        options: [
          "Goiania, capital de Goias, e linda.",
          "Criancas, venham almocar!",
          "A avenida Paulista e muito linda!",
          "Chegou e saiu para comprar pao."
        ],
        answer: 1,
        why: "'Criancas' chama o ouvinte. Isso e vocativo, isolado por virgula.",
        hint: "Procure quem esta sendo chamado para fazer algo.",
        retry: "Vocativo chama. Qual frase chama alguem para vir almocar?"
      },
      {
        id: "l3d",
        type: "mc",
        q: "Quantos verbos ha em: 'Chegou e saiu para comprar pao.'?",
        options: ["1", "2", "3", "4"],
        answer: 2,
        why: "Chegou, saiu, comprar: 3 verbos. Por isso e periodo composto.",
        hint: "Marque cada acao: chegou / saiu / comprar.",
        retry: "Conte as acoes. Sao tres. Qual numero?"
      }
    ],
    4: [
      {
        id: "l4a",
        type: "mc",
        q: "Compare: A) 'Mae, posso ir a casa da Luiza?'  B) 'Sao Paulo, a maior cidade do Brasil, e conhecida por seu dinamismo.' Qual e a diferenca?",
        options: [
          "A e B sao vocativo",
          "A e vocativo (chama). B e aposto explicativo (explica)",
          "A e aposto. B e vocativo",
          "As duas sao periodo simples sem termo extra"
        ],
        answer: 1,
        why: "A chama a mae (vocativo). B explica Sao Paulo (aposto explicativo).",
        hint: "Pergunte: a frase chama alguem ou explica um nome?",
        retry: "Uma chama a pessoa. A outra explica a cidade. Qual e qual?"
      },
      {
        id: "l4b",
        type: "mc",
        q: "Compare as sindeticas: 'As queimadas aumentaram muito, MAS o governo prometeu novas medidas.' Qual e a relacao?",
        options: ["Aditiva (soma)", "Adversativa (oposicao)", "Alternativa (escolha)", "Conclusiva (conclusao)"],
        answer: 1,
        why: "Mas, porem, contudo, todavia, entretanto marcam oposicao. E adversativa.",
        hint: "MAS vira o sentido. Nao soma. Contrasta.",
        retry: "O sentido vira contra. Qual classe mostra contraste?"
      },
      {
        id: "l4c",
        type: "mc",
        focus: true,
        q: "No mundo de {FOCUS}, um narrador diz: 'O mapa, o save, o ranking: tudo importa.' A palavra 'tudo' funciona como:",
        options: ["Vocativo", "Aposto resumidor", "Oração alternativa", "Periodo simples"],
        answer: 1,
        why: "Lista anterior + 'tudo' = aposto resumidor (recapitulativo).",
        hint: "'Tudo' junta o mapa, o save e o ranking.",
        retry: "Uma palavra resume a lista. Qual tipo de aposto e esse?"
      }
    ],
    5: [
      {
        id: "l5a",
        type: "mc",
        q: "Um aluno marcou 'avenida Paulista' como vocativo. Voce avalia que:",
        options: [
          "Esta certo, porque tem nome proprio",
          "Esta errado. E aposto especificativo (nao usa virgula)",
          "Esta certo, porque chama a avenida",
          "Esta errado. E oracao conclusiva"
        ],
        answer: 1,
        why: "Aposto especificativo individualiza um substantivo generico e NAO usa virgula. 'Avenida Paulista'.",
        hint: "Nao ha virgula. Ninguem e chamado. O nome so particulariza a avenida.",
        retry: "Sem virgula e sem chamada. Qual tipo de aposto e esse?"
      },
      {
        id: "l5b",
        type: "mc",
        q: "Avalie: 'Nao fale mais, que ele ja ouviu o suficiente.' A oracao com QUE e:",
        options: ["Aditiva", "Adversativa", "Explicativa", "Alternativa"],
        answer: 2,
        why: "Explicativas justificam: que, porque, pois (antes do verbo).",
        hint: "A segunda oracao justifica o pedido 'nao fale mais'.",
        retry: "Ela explica o motivo. Qual classificacao e essa?"
      },
      {
        id: "l5c",
        type: "mc",
        focus: true,
        q: "No universo de {FOCUS}, alguem escreve: '{FOCUS}, venha logo!' Um colega diz que isso e aposto. Voce avalia:",
        options: [
          "Concordo. Explica um substantivo",
          "Discordo. Chama o ouvinte. E vocativo",
          "Concordo. E aposto enumerativo",
          "Discordo. E periodo composto com 3 verbos"
        ],
        answer: 1,
        why: "O termo chama o ouvinte. Vocativo, isolado por virgula ou exclamacao.",
        hint: "Tem alguem sendo chamado. Nao e explicacao de um nome.",
        retry: "Chamar = vocativo. Explicar = aposto. O que a frase faz?"
      }
    ],
    6: [
      {
        id: "l6a",
        type: "write",
        need: "aposto explicativo",
        q: "Crie UMA frase sobre {FOCUS} com APOSTO EXPLICATIVO. Use virgulas. Exemplo de forma: Nome, explicacao, resto da frase.",
        hint: "Coloque uma explicacao entre virgulas depois de um nome.",
        retry: "Falta o aposto explicativo entre virgulas. Tente: '{FOCUS}, ____, ...'",
        why: "Aposto explicativo detalha o termo anterior e vem separado por virgulas."
      },
      {
        id: "l6b",
        type: "write",
        need: "vocativo",
        q: "Crie UMA frase que chame {FOCUS} (vocativo) e peca uma acao. Lembre: virgula ou exclamacao.",
        hint: "Chame no comeco ou no meio. Separe com virgula.",
        retry: "Precisa chamar {FOCUS} e separar com virgula. Ex.: '{FOCUS}, vamos la!'",
        why: "Vocativo chama o ouvinte e e obrigatoriamente isolado."
      },
      {
        id: "l6c",
        type: "write",
        need: "coordenada adversativa",
        q: "Crie UMA frase sobre {FOCUS} com oracao coordenada ADVERSATIVA (use mas, porem, contudo, todavia ou entretanto).",
        hint: "Duas ideias. A segunda vira contra a primeira. Use MAS.",
        retry: "Use mas/porem/contudo/todavia/entretanto ligando duas oracoes com verbo.",
        why: "Adversativa mostra oposicao com mas, porem, contudo, todavia, entretanto."
      }
    ]
  }
};
