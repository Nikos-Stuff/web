  function openStripePopup(stripeLink) {
    const popup = document.getElementById("stripe-popup");
    const content = document.getElementById("popup-content");
    const stripeBtn = document.getElementById("stripe-link-btn");

    if (stripeBtn) {
      stripeBtn.href = stripeLink || "#";
    }

    popup.classList.remove("hidden", "pointer-events-none", "opacity-0");
    popup.classList.add("opacity-100", "flex");

    requestAnimationFrame(() => {
      content.classList.remove("scale-0");
      content.classList.add("scale-100");
    });
  }

  function closeStripePopup() {
    const popup = document.getElementById("stripe-popup");
    const content = document.getElementById("popup-content");

    content.classList.remove("scale-100");
    content.classList.add("scale-0");
    popup.classList.remove("opacity-100");
    popup.classList.add("opacity-0");

    setTimeout(() => {
      popup.classList.add("hidden", "pointer-events-none");
      popup.classList.remove("flex");
    }, 300);
  }