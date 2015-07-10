Accounts.onCreateUser(function(options, user) {

  if (options.profile) {
  	if (user.services.facebook && user.services.facebook.id) {
  		options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";	
  		user.profile = options.profile;
  	}
  }
  return user;
});