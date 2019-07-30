import { hasClass, addClass, removeClass } from './helpers'

class HandleLinks {
  constructor() {
    this.options = {
      isAdmin:document.querySelector('.logged-in') ? true : false,
      htmlEl:document.querySelector('.js')
    }
  }

  internalLink(e){
    e.preventDefault()
    addClass(this.options.htmlEl, 'exit')
    setTimeout(function() {
      window.location = e.target
    }, 350)
  }

  paginationLink(e){
    if(!self.fetch) return
    e.preventDefault()
    e.stopPropagation()

    let target = document.querySelector('.js-pagination-target'),
				element = document.querySelector('.js-pagination-element'),
				pagination = document.querySelector('.js-pagination-block')

		addClass(element, 'removing')
		addClass(pagination, 'removing-pagination')
		addClass(target, 'loading')

		removeClass(element, 'adding')
    removeClass(pagination, 'adding-pagination')

    fetch(e.target.href)
    .then(function(response){
      window.scrollTo({
        top:0,
        left:0,
        behavior: 'smooth'
      })
      return response.text()
		})
		.then(function(text){

			let htmlData = document.createElement('div')
					htmlData.innerHTML = text
			let elementData = htmlData.querySelector('.js-pagination-element'),
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


  handleClick(e) {
    if(!e.target.href || this.options.isAdmin) return

    if(e.target.href.includes('#')) {
      return
    }
    else if(hasClass(e.target, 'js-pagination')) {
      this.paginationLink(e)
    }
    else {
      this.internalLink(e)
    }
  }

  init() {
    document.addEventListener('click', (e) => this.handleClick(e), false)

    // fix back functionality in safari
    window.onpageshow = function(event) {
      if (event.persisted) {
        window.location.reload()
      }
    }

  }
}

export default HandleLinks