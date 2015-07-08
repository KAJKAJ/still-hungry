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
    var imageUrls = new Array();

    if(element[0] !== 'S02E13') continue;

    // title is empty
    if(element[2] == '') continue;

    var restaurant = {
      userId: admin._id,
      author: admin.profile.name,
      
      season: element[0], // season 1,2, ... 
      episode: element[0], // episode 1,2, ... 
      episode_sub: element[0], // episode ...
      // sc_url: ,
      // sc_track_no: ,
      // sc_time: , 

      part: element[1],
      title: element[2],
      dish: element[3],
      // season: element[4],
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
      upvoters: [], votes: 0,
      likeusers: [], likes:0
    };

    // fetch value added information from daum API
    // image url, location info
    var requestURI = 'https://apis.daum.net/local/v1/search/keyword.json';
    var query = restaurant.tel? restaurant.tel 
                    : (restaurant.location.city + ' ' + restaurant.location.division + ' ' + restaurant.location.address);

    var result = HTTP.call('GET', requestURI, { params: { apikey: 'f836162338ea24d0e221975199009a2d', query : query } });

    if(result) {
      var object = JSON.parse(result.content);

      if( object.channel.item ) { 
        if (object.channel.item[0] && object.channel.item[0].imageUrl) imageUrls.push(object.channel.item[0].imageUrl);
        restaurant.location.longitude = object.channel.item[0]? object.channel.item[0].longitude: '';
        restaurant.location.latitude = object.channel.item[0]? object.channel.item[0].latitude: '';
      }
    }

    if( restaurant.tel ) {
      var requestURI_Google = 'https://ajax.googleapis.com/ajax/services/search/images';
      var result  = HTTP.call('GET', requestURI_Google, { params: { q: restaurant.tel, v: '1.0'} } );

      console.log(result.content);
      var resultArr = JSON.parse(result.content);

      for(var j=0; j < resultArr.responseData.results.length; j++ ) {
        if(imageUrls.length > 8) break;

        console.log(resultArr.responseData.results[j].url);

        imageUrls.push(resultArr.responseData.results[j].url);
      }
    }

    if (imageUrls.length > 0) restaurant.imageUrl = imageUrls;
    Posts.insert(restaurant);

  }
}
//test