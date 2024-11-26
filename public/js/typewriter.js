function run() {
    console.log('TW Loaded');
    const texts = [
        "Creativity unleashed",
        "100% random stuff",
        "Caution: May contain traces of unicorn giggles",
        "Spontaneous bursts of brilliance",
        "Chaos with a dash of glitter",
        "Nonsense with a side of whimsy",
        "Unleashing the inner goofball",
        "Thoughts from the absurdity dimension",
        "Serious lack of seriousness",
        "Just add imagination and stir",
        "Powered by caffeinated daydreams",
        "Eureka moments in the making",
        "1% sugar free!"
    ];

    let currentIndex = 0;
    let isDeleting = false;
    let text = '';

    function type() {
        const typewriterElement = document.querySelector('.typewriter');

        if (!typewriterElement) {
            // If the element is not available, retry after 500ms
            setTimeout(type, 500);
            return;
        }

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
}

run()
document.addEventListener('DOMContentLoaded', run);