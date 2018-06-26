//giphy api key 5n53cDRx0FU49ewKdFwuBjKCTqy8XNip

const button = document.querySelector('button');
const content = document.querySelector('.content');
let time = 10;
const timerDisplay = document.querySelector('h3#timer');
const timeDisplay = document.querySelector('span#time');

let query = 'central+park';

const game = {
  gifUrl: `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=5n53cDRx0FU49ewKdFwuBjKCTqy8XNip&limit=5`,
  reset: () => {
    button.classList.add('hidden');
    content.classList.remove('hidden');
  },
  startTimer: () => {
    let timeClock = setInterval(() => {
      time--;
      timeDisplay.innerText = time;
      if (time === 0) {
        clearInterval(timeClock);
        timerDisplay.innerText = "Time's Up!";
      }
    }, 1000);
  }
};

console.log(game.gifUrl);

button.addEventListener('click', function() {
  game.reset();
  game.startTimer();
});
