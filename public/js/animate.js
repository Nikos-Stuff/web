function animate() {
  const animateElements = document.querySelectorAll('.animate');

  const addClass = (element, index) => {
    window.requestAnimationFrame(() => {
      setTimeout(() => {
        element.classList.add('show');
      }, index * 150);
    });
  };

  animateElements.forEach(addClass);
}

document.addEventListener("astro:page-load", animate);
document.addEventListener("astro:after-swap", animate);
