/// switch-title.js
/// alias swtie.js
(function() {
    console.warn('caca loaded');
    const metaTitleElement = document.querySelector('meta[name="title"]');
    if (!metaTitleElement || !metaTitleElement.content) {
        console.warn('Meta title not found or empty');
        return;
    }
    const metaTitle = metaTitleElement.content;

    const jsonScript = document.querySelector('script[type="application/json"]');
    if (jsonScript) {
        try {
            const jsonData = JSON.parse(jsonScript.textContent);

            const videoPrimaryInfo = jsonData?.twoColumnWatchNextResults?.results?.results?.contents?.find(
                item => item?.videoPrimaryInfoRenderer
            );
            if (videoPrimaryInfo) {
                const currentTitle = videoPrimaryInfo.videoPrimaryInfoRenderer.title.runs[0].text;
                videoPrimaryInfo.videoPrimaryInfoRenderer.title.runs[0].text = metaTitle;
                jsonScript.textContent = JSON.stringify(jsonData);
                console.log(`Replaced title "${currentTitle}" with "${metaTitle}"`);
            } else {
                console.warn('Video primary info not found in JSON structure');
            }
        } catch (error) {
            console.error('Failed to parse or modify JSON:', error);
        }
    } else {
        console.warn('JSON script element not found');
    }
})();
