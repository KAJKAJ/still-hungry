
Template.postsList.onRendered(function () {
  //this.find('.wrapper')._uihooks = {
  //  insertElement: function (node, next) {
  //    $(node)
  //      .hide()
  //      .insertBefore(next)
  //      .fadeIn();
  //  },
  //  moveElement: function (node, next) {
  //    var $node = $(node), $next = $(next);
  //    var oldTop = $node.offset().top;
  //    var height = $(node).outerHeight(true);
  //
  //    // find all the elements between next and node
  //    var $inBetween = $(next).nextUntil(node);
  //    if ($inBetween.length === 0)
  //      $inBetween = $(node).nextUntil(next);
  //
  //    // now put node in place
  //    $(node).insertBefore(next);
  //
  //    // measure new top
  //    var newTop = $(node).offset().top;
  //
  //    // move node *back* to where it was before
  //    $(node)
  //      .removeClass('animate')
  //      .css('top', oldTop - newTop);
  //
  //    // push every other element down (or up) to put them back
  //    $inBetween
  //      .removeClass('animate')
  //      .css('top', oldTop < newTop ? height : -1 * height)
  //
  //
  //    // force a redraw
  //    $(node).offset();
  //
  //    // reset everything to 0, animated
  //    $(node).addClass('animate').css('top', 0);
  //    $inBetween.addClass('animate').css('top', 0);
  //  },
  //  removeElement: function(node) {
  //    $(node).fadeOut(function() {
  //      $(this).remove();
  //    });
  //  }
  //}
});

Template.postItemForList.helpers({
  likeOrNot: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.likeusers, userId)) {
      return '먹어봤어요';
    } else {
      return '먹어봤어요 취소';
    }
  },
  color: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.likeusers, userId)) {
      return 'orange';
    } else {
      return 'grey';
    }
  },
  imageFirst: function() {
    if ( this.imageUrl && this.imageUrl.length > 0) { 
      return this.imageUrl[0];
    } else {
      return '/img/empty_bg.jpg';
    }
  }
});

Template.postItemForList.events({
  'click #like_it': function(e) {
    e.preventDefault();
    var userId = Meteor.userId();
    if (userId && !_.include(this.likeusers, userId)) {
      return Meteor.call('like', this._id);
    } else {
      return Meteor.call('dislike', this._id);
    }
  },
  'mouseover #require_login': function(e) {
    $('.example .teal.button')
    .popup({
      on: 'click'
    })
  }
});

