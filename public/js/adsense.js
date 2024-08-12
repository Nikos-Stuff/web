function run() {
    // Create a script element
    console.log('G-ADS Loaded');

    var script = document.createElement('script');

    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4276395829672450";

    script.crossOrigin = "anonymous";
    script.async = true;

    document.head.appendChild(script);
}

run()


