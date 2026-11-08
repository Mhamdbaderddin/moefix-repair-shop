const productsContainer = document.getElementById("products-container");
const searchInput = document.getElementById("search-input");
const categorySelect = document.getElementById("category-select");
const sortSelect = document.getElementById("sort-select");
const clearFiltersButton = document.getElementById("clear-filters");


// ========================================
// DISPLAY PRODUCTS
// ========================================

function displayProducts(productsToDisplay) {

    productsContainer.innerHTML = "";

    // No products found
    if (productsToDisplay.length === 0) {

        productsContainer.innerHTML = `
            <div class="no-products">
                <h3>No Products Found</h3>
                <p>Try a different search or category.</p>
            </div>
        `;

        return;
    }


    // Create product cards
    productsToDisplay.forEach(product => {

        const card = document.createElement("div");

        card.classList.add("product-card");


        const stockStatus = product.stock > 0
            ? "In Stock"
            : "Out of Stock";


        const condition =
            product.specifications?.Condition ||
            product.condition ||
            "Used";


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.brand} ${product.name}"
                    loading="lazy"
                >

            </div>


            <div class="product-card-content">

                <p class="product-brand">
                    ${product.brand}
                </p>


                <h3>
                    ${product.name}
                </h3>


                <p class="product-description">
                    ${product.description}
                </p>


                <div class="product-meta">

                    <span class="condition-badge">
                        ${condition}
                    </span>


                    <span class="stock-status ${
                        product.stock > 0
                            ? "in-stock"
                            : "out-of-stock"
                    }">

                        ${stockStatus}

                    </span>

                </div>


                <p class="product-price">
                    ${MOFIXA.formatPrice(product.price)}
                </p>


                <a
                    href="product.html?id=${product.id}"
                    class="button"
                >
                    View Product
                </a>

            </div>

        `;


        productsContainer.appendChild(card);

    });

}


// ========================================
// CREATE CATEGORIES AUTOMATICALLY
// ========================================

const categories = [
    ...new Set(
        products.map(product => product.category)
    )
];


categories.forEach(category => {

    const option = document.createElement("option");

    option.value = category;

    option.textContent = category;

    categorySelect.appendChild(option);

});


displayProducts(products);


// ========================================
// FILTER + SORT
// ========================================

function filterProducts() {

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedCategory =
        categorySelect.value;


    const selectedSort =
        sortSelect.value;


    let filteredProducts = products.filter(product => {

        const matchesSearch =

            product.name
                .toLowerCase()
                .includes(searchTerm)

            ||

            product.brand
                .toLowerCase()
                .includes(searchTerm)

            ||

            product.category
                .toLowerCase()
                .includes(searchTerm);


        const matchesCategory =

            selectedCategory === "all"

            ||

            product.category === selectedCategory;


        return matchesSearch && matchesCategory;

    });


    if (selectedSort === "price-low") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );

    }

    else if (selectedSort === "price-high") {

        filteredProducts.sort(
            (a, b) => b.price - a.price
        );

    }

    else if (selectedSort === "name") {

        filteredProducts.sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );

    }


    displayProducts(filteredProducts);

}


searchInput.addEventListener(
    "input",
    filterProducts
);


categorySelect.addEventListener(
    "change",
    filterProducts
);


sortSelect.addEventListener(
    "change",
    filterProducts
);


clearFiltersButton.addEventListener(
    "click",
    function () {

        searchInput.value = "";

        categorySelect.value = "all";

        sortSelect.value = "default";

        displayProducts(products);

    }
);


// ========================================
// HERO IMAGE SLIDER
// ========================================

const slides = document.querySelectorAll(".hero-slide");
const prevButton = document.querySelector(".slider-prev");
const nextButton = document.querySelector(".slider-next");
const dots = document.querySelectorAll(".slider-dot");
const hero = document.querySelector(".hero");

let currentSlide = 0;
let autoplayId = null;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    dots.forEach(dot => {
        dot.classList.remove("active");
        dot.setAttribute("aria-selected", "false");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");
    dots[index].setAttribute("aria-selected", "true");

    currentSlide = index;
}

function nextSlide() {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= slides.length) {
        nextIndex = 0;
    }
    showSlide(nextIndex);
}

function previousSlide() {
    let previousIndex = currentSlide - 1;
    if (previousIndex < 0) {
        previousIndex = slides.length - 1;
    }
    showSlide(previousIndex);
}

function startAutoplay() {
    if (prefersReducedMotion || autoplayId) return;
    autoplayId = setInterval(nextSlide, 5000);
}

function stopAutoplay() {
    if (!autoplayId) return;
    clearInterval(autoplayId);
    autoplayId = null;
}

nextButton.addEventListener("click", () => {
    nextSlide();
    stopAutoplay();
    startAutoplay();
});

prevButton.addEventListener("click", () => {
    previousSlide();
    stopAutoplay();
    startAutoplay();
});

dots.forEach((dot, index) => {
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-selected", String(index === 0));
    dot.addEventListener("click", () => {
        showSlide(index);
        stopAutoplay();
        startAutoplay();
    });
});

if (hero) {
    hero.addEventListener("mouseenter", stopAutoplay);
    hero.addEventListener("mouseleave", startAutoplay);
    hero.addEventListener("focusin", stopAutoplay);
    hero.addEventListener("focusout", event => {
        if (!hero.contains(event.relatedTarget)) {
            startAutoplay();
        }
    });
    hero.addEventListener("keydown", event => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            nextSlide();
        }
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            previousSlide();
        }
    });
}

startAutoplay();


// ========================================
// CONTACT LINKS + FORM → WhatsApp
// ========================================

function applyContactLinks() {
    const defaultMessage = "Hi MOFIXA, I need help with a computer.";
    const repairMessage = "Hi MOFIXA, I'd like to book a repair / diagnostic.";
    const whatsappLink = document.getElementById("whatsapp-link");
    const emailLink = document.getElementById("email-link");
    const phoneDisplayLink = document.getElementById("phone-display-link");
    const emailDisplayLink = document.getElementById("email-display-link");
    const locationDisplay = document.getElementById("location-display");
    const footerWhatsapp = document.getElementById("footer-whatsapp");
    const footerEmail = document.getElementById("footer-email");
    const repairFab = document.getElementById("repair-fab");
    const servicesRepairCta = document.getElementById("services-repair-cta");

    if (whatsappLink) {
        whatsappLink.href = MOFIXA.whatsappUrl(defaultMessage);
    }

    if (emailLink) {
        emailLink.href = MOFIXA.mailtoUrl();
    }

    if (phoneDisplayLink) {
        phoneDisplayLink.href = MOFIXA.whatsappUrl();
        phoneDisplayLink.textContent = MOFIXA.phoneDisplay;
    }

    if (emailDisplayLink) {
        emailDisplayLink.href = MOFIXA.mailtoUrl();
        emailDisplayLink.textContent = MOFIXA.email;
    }

    if (locationDisplay) {
        locationDisplay.textContent = MOFIXA.location;
    }

    if (footerWhatsapp) {
        footerWhatsapp.href = MOFIXA.whatsappUrl(defaultMessage);
    }

    if (footerEmail) {
        footerEmail.href = MOFIXA.mailtoUrl();
    }

    if (repairFab) {
        repairFab.href = MOFIXA.whatsappUrl(repairMessage);
    }

    if (servicesRepairCta) {
        servicesRepairCta.href = MOFIXA.whatsappUrl(repairMessage);
    }
}

applyContactLinks();

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", event => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        const composed = [
            `Hi MOFIXA, my name is ${name}.`,
            email ? `Email: ${email}` : null,
            "",
            message
        ].filter(line => line !== null).join("\n");

        const status = document.getElementById("contact-status");
        status.textContent = "Opening WhatsApp with your message…";

        window.open(MOFIXA.whatsappUrl(composed), "_blank", "noopener,noreferrer");
    });
}
