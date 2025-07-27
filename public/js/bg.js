document.addEventListener("DOMContentLoaded", function () {
  let mouseX = 0,
    mouseY = 0,
    scrollY = 0;
  let targetMouseX = 0,
    targetMouseY = 0,
    targetScrollY = 0;

  const easing = 0.075;

  // These are set after initial layout is done (via rAF)
  let winHeight = 0;
  let winWidth = 0;
  let winScrollY = 0;
  let POD_SCROLL_RANGE = 0; 

  // Throttled resize handler
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      winHeight = window.innerHeight;
      winWidth = window.innerWidth;
    }, 100);
  });

  // Track scroll position only
  window.addEventListener("scroll", function () {
    winScrollY = window.scrollY;
    targetScrollY = winScrollY;
  });

  // Multipliers
  const multipliers = {
    particles1: { mouse: 3, scroll: 0.05 },
    particles2: { mouse: 5, scroll: 0.1 },
    particles3: { mouse: 2, scroll: 0.15 },
    stars1: { mouse: 3, scroll: 0.05 },
    stars2: { mouse: 5, scroll: 0.1 },
    stars3: { mouse: 2, scroll: 0.15 },
    pod: { mouse: 1, scroll: 0.05 },
  };

  const elements = {
    particles1: document.getElementById("particles1"),
    particles2: document.getElementById("particles2"),
    particles3: document.getElementById("particles3"),
    stars1: document.getElementById("stars1"),
    stars2: document.getElementById("stars2"),
    stars3: document.getElementById("stars3"),
    pod: document.getElementById("pod"),
  };

  document.addEventListener("mousemove", function (e) {
    targetMouseX = (e.clientX - winWidth / 2) / (winWidth / 2);
    targetMouseY = (e.clientY - winHeight / 2) / (winHeight / 2);
  });

  function ease(current, target, easeFactor) {
    return current + (target - current) * easeFactor;
  }

  function updateParallax() {
    mouseX = ease(mouseX, targetMouseX, easing);
    mouseY = ease(mouseY, targetMouseY, easing);
    scrollY = ease(scrollY, targetScrollY, easing);

    for (const [id, elem] of Object.entries(elements)) {
      if (!elem) continue;

      if (id === "pod") {
        const maxScale = 1.3;
        const maxRotation = 10;
        const scrollFraction = Math.min(1, scrollY / POD_SCROLL_RANGE);
        const podScale = 1 + (maxScale - 1) * scrollFraction;

        elem.style.transform = `translate(${
          mouseX * multipliers[id].mouse
        }px, ${mouseY * multipliers[id].mouse}px) scale(${podScale}) rotate(${
          maxRotation * scrollFraction
        }deg)`;
        elem.style.willChange = "transform";
      } else {
        const { mouse, scroll } = multipliers[id];
        elem.style.transform = `translate(${mouseX * mouse}px, ${
          mouseY * mouse
        }px) translateY(-${scrollY * scroll}px)`;
        elem.style.willChange = "transform";
      }
    }

    requestAnimationFrame(updateParallax);
  }

  function initBG() {
    console.log("BG Loaded");

    const particlesSmall = generateParticles(500, "#000");
    const particlesMedium = generateParticles(250, "#000");
    const particlesLarge = generateParticles(100, "#000");
    const starsSmall = generateParticles(500, "#fff");
    const starsMedium = generateParticles(250, "#fff");
    const starsLarge = generateParticles(100, "#fff");

    applyStyles(elements.particles1, 1, particlesSmall, "animStar 50s linear infinite");
    applyStyles(elements.particles2, 1.5, particlesMedium, "animateParticle 100s linear infinite");
    applyStyles(elements.particles3, 2, particlesLarge, "animateParticle 150s linear infinite");

    applyStyles(elements.stars1, 1, starsSmall, "");
    applyStyles(elements.stars2, 1.5, starsMedium, "");
    applyStyles(elements.stars3, 2, starsLarge, "");
  }

  function applyStyles(element, size, boxShadow, animation) {
    if (!element) return;
    element.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      box-shadow: ${boxShadow};
      animation: ${animation};
      will-change: transform;
    `;
  }

  function getRandom(max) {
    return Math.floor(Math.random() * max);
  }

  function generateParticles(n, color) {
    const positions = [];
    for (let i = 0; i < n; i++) {
      positions.push(`${getRandom(2560)}px ${getRandom(2560)}px ${color}`);
    }
    return positions.join(", ");
  }

  function initializeParallax() {
    // Defer layout reads to next animation frame
    requestAnimationFrame(() => {
      winHeight = window.innerHeight;
      winWidth = window.innerWidth;
      winScrollY = window.scrollY;
      POD_SCROLL_RANGE = document.body.scrollHeight
      targetScrollY = winScrollY;

      initBG();
      updateParallax();
    });
  }

  document.addEventListener("astro:after-swap", initializeParallax);
  initializeParallax();
});
