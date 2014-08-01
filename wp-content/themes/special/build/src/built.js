/* grunticon Stylesheet Loader | https://github.com/filamentgroup/grunticon | (c) 2012 Scott Jehl, Filament Group, Inc. | MIT license. */
window.grunticon = function(e) {
    if (e && 3 === e.length) {
        var t = window,
            n = !!t.document.createElementNS && !!t.document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect && !!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"),
            A = function(A) {
                var o = t.document.createElement("link"),
                    r = t.document.getElementsByTagName("script")[0];
                o.rel = "stylesheet", o.href = e[A && n ? 0 : A ? 1 : 2], r.parentNode.insertBefore(o, r)
            },
            o = new t.Image;
        o.onerror = function() {
            A(!1)
        }, o.onload = function() {
            A(1 === o.width && 1 === o.height)
        }, o.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
    }
};
grunticon(["/wp-content/themes/special/js/icons.data.svg.css", "/wp-content/themes/special/js/icons.data.png.css", "/wp-content/themes/special/js/icons.fallback.css"]);;/*!
 * headroom.js v0.3.11 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2013 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

! function(a) {
    "use strict";

    function b(a) {
        this.callback = a, this.ticking = !1
    }

    function c(a, d) {
        d = d || c.options, this.lastKnownScrollY = 0, this.elem = a, this.debouncer = new b(this.update.bind(this)), this.tolerance = d.tolerance, this.classes = d.classes, this.offset = d.offset, this.initialised = !1
    }
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame, b.prototype = {
        constructor: b,
        update: function() {
            this.callback && this.callback(), this.ticking = !1
        },
        requestTick: function() {
            this.ticking || (requestAnimationFrame(this.update.bind(this)), this.ticking = !0)
        },
        handleEvent: function() {
            this.requestTick()
        }
    }, c.prototype = {
        constructor: c,
        init: function() {
            this.elem.classList.add(this.classes.initial), setTimeout(this.attachEvent.bind(this), 100)
        },
        destroy: function() {
            this.initialised = !1, window.removeEventListener("scroll", this.debouncer, !1), this.elem.classList.remove(this.classes.unpinned, this.classes.pinned, this.classes.initial)
        },
        attachEvent: function() {
            this.initialised || (this.initialised = !0, window.addEventListener("scroll", this.debouncer, !1))
        },
        unpin: function() {
            this.elem.classList.add(this.classes.unpinned), this.elem.classList.remove(this.classes.pinned)
        },
        pin: function() {
            this.elem.classList.remove(this.classes.unpinned), this.elem.classList.add(this.classes.pinned)
        },
        getScrollY: function() {
            return void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
        },
        update: function() {
            var a = this.getScrollY(),
                b = Math.abs(a - this.lastKnownScrollY) >= this.tolerance;
            0 > a || (b && (a > this.lastKnownScrollY && a >= this.offset ? this.unpin() : a < this.lastKnownScrollY && this.pin()), this.lastKnownScrollY = a)
        }
    }, c.options = {
        tolerance: 0,
        offset: 0,
        classes: {
            pinned: "headroom--pinned",
            unpinned: "headroom--unpinned",
            initial: "headroom"
        }
    }, a.Headroom = c
}(this);;/*
 * jQuery Anystretch
 * Version 1.2 (@jbrooksuk / me.itslimetime.com)
 * https://github.com/jbrooksuk/jquery-anystretch
 * Based on Dan Millar's Port
 * https://github.com/danmillar/jquery-anystretch
 *
 * Add a dynamically-resized background image to the body
 * of a page or any other block level element within it
 *
 * Copyright (c) 2012 Dan Millar (@danmillar / decode.uk.com)
 * Dual licensed under the MIT and GPL licenses.
 *
 * This is a fork of jQuery Backstretch (v1.2)
 * Copyright (c) 2011 Scott Robbin (srobbin.com)
*/

