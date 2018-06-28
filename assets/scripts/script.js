//giphy api key 5n53cDRx0FU49ewKdFwuBjKCTqy8XNip

const button = $('button');
const content = $('.content');
let time = 30;
let questionNum = 0;
const timerDisplay = $('h2#timer');
const timeDisplay = $('span#time');
const questionText = $('h2#question');
let questions = Array(10);
let queries = ['snow+mountain', 'Charlie Sheen'];
let choicesText = $('li.choices');
let choices = Array(4);

let query = 'central+park';

const game = {
  gifUrl: `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=5n53cDRx0FU49ewKdFwuBjKCTqy8XNip&limit=5`,
  reset: () => {
    button.addClass('hidden');
    content.removeClass('hidden');
  },
  startTimer: () => {
    let timeClock = setInterval(() => {
      time--;
      timeDisplay.text(time);
      if (time === 0) {
        clearInterval(timeClock);
        timerDisplay.text("Time's Up!");
      }
    }, 1000);
  },
  getData: function() {
    let url =
      'https://opentdb.com/api.php?amount=10&category=26&difficulty=easy&type=multiple';

    $.get(url)
      .done(data => {
        questions = questions.fill().map((question, index) => {
          return (question = data.results[index].question);
        });
        console.log(questions);
        questionText.html(questions[questionNum]);
      })
      .fail(error => {
        console.log(error);
      });
  }
};

game.getData();

console.log(game.gifUrl);

button.on('click', function() {
  game.reset();
  game.startTimer();
});
