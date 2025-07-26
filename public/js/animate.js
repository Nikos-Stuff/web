function animateOnView() {
  const animateElements = document.querySelectorAll(".animate");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");

        
          setTimeout(() => {
            entry.target.setAttribute("data-animated", "true");
          }, 1000); // One second delay before setting the attribute

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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", animateOnView);
} else {
  animateOnView();
}
