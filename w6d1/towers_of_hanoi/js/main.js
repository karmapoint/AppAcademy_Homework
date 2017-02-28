const Game = require('./game.js');
const View = require("./hanoi-view.js");

$( () => {
  // console.log("test");
  const rootEl = $('.hanoi');
  const game = new Game();
  const view = new View(game, rootEl);
});
