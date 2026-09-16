let cart = [];

try {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    cart = Array.isArray(savedCart) ? savedCart : [];
} catch {
    cart = [];
}

function addToCart(productId) {

    const product = products.find(item => item.id === productId);

    if (!product) {
        return;
    }

    if (product.stock <= 0) {
        return;
    }

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {

        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
        }

    } else {

        cart.push({
            id: product.id,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
}

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalQuantity;


}

updateCartCount();
