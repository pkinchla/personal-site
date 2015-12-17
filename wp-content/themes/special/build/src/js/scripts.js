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

window.onload = function(){
	//canvas init
	var canvas = document.querySelector(".snow");
	var ctx = canvas.getContext("2d");
	
	//canvas dimensions
	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	
	//snowflake particles
	var mp = 25; //max particles
	var particles = [];
	for(var i = 0; i < mp; i++)
	{
		particles.push({
			x: Math.random()*W, //x-coordinate
			y: Math.random()*H, //y-coordinate
			r: Math.random()*4+1, //radius
			d: Math.random()*mp //density
		})
	}
	
	//Lets draw the flakes
	function draw()
	{
		ctx.clearRect(0, 0, W, H);
		
		ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
		ctx.beginPath();
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
		ctx.fill();
		update();
	}
	
	//Function to move the snowflakes
	//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
	var angle = 0;
	function update()
	{
		angle += 0.01;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			p.y += Math.cos(angle+p.d) + 1 + p.r/2;
			p.x += Math.sin(angle) * 2;
			
			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			if(p.x > W+5 || p.x < -5 || p.y > H)
			{
				if(i%3 > 0) //66.67% of the flakes
				{
					particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
				}
				else
				{
					//If the flake is exitting from the right
					if(Math.sin(angle) > 0)
					{
						//Enter from the left
						particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
					}
					else
					{
						//Enter from the right
						particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
					}
				}
			}
		}
	}
	
	//animation loop
	setInterval(draw, 33);
}

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
