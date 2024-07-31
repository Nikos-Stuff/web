let typingInterval;

function run() {
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

    function createErrorElement(message) {
        const errorElement = document.createElement('div');
        errorElement.textContent = message;
        errorElement.style.position = 'fixed';
        errorElement.style.top = '0';
        errorElement.style.left = '0';
        errorElement.style.right = '0';
        errorElement.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
        errorElement.style.color = 'white';
        errorElement.style.padding = '10px';
        errorElement.style.fontSize = '16px';
        errorElement.style.textAlign = 'center';
        errorElement.style.zIndex = '1000';
        errorElement.style.borderBottom = '2px solid red';
        document.body.appendChild(errorElement);
        
        // Remove the error message after a few seconds
        setTimeout(() => {
            document.body.removeChild(errorElement);
        }, 5000);
    }

    function type() {
        try {
            const typewriterElement = document.querySelector('.typewriter');
            if (!typewriterElement) throw new Error("Typewriter element not found");

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

            typingInterval = setTimeout(type, typeSpeed);
        } catch (error) {
            createErrorElement(error.message);
        }
    }

    if (typingInterval) {
        clearTimeout(typingInterval);
    }

    type();
}

run();