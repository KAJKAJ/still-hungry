// Template.postPage.helpers({
//   comments: function() {
//     return Comments.find({postId: this._id});
//   }
// });

Template.mapNComments.events({
  "click a[data-tab='first']:not(.active)": function(e) {
    e.preventDefault();
 	 	$("[data-tab='second']").removeClass('active');
    $("[data-tab='first']").addClass('active');
    e.target.classList.add('active');
  },
  "click a[data-tab='second']:not(.active)": function(e) {
 	 	e.preventDefault();
 	 	$("[data-tab='first']").removeClass('active');
  	$("[data-tab='second']").addClass('active');
  	e.target.classList.add('active');
  }
});

Template.mapNComments.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
  }
});

