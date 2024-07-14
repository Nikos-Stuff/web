function generateParticles(n) {
  let value = `${getRandom(2560)}px ${getRandom(2560)}px #000`;
  for (let i = 2; i <= n; i++) {
    value += `, ${getRandom(2560)}px ${getRandom(2560)}px #000`;
  }
  return value;
}

function generateStars(n) {
  let value = `${getRandom(2560)}px ${getRandom(2560)}px #fff`;
  for (let i = 2; i <= n; i++) {
    value += `, ${getRandom(2560)}px ${getRandom(2560)}px #fff`;
  }
  return value;
}

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

// Smoothed movement variables
let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;
let scrollY = 0;
let targetScrollY = 0;

function initBG() {
  const particlesSmall = generateParticles(1000);
  const particlesMedium = generateParticles(500);
  const particlesLarge = generateParticles(250);
  const particles1 = document.getElementById('particles1');
  const particles2 = document.getElementById('particles2');
  const particles3 = document.getElementById('particles3');

  if (particles1) {
    particles1.style.cssText = `
        width: 1px;
        height: 1px;
        border-radius: 50%;
        box-shadow: ${particlesSmall};
        animation: animStar 50s linear infinite;
        `;
  }

  if (particles2) {
    particles2.style.cssText = `
        width: 1.5px;
        height: 1.5px;
        border-radius: 50%;
        box-shadow: ${particlesMedium};
        animation: animateParticle 100s linear infinite;
        `;
  }

  if (particles3) {
    particles3.style.cssText = `
        width: 2px;
        height: 2px;
        border-radius: 50%;
        box-shadow: ${particlesLarge};
        animation: animateParticle 150s linear infinite;
        `;
  }

  const starsSmall = generateStars(1000);
  const starsMedium = generateStars(500);
  const starsLarge = generateStars(250);
  const stars1 = document.getElementById('stars1');
  const stars2 = document.getElementById('stars2');
  const stars3 = document.getElementById('stars3');

  if (stars1) {
    stars1.style.cssText = `
        width: 1px;
        height: 1px;
        border-radius: 50%;
        box-shadow: ${starsSmall};
        `;
  }

  if (stars2) {
    stars2.style.cssText = `
        width: 1.5px;
        height: 1.5px;
        border-radius: 50%;
        box-shadow: ${starsMedium};
        `;
  }

  if (stars3) {
    stars3.style.cssText = `
        width: 2px;
        height: 2px;
        border-radius: 50%;
        box-shadow: ${starsLarge};
        `;
  }

  // Add mouse move effect with smoothing
  document.addEventListener('mousemove', function (e) {
    targetMouseX = e.clientX / window.innerWidth - 0.5;
    targetMouseY = e.clientY / window.innerHeight - 0.5;
  });

  // Add scroll effect with smoothing
  window.addEventListener('scroll', function () {
    targetScrollY = window.scrollY;
  });

  // Smooth animation loop
  function smoothMove() {
    mouseX += (targetMouseX - mouseX) * 0.1;
    mouseY += (targetMouseY - mouseY) * 0.1;
    scrollY += (targetScrollY - scrollY) * 0.1;

    if (particles1) {
      particles1.style.transform = `translate(${mouseX * 50}px, ${mouseY * 50}px) translateY(-${scrollY * 0.2}px)`;
    }

    if (particles2) {
      particles2.style.transform = `translate(${mouseX * 30}px, ${mouseY * 30}px) translateY(-${scrollY * 0.1}px)`;
    }

    if (particles3) {
      particles3.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px) translateY(-${scrollY * 0.05}px)`;
    }

    if (stars1) {
      stars1.style.transform = `translate(${mouseX * 40}px, ${mouseY * 40}px) translateY(-${scrollY * 0.3}px)`;
    }

    if (stars2) {
      stars2.style.transform = `translate(${mouseX * 25}px, ${mouseY * 25}px) translateY(-${scrollY * 0.2}px)`;
    }

    if (stars3) {
      stars3.style.transform = `translate(${mouseX * 15}px, ${mouseY * 15}px) translateY(-${scrollY * 0.1}px)`;
    }

    requestAnimationFrame(smoothMove);
  }

  smoothMove();
}

document.addEventListener('astro:after-swap', initBG);
initBG();
