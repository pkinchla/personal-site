class LazyImages {
  constructor() {
    this.options = {
      selector:document.querySelectorAll('img'),
      loaded:false
    }
  }

  setup(){
    var images = document.getElementsByTagName('img');
    for(var i = 0; i < images.length; i++) {
      // return if no thumb attr set
      if(!images[i].hasAttribute('data-thumb')) return

      let img = document.createElement('img'),
          imgSmall = document.createElement('img'),
          target = images[i].parentNode,
          currentImage = images[i],
          loaded = false, wait;

      imgSmall.src = images[i].getAttribute('data-thumb');
      imgSmall.className = 'lazy'
      img.src = images[i].src

      img.className = 'fadeIn'
      img.setAttribute('srcSet', images[i].getAttribute('srcSet'))
      img.setAttribute('sizes', images[i].getAttribute('sizes'))
      img.setAttribute('alt', images[i].getAttribute('alt'))

      target.removeChild(currentImage)

      wait = setInterval(function () {
        if(loaded) {
          clearInterval(wait);
          target.removeChild(target.lastChild);
          target.appendChild(img);
        }
        else {
          target.appendChild(imgSmall)
        }
      });

      img.addEventListener('load', () => {
        setTimeout(() => loaded = true, 250)
      }, true);
    }
  }

  init() {
    this.setup();
  }
}

export default LazyImages