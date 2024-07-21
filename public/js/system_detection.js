

(function () {
    function getOSVersion() {
        const userAgent = window.navigator.userAgent;
        let osVersion = "Unknown";

        if (userAgent.indexOf("Windows NT 10.0") !== -1) {
            osVersion = "Windows 10";
        } else if (userAgent.indexOf("Windows NT 6.3") !== -1) {
            osVersion = "Windows 8.1";
        } else if (userAgent.indexOf("Windows NT 6.2") !== -1) {
            osVersion = "Windows 8";
        } else if (userAgent.indexOf("Windows NT 6.1") !== -1) {
            osVersion = "Windows 7";
        } else if (userAgent.indexOf("Windows NT 6.0") !== -1) {
            osVersion = "Windows Vista";
        } else if (userAgent.indexOf("Windows NT 5.1") !== -1) {
            osVersion = "Windows XP";
        }
        console.log(osVersion);
        return osVersion;
    }

    const osVersion = getOSVersion();
    const redirectTo = "https://api.nikostuff.com/err";

    if (osVersion === "Windows 8.1" || osVersion === "Windows 8" || osVersion === "Windows 7" || osVersion === "Windows Vista" || osVersion === "Windows XP") {
        window.location.href = redirectTo;
    }
})();