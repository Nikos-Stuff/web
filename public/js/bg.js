document.addEventListener("DOMContentLoaded", function () {
  let mouseX = 0,
    mouseY = 0,
    scrollY = 0;
  let targetMouseX = 0,
    targetMouseY = 0,
    targetScrollY = 0;
  const easing = 0.075;

  // Initialize document height and window height
  let docHeight = document.body.scrollHeight;
  let winHeight = window.innerHeight;
  let winScrollY = window.scrollY;

  window.addEventListener("resize", () => {
    // Update dimensions on resize
    docHeight = document.body.scrollHeight;
    winHeight = window.innerHeight;
    winScrollY = window.scrollY;
  });

  // Parallax multipliers for particles and stars
  const multipliers = {
    particles1: { mouse: 3, scroll: 0.05 },
    particles2: { mouse: 5, scroll: 0.1 },
    particles3: { mouse: 2, scroll: 0.15 },
    stars1: { mouse: 3, scroll: 0.05 },
    stars2: { mouse: 5, scroll: 0.1 },
    stars3: { mouse: 2, scroll: 0.15 },
    pod: { mouse: 1, scroll: 0.05 },
  };

  // Mouse and scroll event listeners
  document.addEventListener("mousemove", function (e) {
    targetMouseX =
      (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    targetMouseY =
      (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
  });

  window.addEventListener("scroll", function () {
    winScrollY = window.scrollY; // update cached scroll position
    targetScrollY = winScrollY; // set the easing target to the latest scroll pos
  });

  function ease(current, target, easeFactor) {
    return current + (target - current) * easeFactor;
  }

  function updateParallax() {
    mouseX = ease(mouseX, targetMouseX, easing);
    mouseY = ease(mouseY, targetMouseY, easing);
    scrollY = ease(scrollY, targetScrollY, easing);

    const elements = {
      particles1: document.getElementById("particles1"),
      particles2: document.getElementById("particles2"),
      particles3: document.getElementById("particles3"),
      stars1: document.getElementById("stars1"),
      stars2: document.getElementById("stars2"),
      stars3: document.getElementById("stars3"),
      pod: document.getElementById("pod"),
    };

    for (const [id, elem] of Object.entries(elements)) {
      if (elem) {
        if (id === "pod") {
          const maxScale = 1.3;
          const maxRotation = 10;
          const scrollFraction = Math.min(
            1,
            winScrollY / (docHeight - winHeight)
          ); // Calculate scroll fraction
          const podScale = 1 + (maxScale - 1) * scrollFraction;

          elem.style.transform = `translate(${
            mouseX * multipliers[id].mouse
          }px, ${mouseY * multipliers[id].mouse}px) scale(${podScale}) rotate(${
            maxRotation * scrollFraction
          }deg)`;
          elem.style.willChange = "transform"; // Ensure GPU acceleration
          // elem.style.transition = "transform 1s ease-out"; // Again not sure if this will not bite TailWind CSS styling.
          continue;
        }

        const { mouse, scroll } = multipliers[id];
        elem.style.transform = `translate(${mouseX * mouse}px, ${
          mouseY * mouse
        }px) translateY(-${scrollY * scroll}px)`;
        elem.style.willChange = "transform"; // Ensure GPU acceleration
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

    const particles1 = document.getElementById("particles1");
    const particles2 = document.getElementById("particles2");
    const particles3 = document.getElementById("particles3");
    const stars1 = document.getElementById("stars1");
    const stars2 = document.getElementById("stars2");
    const stars3 = document.getElementById("stars3");

    if (particles1)
      applyStyles(
        particles1,
        1,
        particlesSmall,
        "animStar 50s linear infinite"
      );
    if (particles2)
      applyStyles(
        particles2,
        1.5,
        particlesMedium,
        "animateParticle 100s linear infinite"
      );
    if (particles3)
      applyStyles(
        particles3,
        2,
        particlesLarge,
        "animateParticle 150s linear infinite"
      );
    if (stars1) applyStyles(stars1, 1, starsSmall, "");
    if (stars2) applyStyles(stars2, 1.5, starsMedium, "");
    if (stars3) applyStyles(stars3, 2, starsLarge, "");
  }

  function applyStyles(element, size, boxShadow, animation) {
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

  document.addEventListener("astro:after-swap", initBG);
  initBG();
  updateParallax(); // Start the parallax effect
});
