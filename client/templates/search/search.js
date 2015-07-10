var instance;

Template.search.rendered = function() {
  $('.searchInput').focus();
}

Template.search.created = function () {
  instance = EasySearch.getComponentInstance(
    { id : 'main', index : 'posts' }
  );

	console.log(instance);

  instance.on('searchingDone', function (searchingIsDone) {
  	console.log(instance);
  	console.log(this);

    searchingIsDone && console.log('I am done!');
  });

  instance.on('currentValue', function (val) {
    console.log('The user searches for ' + val);
  });

};

Template.search.helpers({
  isSearching: function () {
  	console.log(instance);
    return instance.get('searching');
  }
}); 