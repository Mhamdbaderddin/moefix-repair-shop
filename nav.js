const menuButton = document.querySelector(".menu-button");
const siteNavigation = document.querySelector(".site-navigation");

if (menuButton && siteNavigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = siteNavigation.classList.toggle("is-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.textContent = isOpen ? "Close" : "Menu";
    });

    siteNavigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            siteNavigation.classList.remove("is-open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.textContent = "Menu";
        });
    });
}
