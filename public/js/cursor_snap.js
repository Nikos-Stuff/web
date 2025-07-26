function init() {
  console.log("Cursor Snap Loaded");
  const isTouchDevice = window.matchMedia("(hover: none)").matches;
  if (isTouchDevice) return;

  let mouse = { x: 0, y: 0 };
  let pos = { x: 0, y: 0 };
  const ratio = 0.65;

  document.addEventListener("mousemove", (e) => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    mouse.x = e.pageX;
    mouse.y = e.pageY - scrollTop;
  });

  function animate() {
    pos.x += (mouse.x - pos.x) * ratio;
    pos.y += (mouse.y - pos.y) * ratio;
    requestAnimationFrame(animate);
  }

  animate();

  let elements = document.querySelectorAll(".cursor_follow");

  elements.forEach((el) => {
    const movement = 20;

    el.addEventListener("mousemove", (e) => {
      if (el.getAttribute("data-animated") !== "true") return; // Skip if not animated in yet
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      const moveX = ((relX - rect.width / 2) / rect.width) * movement;
      const moveY = ((relY - rect.height / 2) / rect.height) * movement;

      el.style.transition =
        "transform 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transition =
        "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      el.style.transform = `translate(0px, 0px)`;
    });
  });
}

document.addEventListener("DOMContentLoaded", init);
