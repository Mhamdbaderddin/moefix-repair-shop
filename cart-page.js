const cartContainer = document.getElementById("cart-container");


function displayCart() {

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">

                <h2>Your cart is empty</h2>

                <p>You haven't added any products yet.</p>

                <a href="index.html#shop" class="button">
                    Continue Shopping
                </a>

            </div>
        `;

        return;
    }


    let total = 0;


    cart.forEach(cartItem => {

        const product = products.find(
            item => item.id === cartItem.id
        );


        if (!product) {
            return;
        }


        const itemTotal = product.price * cartItem.quantity;

        total += itemTotal;


        const cartItemElement = document.createElement("div");

        cartItemElement.classList.add("cart-item");


        cartItemElement.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="cart-item-info">

                <h3>${product.name}</h3>

                <p>Brand: ${product.brand}</p>

                <p>$${product.price} each</p>


                <div class="quantity-controls">

                    <button type="button" data-action="decrease" data-product-id="${product.id}" aria-label="Decrease quantity">
                        −
                    </button>

                    <span>${cartItem.quantity}</span>

                    <button type="button" data-action="increase" data-product-id="${product.id}" aria-label="Increase quantity" ${cartItem.quantity >= product.stock ? "disabled" : ""}>
                        +
                    </button>

                </div>


                <button
                    class="remove-button"
                    data-action="remove" data-product-id="${product.id}">

                    Remove

                </button>

            </div>


            <div class="cart-item-total">

                <strong>$${itemTotal}</strong>

            </div>

        `;


        cartContainer.appendChild(cartItemElement);

    });


    const totalElement = document.createElement("div");

    totalElement.classList.add("cart-total");


    totalElement.innerHTML = `

        <h2>Total: $${total}</h2>

        <p>Checkout is not connected yet.</p>
        <a href="index.html#contact" class="button">Contact MOFIXA to order</a>

    `;


    cartContainer.appendChild(totalElement);

}


function changeQuantity(productId, change) {

    const cartItem = cart.find(
        item => item.id === productId
    );

    const product = products.find(
        item => item.id === productId
    );

    if (!cartItem || !product) {
        return;
    }

    cartItem.quantity += change;

    if (cartItem.quantity <= 0) {

        cart = cart.filter(
            item => item.id !== productId
        );

    }

    if (cartItem.quantity > product.stock) {

        cartItem.quantity = product.stock;

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    displayCart();
}   


function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    displayCart();
}


displayCart();

cartContainer.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const productId = Number(button.dataset.productId);
    if (button.dataset.action === "increase") changeQuantity(productId, 1);
    if (button.dataset.action === "decrease") changeQuantity(productId, -1);
    if (button.dataset.action === "remove") removeFromCart(productId);
});
