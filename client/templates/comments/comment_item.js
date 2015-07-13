Template.commentItem.helpers({
  submittedText: function() {
  	if( moment().isSame(moment(this.submitted), 'day')) {
  		return moment(this.submitted).format('YYYY-MM-DD mm-ss');	
  	} else {
  		return moment(this.submitted).format('YYYY-MM-DD mm-ss');	
  	}
  }
});