// Generic App Class

class App {
  constructor(container) {
    this._init(container);
    this._bindEvents();
  }

  _init(container) {
    this.appContainer = container;
    this.mobileNavIcon = this.appContainer.querySelectorAll(App.selectors.dataMobileNavIcon);
    this.mobileNav = this.appContainer.querySelector(App.selectors.dataMobileMenu);
    this.pageElements = this.appContainer.children;

    if (window.innerWidth <= 1024) {
      this.addMobileMenuEventListener();
    }
  }

  _bindEvents() {
    window.addEventListener('resize', this.setMobileNavOnMobileView)
  }

  setMobileNavOnMobileView = () => {
    if (window.innerWidth > 1024) {
      this.removeMobileMenuEventListener();
    } else {
      this.addMobileMenuEventListener();
    }
  }

  addMobileMenuEventListener = () => {
    for (let i = 0; i < this.pageElements.length; i++) {
      const currentElement = this.pageElements[i];
      const currentElementIsNotMobileNav = !Object.values(currentElement.attributes)
        .find((attribute) => attribute.name === 'data-mobile-menu')

      if (currentElement.tagName !== "SCRIPT" && currentElementIsNotMobileNav) {
        currentElement.addEventListener('click', this.closeMobileMenu)
      }
    }

    this.mobileNavIcon.forEach(icon => {
      icon.addEventListener('click', this.toggleMobileMenu)
    })
  }

  removeMobileMenuEventListener = () => {
    for (let i = 0; i < this.pageElements.length; i++) {
      const currentElement = this.pageElements[i];
      const currentElementIsNotMobileNav = !Object.values(currentElement.attributes)
        .find((attribute) => attribute.name === 'data-mobile-menu')

      if (currentElement.tagName !== "SCRIPT" && currentElementIsNotMobileNav) {
        currentElement.removeEventListener('click', this.closeMobileMenu)
      }
    }

    this.mobileNavIcon.forEach(icon => {
      icon.removeEventListener('click', this.toggleMobileMenu)
    })
  }

  toggleMobileMenu = () => {
    this.mobileNav.classList.toggle(App.selectors.mobileMenuOpened);
  }

  closeMobileMenu = () => {
    this.mobileNav.classList.remove(App.selectors.mobileMenuOpened);
  }
}

App.selectors = {
  dataMobileNavIcon: '[data-mobile-nav-icon]',
  dataMobileMenu: '[data-mobile-menu]',
  mobileMenuOpened: 'MobileMenu--opened'
}


// SubNav Class
class SubNav {
  constructor() {
    this._init();
    this._bindEvents();
  }

  _init() {
    this.subNavItems = app.appContainer.querySelectorAll(`[${SubNav.selectors.subNavItem}]`);
  }

  _bindEvents() {
    this.subNavItems.forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        
        const target = item.getAttribute('data-sub-nav-item')
        const section = document.getElementById(target);
        let firstSubNavIsSelected = false;

        this.subNavItems.forEach((subNavItem, i) => {
          if (subNavItem.getAttribute('data-sub-nav-item') === target) {
            subNavItem.classList.add('bold');
            if (i === 0) firstSubNavIsSelected = true;
          } else {
            subNavItem.classList.remove('bold');
          }
        })
        const offsetTop = firstSubNavIsSelected ? 0 : section.offsetTop;
        this.scrollToSection(offsetTop, 500);
      })
    })
  }

  scrollToSection(to, duration) {
    // https://gist.github.com/andjosh/6764939#gistcomment-2047675
    const element = document.scrollingElement || document.documentElement;
    const start = element.scrollTop;
    const change = to - 80 - start;
    const startDate = +new Date();
    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    const easeInOutQuad = function(t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    };
    const animateScroll = function() {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
      if(currentTime < duration) {
        requestAnimationFrame(animateScroll);
      }
      else {
        element.scrollTop = to - 80;
      }
    };
    animateScroll();
  }

  toggleSubNavItem(target) {
    const subNavItems = Array.from(this.subNavItems)
    subNavItems
      .forEach(item => {
        item.classList.remove('bold')
        item.classList.add('menu-hover')
      }) // reset subnav items
    const subNavItem = subNavItems
      .find(item => item.getAttribute('data-sub-nav-item') === target);
    if (subNavItem) {
      subNavItem.classList.toggle('bold');
      subNavItem.classList.toggle('menu-hover');
    }
  }
}

SubNav.selectors = {
  subNavItem: 'data-sub-nav-item'
}

// ScrollListener Class
class ScrollListener {
  constructor(subNav) {
    this.subNav = subNav;
    this.intializePositionMap();
    this.bindScroll();
    this.target = null;
  }

  intializePositionMap() {
    this.positionsArray = [];
    this.positionMap = Array.from(document.querySelectorAll('[data-section]')).reduce((map, element) => {
      map[element.offsetTop] = {
        id: element.getAttribute('id'),
        height: element.scrollHeight
      };
      this.positionsArray.push(element.offsetTop);
      return map;
    }, {});
  }

  bindScroll() {
    this.checkIfNewTarget();
    document.addEventListener('scroll', this.checkIfNewTarget.bind(this));
    document.addEventListener('resize', () => {
      this.intializePositionMap();
      this.checkIfNewTarget();
    });
  }

  checkIfNewTarget() {
    const scrollPosition = window.scrollY;
    if (this.positionsArray) {
      const elementPosition = this.positionsArray.sort((a, b) => b - a)
        .find(position => position < scrollPosition + (window.innerHeight / 2));
      const element = this.positionMap[elementPosition];
      const newTarget = element;
      if (this.target !== newTarget) {
        this.target = newTarget;
        this.updateTargetElement(this.target.id);
      }
    }
  }

  updateTargetElement(target) {
    this.subNav.toggleSubNavItem(target);
  }
}

const appContainer = document.querySelector('[data-app-container]');
const app = new App(appContainer);
const subNav = new SubNav();
const scrollListener = new ScrollListener(subNav);
