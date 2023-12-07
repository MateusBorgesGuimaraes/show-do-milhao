const readline = require("readline");

// Codigo para receber a entrada do usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Array contendo as perguntas, alternativas e resposta corretas
const perguntas = [
  {
    pergunta: "Qual o time que possui mais Copas do Brasil?",
    alternativas: ["a) Flamengo", "b) Gremio", "c) Cruzeiro"],
    resposta: "c",
  },
  {
    pergunta: 'Quem escreveu "Dom Casmurro"?',
    alternativas: [
      "a) Machado de Assis",
      "b) Carlos Drummond de Andrade",
      "c) Manuel Bandeira",
    ],
    resposta: "a",
  },
  {
    pergunta: "Qual é a fórmula química da água?",
    alternativas: ["a) H2O", "b) CO2", "c) O2"],
    resposta: "a",
  },
  {
    pergunta: 'Quem pintou "A Última Ceia"?',
    alternativas: ["a) Michelangelo", "b) Leonardo da Vinci", "c) Rafael"],
    resposta: "b",
  },
  {
    pergunta: "Qual é a moeda oficial do Japão?",
    alternativas: ["a) Yuan", "b) Iene", "c) Dólar"],
    resposta: "b",
  },
  {
    pergunta: 'Quem é o autor(a) de "Harry Potter"?',
    alternativas: [
      "a) J. K. Rowling",
      "b) George R. R. Martin",
      "c) Brandom Sanderson",
    ],
    resposta: "a",
  },
  {
    pergunta: "Qual dos animes abaixo tem como protagonistas piratas ?",
    alternativas: ["a) Naruto", "b) Bleach", "c) One Piece"],
    resposta: "c",
  },
  {
    pergunta: "Quem compôs a 9ª Sinfonia?",
    alternativas: [
      "a) Wolfgang Amadeus Mozart",
      "b) Johann Sebastian Bach",
      "c) Ludwig van Beethoven",
    ],
    resposta: "c",
  },
  {
    pergunta: "Qual é a maior floresta tropical do mundo?",
    alternativas: [
      "a) Floresta Amazônica",
      "b) Floresta do Congo",
      "c) Floresta de Borneo",
    ],
    resposta: "a",
  },
  {
    pergunta: "Qual dos personagens abaixo morre no filme dos Vingadores?",
    alternativas: ["a) Batman", "b) Homen de Ferro", "c) Thor"],
    resposta: "b",
  },
  {
    pergunta: "Qual é a capital da Rússia?",
    alternativas: ["a) São Petersburgo", "b) Moscou", "c) Vladivostok"],
    resposta: "b",
  },
  {
    pergunta: 'Quem pintou "Guernica"?',
    alternativas: ["a) Salvador Dalí", "b) Pablo Picasso", "c) Joan Miró"],
    resposta: "b",
  },
  {
    pergunta: "Qual é a moeda oficial da Índia?",
    alternativas: ["a) Rúpia", "b) Dólar", "c) Euro"],
    resposta: "a",
  },
  {
    pergunta: "De qual anime o personegem Pikachu se origina?",
    alternativas: ["a) Yu Gi Oh", "b) Pokemon", "c) Digimon"],
    resposta: "b",
  },
  {
    pergunta: "Qual é a capital da Itália?",
    alternativas: ["a) Milão", "b) Roma", "c) Veneza"],
    resposta: "b",
  },
];

// Variaveis globais usadas
let jogadorNome = "";
let rodadaAtual = 1;
let dinheiroGanho = 0;

// Função que inicia o jogo
function iniciarJogo() {
  console.log("------Bem-vindo ao jogo do Show do Milhão-------\n");
  console.log(
    "******************************REGRAS******************************\n 1 - O jogo começa quando o jogador inserir o seu nome.\n 2 - O jogo tera no maximo 5 perguntas com uma premiação maxima de 1000000.\n 3 - Se você errar a pergunta perde toda a sua pontuação.\n 4 - Você pode optar por terminar o jogo antes da rodada final e manter os pontos ja adquiridos.\n"
  );

  // Recebe o nome do jogador e inicia a função para iniciar a rodada
  rl.question("Informe seu nome: ", (nome) => {
    jogadorNome = nome;
    proximaRodada();
  });
}

