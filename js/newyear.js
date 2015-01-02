$('.skew-title').children('span').hover(function() {
  
  var n = $(this).index();
  n++;
  $(this).addClass('flat');
  
  if ((n % 2 == 0)) {  
    $(this).prev().addClass('flat');
  } else {
    if (!$(this).hasClass('last')) {
      $(this).next().addClass('flat');
    }  
  }
  
}, function() {
  
  $('.flat').removeClass('flat');
  
});