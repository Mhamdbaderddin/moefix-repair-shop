const menuButton = document.querySelector(".menu-button");
const siteNavigation = document.querySelector(".site-navigation");

if (menuButton && siteNavigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = siteNavigation.classList.toggle("is-open");
        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.textContent = isOpen ? "Close" : "Menu";
    });
}