// Array para receber o indice das perguntas ja feitas, para evitar repetição
let perguntasUsadas = [];

// Função que da inicio as rodadas
function proximaRodada() {
  // Estrutura condicional para repetir as rodadas por 5 vezes no maximo
  if (rodadaAtual <= 5) {
    // Laço de repetição que confere se as pergintas ja foram usadas, e repete ate gerar uma nova
    do {
      perguntaAtual = perguntas[Math.floor(Math.random() * perguntas.length)];
    } while (perguntasUsadas.includes(perguntaAtual));

    perguntasUsadas.push(perguntaAtual);

    // Exibe as informações da rodada
    console.log(
      `\n******************************${jogadorNome}******************************`
    );
    console.log(`**************Número da rodada: ${rodadaAtual}`);
    console.log("******************Premiação******************");
    console.log(
      `Quanto de 'dinheiro' você ganhará se \nErrar: 0!\nParar: ${dinheiroGanho}!\nAcertar ${
        dinheiroGanho + 200000
      }!\n`
    );

    // Exibe a pergunta escolhida de suas respectivas alternativas
    console.log(`\n${perguntaAtual.pergunta}`);
    perguntaAtual.alternativas.forEach((alternativa) =>
      console.log(alternativa)
    );

    // Aqui o usuario escolhe sua reposta, ou se deseja parar
    rl.question(
      "Escolha a opção correta (a, b, ou c) ou  x para parar: ",
      (resposta) => {
        const acertou =
          resposta.toLowerCase() === perguntaAtual.resposta.toLowerCase();
        const premiacao = calcularPremiacao(acertou);
        console.log(`\n******************Resultado******************`);

        // Verifica se acertou, se sim, soma o premio e passa para a proxima rodada se não tiver chego no fim
        if (acertou) {
          console.log("Acertou!");
          dinheiroGanho += premiacao;
          rodadaAtual++;
          proximaRodada();
          // Se o jogador escolher parar, aqui o jogo é encerrado e ele mantem seu dinheiro
        } else if (resposta.toLowerCase() === "x") {
          console.log("Voce escolheu parar! Jogo encerrado.");
          finalizarJogo();
        }
        // Se o jogador errar, aqui o jogo é encerrado e seu dinheiro é zerado
        else {
          dinheiroGanho = 0;
          console.log("Errou! Jogo encerrado.");
          finalizarJogo();
        }
      }
    );
  }
  // Quando as 5 rodadas acabarem, aqui o jogo é encerrado
  else {
    finalizarJogo();
  }
}

// Função para calcular a premiação
function calcularPremiacao(acertou) {
  // Lógica para calcular a premiação com base em acerto ou erro
  return acertou ? 200000 : 0;
}

// Aqui o jogo é encerrado, exibindo as informações finais, bem como a opção de jogar novamente
function finalizarJogo() {
  console.log("\nJogo finalizado!");
  console.log(
    `A resposta correta para a pergunta era a alternativa: ${perguntaAtual.resposta.toLowerCase()}`
  );
  console.log(`Nome do jogador: ${jogadorNome}`);
  console.log(
    `Rodada: ${rodadaAtual - 1} faltavam ${5 - (rodadaAtual - 1)} para acabar`
  );
  console.log(`Dinheiro ganho: ${dinheiroGanho}`);
  console.log("Opções para o jogador:");

  // Aqui o usuario escolhe se deseja jogar novamente, se sim aqui as informações são resetadas
  rl.question("Deseja jogar novamente? (sim ou não): ", (resposta) => {
    if (resposta.toLowerCase() === "sim" || resposta.toLowerCase() === "s") {
      rodadaAtual = 1;
      dinheiroGanho = 0;
      proximaRodada();
    } else {
      console.log("Obrigado por jogar!");
      rl.close();
    }
  });
}

// Iniciar o jogo quando o script for executado
iniciarJogo();
