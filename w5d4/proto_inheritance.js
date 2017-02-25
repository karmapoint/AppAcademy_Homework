Function.prototype.inherits1 = function (targetFunction) {
  function Surrogate()  {}
  Surrogate.prototype = targetFunction.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

Function.prototype.inherits2 = function (TargetFunction) {
  this.prototype = Object.create(TargetFunction.prototype);
  this.prototype.constructor = this;
};


function MovingObject () {}
MovingObject.prototype.fly = function () { console.log("zoom");};

function Ship () {}
Ship.inherits(MovingObject);

function Asteroid () {}
Asteroid.inherits(MovingObject);

let s = new Ship();
let a = new Asteroid();
// let m = new MovingObject();
console.log(s.__proto__);
s.fly();
