/* =========================================================
   GREENBUCKS MANAGEMENT INC. — Online Forms
   Accordion interaction
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const cards = Array.from(document.querySelectorAll(".form-card"));

    if (cards.length === 0) {
        console.warn("Greenbucks Online Forms: no .form-card elements were found.");
        return;
    }

    cards.forEach(function (card) {
        const header = card.querySelector(".card-header");
        const details = card.querySelector(".details");

        if (!header || !details) {
            console.warn("Greenbucks Online Forms: a card is missing its header or details section.", card);
            return;
        }

        // Give each details panel an ID and connect it to its button.
        if (!details.id) {
            details.id = "form-details-" + (cards.indexOf(card) + 1);
        }
        header.setAttribute("aria-controls", details.id);

        // Normalize initial state.
        const initiallyOpen = card.classList.contains("active");
        header.setAttribute("aria-expanded", initiallyOpen ? "true" : "false");

        header.addEventListener("click", function () {
            const shouldOpen = !card.classList.contains("active");

            // Close every card first so only one can remain open.
            cards.forEach(function (otherCard) {
                otherCard.classList.remove("active");

                const otherHeader = otherCard.querySelector(".card-header");
                if (otherHeader) {
                    otherHeader.setAttribute("aria-expanded", "false");
                }
            });

            // Reopen the selected card only if it was closed.
            if (shouldOpen) {
                card.classList.add("active");
                header.setAttribute("aria-expanded", "true");
            }
        });
    });
});
