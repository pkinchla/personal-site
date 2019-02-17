(function (document) {

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
      window.scrollTo({
        top:0,
        left:0,
        behavior: 'smooth'
      })
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
	
	var dev_env = window.location.hostname === 'localhost'

	// registration for worker for server side caching
	if ('serviceWorker' in navigator && !dev_env) {
		navigator.serviceWorker.register('/sw.js').then(function() {
			return navigator.serviceWorker.ready;
		}).then(function(serviceWorkerRegistration) {
		
		})
	}

	var links = document.querySelectorAll('a'),
			htmlEl = document.querySelector('.js'),
			admin = document.querySelector('.logged-in');
	
	// fix back functionality in safari	
	window.onpageshow = function(event) {
		if (event.persisted) {
			window.location.reload() 
		}
	};
		
	if(!admin) {
		for (var i = 0; i < links.length; i++) {
			var isAsyncLink = hasClass(links[i], 'js-pagination')
			if (location.hostname === links[i].hostname || !links[i].hostname.length) {
				if(links[i].href.match('mailto')){
					// act like a mailto link
				}
				else if(!isAsyncLink){
					links[i].addEventListener('click', function(e){
						var self = this;
						e.preventDefault()
						addClass(htmlEl, 'exit')
						setTimeout(function() { 
							window.location = self
						}, 350) 
					})
				}
			}
		}
	}

	(function() {
		var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
				is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
				is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

		if ( ( is_webkit || is_opera || is_ie ) && document.getElementById && window.addEventListener ) {
			window.addEventListener( 'hashchange', function() {
				var id = location.hash.substring( 1 ),
					element;

				if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
					return;
				}

				element = document.getElementById( id );

				if ( element ) {
					if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
						element.tabIndex = -1;
					}

					element.focus();
				}
			}, false );
		}
  })();	
	
}(document));
