document.addEventListener('DOMContentLoaded', function () {
    let mouseX = 0, mouseY = 0, scrollY = 0;
    let targetMouseX = 0, targetMouseY = 0, targetScrollY = 0;
    const easing = 0.075;

    function throttle(fn, wait) {
        let time = Date.now();
        return function (...args) {
            if ((time + wait - Date.now()) < 0) {
                fn(...args);
                time = Date.now();
            }
        }
    }

    document.addEventListener('mousemove', throttle(function (e) {
        targetMouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        targetMouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    }, 150));

    window.addEventListener('scroll', throttle(function () {
        targetScrollY = window.scrollY;
    }, 150));

    function ease(current, target, easeFactor) {
        const delta = target - current;
        return current + delta * easeFactor;
    }

    function smoothMove() {
        mouseX = ease(mouseX, targetMouseX, easing);
        mouseY = ease(mouseY, targetMouseY, easing);
        scrollY = ease(scrollY, targetScrollY, easing);

        const animate = document.getElementById('animate');
        const subtitle = document.getElementById('subtitle');
        const title = document.getElementById('title');
        const ctaButtons = document.getElementById('ctaButtons');
        const typewriterc = document.getElementById('typewriter-text');

        if (animate) {
            animate.style.transform = `translate(${mouseX * 15}px, ${mouseY * 15}px)`;
        }

        if (typewriterc) {
            typewriterc.style.transform = `translate(${mouseX * 15}px, ${mouseY * 15}px) translateY(-${scrollY * 0.15}px)`;
        }

        if (subtitle) {
            subtitle.style.transform = `translate(${mouseX * 15}px, ${mouseY * 15}px) translateY(-${scrollY * 0.15}px)`;
        }

        if (title) {
            title.style.transform = `translate(${mouseX * 15}px, ${mouseY * 15}px) translateY(-${scrollY * 0.1}px)`;
        }

        if (ctaButtons) {
            ctaButtons.style.transform = `translate(${mouseX * 15}px, ${mouseY * 15}px) translateY(-${scrollY * 0.05}px)`;
        }

        // Fade out animation based on scroll position
        const threshold = 250;
        const opacity = Math.max(1 - (scrollY / threshold), 0);
        animate.style.opacity = opacity.toFixed(2);

        requestAnimationFrame(smoothMove);
    }

    smoothMove();
});