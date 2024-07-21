document.addEventListener('DOMContentLoaded', function () {
    let mouseX = 0, mouseY = 0, scrollY = 0;
    let targetMouseX = 0, targetMouseY = 0, targetScrollY = 0;
    const easing = 0.075;

    document.addEventListener('mousemove', function (e) {
        targetMouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        targetMouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    });

    window.addEventListener('scroll', function () {
        targetScrollY = window.scrollY;
    });

    function ease(current, target, easeFactor) {
        const delta = target - current;
        return current + delta * easeFactor;
    }

    function smoothMove() {
        mouseX = ease(mouseX, targetMouseX, easing);
        mouseY = ease(mouseY, targetMouseY, easing);
        scrollY = ease(scrollY, targetScrollY, easing);

        const subtitle = document.getElementById('subtitle');
        const title = document.getElementById('title');


        if (subtitle) {
            subtitle.style.transform = `translate(${mouseX * 15}px, ${mouseY * 15}px) translateY(-${scrollY * 0.15}px)`;
        }

        if (title) {
            title.style.transform = `translate(${mouseX * 15}px, ${mouseY * 15}px) translateY(-${scrollY * 0.1}px)`;
        }


        requestAnimationFrame(smoothMove);
    }

    smoothMove();
});