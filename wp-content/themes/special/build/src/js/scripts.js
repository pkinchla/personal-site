jQuery(document).ready(function($) {
  
  // js body class for javascript disabled browsers  
  $('body').addClass('js-enabled');

  $(document).ready(function() {

// jquery anystretch hero images for pages that cannot have a featured image
    $('.error404 .hero').anystretch("/wp-content/themes/special/images/max.gif", {speed: 500});
    $('.author .hero').anystretch("/wp-content/themes/special/images/pencil.jpg", {speed: 500});
    $('.hero').anystretch("", {speed: 500});
    
// toggle content button
    // still need to add support for multiple buttons per page at some point.
    $('.toggle-content').click(function(){
    //get collapse content selector
    var collapse_content_selector = $(this).attr('name');         

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

// hide and show animation for fixed header on scroll
    var headroom = new Headroom(document.getElementById("masthead"), {
    "tolerance": 5,
    "offset": 205,
    "classes": {
      "initial": "animated",
      "pinned": "slideDown",
      "unpinned": "slideUp",
      "top": "headroom--top",
      "notTop": "headroom--not-top"
    }
    });
    headroom.init();


// small menu switching for smaller viewports on main navigation
    var $masthead = $( '#masthead' ),
         timeout = false;

     $.fn.smallMenu = function() {
       $masthead.find( '.site-navigation' ).removeClass( 'main-navigation' ).addClass( 'main-small-navigation' );
       $masthead.find( '.site-navigation h1' ).removeClass( 'assistive-text' ).addClass( 'menu-toggle' );

       $( '.menu-toggle' ).unbind( 'click' ).click( function() {
         $masthead.find( '.menu' ).toggle();
         $( this ).toggleClass( 'toggled-on' );
       });
     };

     // Check viewport width on first load.
     if ( $( window ).width() < 700 )
       $.fn.smallMenu();

     // Check viewport width when user resizes the browser window.
     $( window ).resize( function() {
       var browserWidth = $( window ).width();

       if ( false !== timeout )
         clearTimeout( timeout );

       timeout = setTimeout( function() {
         if ( browserWidth < 700 ) {
           $.fn.smallMenu();
         } else {
           $masthead.find( '.site-navigation' ).removeClass( 'main-small-navigation' ).addClass( 'main-navigation' );
           $masthead.find( '.site-navigation h1' ).removeClass( 'menu-toggle' ).addClass( 'assistive-text' );
           $masthead.find( '.menu' ).removeAttr( 'style' );
         }
       }, 1 );
     });

  });
  
  var getMax = function(){
    return $(document).height() - $(window).height();
  }
    
  var getValue = function(){
    return $(window).scrollTop();
  }
    
  if ('max' in document.createElement('progress')) {
    // Browser supports progress element
    var progressBar = $('progress');
        
    // Set the Max attr for the first time
    progressBar.attr({ max: getMax() });

    $(document).on('scroll', function(){
      // On scroll only Value attr needs to be calculated
      progressBar.attr({ value: getValue() });
    });
      
    $(window).resize(function(){
      // On resize, both Max/Value attr needs to be calculated
      progressBar.attr({ max: getMax(), value: getValue() });
    }); 
  
  } else {

    var progressBar = $('.progress-bar'), 
        max = getMax(), 
        value, width;
        
    var getWidth = function() {
      // Calculate width in percentage
      value = getValue();            
      width = (value/max) * 100;
      width = width + '%';
      return width;
    }
        
    var setWidth = function(){
      progressBar.css({ width: getWidth() });
    }
        
    $(document).on('scroll', setWidth);
    $(window).on('resize', function(){
      // Need to reset the Max attr
      max = getMax();
      setWidth();
    });
  }

});