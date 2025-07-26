function animateOnView() {
  const animateElements = document.querySelectorAll(".animate");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // Stop observing once the animation is triggered
        }
      });
    },
    { threshold: 0.1 }
  ); // Testing with a threshold of 0.1

  animateElements.forEach((element) => {
    observer.observe(element);
  });

   console.log('Animate stuff Loaded');
}

document.addEventListener("DOMContentLoaded", animateOnView);
