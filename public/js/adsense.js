function run() {
    // Log to indicate the function is running
    console.log('G-ADS Loaded');

    // Set the delay in milliseconds (e.g., 5000ms for 5 seconds)
    var delay = 5000;

    // Use setTimeout to delay the script creation and appending
    setTimeout(function() {
        var script = document.createElement('script');

        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4276395829672450";
        script.crossOrigin = "anonymous";
        script.async = true;

        // Append the script to the head
        document.head.appendChild(script);

        // Log to indicate the script is added
        console.log('✅');
    }, delay);
}

// Run the function
run();
