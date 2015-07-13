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

// Meteor.publish('commentAuthors', function(postId) {
//   console.log(postId);
//   check(postId, String);
  
//   var commentsCursor = Comments.find({postId: postId});

//   if(commentsCursor) {
//     var userIds = commentsCursor.map(function(p) { return p.userId } );
//     return Meteor.users.find({_id: {$in: userIds}});
//   }

//   return {};
// });

