const APIUtil = require("./api_util.js");

class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id");
    this.followState = this.$el.data("initial-follow-state");
    this.render();
    this.$el.on("click", this.handleClick.bind(this));
  }

  render() {
    let text = "";

    if (this.followState === "unfollowed") {
      this.$el.prop( "disabled", false );
      text = "Follow";
      this.$el.html(text);
    } else if (this.followState === "followed") {
      this.$el.prop( "disabled", false );
      text = "Unfollow";
      this.$el.html(text);
    } else if (this.followState === "unfollowing" || this.followState === "following") {
      this.$el.prop( "disabled", true ).html("updating");
    }
  }

  handleClick(event) {
    event.preventDefault();
    if (this.followState === 'unfollowed') {
      this.followState = 'following';
      this.render();

      APIUtil.followUser(this.userId).then(() => {
        this.successActions();
      });
    } else {
      this.followState = 'unfollowing';
      this.render();

      APIUtil.unfollowUser(this.userId).then( () => {
        this.successActions();
      });
    }
  }

  successActions() {
   this._toggleState();
   this.render();
 }

  _toggleState() {
    this.followState = this.followState === "unfollowing" ?
                                            "unfollowed" : "followed";
  }

} //closes class
module.exports = FollowToggle;
