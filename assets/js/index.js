---
---

// Generic App Class
class App {
  constructor(container) {
    this._init(container);
    this._bindEvents();
  }

  _init(container) {
    this.appContainer = container;
    this.mobileNavIcon = this.appContainer.querySelectorAll('[data-mobile-nav-icon]');
    this.mobileNav = this.appContainer.querySelector('[data-mobile-menu]');
  }

  _bindEvents() {
    this.mobileNavIcon.forEach(icon => {
      icon.addEventListener('click', () => {
        this.toggleMobileMenu();
      })
    })
  }

  toggleMobileMenu() {
    this.mobileNav.classList.toggle('MobileMenu--opened');
  }
}

// SubNav Class
class SubNav {
  constructor() {
    this._init();
    this._bindEvents();
  }

  _init() {
    this.subNavItems = app.appContainer.querySelectorAll('[data-sub-nav-item]');
  }

  _bindEvents() {
    this.subNavItems.forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.scrollToSection(item.getAttribute('data-sub-nav-item'))
      })
    })
  }

  scrollToSection(target) {
    const section = document.getElementById(target);
    const html_elem = document.querySelector('body');
    // $('html, body').animate({
    //   scrollTop: $(section).offset().top + 20
    // }, 250);
    // let timer = setInterval(function() {
    //   if (html_elem.scrollTop == (html_elem.offsetTop + 20) ) clearInterval(timer);
    //   else html_elem.scrollTop += 2px
    // }, 20); // change by 2px every 20ms, about 50 frames per second
  }

  toggleSubNavItem(target) {
    const subNavItems = Array.from(this.subNavItems)
    subNavItems
      .forEach(item => $(item).removeClass('bold')) // reset subnav items
    const subNavItem = subNavItems
      .find(item => item.getAttribute('data-sub-nav-item') === target);
    if (subNavItem) subNavItem.classList.toggle('bold');
  }
}


// ScrollListener Class
class ScrollListener {
  constructor(toggleSub) {
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
      const elementPosition = this.positionsArray
        .find(position =>
          (position + this.positionMap[position].height) > scrollPosition
        );
      const element = this.positionMap[elementPosition];
      const newTarget = element;
      if (this.target !== newTarget) {
        this.target = newTarget;
        this.updateTargetElement(this.target.id);
      }
    }
  }

  updateTargetElement(target) {
    subNav.toggleSubNavItem(target);
  }
}

  const appContainer = document.querySelector('[data-app-container]');
  const app = new App(appContainer);
  const subNav = new SubNav();
  const scrollListener = new ScrollListener();
