function animate_something() {
	'use strict';

	// vars for check on home page
	// get the path
	var pathArray = window.location.pathname.split( '/' );
	// second part of array that will indicate the page
	var path = pathArray[2];

	if (path == undefined) {
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

(function () {

	var COUNT = 300;
	var masthead = document.querySelector('.site');
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var width = masthead.clientWidth;
	var height = masthead.clientHeight;
	var i = 0;
	var active = false;

	function onResize() {
		width = masthead.clientWidth;
		height = masthead.clientHeight;
		canvas.width = width;
		canvas.height = height;
		ctx.fillStyle = '#FFF';

		var wasActive = active;
		active = width > 0;

		if (!wasActive && active)
			requestAnimFrame(update);
	}

	var Snowflake = function () {
		this.x = 0;
		this.y = 0;
		this.vy = 0;
		this.vx = 0;
		this.r = 0;

		this.reset();
	}

	Snowflake.prototype.reset = function() {
		this.x = Math.random() * width;
		this.y = Math.random() * -height;
		this.vy = 1 + Math.random() * 3;
		this.vx = 0.5 - Math.random();
		this.r = 1 + Math.random() * 2;
		this.o = 0.5 + Math.random() * 0.5;
	}

	canvas.style.position = 'absolute';
	canvas.style.left = canvas.style.top = '0';

	var snowflakes = [], snowflake;
	for (i = 0; i < COUNT; i++) {
		snowflake = new Snowflake();
		snowflakes.push(snowflake);
	}

	function update() {

		ctx.clearRect(0, 0, width, height);

		if (!active)
			return;

		for (i = 0; i < COUNT; i++) {
			snowflake = snowflakes[i];
			snowflake.y += snowflake.vy;
			snowflake.x += snowflake.vx;

			ctx.globalAlpha = snowflake.o;
			ctx.beginPath();
			ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
			ctx.closePath();
			ctx.fill();

			if (snowflake.y > height) {
				snowflake.reset();
			}
		}

		requestAnimFrame(update);
	}

	// shim layer with setTimeout fallback
	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       ||
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame    ||
						function( callback ){
							window.setTimeout(callback, 1000 / 60);
						};
	})();

	onResize();
	window.addEventListener('resize', onResize, false);

	masthead.appendChild(canvas);
})();


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
