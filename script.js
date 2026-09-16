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


        // ========================================
        // STOCK STATUS
        // ========================================

        const stockStatus = product.stock > 0
            ? "In Stock"
            : "Out of Stock";


        // ========================================
        // PRODUCT CONDITION
        // ========================================

        const condition =
            product.specifications?.Condition ||
            product.condition ||
            "Used";


        // ========================================
        // PRODUCT CARD HTML
        // ========================================

        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
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
                    $${product.price}
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


// ========================================
// INITIAL DISPLAY
// ========================================

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


    // ========================================
    // FILTER PRODUCTS
    // ========================================

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


    // ========================================
    // SORT PRODUCTS
    // ========================================

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


    // Display filtered products
    displayProducts(filteredProducts);

}


// ========================================
// EVENT LISTENERS
// ========================================

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


// ========================================
// CLEAR FILTERS
// ========================================

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


let currentSlide = 0;


// Show a specific slide

function showSlide(index) {

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    dots.forEach(dot => {
        dot.classList.remove("active");
    });


    slides[index].classList.add("active");

    dots[index].classList.add("active");


    currentSlide = index;
}


// Next slide

function nextSlide() {

    let nextIndex = currentSlide + 1;


    if (nextIndex >= slides.length) {
        nextIndex = 0;
    }


    showSlide(nextIndex);
}


// Previous slide

function previousSlide() {

    let previousIndex = currentSlide - 1;


    if (previousIndex < 0) {
        previousIndex = slides.length - 1;
    }


    showSlide(previousIndex);
}


// Buttons

nextButton.addEventListener("click", nextSlide);

prevButton.addEventListener("click", previousSlide);


// Dots

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showSlide(index);

    });

});


// Automatic slideshow

setInterval(nextSlide, 4000);

// Mobile navigation
const menuButton = document.querySelector(".menu-button");
const siteNavigation = document.querySelector(".site-navigation");

if (menuButton && siteNavigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = siteNavigation.classList.toggle("is-open");
        menuButton.setAttribute("aria-expanded", isOpen);
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

// The form is intentionally honest until a sending service is connected.
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", event => {
        event.preventDefault();
        document.getElementById("contact-status").textContent =
            "Message sending is not connected yet. Please add your phone or WhatsApp details first.";
    });
}
