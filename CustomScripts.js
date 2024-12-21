/// switch-title.js
/// alias swtie.js
(function () {
    // Fonction pour valider un JSON
    function isValidJson(string) {
        try {
            JSON.parse(string);
            return true;
        } catch {
            return false;
        }
    }

    // Fonction pour extraire et modifier le JSON, et mettre à jour le DOM
    function modifyVideoTitle() {
        try {
            console.log("### Début de la tentative de modification ###");

            // Étape 1 : Trouver l'élément du titre dans le DOM
            const titleElement = document.querySelector('h1.title');

            if (!titleElement) {
                console.warn('Impossible de trouver le titre de la vidéo dans le DOM.');
                return false;
            }

            // Étape 2 : Définir le titre directement dans le DOM
            const newTitle = 'Stop using WD-40';
            console.log('Titre avant modification :', titleElement.textContent);

            titleElement.textContent = newTitle; // Mise à jour visible dans la page
            console.log('Titre après modification :', titleElement.textContent);

            // Étape 3 : Optionnel - Mise à jour dans les métadonnées `<meta>`
            const metaTitle = document.querySelector('meta[name="title"]');
            if (metaTitle) {
                metaTitle.setAttribute('content', newTitle);
                console.log('Meta title mis à jour :', metaTitle.getAttribute('content'));
            }

            return true;
        } catch (err) {
            console.error('Erreur lors de la tentative de modification :', err);
            return false;
        }
    }

    // Retenter après un délai ou observer les changements dynamiques
    setTimeout(() => {
        const success = modifyVideoTitle();

        if (!success) {
            console.log("### Échec initial, activation du système d'observation pour réessayer. ###");
            const observer = new MutationObserver(() => {
                const successRetry = modifyVideoTitle();
                if (successRetry) {
                    console.log("### Modification réussie grâce à MutationObserver. ###");
                    observer.disconnect();
                }
            });

            observer.observe(document.body, { childList: true, subtree: true });
        }
    }, 2000);
})();
