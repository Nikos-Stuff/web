let executed = false;

function run() {
    if (executed) {
        return; // Exit the function if it has already been executed
    }
    executed = true; // Set executed to true once the function starts running

    console.log('TW Loaded');
    const texts = [
        "Creativity unleashed",
        "100% random stuff",
        "Caution: May contain traces of unicorn giggles",
        "Spontaneous bursts of brilliance",
        '<span class="rainbow font-semibold">Chaos with a dash of glitter</span>',
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
    let charIndex = 0;

    function type() {
        const typewriterElement = document.querySelector('.typewriter');

        if (!typewriterElement) {
            // If the element is not available, retry after 500ms
            setTimeout(type, 500);
            return;
        }

        const currentText = texts[currentIndex];
        const match = currentText.match(/<[^>]*>(.*?)<\/[^>]*>/); // Extract content inside tags (if present)
        const openingTag = match ? currentText.split(match[1])[0] : ""; // Opening tag including attributes
        const closingTag = match ? currentText.slice(currentText.indexOf('</')) : ""; // Closing tag
        const plainText = match ? match[1] : currentText; // Inner text or the whole string if no tags

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        const visibleText = plainText.substring(0, charIndex);
        typewriterElement.innerHTML = `${openingTag}${visibleText}${closingTag}`; // Maintain tags and type content inside

        let typeSpeed = 150;

        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && charIndex === plainText.length) {
            typeSpeed = 2000; // Pause at end of typing
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before typing next text
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

run();
document.addEventListener('DOMContentLoaded', run);
