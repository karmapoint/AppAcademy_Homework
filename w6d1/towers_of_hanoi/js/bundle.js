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

	const Game = __webpack_require__(1);
	const View = __webpack_require__(2);

	$( () => {
	  // console.log("test");
	  const rootEl = $('.hanoi');
	  const game = new Game();
	  const view = new View(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length === 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length === 3) || (this.towers[1].length === 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx);
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class View {
	  constructor(game, $el) {
	    this.game = game;
	    this.$el = $el;
	    this.selectedTower = undefined;
	    this.setupTowers();
	    this.render();
	    this.clickTower();
	  }

	  setupTowers() {
	    this.$el.append('<ul class="all_towers"></ul>');
	    $('.all_towers').append('<li id="0" data=""></li>');
	    $('.all_towers').append('<li id="1"></li>');
	    $('.all_towers').append('<li id="2"></li>');
	  }

	  render() {
	    for (var i = 0; i < this.game.towers.length; i++) {
	      $(`#${i}`).attr(`data`, `${this.game.towers[i]}`);
	      let array = this.game.towers[i];
	      $(`#${i}`).empty();
	      if (array.includes(1)) {
	        $(`#${i}`).append('<div class="one">');
	      }
	      if (array.includes(2)) {
	        $(`#${i}`).append('<div class="two">');
	      }
	      if (array.includes(3)) {
	        $(`#${i}`).append('<div class="three">');
	      }
	    }
	  }

	  clickTower() {
	    $("li").on("click", e => {
	      const $tower = $(e.currentTarget);
	      let towerNum = parseInt($tower.attr("id"));
	      if (this.selectedTower === undefined) {
	        this.selectedTower = towerNum;
	        $tower.append("<p>Select a tower to move a disc to.</p>");
	      } else {
	        if (!this.game.isValidMove(this.selectedTower, towerNum)) {
	          this.selectedTower = undefined;
	          this.render();
	          alert ('invalid move');
	        } else {
	          this.game.move(this.selectedTower, towerNum);
	          this.selectedTower = undefined;
	          this.render();
	        }
	      }
	    });
	  }

	}

	module.exports = View;


/***/ }
/******/ ]);