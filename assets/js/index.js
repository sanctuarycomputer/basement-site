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
    this.mobileNavIcon = this.appContainer.querySelectorAll(App.selectors.dataMobileNavIcon);
    this.mobileNav = this.appContainer.querySelector(App.selectors.dataMobileMenu);
  }

  _bindEvents() {
    this.mobileNavIcon.forEach(icon => {
      icon.addEventListener('click', () => {
        this.toggleMobileMenu();
      })
    })
  }

  toggleMobileMenu() {
    this.mobileNav.classList.toggle(App.selectors.mobileMenuOpened);
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
    this.subNavItems = app.appContainer.querySelectorAll(SubNav.selectors.subNavItem);
  }

  _bindEvents() {
    this.subNavItems.forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.scrollToSection(item.getAttribute(SubNav.selectors.subNavItem))
      })
    })
  }

  scrollToSection(target) {
    const section = document.getElementById(target);
    const html_elem = document.querySelector('body');
    $('html, body').animate({
      scrollTop: $(section).offset().top + 20
    }, 250);
  }

  toggleSubNavItem(target) {
    const subNavItems = Array.from(this.subNavItems)
    subNavItems
      .forEach(item => $(item).removeClass('bold')) // reset subnav items
    const subNavItem = subNavItems
      .find(item => item.getAttribute(SubNav.selectors.subNavItem) === target);
    if (subNavItem) subNavItem.classList.toggle('bold');
  }
}

SubNav.selectors = {
  subNavItem: '[data-sub-nav-item]'
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
    this.positionMap = Array.from(document.querySelectorAll(ScrollListener.selectors.section)).reduce((map, element) => {
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

ScrollListener.selectors = {
  section: '[data-section]'
}

const appContainer = document.querySelector('[data-app-container]');
const app = new App(appContainer);
const subNav = new SubNav();
const scrollListener = new ScrollListener();
