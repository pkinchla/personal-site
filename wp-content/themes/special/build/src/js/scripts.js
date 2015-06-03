function animate_something() {
	'use strict';

	// vars for check on home page
	// get the path
	var pathArray = window.location.pathname.split( '/' );
	// second part of array that will indicate the page
	var path = pathArray[2];

	if (path != "") {
		(function(window) {

			cobrasvg.prototype._supportSvg = function() {
				return !!document.createElementNS && !! document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect;
			}

			function whichTransitionEvent() {
				var t;
				var el = document.createElement('fakeelement');
				var transitions = {
					'transition': 'transitionend',
					'OTransition': 'oTransitionEnd',
					'MozTransition': 'transitionend',
					'WebkitTransition': 'webkitTransitionEnd'
				}

				for (t in transitions) {
					if (el.style[t] !== undefined) {
						return transitions[t];
					}
				}
			}

			var transitionEvent = whichTransitionEvent();

			function extend(a, b) {
				for (var key in b) {
					if (b.hasOwnProperty(key)) {
						a[key] = b[key];
					}
				}
				return a;
			}

			function cobrasvg(options) {
				this.options = extend({}, this.options);
				extend(this.options, options);
				this._init();
			}


			cobrasvg.prototype.options = {
				elementId: 'svg',
				fillPath: true,
			}


			cobrasvg.prototype._init = function() {
				if (!this._supportSvg()) {
					document.documentElement.className = "noSvg";
				} else {
					document.documentElement.className = "svg";
				}
				this.svg = document.getElementById(this.options.elementId);
				this.fillDraw = this.options.fillPath;
				this.paths = this.svg.querySelectorAll("path");
				this._pathAnimation();
				// this.timing = setTimeout(this, time)
			}

			cobrasvg.prototype._pathAnimation = function() {
				for (var i = 0; i < this.paths.length; i++) {
					var path = this.paths[i];
					var length = path.getTotalLength();

					path.style.fillOpacity = 0;
					path.style.strokeOpacity = 1;

					path.style.transition = path.style.transitionEvent = "none";

					path.style.strokeDasharray = length + " " + length;
					path.style.strokeDashoffset = length;
					path.getBoundingClientRect();

					path.style.transition = path.style.transitionEvent = "stroke-dashoffset 2s ease-in-out";

					path.style.strokeDashoffset = 0;

					if(this.fillDraw == true) {
						this._fillPath(path);
					}
				}
			}



			cobrasvg.prototype._fillPath = function(path) {
				path.addEventListener(transitionEvent, function() {
					path.style.transition = path.style.transitionEvent = "none";
					path.style.transition = path.style.transitionEvent = "fill-opacity 1s ease-in-out, stroke-opacity 1s ease-in-out";

					path.style.fillOpacity = 1;
					path.style.strokeOpacity = 0;
				});
			}

			window.cobrasvg = cobrasvg;

			var svgAnimation = new cobrasvg({
				elementId: 'draw',
			});

		})(window);
	}
}

animate_something();

(function (document) {
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

}(document));
