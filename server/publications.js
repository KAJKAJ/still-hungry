Meteor.publish('posts', function(options) {
  // check(options, {
  //   likeusers: Object,
  //   sort: Object,
  //   limit: Number
  // });
  if (options.likeusers != undefined ) {
    return Posts.find({likeusers: options.likeusers}, options);
  } else {
    return Posts.find({}, options);    
  }
});

Meteor.publish('singlePost', function(id) {
  check(id, String);
  return Posts.find(id);
});

Meteor.publish('comments', function(postId) {
  check(postId, String);
  return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});

