function run() {
  const parallaxImages = document.querySelectorAll('[id^="parallaxImage"]');

  function handleParallaxScroll() {
    const scrollY = window.scrollY;
    parallaxImages.forEach(parallaxImage => {
      parallaxImage.style.transform = `translateY(-${scrollY * 0.01}px)`;
    });
  }

  window.addEventListener('scroll', () => {
    requestAnimationFrame(handleParallaxScroll);
  });
}

run();
