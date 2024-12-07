let executed = false;

function animate() {
  if (executed) {
    return;
  }

  executed = true;

  const animateElements = document.querySelectorAll('.animate');

  animateElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('show');
    }, index * 150);
  });
}

animate();

document.addEventListener('DOMContentLoaded', animate);