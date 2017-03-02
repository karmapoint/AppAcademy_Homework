const APIUtil = require("./api_util.js");

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = $(".users-search input");
    this.$ul = $(".users-search ul");
    this.$input.on("keypress", this.handleInput.bind(this));
  }

  handleInput (event) {
    APIUtil.searchUsers(this.$input.val()).then( (results) => {
      this.renderResults(results);
    });
  }

  renderResults (results) {
    this.$ul.empty();
    results.forEach( (el) => {
      this.$ul.append(`<li>${el.username}</li> `);
    });
  }
}

module.exports = UsersSearch;
