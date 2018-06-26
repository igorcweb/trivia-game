//giphy api key 5n53cDRx0FU49ewKdFwuBjKCTqy8XNip

let query = 'fun';

const game = {
  gifUrl: `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=5n53cDRx0FU49ewKdFwuBjKCTqy8XNip&limit=5`
};

console.log(game.gifUrl);
