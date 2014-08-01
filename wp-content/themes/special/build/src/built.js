/* grunticon Stylesheet Loader | https://github.com/filamentgroup/grunticon | (c) 2012 Scott Jehl, Filament Group, Inc. | MIT license. */
window.grunticon=function(e){if(e&&3===e.length){var t=window,n=!!t.document.createElementNS&&!!t.document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect&&!!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),A=function(A){var o=t.document.createElement("link"),r=t.document.getElementsByTagName("script")[0];o.rel="stylesheet",o.href=e[A&&n?0:A?1:2],r.parentNode.insertBefore(o,r)},o=new t.Image;o.onerror=function(){A(!1)},o.onload=function(){A(1===o.width&&1===o.height)},o.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="}};
grunticon( [ "/wp-content/themes/special/js/icons.data.svg.css", "/wp-content/themes/special/js/icons.data.png.css", "/wp-content/themes/special/js/icons.fallback.css" ] );;/*!
 * headroom.js v0.3.11 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2013 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

!function(a){"use strict";function b(a){this.callback=a,this.ticking=!1}function c(a,d){d=d||c.options,this.lastKnownScrollY=0,this.elem=a,this.debouncer=new b(this.update.bind(this)),this.tolerance=d.tolerance,this.classes=d.classes,this.offset=d.offset,this.initialised=!1}window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,b.prototype={constructor:b,update:function(){this.callback&&this.callback(),this.ticking=!1},requestTick:function(){this.ticking||(requestAnimationFrame(this.update.bind(this)),this.ticking=!0)},handleEvent:function(){this.requestTick()}},c.prototype={constructor:c,init:function(){this.elem.classList.add(this.classes.initial),setTimeout(this.attachEvent.bind(this),100)},destroy:function(){this.initialised=!1,window.removeEventListener("scroll",this.debouncer,!1),this.elem.classList.remove(this.classes.unpinned,this.classes.pinned,this.classes.initial)},attachEvent:function(){this.initialised||(this.initialised=!0,window.addEventListener("scroll",this.debouncer,!1))},unpin:function(){this.elem.classList.add(this.classes.unpinned),this.elem.classList.remove(this.classes.pinned)},pin:function(){this.elem.classList.remove(this.classes.unpinned),this.elem.classList.add(this.classes.pinned)},getScrollY:function(){return void 0!==window.pageYOffset?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop},update:function(){var a=this.getScrollY(),b=Math.abs(a-this.lastKnownScrollY)>=this.tolerance;0>a||(b&&(a>this.lastKnownScrollY&&a>=this.offset?this.unpin():a<this.lastKnownScrollY&&this.pin()),this.lastKnownScrollY=a)}},c.options={tolerance:0,offset:0,classes:{pinned:"headroom--pinned",unpinned:"headroom--unpinned",initial:"headroom"}},a.Headroom=c}(this);;/*
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
(function(a){a.fn.anystretch=function(d,c,e){var b=this.selector.length?false:true;return this.each(function(q){var s={positionX:"center",positionY:"center",speed:0,elPosition:"relative",dataName:"stretch"},h=a(this),g=b?a(".anystretch"):h.children(".anystretch"),l=g.data("settings")||s,m=g.data("settings"),j,f,r,p,v,u;if(c&&typeof c=="object"){a.extend(l,c)}if(c&&typeof c=="function"){e=c}a(document).ready(t);return this;function t(){if(d||h.length>=1){var i;if(!b){h.css({position:l.elPosition,background:"none"})}if(g.length==0){g=a("<div />").attr("class","anystretch").css({left:0,top:0,position:(b?"fixed":"absolute"),overflow:"hidden",zIndex:(b?-999999:-999998),margin:0,padding:0,height:"100%",width:"100%"})}else{g.find("img").addClass("deleteable")}i=a("<img />").css({position:"absolute",display:"none",margin:0,padding:0,border:"none",zIndex:-999999}).bind("load",function(A){var z=a(this),y,x;z.css({width:"auto",height:"auto"});y=this.width||a(A.target).width();x=this.height||a(A.target).height();j=y/x;o(function(){z.fadeIn(l.speed,function(){g.find(".deleteable").remove();if(typeof e=="function"){e()}})})}).appendTo(g);if(h.children(".anystretch").length==0){if(b){a("body").append(g)}else{h.append(g)}}g.data("settings",l);var w="";if(d){w=d}else{if(h.data(l.dataName)){w=h.data(l.dataName)}else{return}}i.attr("src",w);a(window).resize(o)}}function o(i){try{u={left:0,top:0};r=k();p=r/j;if(p>=n()){v=(p-n())/2;if(l.positionY=="center"||l.centeredY){a.extend(u,{top:"-"+v+"px"})}else{if(l.positionY=="bottom"){a.extend(u,{top:"auto",bottom:"0px"})}}}else{p=n();r=p*j;v=(r-k())/2;if(l.positionX=="center"||l.centeredX){a.extend(u,{left:"-"+v+"px"})}else{if(l.positionX=="right"){a.extend(u,{left:"auto",right:"0px"})}}}g.children("img:not(.deleteable)").width(r).height(p).filter("img").css(u)}catch(w){}if(typeof i=="function"){i()}}function k(){return b?h.width():h.innerWidth()}function n(){return b?h.height():h.innerHeight()}})};a.anystretch=function(d,b,e){var c=("onorientationchange" in window)?a(document):a(window);c.anystretch(d,b,e)}})(jQuery);;// js body class for javascript disabled browsers
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