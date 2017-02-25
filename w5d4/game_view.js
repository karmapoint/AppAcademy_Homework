const Game = require("./game.js");

function GameView(ctx) {
  this.game = new Game(300, 300, 2);
  this.ctx = ctx;
}

GameView.prototype.start = function () {
  setInterval(this.game.movingObject, 20);
  setInterval(this.game.draw, 20);
};

module.exports = GameView;

// let x = new GameView("hi");
// console.log(x);
