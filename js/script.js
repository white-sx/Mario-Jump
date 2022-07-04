let score = 0;

const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const scoreDisplay = document.querySelector(".display");
const best = document.querySelector(".Best");
const reset = document.querySelector(".reset");
const gamerOver = document.querySelector(".gameOver-Display");
const audio = document.querySelector(".effect");
document.addEventListener("keydown", jump);
document.addEventListener("click", jump);
reset.addEventListener("click", restart);
const audioBack = document.querySelector(".back");

function jump() {
  mario.classList.add("jump");
  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
}

function restart() {
  document.location.reload(true);
}

const loop = setInterval(() => {
  let screenPosition = 120;
  let marioMarginL = "46px";
  let marioMarginB = "46px";
  let marioWidth = "46px";

  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  if (window.screen.width <= 425) {
    screenPosition = 110;

    marioMarginL = "2px";
    marioMarginB = "16px";
    marioWidth = "55px";
  }

  if (
    pipePosition <= screenPosition &&
    pipePosition > 0 &&
    marioPosition < 80
  ) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;
    mario.src = "./assets/img/game-over.png";
    mario.style.marginLeft = marioMarginL;
    mario.style.marginBottom = marioMarginB;
    mario.style.width = marioWidth;

    localStorage.setItem("score", score);
    const localBestScore = localStorage.getItem("bestScore");

    if (score > localBestScore) {
      localStorage.setItem("bestScore", score);
    }

    best.style.color = "red";
    best.innerHTML = localStorage.getItem("bestScore");

    gamerOver.style.display = "flex";
    audio.src =
      "./assets/sound/y2meta.com - que isso meu filho calma (320 kbps).mp3";
    audioBack.muted = true;
    clearInterval(loop);
  } else {
    score = score + 1;

    scoreDisplay.innerHTML = score;
  }
}, 100);
