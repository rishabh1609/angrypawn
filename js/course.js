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