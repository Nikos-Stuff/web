document.addEventListener('DOMContentLoaded', function () {
    const parallaxImages = document.querySelectorAll('[id^="parallaxImage"]');

    function handleParallaxScroll() {
        parallaxImages.forEach(parallaxImage => {
            const scrollY = window.scrollY;
            parallaxImage.style.transition = 'transform 0.2s ease-out'; // Adjust the transition timing and easing as needed
            parallaxImage.style.transform = `translateY(-${scrollY * 0.1}px)`;
        });
        requestAnimationFrame(handleParallaxScroll);
    }

    handleParallaxScroll();
});
