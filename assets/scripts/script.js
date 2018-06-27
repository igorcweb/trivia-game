//giphy api key 5n53cDRx0FU49ewKdFwuBjKCTqy8XNip

const button = document.querySelector('button');
const content = document.querySelector('.content');
let time = 10;
const timerDisplay = document.querySelector('h2#timer');
const timeDisplay = document.querySelector('span#time');
const questionText = document.querySelector('h2#question');
let questions = Array(10);
console.log('questions: ', questions);

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
  },
  getData: function() {
    let url =
      'https://opentdb.com/api.php?amount=10&category=26&difficulty=easy&type=multiple';
    let question1;
    axios
      .get(url)
      .then(res => {
        questions = questions.fill().map((question, index) => {
          return (question = res.data.results[index].question);
        });
        console.log(questions);
        questionText.innerHTML = questions[0];
      })
      .catch(error => {
        console.log(error);
      });
  }
};

game.getData();

console.log(game.gifUrl);

button.addEventListener('click', function() {
  game.reset();
  game.startTimer();
});
