/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Highlight the top nav as scrolling occurs

$('body').scrollspy({
    target: '.navbar-fixed-top'
});


// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

//for modal form resetting
$('#submitCourse').on('hide.bs.modal', function (e) {
   $('#status').css('color', 'black');
    $('#status').text("");
    $('.registerform').bootstrapValidator('resetForm', true);
    $(this).find('form')[0].reset();
});


//to diable submit button 
$('#submitCourse').on('shown.bs.modal', function (e) {
  $('#CourseSubmit').prop('disabled',true);
})

//SUBSCRIBE FORM VALIDATOR
$(document).ready(function() {
    $('#subscribeform').bootstrapValidator({
        container: '#messages',
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            subscribeEmail: {
                validators: {
                    notEmpty: {
                        message: 'The email is required and cannot be empty'
                    },
                    emailAddress: {
                        message: 'The input is not a valid email address'
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

//Register form validator
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
            },
             coursePrice: {
                validators: {
                    notEmpty: {
                        message: 'The course price is required and cannot be empty'
                    },
                    uri: {
                        message: 'The input is not a valid number'
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



