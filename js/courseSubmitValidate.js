$(document).ready(function() {
    $('.registerform').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            instructorName: {
                message: 'The name is not valid',
                validators: {
                    notEmpty: {
                        message: 'The name is required and cannot be empty'
                    },
                    stringLength: {
                        min: 3,
                        max: 50,
                        message: 'The name must be more than 3 and less than 50 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9 ]+$/,
                        message: 'The username can only consist of alphabetical and number'
                    }
                }
            },
            instructorEmail: {
                validators: {
                    notEmpty: {
                        message: 'The email is required and cannot be empty'
                    },
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    }
                }
            },
            courseUrl: {
                validators: {
                    notEmpty: {
                        message: 'The course url is required and cannot be empty'
                    },
                    uri: {
                        message: 'The input is not a valid url'
                    }
                }
            }
        }
    })
    .on('success.field.bv', function(e, data) {
            if (data.bv.isValid()) {
                data.bv.disableSubmitButtons(false);
            }
            else{
                data.bv.disableSubmitButtons(true);
            }
        });

});




