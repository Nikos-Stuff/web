document.addEventListener('DOMContentLoaded', function () {
    const parallaxImages = document.querySelectorAll('[id^="parallaxImage"]');

    function handleParallaxScroll() {
        parallaxImages.forEach(parallaxImage => {
            const scrollY = window.scrollY;
            parallaxImage.style.transition = 'transform 0.8s ease-out';
            parallaxImage.style.transform = `translateY(-${scrollY * 0.05}px)`;
        });
        requestAnimationFrame(handleParallaxScroll);
    }

    handleParallaxScroll();
});
