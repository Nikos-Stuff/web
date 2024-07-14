document.addEventListener('DOMContentLoaded', () => {
    const texts = ["Creativity unleashed", "100% random stuff", "Xiro Cute"];
    let currentIndex = 0;
    let isDeleting = false;
    let text = '';

    function type() {
        const typewriterElement = document.querySelector('.typewriter');
        if (!typewriterElement) return;

        const currentText = texts[currentIndex];
        if (isDeleting) {
            text = currentText.substring(0, text.length - 1);
        } else {
            text = currentText.substring(0, text.length + 1);
        }

        typewriterElement.textContent = text;

        let typeSpeed = 150;

        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && text === currentText) {
            typeSpeed = 2000; // Pause at end of typing
            isDeleting = true;
        } else if (isDeleting && text === '') {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before typing next text
        }

        setTimeout(type, typeSpeed);
    }

    type();
});