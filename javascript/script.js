const stories = {
  mani: {
    title: '🌿 Lenda da Mani',
    img: 'https://static.todamateria.com.br/upload/le/nd/lendadamandioca2.jpg',
    text: [
      'Mani era uma menina indígena muito querida por toda a sua tribo. Ela era conhecida por sua bondade, alegria e por viver em harmonia com a natureza ao seu redor.',
      'Certo dia, de forma inesperada, Mani adoeceu misteriosamente. Ninguém na aldeia conseguiu explicar o que estava acontecendo, e isso deixou todos muito preocupados.',
      'Mesmo com todos os cuidados, Mani não resistiu e acabou falecendo, deixando um grande vazio no coração de todos da aldeia.',
      'Seguindo os costumes de seu povo, ela foi enterrada dentro da própria oca, um sinal de respeito e amor profundo.',
      'Alguns dias depois, algo surpreendente começou a acontecer: uma planta diferente começou a nascer exatamente no local onde Mani havia sido enterrada.',
      'Curiosos, os indígenas decidiram cavar a terra e descobriram uma raiz branca, forte e nutritiva — a mandioca.',
      'Eles acreditaram que Mani havia se transformado naquele alimento como um presente espiritual para sua tribo.',
      'Desde então, a mandioca passou a ser um dos alimentos mais importantes, simbolizando vida, renovação e a conexão entre os seres humanos e a natureza.'
    ],
    video: 'https://www.youtube.com/watch?v=zSBsJTSX3AE',
    info: 'A lenda da Mani tem origem nos povos indígenas brasileiros, especialmente entre tribos de língua Tupi. Ela explica o surgimento da mandioca.'
  },

  caipora: {
    title: '🌳 Lenda da Caipora',
    img: 'https://www.pinturasolidaria.org.br/wp-content/uploads/2021/08/28-CAIPORA.jpg',
    text: [
      'A Caipora é uma entidade muito conhecida no folclore brasileiro e é considerada a guardiã das florestas e dos animais.',
      'Ela vive nas matas profundas e tem como missão proteger a natureza contra caçadores que não respeitam os limites da vida selvagem.',
      'Muitas histórias dizem que ela aparece como uma pequena figura misteriosa, às vezes montada em um porco-do-mato.',
      'A Caipora possui poderes mágicos e é capaz de confundir as pessoas, fazendo com que caçadores se percam na floresta sem encontrar o caminho de volta.',
      'Seu objetivo não é machucar, mas sim ensinar uma lição sobre respeito à natureza e aos animais.',
      'Alguns povos acreditam que oferecer fumo ou presentes pode acalmar a Caipora e evitar sua ira.',
      'Ela é vista como um símbolo de equilíbrio, mostrando que o ser humano deve viver em harmonia com o meio ambiente.',
      'A lenda da Caipora reforça a importância de cuidar das florestas e preservar a vida que existe nelas.'
    ],
    video: 'https://youtu.be/7UxylJ4XChI?si=yHXnVqFu0XGkXEGA',
    info: 'A Caipora faz parte do folclore brasileiro e tem origem nas crenças dos povos indígenas, principalmente os de tradição Tupi-Guarani. Ela protege os animais da floresta.'
  },

  curupira: {
    title: '🔥 Lenda do Curupira',
    img: 'https://static.significados.com.br/foto/curupira-og.jpg',
    text: [
      'O Curupira é um dos personagens mais antigos e conhecidos do folclore brasileiro, sendo considerado um protetor das florestas.',
      'Ele é conhecido por ter os pés virados para trás, o que faz com que seus rastros confundam qualquer pessoa que tente segui-lo.',
      'O Curupira vive na mata e protege os animais e as árvores contra aqueles que desejam explorar ou destruir a natureza.',
      'Dizem que ele emite assobios fortes e assustadores que ecoam pela floresta, deixando invasores com medo.',
      'Quando alguém caça mais do que precisa ou derruba árvores sem motivo, o Curupira aparece para puni-los.',
      'Ele pode fazer com que as pessoas se percam ou fiquem desorientadas na mata por horas.',
      'Apesar de parecer assustador, seu objetivo é manter o equilíbrio da natureza e proteger a vida.',
      'A lenda do Curupira ensina que devemos respeitar o meio ambiente e usar os recursos naturais com responsabilidade.'
    ],
    video: 'https://youtu.be/gKpiIzfNQA8?si=e3up2BfPtORfpXsT',
    info: 'O Curupira é uma figura do folclore indígena brasileiro, com origem nos povos Tupi-Guarani. Ele é considerado o guardião das florestas.'

  }
};

const keys = Object.keys(stories);
let storyIndex = 0;
let step = 0;

const texto = document.getElementById('texto');
const botao = document.getElementById('actionButton');
const titulo = document.querySelector('h1');
const imagem = document.getElementById('imagem');
const progress = document.getElementById('progress');
const videoLink = document.getElementById('videoLink');
const infoText = document.getElementById('infoText');

let typing;
let typingActive = false;

function typeText(text) {
  clearInterval(typing);
  texto.textContent = '';
  let i = 0;
  typingActive = true;
  botao.disabled = true;

  typing = setInterval(() => {
    texto.textContent += text[i];
    i++;

    if (i >= text.length) {
      clearInterval(typing);
      typingActive = false;
      botao.disabled = false;

      const current = stories[keys[storyIndex]];
      botao.textContent =
        step === current.text.length - 1
          ? 'Próxima lenda '
          : 'Próxima parte ';
    }
  }, 20);
}

function updateUI() {
  const current = stories[keys[storyIndex]];

  titulo.textContent = current.title;
  imagem.src = current.img;

  const percent = ((step + 1) / current.text.length) * 100;
  progress.style.width = percent + '%';

  videoLink.href = current.video;
  videoLink.textContent = `Assistir vídeo: ${current.title}`;

  infoText.textContent = current.info;
}

function next() {
  if (typingActive) return;

  const current = stories[keys[storyIndex]];

  if (step < current.text.length - 1) {
    step++;

    updateUI();
    typeText(stories[keys[storyIndex]].text[step]);

  } else {
    // 👇 animação quando troca de lenda
    card.classList.add('fade-out');

    setTimeout(() => {
      storyIndex = (storyIndex + 1) % keys.length;
      step = 0;

      updateUI();
      typeText(stories[keys[storyIndex]].text[step]);

      card.classList.remove('fade-out');
      card.classList.add('fade-in');

      setTimeout(() => {
        card.classList.remove('fade-in');
      }, 400);

    }, 400);
  }
}

  updateUI();
  typeText(stories[keys[storyIndex]].text[step]);

botao.addEventListener('click', next);

window.onload = () => {
  updateUI();
  typeText(stories[keys[storyIndex]].text[step]);
};

const card = document.querySelector('.card');