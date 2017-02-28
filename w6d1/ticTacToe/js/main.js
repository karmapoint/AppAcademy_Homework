const View = require("./ttt-view.js"); // require appropriate file
const Game = require("./game.js"); // require appropriate file

$( () => {
  const currentGame = new Game();
  const currentView = new View(currentGame, $(".ttt"));
  currentView.bindEvents();

});
