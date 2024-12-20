/// switch-title.js
/// alias swtie.js
(function() {
    console.error('caca hello world');
    const primaryInfo = document.querySelector('script[type="application/json"]');
    console.error('caca', primaryInfo);
    if (primaryInfo) {
        try {
            const json = JSON.parse(primaryInfo.textContent);
            if (json.videoPrimaryInfoRenderer && json.videoPrimaryInfoRenderer.title) {
                const currentTitle = json.videoPrimaryInfoRenderer.title.runs[0].text;
                const newTitleElement = document.querySelector('.attribute-name[title] + .attribute-value');
                console.error('caca', currentTitle, newTitleElement);
                
                if (newTitleElement) {
                    const newTitle = newTitleElement.textContent;
                    json.videoPrimaryInfoRenderer.title.runs[0].text = newTitle;
                    primaryInfo.textContent = JSON.stringify(json);
                    console.log('Replaced title "${currentTitle}" with "${newTitle}"');
                }
            }
        } catch (e) {
            console.error('caca Error modifying title:', e);
        }
    }

    const titleElement = document.querySelector('title');
    const metaTitleElement = document.querySelector('.attribute-name[title] + .attribute-value');
    if (titleElement && metaTitleElement) {
        titleElement.textContent = metaTitleElement.textContent;
    }
})();
