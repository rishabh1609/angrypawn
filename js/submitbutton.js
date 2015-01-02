
console.log("submit intialized");

function courseurl(courseid) {

    console.log("opening course");
   
     console.log(courseid)
    var win =window.open("", '_blank')
    Parse.Cloud.run('sendURL', {  ID: courseid}, {

        success: function(success) {
            console.log(success)
            win.location.href=success;
            win.focus;
        },
        error: function(error) {
            console.log("err")
            alert("Something went wrong. Try again later.");
        }
    });

};


console.log("submit intialized");


$('#CourseSubmit').on('click', function(event) {
    event.preventDefault();
    console.log("submission started");
    var iname = $('input[name=instructorName]').val();
    var iemail = $('input[name=instructorEmail]').val();
    var curl = $('input[name=courseUrl]').val();
     
    $('#status').css('color', 'black');
    $('#status').text("Please wait...submitting your course.");

  
            Parse.Cloud.run('addInstructor', { name: iname, email: iemail, url:curl}, {
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
   
   
    
    Parse.Cloud.run('addStudent', {  email: iemail}, {
        success: function(success) {
            console.log(success)
            if(success=="Subscribed New Student")
            alert("Submitted Successfully.");
            else
            alert("You are already registered :-)")
        },
        error: function(error) {
            console.log("err")
            alert("Something went wrong. Try again later.");
        }
    });
    
 
});
