document.addEventListener('DOMContentLoaded', function () {
    const parallaxImages = document.querySelectorAll('[id^="parallaxImage"]');

    function handleParallaxScroll() {
        const scrollY = window.scrollY;
        const limitedScrollY = Math.min(Math.max(scrollY * 0.05, -50), 50);

        parallaxImages.forEach(parallaxImage => {
            parallaxImage.style.transition = 'transform 0.8s ease-out';
            parallaxImage.style.transform = `translateY(-${limitedScrollY}px)`;
        });
        
        requestAnimationFrame(handleParallaxScroll);
    }

    handleParallaxScroll();
});
