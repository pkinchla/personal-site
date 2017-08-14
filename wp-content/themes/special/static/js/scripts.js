(function (document) {
	'use strict';
	
	// check class on element
	function hasClass(el, className) {
		if (el.classList)
			return el.classList.contains(className)
		else
			return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
	}

	// add class
	function addClass(el, className) {
		if (el.classList)
			el.classList.add(className)
		else if (!hasClass(el, className)) el.className += " " + className
	}
	
	// remove class
	function removeClass(el, className) {
		if (el.classList)
			el.classList.remove(className)
		else if (hasClass(el, className)) {
			var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
			el.className=el.className.replace(reg, ' ')
		}
	}
	


	// Function to animate the scroll
	function smoothScroll(anchor, duration) {

		// Calculate how far and how fast to scroll
		var startLocation = window.pageYOffset;
		var endLocation = anchor.offsetTop;
		var distance = endLocation - startLocation;
		var increments = distance/(duration/16);
		var stopAnimation;

		// Scroll the page by an increment, and check if it's time to stop
		var animateScroll = function () {
			window.scrollBy(0, increments);
			stopAnimation();
		};

		// If scrolling down
		if ( increments >= 0 ) {
				// Stop animation when you reach the anchor OR the bottom of the page
				stopAnimation = function () {
				var travelled = window.pageYOffset;
				if ((travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {
					clearInterval(runAnimation);
				}
			};
		}
		// If scrolling up
		else {
			// Stop animation when you reach the anchor OR the top of the page
			stopAnimation = function () {
			var travelled = window.pageYOffset;
				if ( travelled <= (endLocation || 0) ) {
					clearInterval(runAnimation);
				}
			};
		}
		// Loop the animation function
		var runAnimation = setInterval(animateScroll, 16);
	};
	
		

	
	// paginate links
	function paginateLink(link){
		var paginatedLink = document.querySelectorAll('.js-pagination'),
				target = document.querySelector('.js-pagination-target'),
				element = document.querySelector('.js-pagination-element'),
				pagination = document.querySelector('.js-pagination-block')
		
		addClass(element, 'removing')
		addClass(pagination, 'removing-pagination')
		addClass(target, 'loading')
		
		removeClass(element, 'adding')
		removeClass(pagination, 'adding-pagination')


		fetch(link)
		.then(function(response){
			return response.text()
		})
		.then(function(text){
			smoothScroll(target, 250)
			var htmlData = document.createElement('div')
					htmlData.innerHTML = text
			var elementData = htmlData.querySelector('.js-pagination-element'),
					paginationData = htmlData.querySelector('.js-pagination-block')

					
			addClass(elementData, 'adding')
			addClass(paginationData, 'adding-pagination')
			removeClass(target, 'loading')	
		
			target.removeChild(element)
			target.removeChild(pagination)
			
			target.appendChild(elementData)
			target.appendChild(paginationData)
		
		})
	}

	// listener for paginated links 
	var pagingBlock = document.getElementById('pagination-block')
	
	if(pagingBlock && self.fetch) {
		pagingBlock.addEventListener('click', function(e){
			if (e.target.matches('.js-pagination')) {
				e.stopPropagation()
				e.preventDefault()
				paginateLink(e.target.href)
			}		
		})
	}
	
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
