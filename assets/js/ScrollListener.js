// ---
// ---
//
// class ScrollListener {
//   constructor(toggleSub) {
//     this.intializePositionMap();
//     this.bindScroll();
//     this.target = null;
//   }
//
//   intializePositionMap() {
//     this.positionsArray = [];
//     this.positionMap = Array.from(document.querySelectorAll('[data-section]')).reduce((map, element) => {
//       map[element.offsetTop] = element.attributes.id;
//       this.positionsArray.push(element.offsetTop);
//       return map;
//     }, {});
//   }
//
//   bindScroll() {
//     this.checkIfNewTarget();
//     document.addEventListener('scroll', this.checkIfNewTarget.bind(this));
//     document.addEventListener('resize', () => {
//       this.intializePositionMap();
//       this.checkIfNewTarget();
//     });
//   }
//
//   checkIfNewTarget() {
//     const scrollPosition = window.scrollY;
//     if (this.positionsArray) {
//       const elementPosition = this.positionsArray.find(position => position > scrollPosition);
//       const element = this.positionMap[elementPosition];
//       const newTarget = element;
//       if (this.target !== newTarget) {
//         this.target = newTarget;
//         this.updateTargetElement();
//       }
//     }
//   }
//
//   updateTargetElement() {
//     // subnav.toggleClass('active');
//     alert('worked');
//   }
// }
