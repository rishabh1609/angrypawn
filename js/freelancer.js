
var course; 
var opens =0;
function courseurl(courseid) {
    course=courseid;
    
    if(getCookie("email")==""){
        opens=1;
        var $anchor = $(this);
        $('#subscribe').modal('show');
        alert("Please subscribe with us to get coupon.")
        
        return;
    }
    var win = window.open("","_blank");
    
    Parse.Cloud.run('sendURL', {  courseID: courseid, email:getCookie("email")}, {

        success: function(success) {
            console.log(success)
            opens=0;
            
            win.location.href=success;
            win.focus;
            return
        },
        error: function(error) {
            console.log("err")
            opens=0;
            alert("Something went wrong. Try again later.");
            return;
        }
    });
return;
}

$('#CourseSubmit').on('click', function(event) {
    event.preventDefault();
    console.log("submission started");
    var iname = $('input[name=instructorName]').val();
    var iemail = $('input[name=instructorEmail]').val();
    var curl = $('input[name=courseUrl]').val();
    var price = parseInt($('input[name=coursePrice]').val());
    
     
    var udemy = curl.search("udemy.com");
    
    if(udemy==-1 )
    {
        $('#status').text("Course url is incorrect. Please enter a valid url");
        $('#status').css('color', '#d9534f');
        return;
    }
    console.log(curl);
    curl = curl.substr(udemy+10);
    curl = curl.replace(/([^:]\/)\/+/g, "/");
    var coruseID = curl.substring(0,curl.indexOf("/"));
                                 
    var couponCode = curl.search("couponCode=");
    console.log(couponCode);
    if(couponCode == -1){
        $('#status').text("Please enter a url with coupon code");
        $('#status').css('color', '#d9534f');
        return;
    }
    
    couponCode= curl.substr(couponCode+11);
    
    $('#status').css('color', 'black');
    $('#status').text("Please wait...submitting your course.");

  
            Parse.Cloud.run('addCourse', { name: iname, email: iemail, courseID:coruseID,couponCode: couponCode, price:price}, {
            success: function(success) {
            console.log("success")
            $('#status').text("Your course have been submitted successfully");
            $('#status').css('color', '#5cb85c');
            },
            error: function(error) {
            console.log("err")
            $('#status').text("Something went wrong. Try again later.");
             $('#status').css('color', '#d9534f');
            }
            });
    
    });


$('#Subscribebutton').on('click', function(event) {
    event.preventDefault();
    console.log("submission started");
    
    var iemail = $('input[name=subscribeEmail]').val();
   
   
    
    Parse.Cloud.run('addSubscriber', {  email: iemail}, {
        success: function(success) {
            if(success==0)
            alert("Submitted Successfully.");
            else
            alert("You are already registered :-)")
            setCookie("email",iemail,7);
            if(opens==1)
                courseurl(course);
        },
        error: function(error) {
            console.log("err")
            if(opens==1)
                courseurl(course);
            alert("Something went wrong. Try again later.");
        }
    });
    
 
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}




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
                    number: {
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

