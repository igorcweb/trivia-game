(function() {
  $(document).ready(() => {
    $('#overlay').addClass('loaded');
  });

  const start = $('button');
  const content = $('.content');
  let time;
  let timeClock;
  let questionNum = 0;
  const timerDisplay = $('h2#timer');
  const questionText = $('h2#question');
  let questions = Array(10);
  let answers = Array(10);
  let incorrectAnswers = Array(10);
  let choices = [];
  let query = '';
  let choiceText = $('li.choice');
  let choiceList = $('ul.choices');
  let message = $('div.message');
  let correctText = $('h2.correct');
  let correctSpan = $('span.correct');
  let status = $('h2#status');
  let gifSrc = '';
  let gif = $('img');
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;
  let correctResult = $('span#correct');
  let incorrectResult = $('span#incorrect');
  let unansweredResult = $('span#unanswered');
  let startOver = $('h2#startover');
  let result = $('div.result');

  const data = [
    {
      question:
        'Which of the following was NOT one of "The Magnificent Seven"?',
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
    getGif: () => {
      const api_key = () => {
        return '5n53cDRx0FU49ewKdFwuBjKCTqy8XNip&limit=5';
      };
      const url = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${api_key()}`;
      $.get(url)
        .then(res => {
          gifSrc = res.data[0].images.original.url;
          gif.attr('src', gifSrc);
        })
        .catch(error => {
          console.log(error);
        });
    },

    reset: () => {
      questionText.removeClass('hidden');
      questionText.text(questions[questionNum]);
      $.each(choiceText, (index, choice) => {
        $(choice).text(choices[questionNum][index]);
      });
      correctSpan.text(answers[questionNum]);
      query = answers[questionNum]
        .toLowerCase()
        .trim()
        .replace(' ', '+');
      game.getGif();
      game.startTimer();
      start.addClass('hidden');
      content.removeClass('hidden');
      choiceList.removeClass('hidden');
      message.addClass('hidden');
      gif.addClass('hidden');
      timerDisplay.removeClass('hidden');
      result.addClass('hidden');
    },

    result: () => {
      setTimeout(() => {
        gif.addClass('hidden');
        questionText.addClass('hidden');
        correctText.addClass('hidden');
        timerDisplay.addClass('hidden');
        status.text("All done, here's how you did!");
        result.removeClass('hidden');
        correctResult.text(correct);
        incorrectResult.text(incorrect);
        unansweredResult.text(unanswered);
      }, 3000);
    },
    startTimer: () => {
      timerDisplay.html(`Time Remaining: 30 Seconds`);
      time = 30;
      timeClock = setInterval(() => {
        time--;
        timerDisplay.html(
          `Time Remaining: <span id="time">${time}</span> Seconds`
        );
        if (time < 6) {
          $('span#time').addClass('warning');
        }
        if (time === 0) {
          unanswered++;
          clearInterval(timeClock);
          timerDisplay.text("Time's Up!");
          questionNum++;
          choiceList.addClass('hidden');
          message.removeClass('hidden');
          correctText.removeClass('hidden');
          status.text('');
          gif.removeClass('hidden');
          if (questionNum < 10) {
            setTimeout(game.reset, 3000);
          } else {
            game.result();
          }
        }
      }, 1000);
    },
    getData: function() {
      questions = questions.fill().map((item, index) => {
        return (item = data[index].question);
      });

      answers = answers.fill().map((item, index) => {
        return (item = data[index].correct_answer);
      });

      console.log('answers: ', answers);

      incorrectAnswers = incorrectAnswers.fill().map((item, index) => {
        return (item = data[index].incorrect_answers);
      });

      choices = incorrectAnswers.map((item, index) => {
        //random number between 0 and 3
        let randomIndex = Math.floor(Math.random() * 4);
        //insert correct answer at a random position inside incorrectAnswers array
        item.splice(randomIndex, 0, answers[index]);
        return item;
      });

      choiceList.on('click', '.choice', function() {
        clearInterval(timeClock);
        status.removeClass('hidden');
        choiceList.addClass('hidden');
        message.removeClass('hidden');
        gif.removeClass('hidden');
        if ($(this).text() === answers[questionNum]) {
          correct++;
          correctText.addClass('hidden');
          status.text('Correct!');
        } else {
          incorrect++;
          correctText.removeClass('hidden');
          status.text('Wrong!');
        }
        questionNum++;
        if (questionNum < 10) {
          setTimeout(game.reset, 3000);
        } else {
          game.result();
        }
      });
      startOver.on('click', function() {
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        questionNum = 0;
        game.reset();
      });
    }
  };

  game.getData();

  start.on('click', function() {
    game.reset();
  });
})();
