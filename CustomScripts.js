/// switch-title.js
/// alias swtie.js
(function() {
    console.log('Switch-Title script loaded');

    const metaTitleElement = document.querySelector('meta[name="title"]');
    if (!metaTitleElement || !metaTitleElement.content) {
        console.warn('Switch-Title Meta title not found or empty');
        return;
    }
    const metaTitle = metaTitleElement.content;

    const jsonScript = document.querySelector('script[type="application/json"]');
    if (!jsonScript) {
        console.warn('Switch-Title JSON script element not found');
        return;
    }

    if (!jsonScript.textContent.trim()) {
        console.warn('Switch-Title JSON script content is empty');
        return;
    }

    try {
        const jsonData = JSON.parse(jsonScript.textContent);
        const videoPrimaryInfo = jsonData?.twoColumnWatchNextResults?.results?.results?.contents?.find(
            item => item?.videoPrimaryInfoRenderer
        );

        if (!videoPrimaryInfo || !videoPrimaryInfo.videoPrimaryInfoRenderer?.title?.runs?.length) {
            console.warn('Switch-Title Video primary info or title runs not found in JSON structure');
            return;
        }

        const currentTitle = videoPrimaryInfo.videoPrimaryInfoRenderer.title.runs[0].text;
        videoPrimaryInfo.videoPrimaryInfoRenderer.title.runs[0].text = metaTitle;
        jsonScript.textContent = JSON.stringify(jsonData);

        console.log(`Switch-Title Replaced title "${currentTitle}" with "${metaTitle}"`);
    } catch (error) {
        console.error('Switch-Title Failed to parse or modify JSON:', error);
    }
})();
