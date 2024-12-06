function run() {
    let delay = 5000; // 5 seconds delay

    setTimeout(function() {
        // Create and add the AdSense script
        let adsenseScript = document.createElement('script');
        adsenseScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4276395829672450";
        adsenseScript.crossOrigin = "anonymous";
        adsenseScript.defer = true;
        adsenseScript.onerror = function() {
            console.error('Failed to load AdSense script');
        };
        document.head.appendChild(adsenseScript);

        // Create and add the Funding Choices script
        let fundingChoicesScript1 = document.createElement('script');
        fundingChoicesScript1.src = "https://fundingchoicesmessages.google.com/i/pub-4276395829672450?ers=1";
        fundingChoicesScript1.defer = true;
        fundingChoicesScript1.nonce = "thd-XSK7RnvUrv4fQ-RARQ";
        fundingChoicesScript1.onerror = function() {
            console.error('Failed to load Funding Choices script 1');
        };
        document.head.appendChild(fundingChoicesScript1);

        let fundingChoicesScript2 = document.createElement('script');
        fundingChoicesScript2.text = `
            (function() {
                function signalGooglefcPresent() {
                    if (!window.frames['googlefcPresent']) {
                        if (document.body) {
                            const iframe = document.createElement('iframe');
                            iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;';
                            iframe.style.display = 'none';
                            iframe.name = 'googlefcPresent';
                            document.body.appendChild(iframe);
                        } else {
                            setTimeout(signalGooglefcPresent, 0);
                        }
                    }
                }
                signalGooglefcPresent();
            })();
        `;
        fundingChoicesScript2.nonce = "thd-XSK7RnvUrv4fQ-RARQ";
        fundingChoicesScript2.defer = true;
        fundingChoicesScript2.onerror = function() {
            console.error('Failed to load Funding Choices script 2');
        };
        document.head.appendChild(fundingChoicesScript2);

        console.log('G-ADS Loaded');

    }, delay);
}

// Run the function
run();
