---
---

// generic App class
class App {
  constructor(container) {
    this._init(container);
    this._bindEvents();
  }

  _init(container) {
    this.appContainer = container;
    // this.currentSections = this.appContainer.querySelectorAll('[data-section]');
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
    $(this.mobileNav).toggleClass('MobileMenu--opened');
  }
}

// SubNav class
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
    $('html, body').animate({
      scrollTop: $(section).offset().top + 20
    }, 250);
  }

  toggleSubNavItem(target) {
    const subNavItems = Array.from(this.subNavItems)
    subNavItems
      .forEach(item => $(item).removeClass('bold')) // reset subnav items
    const subNavItem = subNavItems
      .find(item => item.getAttribute('data-sub-nav-item') === target);
    if (subNavItem) $(subNavItem).toggleClass('bold');
  }
}


// ScrollListener class
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
          position > scrollPosition || (position + this.positionMap[position].height) > scrollPosition
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

  const app_container = document.querySelector('[data-app-container]');
  const app = new App(app_container);
  const subNav = new SubNav();
  const scrollListener = new ScrollListener();
