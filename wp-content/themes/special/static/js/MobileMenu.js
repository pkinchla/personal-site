import { h, render, Fragment } from 'preact';
import { useState } from 'preact/hooks';

function MobileMenu(target, selector) {
  const getItems = () => {
    return Array.from(selector.firstElementChild.children).map((item) => {
      return {
        link: item.firstElementChild.href,
        text: item.firstElementChild.textContent,
      };
    });
  };
  const menuItems = getItems();
  document.querySelector('.menu-link').remove();
  document.querySelector('.js-main-navigation-items').remove();

  function Menu() {
    const [menuOpen, toggleMenu] = useState(false);

    return (
      <Fragment>
        <button
          className={`main-nav-toggle ${!menuOpen ? '' : ' close-state'}`}
          onClick={() => toggleMenu(!menuOpen)}
        >
          <svg
            class="main-nav-button"
            viewBox="0 0 225 164.7"
            width="22.5"
            height="16.47"
          >
            <rect class="one" y="0" width="225" height="23.7" />
            <rect class="two" y="70.5" width="225" height="23.7" />
            <rect class="three" y="141" width="225" height="23.7" />
          </svg>
          <span className="label">{menuOpen ? 'Close' : 'Menu'}</span>
        </button>
        <ul
          id="primary-menu"
          className={`menu ${menuOpen ? 'open' : 'closed'}`}
        >
          {menuItems.map((item, index) => {
            const isCurrent = RegExp(`${item.text.toLowerCase()}`).test(
              window.location.pathname
            );
            return (
              <li key={index} className={'menu-item'}>
                <a aria-current={isCurrent && true} href={item.link}>
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  }

  render(<Menu />, target);
}

export default MobileMenu;
