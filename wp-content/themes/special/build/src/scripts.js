 
 // js body class for javascript disabled browsers
 $('body').addClass('js-enabled');

 $(document).ready(function() {
  
        $('.home .hero').anystretch("/wp-content/themes/special/images/crane.jpg", {speed: 500});
        $('.page-id-10 .hero').anystretch("/wp-content/themes/special/images/b-ball.jpg", {speed: 500});
        $('.page-id-7 .hero').anystretch("/wp-content/themes/special/images/berry.jpg", {speed: 500});
        $('.page-id-5 .hero').anystretch("/wp-content/themes/special/images/cham.jpg", {speed: 500});
        $('.postid-127 .hero').anystretch("/wp-content/themes/special/images/fold.png", {speed: 500});
        $('.single-post .hero').anystretch("/wp-content/themes/special/images/dead-ball.jpg", {speed: 500});
        $('.error404 .hero').anystretch("/wp-content/themes/special/images/drac.gif", {speed: 500});
        $('.date .hero').anystretch("/wp-content/themes/special/images/date.jpg", {speed: 500});
        $('.category .hero').anystretch("/wp-content/themes/special/images/category.jpg", {speed: 500});
      
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


$(document).ready(function() {
    $('.crapagram').embedagram({
            instagram_id: "1909818" ,
            limit: 1
        });
});


/* grunticon Stylesheet Loader | https://github.com/filamentgroup/grunticon | (c) 2012 Scott Jehl, Filament Group, Inc. | MIT license. */
window.grunticon=function(e){if(e&&3===e.length){var t=window,n=!!t.document.createElementNS&&!!t.document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect&&!!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),A=function(A){var o=t.document.createElement("link"),r=t.document.getElementsByTagName("script")[0];o.rel="stylesheet",o.href=e[A&&n?0:A?1:2],r.parentNode.insertBefore(o,r)},o=new t.Image;o.onerror=function(){A(!1)},o.onload=function(){A(1===o.width&&1===o.height)},o.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="}};
grunticon( [ "/wp-content/themes/special/js/icons.data.svg.css", "/wp-content/themes/special/js/icons.data.png.css", "/wp-content/themes/special/js/icons.fallback.css" ] );