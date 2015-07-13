Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
  }
});


Template.mapNComments.events({
  'click .ui.tabular.menu>.item:not(.active)': function(e) {
    e.preventDefault();
    $('.ui.tabular.menu>.item.active').removeClass('active');
		e.target.classList.add('active');
  }
});