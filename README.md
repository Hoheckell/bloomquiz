# Bloom Quest — Torre da Lingua

Plataforma gamificada de revisao de Lingua Portuguesa para o 7o ano, baseada na Taxonomia de Bloom. O aluno sobe seis andares de uma torre, um nivel cognitivo por vez, com tutor, moedas, loja, medalhas, checkpoints e narrativa.

**Publico:** estudantes do 7o ano, com desenho pensado para TDAH, TEA nivel 1 e altas habilidades.

**Demo:** [bloomquiz no GitHub Pages / repositorio](https://github.com/Hoheckell/bloomquiz)

---

## Visao geral

Bloom Quest transforma a revisao gramatical em um jogo de progressao. O tutor (Bia) faz **uma pergunta por vez**, nunca entrega a resposta antes da tentativa e trata o erro como parte do caminho (safe-fail).

O conteudo e restrito a quatro blocos da materia:

| Topico | O que o jogo cobra |
| --- | --- |
| Aposto | Explicativo, enumerativo, resumidor, especificativo e distributivo |
| Vocativo | Chamada ao ouvinte, isolado por virgula ou exclamacao |
| Periodo simples e composto | Contagem de verbos / locucoes verbais |
| Oracoes coordenadas | Assindeticas e sindeticas (aditiva, adversativa, alternativa, conclusiva, explicativa) |

---

## Os seis niveis (Taxonomia de Bloom)

| Nivel | Andar | Objetivo |
| --- | --- | --- |
| 1. Lembrar | Andar da Memoria | Reconhecer o nome da regra |
| 2. Entender | Andar do Sentido | Explicar o que a regra faz |
| 3. Aplicar | Andar da Pratica | Usar a regra em uma frase da materia |
| 4. Analisar | Andar da Lupa | Comparar termos e relacoes (com hiperfoco) |
| 5. Avaliar | Andar do Juiz | Julgar se uma classificacao esta correta |
| 6. Criar | Andar da Criacao | Escrever a propria frase |

Nos niveis 4, 5 e 6 as perguntas incorporam o **hiperfoco** do aluno (videogames, espaco, dinossauros, trens, animes, futebol ou um tema livre).

---

## Mecanicas de jogo

- **Uma pergunta por vez** — interface curta, sem blocos longos de texto.
- **Safe-fail** — errar nao encerra o jogo. O tutor da uma pista e uma nova pergunta do mesmo nivel.
- **Checkpoints** — cada andar concluido libera medalha, moedas e o proximo andar.
- **Moedas** — acerto gera moedas; dica usada reduz o bonus.
- **Loja**
  - Dica extra (8)
  - Escudo Safe-Fail (12) — o proximo erro nao desconta moeda
  - Boost de moedas (15) — o proximo acerto vale o dobro
  - Pulo de checkpoint (20) — pula 1 pergunta (indisponivel no nivel 6)
- **Album de medalhas** — uma medalha por andar.
- **Lore** — historia da torre revelada conforme o progresso.
- **Progresso local** — save em `localStorage` (nome, hiperfoco, moedas, nivel, inventario e medalhas).

---

## Acessibilidade e desenho pedagogico

O visual segue claymorphism (alto contraste, alvos de toque grandes, tipografia Baloo 2 + Nunito).

- Frases curtas e diretas; sem metaforas nem sarcasmo.
- Alvos de clique com no minimo 44px.
- Anel de foco visivel no teclado.
- Link "Ir para o conteudo".
- `prefers-reduced-motion` respeitado.
- Regiao `aria-live` para feedback de acerto e erro.
- Contraste de texto acima de 4.5:1.

---

## Como executar

Nao ha build nem dependencias. Qualquer servidor estatico serve.

```bash
# Na raiz do projeto
python3 -m http.server 8000
```

Abra `http://localhost:8000`.

Alternativas:

```bash
npx serve .
```

```bash
php -S localhost:8000
```

---

## Estrutura

```text
.
├── index.html          Interface (telas, HUD, loja, album, lore)
├── css/
│   └── style.css       Design system (cores, tipografia, layout)
├── js/
│   ├── questions.js    Banco de questoes e metadados dos niveis
│   └── app.js          Motor do jogo (progressao, loja, save)
└── README.md
```

Para alterar o quiz, edite apenas `js/questions.js`. O motor le `window.BLOOM_DATA`.

---

## Stack

| Camada | Tecnologia |
| --- | --- |
| Marcacao | HTML5 semantico |
| Estilo | CSS (custom properties, layout responsivo) |
| Logica | JavaScript vanilla |
| Persistencia | `localStorage` |
| Fontes | [Baloo 2](https://fonts.google.com/specimen/Baloo+2) e [Nunito](https://fonts.google.com/specimen/Nunito) |

---

## Licenca

Uso educacional. Conteudo gramatical alinhado a revisao de 7o ano (aposto, vocativo, periodo e coordenadas).
