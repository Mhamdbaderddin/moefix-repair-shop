const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

const product = products.find(item => item.id === productId);


const productDetails = document.getElementById("product-details");


if (!product) {

    productDetails.innerHTML = `
        <div class="product-info">

            <h1>Product Not Found</h1>

            <p>
                Sorry, the product you are looking for
                does not exist.
            </p>

            <a href="index.html#shop" class="button">
                Back to Shop
            </a>

        </div>
    `;

} else {

    let specificationsHTML = "";

    for (const key in product.specifications) {

        specificationsHTML += `
            <p>
                <strong>${key}:</strong>
                ${product.specifications[key]}
            </p>
        `;
    }

    productDetails.innerHTML = `
        <img src="${product.image}" alt="${product.name}">

        <div class="product-info">

            <h1>${product.name}</h1>

            <p>Brand: ${product.brand}</p>

            <p>${product.description}</p>

            <h2 class="product-detail-price">$${product.price}</h2>

            <p class="stock-status ${product.stock > 0 ? "in-stock" : "out-of-stock"}">
                ${product.stock > 0
            ? `In Stock (${product.stock} available)`
            : "Out of Stock"}
            </p>

            <h3>Specifications</h3>

            <div class="specifications">
                ${specificationsHTML}
            </div>

            ${product.stock > 0
            ? `<button class="button" id="add-to-cart" type="button">
            Add to Cart
            </button><p class="cart-message" id="cart-message" aria-live="polite"></p>`
            : '<button class="button" disabled>Out of Stock</button>'
        }

        </div>
    `;
}

const addToCartButton = document.getElementById("add-to-cart");

if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
        const beforeCount = cart.reduce((total, item) => total + item.quantity, 0);
        addToCart(product.id);
        const afterCount = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById("cart-message").textContent = afterCount > beforeCount
            ? "Added to your cart."
            : "You already have the maximum available quantity in your cart.";
    });
}
