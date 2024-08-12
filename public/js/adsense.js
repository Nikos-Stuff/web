function run() {
    var delay = 5000;
    setTimeout(function() {
        var script = document.createElement('script');

        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4276395829672450";
        script.crossOrigin = "anonymous";
        script.async = true;


        document.head.appendChild(script);


        console.log('G-ADS Loaded');
    }, delay);
}

// Run the function
run();
