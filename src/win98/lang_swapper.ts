import translations from "@win98/lang.json";

function updateLanguage(lang: "en" | "pl"| "fr") {
  // 1. Save to localStorage
  localStorage.setItem("preferred_lang", lang);

  // 2. Update all elements with data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n") as keyof typeof translations.en;
    const translation = translations[lang][key];

    if (translation) {
      // If it's a marquee, we need to handle it specifically to not break the animation
      if (el.tagName === "MARQUEE") {
        el.textContent = translation;
      }
      // If the element has children (like your <strong> tag),
      // we update only the text node to keep the <strong> intact.
      else if (el.children.length > 0) {
        // This targets the "Active Users: " text without deleting the <strong>0</strong>
        const textNode = Array.from(el.childNodes).find(
          (node) => node.nodeType === Node.TEXT_NODE,
        );
        if (textNode) textNode.textContent = translation;
      } else {
        el.textContent = translation;
      }
    }
  });

  // 3. Sync the <select> element
  const select = document.querySelector(
    "select[data-i18n-switcher]",
  ) as HTMLSelectElement;
  if (select) select.value = lang;
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.querySelector(
    ".window select",
  ) as HTMLSelectElement;

  // Add an identifier to your select in HTML so we can find it easily
  if (langSelect) {
    langSelect.setAttribute("data-i18n-switcher", "true");

    // Set initial value from storage
    const savedLang = (localStorage.getItem("preferred_lang") || "en") as
      | "en"
      | "pl"
      | "fr";
    updateLanguage(savedLang);

    // Listen for changes
    langSelect.addEventListener("change", (e) => {
      const target = e.target as HTMLSelectElement;
      const newLang = target.value as "en" | "pl"| "fr";
      updateLanguage(newLang);
    });
  }
});
