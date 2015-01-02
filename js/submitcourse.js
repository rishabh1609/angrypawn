


$('#CourseSubmit').on('click', function(event) {
    event.preventDefault();
    console.log("submission started");
    var iname = $('input[name=instructorName').val();
    var iemail = $('input[name=instructorEmail').val();
    var curl = $('input[name=courseUrl').val();
     
    $('#status').css('color', 'black');
    $('#status').text("Please wait...submitting your course.");
    
    Parse.Cloud.run('addCourse', { iname: iname, iemail: iemail, curl:curl}, {
        success: function(success) {
            console.log("success")
            $('#status').text("Submitted Successfully.");
            $('#status').css('color', '#5cb85c');
            
            
        },
        error: function(error) {
            console.log("err")
            $('#status').text("Something went wrong. Try again later.");
             $('#status').css('color', '#d9534f');
        }
    });
    
  
});