const button = $('button');
const content = $('.content');
let time = 30;
let questionNum = 0;
const timerDisplay = $('h2#timer');
const timeDisplay = $('span#time');
const questionText = $('h2#question');
let questions = Array(10);
let answers = Array(10);
let incorrectAnswers = Array(10);
let choices = [];
let query = '';
let choiceText = $('li.choice');
let choicesList = $('ul.choices');

const data = [
  {
    question: 'Which of the following was not one of "The Magnificent Seven"?',
    correct_answer: 'Clint Eastwood',
    incorrect_answers: ['Steve McQueen', 'Charles Bronson', 'Robert Vaughn']
  },
  {
    question:
      'What is the highest grossing film of all time (without adjusting for inflation)?',
    correct_answer: 'Avatar',
    incorrect_answers: [
      'Jurassic World',
      'Star Wars: The Force Awakens',
      'Titanic'
    ]
  },
  {
    question:
      'Which animated movie was first to feature a celebrity as a voice actor?',
    correct_answer: 'Aladdin',
    incorrect_answers: [
      'Toy Story',
      'James and the Giant Peach',
      'The Hunchback of Notre Dame'
    ]
  },
  {
    question: 'Who wrote and directed the 1986 film "Platoon"?',
    correct_answer: 'Oliver Stone',
    incorrect_answers: [
      'Francis Ford Coppola',
      'Stanley Kubrick',
      'Michael Cimino'
    ]
  },
  {
    question: 'Who plays Alice in the Resident Evil movies?',
    correct_answer: 'Milla Jovovich',
    incorrect_answers: ['Madison Derpe', 'Milla Johnson', 'Kim Demp']
  },
  {
    question:
      'Which iconic character is featured in movies such as "The Enforcer", "Sudden Impact", and "The Dead Pool"?',
    correct_answer: 'Dirty Harry',
    incorrect_answers: ['Indiana Jones', 'James Bond', 'Harry Potter']
  },
  {
    question:
      'Which former Star Trek actor directed Three Men and a Baby (1987)?',
    correct_answer: 'Leonard Nimoy',
    incorrect_answers: ['William Shatner', 'George Takei', 'James Doohan']
  },
  {
    question:
      'What was the name of the protagonist in the movie Commando (1985)?',
    correct_answer: 'John Matrix',
    incorrect_answers: ['Ben Richards', 'Douglas Quaid', 'Harry Tasker']
  },
  {
    question:
      'Which one of these actors\' cameo was cut from the film "E.T.the Extra-Terrestrial"?',
    correct_answer: 'Harrison Ford',
    incorrect_answers: ['Michael J. Fox', 'Andy Kaufman', 'Michael Douglas']
  },
  {
    question:
      'Which of these actors/actresses is NOT a part of the cast for the 2016 movie "Suicide Squad"?',
    correct_answer: 'Scarlett Johansson',
    incorrect_answers: ['Jared Leto', 'Will Smith', 'Margot Robbie']
  }
];

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
      if (time < 6) {
        timeDisplay.addClass('warning');
      }
      if (time === 0) {
        clearInterval(timeClock);
        timerDisplay.text("Time's Up!");
      }
    }, 1000);
  },
  getData: function() {
    questions = questions.fill().map((item, index) => {
      return (item = data[index].question);
    });
    questionText.text(questions[questionNum]);
    console.log('questions: ', questions);

    answers = answers.fill().map((item, index) => {
      return (item = data[index].correct_answer);
    });
    console.log('answers: ', answers);

    incorrectAnswers = incorrectAnswers.fill().map((item, index) => {
      return (item = data[index].incorrect_answers);
    });

    console.log('incorrect answers: ', incorrectAnswers);

    choices = incorrectAnswers.map((item, index) => {
      //random number between 0 and 3
      let randomIndex = Math.floor(Math.random() * 4);
      //insert correct answer at a random position inside incorrectAnswers array
      item.splice(randomIndex, 0, answers[index]);
      return item;
    });
    console.log('choices:', choices);
    $.each(choiceText, (index, choice) => {
      choice.innerText = choices[questionNum][index];
      console.log(choice.innerText);
    });
  }
};

game.getData();

button.on('click', function() {
  game.reset();
  game.startTimer();
});
