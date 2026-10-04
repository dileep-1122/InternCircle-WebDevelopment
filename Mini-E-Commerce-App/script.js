const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        icon: "🎧"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 2499,
        icon: "⌚"
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 999,
        icon: "🔊"
    },
    {
        id: 4,
        name: "Gaming Mouse",
        price: 799,
        icon: "🖱️"
    },
    {
        id: 5,
        name: "Keyboard",
        price: 1299,
        icon: "⌨️"
    },
    {
        id: 6,
        name: "Power Bank",
        price: 1099,
        icon: "🔋"
    },
    {
        id: 7,
        name: "USB Cable",
        price: 399,
        icon: "🔌"
    },
    {
        id: 8,
        name: "Mobile Stand",
        price: 499,
        icon: "📱"
    }
];




let cart = [];



function displayProducts() {

    const productList = document.getElementById("productList");

    productList.innerHTML = "";

    products.forEach(function(product) {

        const productCard = document.createElement("div");

        productCard.className = "product";

        productCard.innerHTML = `
            <div class="image">${product.icon}</div>

            <h3>${product.name}</h3>

            <p class="price">₹${product.price}</p>

            <button class="add-button"
                onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;

        productList.appendChild(productCard);
    });
}



function addToCart(productId) {

    const product = products.find(function(item) {
        return item.id === productId;
    });

    const existingProduct = cart.find(function(item) {
        return item.id === productId;
    });

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    updateCart();

    alert(product.name + " added to cart!");
}




function updateCart() {

    const cartCount = document.getElementById("cartCount");

    let totalItems = 0;

    cart.forEach(function(item) {
        totalItems += item.quantity;
    });

    cartCount.innerText = totalItems;

    displayCart();
}




function displayCart() {

    const cartItems = document.getElementById("cartItems");

    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

        cartTotal.innerText = "0";

        return;
    }

    cart.forEach(function(item) {

        total += item.price * item.quantity;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <br>
                ₹${item.price}
            </div>

            <div class="quantity">

                <button onclick="decreaseQuantity(${item.id})">
                    -
                </button>

                ${item.quantity}

                <button onclick="increaseQuantity(${item.id})">
                    +
                </button>

            </div>

            <button class="remove"
                onclick="removeFromCart(${item.id})">
                Remove
            </button>
        `;

        cartItems.appendChild(cartItem);
    });

    cartTotal.innerText = total;
}


// Increase quantity

function increaseQuantity(id) {

    const item = cart.find(function(product) {
        return product.id === id;
    });

    item.quantity++;

    updateCart();
}




function decreaseQuantity(id) {

    const item = cart.find(function(product) {
        return product.id === id;
    });

    if (item.quantity > 1) {

        item.quantity--;

    } else {

        removeFromCart(id);
        return;
    }

    updateCart();
}




function removeFromCart(id) {

    cart = cart.filter(function(item) {
        return item.id !== id;
    });

    updateCart();
}




const cartModal = document.getElementById("cartModal");

document.getElementById("cartButton").onclick = function() {

    cartModal.style.display = "flex";

    displayCart();
};



document.getElementById("closeCart").onclick = function() {

    cartModal.style.display = "none";
};


const checkoutModal = document.getElementById("checkoutModal");

document.getElementById("checkoutButton").onclick = function() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    showCheckout();

    cartModal.style.display = "none";

    checkoutModal.style.display = "flex";
};




function showCheckout() {

    const checkoutDetails =
        document.getElementById("checkoutDetails");

    let total = 0;

    checkoutDetails.innerHTML = "";

    cart.forEach(function(item) {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        checkoutDetails.innerHTML += `
            <p>
                ${item.name} × ${item.quantity}
                = ₹${itemTotal}
            </p>
        `;
    });

    checkoutDetails.innerHTML += `
        <hr>
        <h3>Total Amount: ₹${total}</h3>
    `;
}




document.getElementById("closeCheckout").onclick = function() {

    checkoutModal.style.display = "none";
};


document.getElementById("placeOrder").onclick = function() {

    alert("🎉 Order placed successfully!");

    cart = [];

    updateCart();

    checkoutModal.style.display = "none";
};




window.onclick = function(event) {

    if (event.target === cartModal) {

        cartModal.style.display = "none";
    }

    if (event.target === checkoutModal) {

        checkoutModal.style.display = "none";
    }
};




displayProducts();
updateCart();
