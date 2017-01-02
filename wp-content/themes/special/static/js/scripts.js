(function (document) {
	'use strict';

	// check class on element
	function hasClass(el, cls) {
		return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
	}

	var animate_something = function() {
		
		//var for check on home page
		var home = document.querySelector('.home');

		if (home) {
			(function(window) {

				cobrasvg.prototype._supportSvg = function() {
					return !!document.createElementNS && !! document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect;
				}

				function whichTransitionEvent() {
					var t;
					var el = document.createElement('fakeelement');
					var transitions = {
						'transition': 'transitionend',
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
					this.svg = document.getElementById(this.options.elementId);
					this.fillDraw = this.options.fillPath;
					this.paths = this.svg.querySelectorAll("path");
					this._pathAnimation();
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
	
	// vars for mobile navigation
	var menu_toggle = document.querySelector('.main-nav-toggle');
	var menu = document.querySelector('#primary-menu');
	var label = document.querySelector('.label');

	var toggle_menu = function(){
		
		this.classList.toggle('close-state');
		menu.classList.toggle('open');

		if (hasClass(this, 'close-state')) {
			label.textContent = 'Close';
		}
		else {
			label.textContent = 'Menu';
		}
	}

	menu_toggle.addEventListener('click', toggle_menu, false);

	// registration for worker for server side caching
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js').then(function() {
		return navigator.serviceWorker.ready;
		}).then(function(serviceWorkerRegistration) {
		
		});
	}

}(document));
