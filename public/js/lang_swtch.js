document.querySelectorAll('.language-toggle').forEach(function(languageToggle) {
    const currentUrl = window.location.pathname;

    if (currentUrl.includes('/pl')) {
        languageToggle.querySelector('p').textContent = 'EN';
        languageToggle.href = '/';  // EN - MAIN
    } else {
        languageToggle.querySelector('p').textContent = 'PL';
        languageToggle.href = '/pl';  // PL
    }
});
