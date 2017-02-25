/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(1);

	//
	// let x = new GameView("hi");
	// console.log(x);

	document.addEventListener("DOMContentLoaded", function(){
	  let canv = document.getElementById("game-canvas").getContext("2d");
	  const blowEmUp = new GameView(canv);
	  blowEmUp.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const movingObject = __webpack_require__(5);

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	const Util = {
	  inherits (childClass, parentClass) {
	    function Surrogate() {}
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate();
	    childClass.prototype.constructor = childClass;
	  }
	};

	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports) {

	function MovingObject(options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
	}

	MovingObject.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();

	  ctx.arc(
	    this.pos[0],
	    this.pos[1],
	    this.radius,
	    0,
	    2*Math.PI,
	    false
	  );

	  ctx.fill();
	};

	MovingObject.prototype.move = function () {
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	};

	module.exports = MovingObject;


/***/ }
/******/ ]);