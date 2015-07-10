Accounts.ui.config({
    requestPermissions: {
        facebook: ['email', 'public_profile'],
    },
    // passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL',
    extraSignupFields: [{
        fieldName: 'nickname',
        fieldLabel: '닉네임 (걸신게시판)',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Please write your first name");
            return false;
          } else {
            return true;
          }
        }
    }]
});