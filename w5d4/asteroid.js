const Util = require("./util.js");
const movingObject = require("./moving_object.js");

const COLOR = "#000000";
const RADIUS = 150;

function scale (vec, m) {
  return [vec[0] * m, vec[1] * m];
}

function randomVec (length) {
  const deg = 2 * Math.PI * Math.random();
  return scale([Math.sin(deg), Math.cos(deg)], length);
}
// Scale the length of a vector by the given amount.

function Asteroid(options) {
  this.pos = options.pos;
  this.vel = randomVec(20);
  this.color = COLOR;
  this.radius = RADIUS;

  let movingOptions = {
    pos: this.pos,
    vel: this.vel,
    radius: this.radius,
    color: this.color
  };

  movingObject.call(this, movingOptions);
}

Util.inherits(Asteroid, movingObject);

// console.log(new Asteroid({ pos: [30, 30] }));

module.exports = Asteroid;
