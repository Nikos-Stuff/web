function animate() {
  const animateElements = document.querySelectorAll('.animate')

  animateElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('show')
    }, index * 150)
  });
}

document.addEventListener("astro:page-load", animate)
document.addEventListener("astro:after-swap", animate)