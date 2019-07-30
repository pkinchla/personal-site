import { Component, render, h } from 'preact';

class MobileMenu {
  constructor() {
    this.options = {
      selector:document.querySelector('.js-main-navigation'),
      target:document.querySelector('.js-site-header')
    }
  }

  setupComponent() {
    const self = this
    const items = () => {
      const items = []
      for(let index = 0; index < this.options.selector.firstElementChild.children.length; index++) {
        const element = this.options.selector.firstElementChild.children[index];
        const item = {
          class:element.className.trim(),
          link:element.firstElementChild.href,
          text:element.firstElementChild.textContent,
        }
        items.push(item)
      }
      return items
    }
    class Menu extends Component {
      constructor() {
        super()
        this.state = {
          menuOpen:false,
          menuData:items()
        }
      }

      toggleMenu() {
        this.setState({ menuOpen: this.state.menuOpen ? false : true })
      }

      componentWillMount() {
        self.options.selector.parentNode.removeChild(self.options.selector)
      }

      render(){
        return(
          <nav id="site-navigation">
            <button className={`main-nav-toggle ${!this.state.menuOpen ? '' : ' close-state'}`} onClick={() => this.toggleMenu()}>
              <svg class='main-nav-button' viewBox="0 0 225 164.7" width="22.5" height="16.47">
								<rect class="one" y="0" width="225" height="23.7"></rect>
								<rect class="two" y="70.5" width="225" height="23.7"></rect>
								<rect class="three" y="141" width="225" height="23.7"></rect>
							</svg>
              <span className="label">{this.state.menuOpen ? 'Close' : 'Menu'}</span>
            </button>
            <ul id="primary-menu" className={`menu ${this.state.menuOpen ? 'open' : 'closed'}`}>
              {this.state.menuData.map((item, index) => {
                return(
                  <li key={index} className={item.class}>
                    <a href={item.link}>{item.text}</a>
                  </li>
                )
              })}
            </ul>
          </nav>
        )
      }
    }
    render(<Menu />, this.options.target)
  }


  init() {
    this.setupComponent()
  }
}

export default MobileMenu