let executed_a = false;

function animate() {
  if (executed_a) {
    return;
  }

  executed_a = true;

  const animateElements = document.querySelectorAll('.animate');

  animateElements.forEach((element, index) => {
   
    setTimeout(() => {
      element.classList.add('show');
    }, index * 150);
  });
}

animate();
document.addEventListener('DOMContentLoaded', animate);