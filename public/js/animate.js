let executed = false;

function animate() {
  if (executed) {
    return;
  }

  executed = true;

  const animateElements = document.querySelectorAll('.animate');

  animateElements.forEach((element, index) => {
   
    const randomDelay = Math.random() * (0.1 - 0.05) + 0.05;

    setTimeout(() => {
      element.classList.add('show');
    }, index * 150 + randomDelay * 1000);
  });
}

animate();
document.addEventListener('DOMContentLoaded', animate);