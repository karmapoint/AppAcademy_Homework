const Asteroid = require("./asteroid.js");

function Game(dimX, dimY, numAsteroids) {
  this.DIM_X = dimX;
  this.DIM_Y = dimY;
  this.NUM_ASTEROIDS = numAsteroids;

  let startPositions = [[23,34], [1, 56]];

  this.asteroids = [];

  let newRock1 = this.addAsteroids( [20, 50]);
  let newRock2 = this.addAsteroids([220, 250]);
  this.asteroids.push(newRock1);
  this.asteroids.push(newRock2);
}

Game.prototype.addAsteroids = function (pos) {
  return new Asteroid(pos);
};

Game.prototype.draw = function(ctx) {
  this.asteroids.forEach(function(asteroid) {asteroid.draw(ctx);});
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach(function(asteroid) {asteroid.move();});
};


// let x = new Game(300, 300, 2);
// console.log(x.asteroids);

module.exports = Game;
