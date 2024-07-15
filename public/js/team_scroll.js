document.addEventListener('DOMContentLoaded', function () {
    const parallaxImages = document.querySelectorAll('[id^="parallaxImage"]');

    function handleParallaxScroll() {
        const scrollY = window.scrollY;

        parallaxImages.forEach(parallaxImage => {
            const imageHeight = parallaxImage.offsetHeight;
            const containerHeight = parallaxImage.parentElement.offsetHeight;

            // Calculate the maximum translation based on container and image height
            const maxTranslateY = Math.max(0, containerHeight - imageHeight);

            // Limit the scroll effect
            const limitedScrollY = Math.min(scrollY * 0.05, maxTranslateY);

            parallaxImage.style.transition = 'transform 0.8s ease-out';
            parallaxImage.style.transform = `translateY(-${limitedScrollY}px)`;
        });
        
        requestAnimationFrame(handleParallaxScroll);
    }

    handleParallaxScroll();
});