;(function($) {
    
    $.fn.anystretch = function(src, options, callback) {
        var isBody = this.selector.length ? false : true; // Decide whether anystretch is being called on an element or not

        return this.each(function(i){
            var defaultSettings = {
                positionX: 'center',     // Should we center the image on the X axis?
                positionY: 'center',     // Should we center the image on the Y axis?
                speed: 0,                // fadeIn speed for background after image loads (e.g. "fast" or 500)
                elPosition: 'relative',  // position of containing element when not being added to the body
                dataName: 'stretch'      // The data-* name used to search for
            },
            el = $(this),
            container = isBody ? $('.anystretch') : el.children(".anystretch"),
            settings = container.data("settings") || defaultSettings, // If this has been called once before, use the old settings as the default
            existingSettings = container.data('settings'),
            imgRatio, bgImg, bgWidth, bgHeight, bgOffset, bgCSS;

            // Extend the settings with those the user has provided
            if(options && typeof options == "object") $.extend(settings, options);
            
            // Just in case the user passed in a function without options
            if(options && typeof options == "function") callback = options;
        
            // Initialize
            $(document).ready(_init);
      
            // For chaining
            return this;
        
            function _init() {
                // Prepend image, wrapped in a DIV, with some positioning and zIndex voodoo
                if(src || el.length >= 1) {
                    var img;
                    
                    if(!isBody) {
                        // If not being added to the body set position to elPosition (default: relative) to keep anystretch contained
                        el.css({position: settings.elPosition, background: "none"});
                    }
                    
                    // If this is the first time that anystretch is being called
                    if(container.length == 0) {
                        container = $("<div />").attr("class", "anystretch")
                                                .css({left: 0, top: 0, position: (isBody ? "fixed" : "absolute"), overflow: "hidden", zIndex: (isBody ? -999999 : -999998), margin: 0, padding: 0, height: "100%", width: "100%"});
                    } else {
                        // Prepare to delete any old images
                        container.find("img").addClass("deleteable");
                    }
    
                    img = $("<img />").css({position: "absolute", display: "none", margin: 0, padding: 0, border: "none", zIndex: -999999})
                                      .bind("load", function(e) {                                          
                                          var self = $(this),
                                              imgWidth, imgHeight;
        
                                          self.css({width: "auto", height: "auto"});
                                          imgWidth = this.width || $(e.target).width();
                                          imgHeight = this.height || $(e.target).height();
                                          imgRatio = imgWidth / imgHeight;
    
                                          _adjustBG(function() {
                                              self.fadeIn(settings.speed, function(){
                                                  // Remove the old images, if necessary.
                                                  container.find('.deleteable').remove();
                                                  // Callback
                                                  if(typeof callback == "function") callback();
                                              });
                                          });
                                          
                                      })
                                      .appendTo(container);
                     
                    // Append the container to the body, if it's not already there
                    if(el.children(".anystretch").length == 0) {
                        if(isBody) {
                            $('body').append(container);
                        } else {
                            el.append(container);
                        }
                    }
                    
                    // Attach the settings
                    container.data("settings", settings);
                        
                    var imgSrc = "";
                    if(src) {
                        imgSrc = src;
                    }else if(el.data(settings.dataName)) {
                        imgSrc = el.data(settings.dataName);
                    }else{
                        return;
                    }
                    img.attr("src", imgSrc); // Hack for IE img onload event
                    
                    // Adjust the background size when the window is resized or orientation has changed (iOS)
                    $(window).resize(_adjustBG);
                }
            }
                
            function _adjustBG(fn) {
                try {
                    bgCSS = {left: 0, top: 0};
                    bgWidth = _width();
                    bgHeight = bgWidth / imgRatio;
    
                    // Make adjustments based on image ratio
                    // Note: Offset code provided by Peter Baker (http://ptrbkr.com/). Thanks, Peter!
                    if(bgHeight >= _height()) {
                        bgOffset = (bgHeight - _height()) /2;
                        if(settings.positionY == 'center' || settings.centeredY) { // 
                            $.extend(bgCSS, {top: "-" + bgOffset + "px"});
                        } else if(settings.positionY == 'bottom') {
                            $.extend(bgCSS, {top: "auto", bottom: "0px"});
                        }
                    } else {
                        bgHeight = _height();
                        bgWidth = bgHeight * imgRatio;
                        bgOffset = (bgWidth - _width()) / 2;
                        if(settings.positionX == 'center' || settings.centeredX) {
                            $.extend(bgCSS, {left: "-" + bgOffset + "px"});
                        } else if(settings.positionX == 'right') {
                            $.extend(bgCSS, {left: "auto", right: "0px"});
                        }
                    }
    
                    container.children("img:not(.deleteable)").width( bgWidth ).height( bgHeight )
                                                       .filter("img").css(bgCSS);
                } catch(err) {
                    // IE7 seems to trigger _adjustBG before the image is loaded.
                    // This try/catch block is a hack to let it fail gracefully.
                }
          
                // Executed the passed in function, if necessary
                if (typeof fn == "function") fn();
            }
            
            function _width() {
                return isBody ? el.width() : el.innerWidth();
            }
            
            function _height() {
                return isBody ? el.height() : el.innerHeight();
            }
            
        });
    };
    
    $.anystretch = function(src, options, callback) {
        var el = ("onorientationchange" in window) ? $(document) : $(window); // hack to acccount for iOS position:fixed shortcomings
        
        el.anystretch(src, options, callback);
    };
  
})(jQuery);;// js body class for javascript disabled browsers
  $('body').addClass('js-enabled');

  $(document).ready(function() {

// jquery anystretch hero images for pages that cannot have a featured image
    $('.error404 .hero').anystretch("/wp-content/themes/special/images/max.gif", {speed: 500});
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