chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
        chrome.storage.local.get(['isCapturing'], (res) => {
            if (res.isCapturing && details.url.includes(".m3u8")) {

                // --- AD EXCLUSION LOGIC ---
                const isAd = details.url.includes("pmolink") ||
                    details.url.includes("finallygotthexds.site");

                if (isAd) {
                    console.log("Filtered out ad stream:", details.url);
                    return; // Ignore this request and keep listening
                }
                // --------------------------

                // Send the real movie URL to the popup
                chrome.runtime.sendMessage({
                    type: "URL_FOUND",
                    url: details.url
                });

                // Stop capturing automatically after finding the real one
                chrome.storage.local.set({ isCapturing: false });
            }
        });
    },
    { urls: ["<all_urls>"] }
);