function run() {
  let mouseX = 0,
    mouseY = 0,
    scrollY = 0;
  let targetMouseX = 0,
    targetMouseY = 0,
    targetScrollY = 0;
  const easing = 0.075;

  const other_elemencts = {
    pod_image: document.getElementById("pod"),
  };

  const multipliers = {
    animate: { mouse: 10, scroll: 0.05 },
    subtitle: { mouse: 15, scroll: 0.15 },
    title: { mouse: 15, scroll: 0.1 },
    ctaButtons: { mouse: 15, scroll: 0.05 },
    typewriter: { mouse: 15, scroll: 0.15 },
  };

  document.addEventListener("mousemove", function (e) {
    targetMouseX =
      (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    targetMouseY =
      (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
  });

  window.addEventListener("scroll", function () {
    targetScrollY = window.scrollY;
  });

  function ease(current, target, easeFactor) {
    return current + (target - current) * easeFactor;
  }

  function smoothMove() {
    mouseX = ease(mouseX, targetMouseX, easing);
    mouseY = ease(mouseY, targetMouseY, easing);
    scrollY = ease(scrollY, targetScrollY, easing);

    const elements = {
      animate: document.getElementById("animate"),
      subtitle: document.getElementById("subtitle"),
      title: document.getElementById("title"),
      ctaButtons: document.getElementById("ctaButtons"),
      typewriter: document.getElementById("typewriter-text"),
    };

    for (const [id, elem] of Object.entries(elements)) {
      if (elem) {
        const { mouse, scroll } = multipliers[id];
        elem.style.transform = `translate(${mouseX * mouse}px, ${
          mouseY * mouse
        }px) translateY(-${scrollY * scroll}px)`;
      }
    }

    const threshold = 750;
    const scale = Math.max(1 - scrollY / threshold, 0);
    const blur = Math.min((scrollY / threshold) * 10, 10); // Max 10px blur

    if (elements.animate) {
      elements.animate.style.transform = `scale(${scale.toFixed(2)})`;
      // elements.animate.style.filter = `blur(${blur.toFixed(2)}px)`; < backdrop blur was breaking because of this
    }

    if (other_elemencts.pod_image) {
      // Something there will be soon regarding backgroud image
    }

    requestAnimationFrame(smoothMove);
  }

  smoothMove();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", run);
} else {
  run();
}
