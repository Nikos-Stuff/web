function run() {
  console.log("TW Loaded");
  const texts = [
    "Kreatywność bez granic",
    "Profesjonalne strony WWW",
    "Nagłe przebłyski geniuszu",
    '<span class="rainbow font-semibold">Porządek w artystycznym chaosie</span>',
    "Kreatywność w najczystszej postaci",
    "Profesjonalizm z odrobiną szaleństwa",
    "Napędzane kawą i pasją",
    "Zjadacze Sera 👀🧀",
    "1% formalności, 99% kreatywności.",
    "Psychodelia w każdym pikselu",
  ];

  let currentIndex = 0;
  let isDeleting = false;
  let charIndex = 0;

  function type() {
    const typewriterElement = document.querySelector(".typewriter");

    if (!typewriterElement) {
      // If the element is not available, retry after 500ms
      setTimeout(type, 500);
      return;
    }

    const currentText = texts[currentIndex];
    const match = currentText.match(/<[^>]*>(.*?)<\/[^>]*>/); // Extract content inside tags (if present)
    const openingTag = match ? currentText.split(match[1])[0] : ""; // Opening tag including attributes
    const closingTag = match
      ? currentText.slice(currentText.indexOf("</"))
      : ""; // Closing tag
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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", run);
} else {
  run();
}
