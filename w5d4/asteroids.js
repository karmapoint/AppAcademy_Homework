const GameView = require("./game_view.js");

//
// let x = new GameView("hi");
// console.log(x);

document.addEventListener("DOMContentLoaded", function(){
  let canv = document.getElementById("game-canvas").getContext("2d");
  const blowEmUp = new GameView(canv);
  blowEmUp.start();
});
