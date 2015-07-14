Accounts.onCreateUser(function(options, user) {

	console.log(JSON.stringify(options));
	console.log(JSON.stringify(user));

  if (options.profile) {
  	if (user.services.facebook && user.services.facebook.id) {
  		options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
  		options.profile.nickname = user.services.facebook.name;
  		user.profile = options.profile;

  	} else if(user.services.password) {
  		options.profile.name = user.username;
  		user.profile = options.profile;
  	}
  } 
  return user;
});