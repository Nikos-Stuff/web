const quotes_json = "/loading_quotes.json";

function fetchQuotes() {
  fetch(quotes_json)
    .then((response) => response.json())
    .then((data) => {
      const quotes = data.quotes;
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      document.querySelector(
        ".loader span"
      ).textContent = `"${randomQuote.quote}" - ${randomQuote.author}`;
    })
    .catch((error) => {
      console.error("Error fetching quotes:", error);
      document.querySelector(".loader span").textContent =
        "Failed to load quote.";
    });
}

fetchQuotes();

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  preloader.style.pointerEvents = "none";

  setTimeout(() => {
    preloader.remove();
  }, 1000);
});
