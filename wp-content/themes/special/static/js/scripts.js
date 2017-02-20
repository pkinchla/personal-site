(function (document) {
	'use strict';

	// check class on element
	function hasClass(el, cls) {
		return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
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
