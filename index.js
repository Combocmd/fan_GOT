(() => {
    "use strict";

    /* ---------------------------------------------------------------------
       Personnages — index / portrait
       --------------------------------------------------------------------- */

    const characters = {
        jon: {
            house: "Maison Stark",
            name: "Jon Snow",
            epithet: "Le bâtard de Winterfell",
            desc: "Élevé dans l’ombre du nom Stark, il choisit la Garde de Nuit et apprend que le Mur protège bien plus que le Nord.",
            region: "Le Nord"
        },
        daenerys: {
            house: "Maison Targaryen",
            name: "Daenerys Targaryen",
            epithet: "Mère des dragons",
            desc: "Exilée à Essos, elle transforme un nom déchu en armée. Sa conviction ne laisse aucune place au doute — pour le meilleur et pour le pire.",
            region: "Essos, puis Peyredragon"
        },
        tyrion: {
            house: "Maison Lannister",
            name: "Tyrion Lannister",
            epithet: "Le gnome",
            desc: "Né avec un nom lourd et un corps que Westeros méprise, il survit par l’esprit. Sa langue est son épée, et elle coupe plus vite que l’acier.",
            region: "Les Terres de l’Ouest"
        },
        arya: {
            house: "Maison Stark",
            name: "Arya Stark",
            epithet: "La fille sans visage",
            desc: "Elle apprend tôt que la vengeance est un métier. Ses voyages la mènent bien plus loin que les murs de Winterfell, jusqu’à une maison où l’on change de visage.",
            region: "Le Nord, puis Braavos"
        },
        jaime: {
            house: "Maison Lannister",
            name: "Jaime Lannister",
            epithet: "Le Roi Tueur",
            desc: "Un chevalier dont la légende a été écrite par ses ennemis. Derrière l’armure, une question : que vaut un serment quand il coûte des vies ?",
            region: "Les Terres de l’Ouest"
        },
        sansa: {
            house: "Maison Stark",
            name: "Sansa Stark",
            epithet: "La dame de Winterfell",
            desc: "D’abord élevée pour être reine, elle apprend à survivre parmi ceux qui jouent au jeu des trônes. Sa force est celle de la patience, et elle ne s’excuse pas.",
            region: "Le Nord"
        }
    };

    const tabs = Array.from(document.querySelectorAll(".cast-tab"));
    const castPanel = document.getElementById("cast-panel");
    const fields = {
        house: document.getElementById("cast-house"),
        name: document.getElementById("cast-name"),
        epithet: document.getElementById("cast-epithet"),
        desc: document.getElementById("cast-desc"),
        region: document.getElementById("cast-region")
    };

    let activeTab = tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true");

    if (tabs.length && castPanel) {
        if (activeTab < 0) {
            activeTab = 0;
        }

        const selectCharacter = (index, moveFocus) => {
            const next = (index + tabs.length) % tabs.length;
            const tab = tabs[next];
            const character = characters[tab.dataset.character];

            if (!character) {
                return;
            }

            tabs.forEach((item, itemIndex) => {
                const isActive = itemIndex === next;
                item.setAttribute("aria-selected", String(isActive));
                item.tabIndex = isActive ? 0 : -1;
            });

            fields.house.textContent = character.house;
            fields.name.textContent = character.name;
            fields.epithet.textContent = character.epithet;
            fields.desc.textContent = character.desc;
            fields.region.textContent = character.region;
            castPanel.setAttribute("aria-labelledby", tab.id);

            activeTab = next;

            if (moveFocus) {
                tab.focus();
            }
        };

        tabs.forEach((tab, index) => {
            tab.addEventListener("click", () => selectCharacter(index, false));
        });

        const castIndex = document.querySelector(".cast-index");

        castIndex.addEventListener("keydown", (event) => {
            const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];

            if (!keys.includes(event.key)) {
                return;
            }

            event.preventDefault();

            if (event.key === "Home") {
                selectCharacter(0, true);
            } else if (event.key === "End") {
                selectCharacter(tabs.length - 1, true);
            } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                selectCharacter(activeTab + 1, true);
            } else {
                selectCharacter(activeTab - 1, true);
            }
        });
    }

    /* ---------------------------------------------------------------------
       Citations
       --------------------------------------------------------------------- */

    const quotes = [
        { text: "«\u00A0L’hiver vient.\u00A0»", source: "Maison Stark" },
        { text: "«\u00A0Un Lannister paie toujours ses dettes.\u00A0»", source: "Maison Lannister" },
        { text: "«\u00A0Quand on joue au jeu des trônes, on gagne ou on meurt. Il n’y a pas de juste milieu.\u00A0»", source: "Cersei Lannister" },
        { text: "«\u00A0Le chaos n’est pas un puits. Le chaos est une échelle.\u00A0»", source: "Petyr Baelish" },
        { text: "«\u00A0La nuit est sombre et pleine de terreurs.\u00A0»", source: "Mélisandre" },
        { text: "«\u00A0Valar Morghulis.\u00A0»", source: "Jaqen H’ghar" },
        { text: "«\u00A0Le pouvoir est le pouvoir.\u00A0»", source: "Cersei Lannister" },
        { text: "«\u00A0Un esprit a besoin de livres comme une épée a besoin d’une pierre à aiguiser.\u00A0»", source: "Tyrion Lannister" }
    ];

    const quoteText = document.getElementById("quote-text");
    const quoteSource = document.getElementById("quote-source");
    const quoteIndex = document.getElementById("quote-index");
    const quotePrev = document.getElementById("quote-prev");
    const quoteNext = document.getElementById("quote-next");

    if (quoteText && quoteSource && quoteIndex && quotePrev && quoteNext) {
        let currentQuote = 0;

        const showQuote = (index) => {
            currentQuote = (index + quotes.length) % quotes.length;
            quoteText.textContent = quotes[currentQuote].text;
            quoteSource.textContent = quotes[currentQuote].source;
            quoteIndex.textContent = String(currentQuote + 1).padStart(2, "0");
        };

        quotePrev.addEventListener("click", () => showQuote(currentQuote - 1));
        quoteNext.addEventListener("click", () => showQuote(currentQuote + 1));
    }

    /* ---------------------------------------------------------------------
       Navigation — section active
       --------------------------------------------------------------------- */

    const navLinks = Array.from(document.querySelectorAll(".nav a[href^='#']"));
    const hero = document.getElementById("haut");

    const clearCurrent = () => {
        navLinks.forEach((link) => link.removeAttribute("aria-current"));
    };

    const setCurrent = (id) => {
        navLinks.forEach((link) => {
            if (link.hash === `#${id}`) {
                link.setAttribute("aria-current", "true");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    if ("IntersectionObserver" in window && navLinks.length) {
        const targets = navLinks
            .map((link) => document.querySelector(link.hash))
            .filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    if (entry.target === hero) {
                        clearCurrent();
                    } else {
                        setCurrent(entry.target.id);
                    }
                });
            },
            { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
        );

        if (hero) {
            observer.observe(hero);
        }

        targets.forEach((target) => observer.observe(target));
    }
})();
