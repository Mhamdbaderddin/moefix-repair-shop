const menuButton = document.querySelector(".menu-button");
const siteNavigation = document.querySelector(".site-navigation");

function closeMobileMenu() {
    if (!menuButton || !siteNavigation) return;
    siteNavigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "Menu";
}

if (menuButton && siteNavigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = siteNavigation.classList.toggle("is-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.textContent = isOpen ? "Close" : "Menu";
    });

    // Event delegation so Login/Register still work after auth.js updates the nav
    siteNavigation.addEventListener("click", event => {
        const link = event.target.closest("a");
        if (!link || !siteNavigation.contains(link)) return;
        closeMobileMenu();
        // Do not preventDefault — let the browser navigate normally
    });
}
