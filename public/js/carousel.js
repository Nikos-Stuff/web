const carousel = document.getElementById("carousel");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

let currentIndex = 0;
let autoScrollInterval;
const totalSlides = carousel.children.length;

// Update active slide
const updateCarousel = () => {
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
};

// Auto-scroll logic
const startAutoScroll = () => {
  autoScrollInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }, 3000); // Scroll every 3 seconds
};

// Stop auto-scroll temporarily
const stopAutoScroll = () => {
  clearInterval(autoScrollInterval);
  startAutoScroll(); // Restart auto-scroll after interaction
};

// Event listeners for navigation buttons
if (next) {
  next.addEventListener("click", (e) => {
    e.preventDefault();
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
    stopAutoScroll();
  });
}

if (prev) {
  prev.addEventListener("click", (e) => {
    e.preventDefault();
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
    stopAutoScroll();
  });
}

// Initialize carousel
updateCarousel();
startAutoScroll();
