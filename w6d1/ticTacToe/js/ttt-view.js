class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
  }

  bindEvents() {
    $('li').on("click", e => {
      const $square = $(e.currentTarget);
      let tempPos = $square.attr("data");
      let currentPos = [parseInt(tempPos[0]), parseInt(tempPos[2])];
      console.log(currentPos);
      if (!this.game.board.isEmptyPos(currentPos)) {
        alert("Invalid move!");
      } else {
        this.makeMove($square);
        this.game.playMove(currentPos);
      }
      if (this.game.isOver()) {
        let gameWinner = this.game.winner();
        if (gameWinner === "x") {
          $('.x_item').removeClass("x_item").addClass("winner");
        } else {
          $('.o_item').removeClass("o_item").addClass("winner");
        }
        this.$el.append(`<h2>Congrats ${gameWinner}</h2>`);
      }
    });
  }

  makeMove($square) {
    if (this.game.currentPlayer === "x") {
      $square.addClass("x_item");
      $square.removeClass("empty_item");
      $square.append("X");
    } else {
      $square.addClass("o_item");
      $square.removeClass("empty_item");
      $square.append("O");
    }
  }

  setupBoard() {
    this.$el.append("<ul class='ttt_grid'>");
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        $(".ttt_grid").append(`<li class='empty_item' data='${i},${j}'>`);
      }
    }
  }
}

module.exports = View;
