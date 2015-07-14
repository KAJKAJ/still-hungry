Template.commentItem.helpers({
  submittedText: function() {
  	if( moment().isSame(moment(this.submitted), 'day')) {
  		return moment(this.submitted).format('YYYY-MM-DD h:mm:ss a');	
  	} else {
  		return moment(this.submitted).format('YYYY-MM-DD h:mm:ss a');	
  	}
  }
});

