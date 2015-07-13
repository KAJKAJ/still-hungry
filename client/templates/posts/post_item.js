
Template.postItem.helpers({
  ownPost: function() {
    return this.userId == Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'thumbs outline up icon';
    } else {
      return 'thumbs up icon';
    }
  },
  images: function() {
    if ( this.imageUrl && this.imageUrl.length > 0) {
      var self = this;
      self.imageUrl = self.imageUrl || [];
      return _.map(self.imageUrl, function(value, index){
        return {value: value, index: index};
      });
    } else { 
      return [{ index:0, value:'/img/empty_bg.jpg'}];
    }
  },
  likeOrNot: function() {
    var userId = Meteor.userId();
    if (userId) {
      if(!_.include(this.likeusers, userId)) {
        return '먹어봤어요';
      } else {
        return '먹어봤어요 취소';
      }
    } else {
      return '먹어봤어요';
    }
  },
  color: function() {
    var userId = Meteor.userId();
    if (userId) {
      if(!_.include(this.likeusers, userId)) {
        return 'orange';
      } else {
        return 'grey';
      }
    } else {
      return 'orange';
    }
  },
  isTrackExist:function(){
    if(this.sc_track_no == -1) return false;
    return true;
  },
  //isPropertyExist:function(property){
  //  debugger;
  //  if(this.hasOwnProperty(property)){
  //    return true;
  //  }else {
  //    return false;
  //  }
  //}
});

Template.postItem.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  },
  'click .item': function(e) {
    e.preventDefault();
    $(e.target).siblings(".active").removeClass("active");
    $(e.target).addClass('active');
  },
  'click #like_it': function(e) {
    e.preventDefault();
    var userId = Meteor.userId();
    if (userId && !_.include(this.likeusers, userId)) {
      return Meteor.call('like', this._id);
    } else {
      return Meteor.call('dislike', this._id);
    }
  }
});

Template.postItem.rendered = function() {
  $("#owl-demo").owlCarousel({
 
      navigation : true, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem: true,
 
      // "singleItem:true" is a shortcut for:
      items : 1, 
      itemsDesktop : false,
      itemsDesktopSmall : false,
      itemsTablet: false,
      itemsMobile : false
 
  });

  if (!this.rendered){
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new daum.maps.LatLng(this.data.location.latitude, this.data.location.longitude), // 지도의 중심좌표
        // center: new daum.maps.LatLng("37.69600304694161", "128.8919231052503"),
        level: 3 // 지도의 확대 레벨
    };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    var map = new daum.maps.Map(mapContainer, mapOption); 

    // 지도를 클릭한 위치에 표출할 마커입니다
    var marker = new daum.maps.Marker({ 
        // 지도 중심좌표에 마커를 생성합니다 
        position: map.getCenter() 
    }); 
    // 지도에 마커를 표시합니다
    marker.setMap(map);
    // this.rendered = true;
  }
};

