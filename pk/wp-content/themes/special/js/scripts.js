 $(document).ready(function() {
  
        $('.home .hero').anystretch("/mothership/pk/wp-content/themes/special/images/crane.jpg", {speed: 500});
        $('.page-id-10 .hero').anystretch("/mothership/pk/wp-content/themes/special/images/b-ball.jpg", {speed: 500});
        $('.page-id-7 .hero').anystretch("/mothership/pk/wp-content/themes/special/images/berry.jpg", {speed: 500});
        $('.page-id-5 .hero').anystretch("/mothership/pk/wp-content/themes/special/images/cham.jpg", {speed: 500});
        $('.postid-127 .hero').anystretch("/mothership/pk/wp-content/themes/special/images/fold.png", {speed: 500});
        $('.single-post .hero').anystretch("/mothership/pk/wp-content/themes/special/images/dead-ball.jpg", {speed: 500});
        $('.error404 .hero').anystretch("/mothership/pk/wp-content/themes/special/images/404.jpg", {speed: 500});
        $('.date .hero').anystretch("/mothership/pk/wp-content/themes/special/images/date.jpg", {speed: 500});
        $('.category .hero').anystretch("/mothership/pk/wp-content/themes/special/images/category.jpg", {speed: 500});
      
});

$(document).ready(function() {
  $('.toggle-content').click(function(){
	//get collapse content selector
	var collapse_content_selector = $(this).attr('href');					

	//make the collapse content to be shown or hide
	var toggle_switch = $(this);
	$(collapse_content_selector).toggle(function(){
	  if($(this).css('display')=='none'){
                            //change the button label to be 'Show'
		toggle_switch.html('View');
	  }else{
                            //change the button label to be 'Hide'
		toggle_switch.html('Close');
	  }
	});
  });

});