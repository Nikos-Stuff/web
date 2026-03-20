import translations from "@win98/lang.json";

/** * TypeScript Setup:
 * We define our master keys based on the English version.
 * We cast 'translations' to 'any' briefly to bypass the strict "missing keys" error
 * while still maintaining autocomplete for the keys themselves.
 */
type TranslationKeys = typeof translations.en;
type LanguageCode = "en" | "pl" | "fr";
const allLangData = translations as any;

function updateLanguage(lang: LanguageCode) {
  localStorage.setItem("preferred_lang", lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n") as keyof TranslationKeys;
    const translation = allLangData[lang][key] || translations.en[key];

    if (translation) {
      if (el.tagName === "MARQUEE") {
        el.innerHTML = translation;
      } 
      else if (el.children.length > 0 && !translation.includes("<")) {
        const textNode = Array.from(el.childNodes).find(
          (node) => node.nodeType === Node.TEXT_NODE
        );
        if (textNode) textNode.textContent = translation;
      } 
      else {
        el.innerHTML = translation;
      }
    }
  });

  const select = document.querySelector(
    "select[data-i18n-switcher]"
  ) as HTMLSelectElement;
  if (select) select.value = lang;
}

document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.querySelector(
    ".window select" 
  ) as HTMLSelectElement;

  if (langSelect) {
    langSelect.setAttribute("data-i18n-switcher", "true");
    const savedLang = (localStorage.getItem("preferred_lang") || "en") as LanguageCode;
  
    updateLanguage(savedLang);

    langSelect.addEventListener("change", (e) => {
      const target = e.target as HTMLSelectElement;
      updateLanguage(target.value as LanguageCode);
    });
  }
});