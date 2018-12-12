---
---

class App {
  constructor(container) {
    this._init(container);
    this._bindEvents();
  }

  _init(container){
    this.app = container;
    this.subNavItems = this.app.querySelectorAll('[data-sub-nav-item]');
    this.currentSections = this.app.querySelectorAll('[data-section]');
    this.mobileNavIcon = this.app.querySelector('[data-mobile-nav-icon]');
    this.mobileNav = this.app.querySelector('[data-mobile-menu]');
  }

  _bindEvents() {
    this.subNavItems.forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.scrollToSection(item.getAttribute('data-sub-nav-item'))
      })
    })

    this.currentSections.forEach(section => {
      section.addEventListener("mouseover", () => {
        this.toggleSubNavItem(section.getAttribute('id'))
      })

      section.addEventListener("mouseout", () => {
        this.toggleSubNavItem(section.getAttribute('id'))
      })
    })

    this.mobileNavIcon.addEventListener('click', () => {
      this.toggleMobileMenu();
    })
  }

  scrollToSection(target){
    const section = document.getElementById(target);
    $('html, body').animate({
      scrollTop: $(section).offset().top - '20'
    }, 250);
  }

  toggleSubNavItem(target) {
    const subNavItem = Array
      .from(this.subNavItems)
      .find(item => item.getAttribute('data-sub-nav-item') === target)
    if (subNavItem) $(subNavItem).toggleClass('bold');
  }

  toggleMobileMenu() {
    $(this.mobileNav).toggleClass('MobileMenu--opened');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app_container = document.querySelector('[data-app-container]');
  new App(app_container);
});
