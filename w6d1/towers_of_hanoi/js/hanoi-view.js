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
