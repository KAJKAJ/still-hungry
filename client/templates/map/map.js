Meteor.startup(function() {
    GoogleMaps.load();
});

Template.map.helpers({
    mapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(37.6, 127),
                zoom: 8
            };
        }
    }
});

Template.map.onCreated(function() {
    var posts = this.data.posts;
    GoogleMaps.ready('map', function(map) {
        //console.log("map is ready");

        posts.forEach(function (post) {
            console.log(post);

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(post.location.latitude, post.location.longitude),
                map: map.instance,
                title: post.title,
            });

            var imageUrl = "img/empty_bg.jpg";
            if(post.imageUrl !== undefined && post.imageUrl[0]){
                imageUrl = post.imageUrl[0];
            }

            var contentString =
                '<div class="ui items">'+
                    '<div class="item">'+
                        '<div class="image">'+
                            '<img src='+ imageUrl + '>'+
                        '</div>'+
                        '<div class="content">'+
                            '<a class="header" href="/posts/'+ post._id + '">' + post.title +'</a>'+
                            '<div class="meta">'+
                                '<span>'+ post.dish +'</span>'+
                            '</div>'+
                            '<div class="description">'+
                                '<p>'+ post.tel +'</p>'+
                            '</div>'+
                            '<div class="extra">'+
                                '<i class="user icon"></i>' + post.likes +
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';


            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map.instance,marker);
            });

        });
    });
});