// adsense.js

// Inline the AdSense script content directly
(function() {
    var adsbygoogle = window.adsbygoogle || [];
    adsbygoogle.push({
        client: "ca-pub-4276395829672450",
        enable_page_level_ads: true
    });

    // This is the actual AdSense script
    var script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
})();
