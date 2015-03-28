// write better
'use strict';

// responive nav (note: this adds js class to html element)
var nav = responsiveNav(".main-navigation", {
  animate: true,
  transition: 284,
  label: "",
  insert: "after",
  customToggle: "",
  closeOnNavClick: false,
  openPos: "relative",
  navClass: "nav-collapse",
  navActiveClass: "js-nav-active",
  jsClass: "js",

});