//выбор элемента 
const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');
const Notes_Letters = document.querySelector(".btn-container");
const BUTTON = document.querySelectorAll(".btn");
const fon = document.querySelectorAll(".fon");

let isKeyPress = true;

const bird = new Audio();

//Начало проигрывания звука и добавление классов для оформления клавиш пианино

const startSound = (event) => {
  const note = event.target.dataset.note;
  const src = `./assets/audio/${note}.mp3`;
  playAudio(src);
  event.target.classList.add("piano-key-active");
  event.target.classList.add("piano-key-active-pseudo");
};

//Завершение проигрывания звука и удаление классов для оформления клавиш пианино
const stoptSound = (event) => {
  event.target.classList.remove("piano-key-active");
  event.target.classList.remove("piano-key-active-pseudo");
};

//музыкальный проигрыватель
function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
}

 //музыкальный проигрыватель для пения птицы
 function playBird(src) {
    bird.src = src;
    bird.currentTime = 0;
    bird.play();
}

//Пение птички
const playBtn = document.querySelector('.playBtn');
//проигрыватель звуков
const url = 'https://zvukipro.com/uploads/files/2017-09/1504526458_zvuki-prirody-penie-solovya.mp3';
playBtn.addEventListener('click', (event) => {
  playBird(url);
  playBtn.classList.add("playBtn_active");
  stopPlayBtn.classList.remove("stopBtn_active");
});

//Остановка пения птички
  const stopPlayBtn = document.querySelector('.stopPlayBtn');
  stopPlayBtn.addEventListener('click', (event) => {
  bird.pause();
  playBtn.classList.remove("playBtn_active");
  stopPlayBtn.classList.add("stopBtn_active");
});

//Обработка событий мыши, проигрывание звуков, добавление классов оформления клавиш пианино
const startMixSound = (event) => {
  if (event.target.classList.contains("piano-key")) {
    event.target.classList.add("piano-key-active");

    const note = event.target.dataset.note;
    const src = `./assets/audio/${note}.mp3`;
    playAudio(src);
  }
  pianoКeys.forEach((el) => {
    event.target.classList.add("piano-key-active-pseudo");
    el.addEventListener("mouseover", startSound);
    el.addEventListener("mouseout", stoptSound);
  });
};

//Обработка событий мыши, проигрывание звуков, удаление классов оформления клавиш пианино

const stopMixSound = (event) => {
  event.target.classList.remove("piano-key-active");
  pianoКeys.forEach((el) => {
    event.target.classList.remove("piano-key-active-pseudo");
    el.removeEventListener("mouseover", startSound);
    el.removeEventListener("mouseout", stoptSound);
  });
};

//Слушатели для событий мыши

piano.addEventListener("mousedown", startMixSound);
piano.addEventListener("mouseup", stopMixSound);

window.addEventListener("mouseup", stopMixSound);

//Обработка событий клавиатуры
window.addEventListener("keydown", (event) => {
  if (event.repeat != undefined) {
    isKeyPress = !event.repeat;
  }
  if (!isKeyPress) return;
  isKeyPress = false;

  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  const key = document.querySelector(`.piano-key[data-key="${event.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play(event.keyCode);
  key.classList.add("piano-key-active");
  key.classList.add("piano-key-active-pseudo");
});
//слушатель для обработки событий клавиатуры
window.addEventListener("keyup", (event) => {
  isKeyPress = true;

  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  const key = document.querySelector(`.piano-key[data-key="${event.keyCode}"]`);
  if (!audio) return;
  key.classList.remove("piano-key-active");
  key.classList.remove("piano-key-active-pseudo");
});

//Переключение активности кнопок Notes/Letter и добавление/удаление соответствующих классов
function toggleBtn(event) {
  BUTTON.forEach((el) => {
    if (el.classList.contains("btn-active")) {
      el.classList.remove("btn-active");
    }

    event.target.classList.add("btn-active");

    if (
      el.classList.contains("btn-letters") &&
      el.classList.contains("btn-active")
    ) {
      pianoКeys.forEach((el) => {
        el.classList.add("piano-key-letter");
      });
    } else {
      pianoКeys.forEach((el) => {
        el.classList.remove("piano-key-letter");
      });
    }
  });
}

//Слушатель нажатия кнопок Notes/Letter
Notes_Letters.addEventListener("click", toggleBtn);

document.addEventListener(
  "click",
  function (event) {
    if (event.target.classList.contains("fullscreen")) {
      toggleFullScreen();
    }
  },
  false
);
//Переключение в полноэкранный режим и обратно
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}


document.getElementById("button").addEventListener("click", function(){
  let element = document.getElementById("button");
  if(!element.classList.contains("h1Color")){
   element.classList.add("h1Color");
  } else {
   element.classList.remove("h1Color");
  }
 });

