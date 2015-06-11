// Fixture data 
if (Posts.find().count() === 0) {
  var now = new Date().getTime();
  var rawCSV = Assets.getText('fixture/sheet1.csv');
  var rowsParsed = Baby.parse(rawCSV);
  var rows = rowsParsed.data;

    var adminId = Meteor.users.insert({
    profile: {name: 'youngmin'}
  });

  var admin = Meteor.users.findOne(adminId);

  for(var i=1; i < rows.length; i++ ){
    var element = rows[i];

    var restaurant = {
      imageUrl: '',
      userId: admin._id,
      author: admin.profile.name,
      episode: element[0],
      part: element[1],
      title: element[2],
      dish: element[3],
      season: element[4],
      location: {
        city: element[5],
        division: element[6],
        address: element[7],
        longtitude: 0,
        latitude: 0
      },
      url: '',
      tel: element[8],
      description: element[9],
      submitted: new Date(now - 7 * 3600 * 1000),
      commentsCount: 0,
      upvoters: [], votes: 0
    };

    var requestURI = 'https://apis.daum.net/local/v1/search/keyword.json';
    var query = restaurant.tel? restaurant.tel 
                    : (restaurant.location.city + ' ' + restaurant.location.division + ' ' + restaurant.location.address);
    // HTTP.call('GET', requestURI, 
    //     {params: { apikey: 'f836162338ea24d0e221975199009a2d', query : query } }
    //     , function(error, result) {
    //     if (!error) {
    //       var object = JSON.parse(result.content);
    //       restaurant.imageUrl = object.channel.item[0]?  object.channel.item[0].imageUrl: '';
    //       restaurant.location.longitude = object.channel.item[0]? object.channel.item[0].longitude: '';
    //       restaurant.location.latitude = object.channel.item[0]? object.channel.item[0].latitude: '';

    //     } else {
    //       console.log(error);
    //     }
    //     Posts.insert(restaurant);
    //   }
    // );
    Posts.insert(restaurant);
  }
}
