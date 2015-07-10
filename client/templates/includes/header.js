Template.header.helpers({
  activeRouteClass: function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    
    var active = _.any(args, function(name) {
      return Router.current() && Router.current().route.getName() === name
    });
    
    //return active && 'active';
    return active && 'active';
  },
  profilePicture: function () {
  	if( Meteor.user().profile && Meteor.user().profile.picture) {
  		return  Meteor.user().profile.picture;
  	} else {
  		return '/img/frown_image.png';
  	}
  }
});