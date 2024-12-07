function animate() {

  const animateElements = document.querySelectorAll('.animate');

  animateElements.forEach((element, index) => {
   
    setTimeout(() => {
      element.classList.add('show');
    }, index * 450); // 150
  });
}

animate();
document.addEventListener('DOMContentLoaded', animate);