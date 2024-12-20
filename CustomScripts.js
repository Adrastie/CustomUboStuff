/// switch-title.js
/// alias swtie.js
(function() {
    const meta = document.querySelector('meta[name="title"]');
    if (meta?.content) {
        document.title = meta.content;
    }
})();
