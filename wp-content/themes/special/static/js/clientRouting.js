import TurboLinks from 'turbolinks';

const clientRouting = () => {
  let isAdmin = document.querySelector('.admin-bar');

  if(isAdmin) {
    return console.warn('%c client side routing disabled for Admin ', 'background: black; color: orange; padding: .25em');
  }
  else {
    return TurboLinks.start()
  }
};


export default clientRouting;