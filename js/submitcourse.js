


$('#CourseSubmit').on('click', function(event) {
    event.preventDefault();
    console.log("submission started");
    var iname = $('input[name=instructorName]').val();
    var iemail = $('input[name=instructorEmail]').val();
    var curl = $('input[name=courseUrl]').val().toLowerCase();;
    var price =$('input[name=coursePrice]').val();
     
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
    var coruseID = curl.substring(0,curl.indexOf("/");
                                 
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