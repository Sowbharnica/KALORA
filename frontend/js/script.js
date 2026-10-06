// KALORA
// Main JavaScript file

console.log("Welcome to KALORA");
// =========================================
// KALORA SEARCH + FILTER + SORT
// =========================================

const productSearch =
    document.getElementById("productSearch");

const categoryFilter =
    document.getElementById("categoryFilter");

const sortProducts =
    document.getElementById("sortProducts");

const productGrid =
    document.getElementById("productGrid");

const productCount =
    document.getElementById("productCount");


function updateProducts() {

    if (!productGrid) return;

    let products =
        Array.from(
            productGrid.querySelectorAll(".product-card")
        );

    const searchText =
        productSearch
            ? productSearch.value.toLowerCase().trim()
            : "";

    const category =
        categoryFilter
            ? categoryFilter.value
            : "all";

    const sort =
        sortProducts
            ? sortProducts.value
            : "default";


    // =========================================
    // SEARCH + CATEGORY FILTER
    // =========================================

    products.forEach(product => {

        const productName =
            product
                .querySelector(".product-name")
                ?.textContent
                .toLowerCase()
                .trim() || "";

        const productCategory =
            product.dataset.category
                ?.toLowerCase() || "";


        const matchesSearch =
    productName.includes(searchText) ||
    productCategory.includes(searchText);

        const matchesCategory =
            category === "all" ||
            productCategory === category;


        if (
            matchesSearch &&
            matchesCategory
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });


    // =========================================
    // SORT
    // =========================================

    if (sort === "low") {

        products.sort((a, b) =>
            Number(a.dataset.price) -
            Number(b.dataset.price)
        );

    }


    else if (sort === "high") {

        products.sort((a, b) =>
            Number(b.dataset.price) -
            Number(a.dataset.price)
        );

    }


    else if (sort === "name") {

        products.sort((a, b) => {

            const nameA =
                a.querySelector(".product-name")
                    ?.textContent
                    .toLowerCase() || "";

            const nameB =
                b.querySelector(".product-name")
                    ?.textContent
                    .toLowerCase() || "";

            return nameA.localeCompare(nameB);

        });

    }


    // =========================================
    // RE-ADD PRODUCTS IN SORTED ORDER
    // =========================================

    products.forEach(product => {

        productGrid.appendChild(product);

    });


    // =========================================
    // PRODUCT COUNT
    // =========================================

    const visibleProducts =
    products.filter(
        product =>
            product.style.display !== "none"
    );


if (productCount) {

    productCount.textContent =
        `${visibleProducts.length} Products`;

}


// NO SEARCH RESULTS

let noResults =
    document.getElementById("noSearchResults");


if (visibleProducts.length === 0) {

    if (!noResults) {

        noResults =
            document.createElement("div");

        noResults.id =
            "noSearchResults";

        noResults.className =
            "no-search-results";

        productGrid.appendChild(noResults);

    }


    noResults.innerHTML = `

        <span>⌕</span>

        <h3>Nothing Found</h3>

        <p>
            We couldn't find anything
            matching your search.
        </p>

        <button
            type="button"
            onclick="clearProductSearch()">
            VIEW ALL PRODUCTS
        </button>

    `;

} else {

    if (noResults) {
        noResults.remove();
    }

}
}
function clearProductSearch() {

    if (productSearch) {
        productSearch.value = "";
    }

    if (categoryFilter) {
        categoryFilter.value = "all";
    }

    if (sortProducts) {
        sortProducts.value = "default";
    }

    updateProducts();

}


// =========================================
// SEARCH EVENT
// =========================================

if (productSearch) {

    productSearch.addEventListener(
        "input",
        updateProducts
    );

}


// =========================================
// CATEGORY FILTER EVENT
// =========================================

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        updateProducts
    );

}


// =========================================
// SORT EVENT
// =========================================

if (sortProducts) {

    sortProducts.addEventListener(
        "change",
        updateProducts
    );

}
// =========================================
// PRODUCT QUANTITY
// =========================================

const minusBtn = document.getElementById("minusBtn");
const plusBtn = document.getElementById("plusBtn");
const quantityElement = document.getElementById("quantity");

let quantity = 1;

if (plusBtn) {

    plusBtn.addEventListener("click", function () {

        quantity++;

        quantityElement.textContent = quantity;

    });

}


if (minusBtn) {

    minusBtn.addEventListener("click", function () {

        if (quantity > 1) {

            quantity--;

            quantityElement.textContent = quantity;

        }

    });

}
// =========================================
// COLOUR SELECTION
// =========================================

const colourButtons =
    document.querySelectorAll(".colour-btn");

const selectedColour =
    document.getElementById("selectedColour");


colourButtons.forEach(button => {

    button.addEventListener("click", function () {

        colourButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        this.classList.add("selected");

        selectedColour.textContent =
            this.dataset.colour;

    });

});
// =========================================
// KALORA CART SYSTEM
// =========================================


// GET CART

let cart =
    JSON.parse(localStorage.getItem("kaloraCart")) || [];


// SAVE CART

function saveCart() {

    localStorage.setItem(
        "kaloraCart",
        JSON.stringify(cart)
    );

}


// UPDATE CART COUNT

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) return;

    const totalItems = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

    cartCount.textContent =
        `(${totalItems})`;

}
updateCartCount();

// ADD PRODUCT TO CART

function addToCart(product) {

    const existingProduct =
        cart.find(item =>
            item.name === product.name &&
            item.size === product.size &&
            item.colour === product.colour
        );


    if (existingProduct) {

        existingProduct.quantity +=
            product.quantity;

    } else {

        cart.push(product);

    }


    saveCart();

    updateCartCount();

    showKaloraToast("Added to your KALORA bag ✨");
}
// =========================================
// KALORA TOAST
// =========================================

function showKaloraToast(message) {

    let toast =
        document.getElementById("kaloraToast");

    if (!toast) {

        toast =
            document.createElement("div");

        toast.id = "kaloraToast";

        toast.className = "kalora-toast";

        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


// DISPLAY CART

function displayCart() {

    const cartContainer =
        document.getElementById("cartItems");

    const emptyCart =
        document.getElementById("emptyCart");

    const cartPage =
        document.querySelector(".cart-page");


    if (!cartContainer) return;


    if (cart.length === 0) {

        cartPage.style.display = "none";

        emptyCart.style.display = "flex";

        return;

    }


    cartPage.style.display = "grid";

    emptyCart.style.display = "none";


    cartContainer.innerHTML = "";


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${item.image}"
                    alt="${item.name}">

            </div>


            <div class="cart-item-info">

                <span class="cart-item-category">
                    ${item.category}
                </span>

                <h3>
                    ${item.name}
                </h3>

                <p>
                    Colour: ${item.colour}
                </p>

                <p>
                    Size: ${item.size}
                </p>


                <div class="cart-quantity">

                    <button
                        onclick="changeCartQuantity(${index}, -1)">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeCartQuantity(${index}, 1)">
                        +
                    </button>

                </div>


                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})">

                    REMOVE

                </button>

            </div>


            <div class="cart-item-price">

                ₹${itemTotal.toLocaleString("en-IN")}

            </div>

        `;


        cartContainer.appendChild(cartItem);

    });


    updateCartTotal();

}


// =========================================
// CHANGE CART QUANTITY
// =========================================

function changeCartQuantity(index, change) {

    if (!cart[index]) return;


    const newQuantity =
        cart[index].quantity + change;


    // Quantity cannot go below 1
    if (newQuantity < 1) {
        cart[index].quantity = 1;
    } else {
        cart[index].quantity = newQuantity;
    }


    saveCart();

    displayCart();

    updateCartCount();

}

// REMOVE PRODUCT

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

    updateCartCount();

}


// TOTAL

function updateCartTotal() {

    const subtotal =
        cart.reduce(
            (total, item) =>
                total +
                item.price * item.quantity,
            0
        );


    const subtotalElement =
        document.getElementById("cartSubtotal");

    const totalElement =
        document.getElementById("cartTotal");


    if (subtotalElement) {

        subtotalElement.textContent =
            `₹${subtotal.toLocaleString("en-IN")}`;

    }


    if (totalElement) {

        totalElement.textContent =
            `₹${subtotal.toLocaleString("en-IN")}`;

    }

}


// CHECKOUT

function goToCheckout() {

    if (cart.length === 0) {

        alert(
            "Your KALORA bag is empty."
        );

        return;

    }


    window.location.href =
        "checkout.html";

}


// INITIALIZE

updateCartCount();

displayCart();
// =========================================
// SIZE SELECTION
// =========================================

const sizeButtons =
    document.querySelectorAll(".size-btn");

let selectedSize = "M";


sizeButtons.forEach(button => {

    button.addEventListener("click", function () {

        sizeButtons.forEach(btn => {

            btn.style.background = "white";
            btn.style.color = "black";

        });


        this.style.background =
            "#5a1020";

        this.style.color =
            "white";


        selectedSize =
            this.textContent;

    });

});
// =========================================
// ADD TO BAG BUTTON
// =========================================

const addToCartBtn =
    document.getElementById("addToCartBtn");

if (addToCartBtn) {

    addToCartBtn.addEventListener(
        "click",
        function () {

            if (!selectedSize) {

                alert("Please select a size first.");

                return;
            }


            const urlParams =
                new URLSearchParams(window.location.search);

            const productKey =
                urlParams.get("product");

            const currentProduct =
                typeof productData !== "undefined"
                    ? productData[productKey]
                    : null;


            if (!currentProduct) {

                alert("Product could not be found.");

                return;
            }


            const product = {

                name:
                    currentProduct.name,

                price:
                    currentProduct.price,

                image:
                    currentProduct.image,

                category:
                    currentProduct.category,

                size:
                    selectedSize,

                colour:
                    selectedColour
                        ? selectedColour.textContent.trim()
                        : currentProduct.colour,

                quantity:
                    quantity

            };


            addToCart(product);


            setTimeout(() => {

                window.location.href =
                    "cart.html";

            }, 500);

        }
    );

}
// =========================================
// BUY NOW BUTTON
// =========================================

const buyNowBtn =
    document.getElementById("buyNowBtn");

if (buyNowBtn) {

    buyNowBtn.addEventListener(
        "click",
        function () {

            if (!selectedSize) {

                alert("Please select a size first.");

                return;
            }

            const urlParams =
                new URLSearchParams(
                    window.location.search
                );

            const productKey =
                urlParams.get("product");

            const currentProduct =
                typeof productData !== "undefined"
                    ? productData[productKey]
                    : null;

            if (!currentProduct) {

                alert("Product could not be found.");

                return;
            }

            const product = {

                name:
                    currentProduct.name,

                price:
                    currentProduct.price,

                image:
                    currentProduct.image,

                category:
                    currentProduct.category,

                size:
                    selectedSize,

                colour:
                    selectedColour
                        ? selectedColour.textContent.trim()
                        : currentProduct.colour,

                quantity:
                    quantity
            };

            addToCart(product);

            window.location.href =
                "checkout.html";

        }
    );

}
// =========================================
// KALORA REGISTER
// =========================================

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "registerName"
                ).value.trim();


            const email =
                document.getElementById(
                    "registerEmail"
                ).value.trim();


            const password =
                document.getElementById(
                    "registerPassword"
                ).value;


            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;


            const message =
                document.getElementById(
                    "registerMessage"
                );


            if (password !== confirmPassword) {

                message.textContent =
                    "Passwords do not match.";

                return;

            }


            if (password.length < 6) {

                message.textContent =
                    "Password must contain at least 6 characters.";

                return;

            }


            const user = {

                name: name,

                email: email,

                password: password

            };


            localStorage.setItem(
                "kaloraUser",
                JSON.stringify(user)
            );


            message.textContent =
                "Account created successfully ✨";


            setTimeout(() => {

                window.location.href =
                    "login.html";

            }, 1000);

        }
    );

}
// =========================================
// KALORA LOGIN
// =========================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                ).value.trim();


            const password =
                document.getElementById(
                    "loginPassword"
                ).value;


            const message =
                document.getElementById(
                    "loginMessage"
                );


            const savedUser =
                JSON.parse(
                    localStorage.getItem(
                        "kaloraUser"
                    )
                );


            if (!savedUser) {

                message.textContent =
                    "No account found. Please create an account.";

                return;

            }


            if (
                email !== savedUser.email ||
                password !== savedUser.password
            ) {

                message.textContent =
                    "Incorrect email or password.";

                return;

            }


            localStorage.setItem(
                "kaloraLoggedIn",
                "true"
            );


            message.textContent =
                "Login successful ✨";


            setTimeout(() => {

                window.location.href =
                    "account.html";

            }, 700);

        }
    );

}
// // =========================================
// KALORA ACCOUNT
// =========================================

const accountName =
    document.getElementById("accountName");

const accountEmail =
    document.getElementById("accountEmail");

if (window.location.pathname.includes("account.html")) {

    const loggedIn =
        localStorage.getItem("kaloraLoggedIn");

    const user =
        JSON.parse(
            localStorage.getItem("kaloraUser")
        );

    if (loggedIn !== "true" || !user) {

        window.location.href =
            "login.html";

    } else {

        if (accountName) {
            accountName.textContent =
                user.name;
        }

        if (accountEmail) {
            accountEmail.textContent =
                user.email;
        }

    }
}
// =========================================
// ACCOUNT TABS
// =========================================

const accountTabs =
    document.querySelectorAll(".account-tab");

const accountSections =
    document.querySelectorAll(".account-section");


accountTabs.forEach(tab => {

    tab.addEventListener(
        "click",
        function() {

            accountTabs.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            accountSections.forEach(section => {

                section.classList.remove(
                    "active"
                );

            });


            this.classList.add("active");


            const sectionId =
                this.dataset.section;


            document
                .getElementById(sectionId)
                .classList.add("active");

        }
    );

});
// =========================================
// LOGOUT
// =========================================

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function() {

            localStorage.setItem(
    "kaloraLoggedIn",
    "false"
);


            window.location.href =
                "index.html";

        }
    );

}
// =========================================
// SOCIAL LOGIN BUTTONS
// =========================================

const googleLogin =
    document.querySelector(".google-login");

const appleLogin =
    document.querySelector(".apple-login");


if (googleLogin) {

    googleLogin.addEventListener("click", function() {

        alert(
            "Google Sign-In will be connected in the final version."
        );

    });

}


if (appleLogin) {

    appleLogin.addEventListener("click", function() {

        alert(
            "Apple Sign-In will be connected in the final version."
        );

    });

}
// =========================================
// STEP 7.4 — WISHLIST
// =========================================

const wishlistButtons =
    document.querySelectorAll(".wishlist-btn");


function getWishlist() {

    return JSON.parse(
        localStorage.getItem("kaloraWishlist")
    ) || [];

}


function saveWishlist(wishlist) {

    localStorage.setItem(
        "kaloraWishlist",
        JSON.stringify(wishlist)
    );

}


wishlistButtons.forEach(button => {

    button.addEventListener("click", function(event) {

        event.preventDefault();
        event.stopPropagation();


        const card =
            this.closest(".product-card");


        if (!card) {
            return;
        }


        const name =
            card.querySelector(".product-name")
                ?.textContent.trim();


        const price =
            card.querySelector(".product-price")
                ?.textContent.trim();


        const image =
            card.querySelector("img")
                ?.getAttribute("src");


        const category =
            card.dataset.category || "";


        if (!name) {
            return;
        }


        let wishlist =
            getWishlist();


        const existing =
            wishlist.find(
                item => item.name === name
            );


        if (existing) {

            wishlist =
                wishlist.filter(
                    item => item.name !== name
                );

            this.classList.remove("active");

            this.textContent = "♡";

        } else {

            wishlist.push({

                name: name,

                price: price,

                image: image,

                category: category

            });

            this.classList.add("active");

            this.textContent = "♥";

        }


        saveWishlist(wishlist);

    });

});
// =========================================
// STEP 7.5 — DISPLAY WISHLIST
// =========================================

const wishlistContainer =
    document.getElementById("wishlistContainer");


function displayWishlist() {

    if (!wishlistContainer) {
        return;
    }


    const wishlist =
        JSON.parse(
            localStorage.getItem("kaloraWishlist")
        ) || [];


    if (wishlist.length === 0) {

        wishlistContainer.innerHTML = `

            <div class="wishlist-empty">

                <span>♡</span>

                <p>
                    Your wishlist is waiting
                    for something beautiful.
                </p>

                <a href="shop.html">
                    EXPLORE COLLECTION
                </a>

            </div>

        `;

        return;
    }


    wishlistContainer.innerHTML = "";


    wishlist.forEach((item, index) => {

        const wishlistItem =
            document.createElement("div");

        wishlistItem.className =
            "wishlist-item";


        wishlistItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="wishlist-item-info">

                <div class="wishlist-item-name">
                    ${item.name}
                </div>

                <div class="wishlist-item-price">
                    ${item.price}
                </div>
                <button
                 class="wishlist-add-cart"
                 data-index="${index}"
                 >
                 ADD TO BAG
               </button>

                <button
                    class="remove-wishlist"
                    data-index="${index}"
                >
                    REMOVE FROM WISHLIST
                </button>

            </div>

        `;


        wishlistContainer.appendChild(
            wishlistItem
        );

    });
    const addCartButtons =
    document.querySelectorAll(".wishlist-add-cart");

addCartButtons.forEach(button => {

    button.addEventListener("click", function () {

        const index =
            Number(this.dataset.index);

        const wishlist =
            JSON.parse(
                localStorage.getItem("kaloraWishlist")
            ) || [];

        const product = wishlist[index];

        if (!product) {
            return;
        }

        let cart =
            JSON.parse(
                localStorage.getItem("kaloraCart")
            ) || [];

        const existing =
            cart.find(
                item => item.name === product.name
            );

        if (existing) {

            existing.quantity += 1;

        } else {

            cart.push({
                name: product.name,
                price: Number(
                    product.price
                        .replace(/[₹,]/g, "")
                ),
                image: product.image,
                category: product.category,
                size: "M",
                colour: "Burgundy",
                quantity: 1
            });
        }

        localStorage.setItem(
            "kaloraCart",
            JSON.stringify(cart)
        );

        window.location.href = "cart.html";
    });
});


    const removeButtons =
        document.querySelectorAll(
            ".remove-wishlist"
        );


    removeButtons.forEach(button => {

        button.addEventListener(
            "click",
            function() {

                const index =
                    Number(
                        this.dataset.index
                    );


                const wishlist =
                    JSON.parse(
                        localStorage.getItem(
                            "kaloraWishlist"
                        )
                    ) || [];


                wishlist.splice(index, 1);


                localStorage.setItem(
                    "kaloraWishlist",
                    JSON.stringify(wishlist)
                );


                displayWishlist();

            }
        );

    });

}


displayWishlist();
// =========================================
// STEP 7.6 — PRODUCT PAGE WISHLIST
// =========================================

const productWishlistBtn =
    document.getElementById("productWishlistBtn");


if (productWishlistBtn) {

    productWishlistBtn.addEventListener(
        "click",
        function () {

            let wishlist =
                JSON.parse(
                    localStorage.getItem("kaloraWishlist")
                ) || [];


            const product = {
                name: "Burgundy Grace Maxi",
                price: "₹2,499",
                image: "images/maxi.jpg",
                category: "maxi"
            };


            const existing =
                wishlist.find(
                    item => item.name === product.name
                );


            if (existing) {

                wishlist =
                    wishlist.filter(
                        item => item.name !== product.name
                    );

                productWishlistBtn.textContent =
                    "♡ Add to Wishlist";

                productWishlistBtn.classList.remove(
                    "active"
                );

            } else {

                wishlist.push(product);

                productWishlistBtn.textContent =
                    "♥ Added to Wishlist";

                productWishlistBtn.classList.add(
                    "active"
                );
            }


            localStorage.setItem(
                "kaloraWishlist",
                JSON.stringify(wishlist)
            );
        }
    );
}
// =========================================
// STEP 8.1 — SAVED ADDRESSES
// =========================================

const addressContainer =
    document.getElementById("addressContainer");

const addAddressBtn =
    document.getElementById("addAddressBtn");


function getAddresses() {

    return JSON.parse(
        localStorage.getItem("kaloraAddresses")
    ) || [];
}


function saveAddresses(addresses) {

    localStorage.setItem(
        "kaloraAddresses",
        JSON.stringify(addresses)
    );
}


function displayAddresses() {

    if (!addressContainer) {
        return;
    }

    const addresses =
        getAddresses();

    if (addresses.length === 0) {

        addressContainer.innerHTML = `
            <div class="empty-account">

                <span>⌂</span>

                <p>
                    You haven't saved any
                    delivery addresses yet.
                </p>

            </div>
        `;

        return;
    }

    addressContainer.innerHTML = "";

    addresses.forEach((address, index) => {

        const card =
            document.createElement("div");

        card.className = "address-card";

        card.innerHTML = `

            <h3>
                ${address.name}
            </h3>

            <p>
                ${address.address}<br>
                ${address.city},
                ${address.state}
                - ${address.pincode}<br>
                Phone: ${address.phone}
            </p>

            <div class="address-actions">

                <button
                    class="delete-address"
                    data-index="${index}"
                >
                    REMOVE
                </button>

            </div>
        `;

        addressContainer.appendChild(card);
    });


    document
        .querySelectorAll(".delete-address")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            this.dataset.index
                        );

                    const addresses =
                        getAddresses();

                    addresses.splice(index, 1);

                    saveAddresses(addresses);

                    displayAddresses();
                }
            );
        });
}


if (addAddressBtn) {

    addAddressBtn.addEventListener(
        "click",
        function () {

            const name =
                prompt("Enter name:");

            if (!name) return;


            const address =
                prompt("Enter full address:");

            if (!address) return;


            const city =
                prompt("Enter city:");

            if (!city) return;


            const state =
                prompt("Enter state:");

            if (!state) return;


            const pincode =
                prompt("Enter pincode:");

            if (!pincode) return;


            const phone =
                prompt("Enter phone number:");

            if (!phone) return;


            const addresses =
                getAddresses();


            addresses.push({

                name: name,

                address: address,

                city: city,

                state: state,

                pincode: pincode,

                phone: phone

            });


            saveAddresses(addresses);

            displayAddresses();
        }
    );
}


displayAddresses();
// =========================================
// STEP 8.2 — MY ORDERS
// =========================================

const ordersContainer =
    document.getElementById("ordersContainer");


function displayOrders() {

    if (!ordersContainer) {
        return;
    }

    const orders =
        JSON.parse(
            localStorage.getItem("kaloraOrders")
        ) || [];


    if (orders.length === 0) {

        ordersContainer.innerHTML = `

            <div class="empty-account">

                <span>◌</span>

                <p>
                    You haven't placed any orders yet.
                </p>

                <a href="shop.html">
                    START SHOPPING
                </a>

            </div>

        `;

        return;
    }


    ordersContainer.innerHTML = "";


    orders.forEach(order => {

        const card =
            document.createElement("div");

        card.className = "order-card";


        card.innerHTML = `

            <div class="order-header">

                <div class="order-number">
                    ORDER #${order.orderNumber}
                </div>

                <div class="order-status">
                    ${order.status}
                </div>

            </div>


           <div class="order-products">

    ${order.items.map(item => `

        <div class="order-product">

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="order-product-info">

                <div class="order-product-name">
                    ${item.name}
                </div>

                <div class="order-product-details">

                    Size: ${item.size}<br>

                    Colour: ${item.colour}<br>

                    Quantity: ${item.quantity}<br>

                    Price: ₹${(
                        item.price * item.quantity
                    ).toLocaleString("en-IN")}

                </div>

            </div>

        </div>

    `).join("")}

</div>
            <div class="order-footer">

                <div class="order-total">
                    Total: ₹${order.total}
                </div>

                <button
                  class="view-order-btn"
                 type="button"
                  onclick="viewOrderDetails(${orders.indexOf(order)})"
                  >
                 VIEW ORDER
              </button>
            </div>

        `;


        ordersContainer.appendChild(card);

    });
}


displayOrders();
// =========================================
// VIEW ORDER DETAILS + ORDER TRACKING
// =========================================

function viewOrderDetails(index) {

    const orders =
        JSON.parse(
            localStorage.getItem("kaloraOrders")
        ) || [];

    const order = orders[index];

    if (!order) return;

    const statuses = [
        "Confirmed",
        "Packed",
        "Shipped",
        "Out for Delivery",
        "Delivered"
    ];

    const currentStatus =
        order.status || "Confirmed";

    const currentIndex =
        statuses.indexOf(currentStatus);

    const itemsHTML =
        order.items.map(item => `
            <div class="tracking-product">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div>
                    <strong>${item.name}</strong>

                    <p>
                        Size: ${item.size}<br>
                        Colour: ${item.colour}<br>
                        Quantity: ${item.quantity}
                    </p>
                </div>

            </div>
        `).join("");


    const overlay =
        document.createElement("div");

    overlay.className =
        "order-tracking-overlay";


    overlay.innerHTML = `

        <div class="order-tracking-modal">

            <button
                class="tracking-close"
                type="button">
                ×
            </button>


            <span class="account-label">
                KALORA
            </span>

            <h2>Order Tracking</h2>


            <div class="tracking-order-number">
                ORDER #${order.orderNumber}
            </div>


            <div class="tracking-timeline">

                ${statuses.map((status, index) => {

                    let statusClass = "";

                    if (index < currentIndex) {
                        statusClass = "completed";
                    }

                    if (index === currentIndex) {
                        statusClass = "current";
                    }

                    return `

                        <div class="
                            tracking-step
                            ${statusClass}
                        ">

                            <div class="tracking-dot">

                                ${
                                    index <= currentIndex
                                        ? "✓"
                                        : ""
                                }

                            </div>

                            <div class="tracking-step-info">

                                <strong>
                                    ${status}
                                </strong>

                                ${
                                    index === currentIndex
                                        ? `
                                            <span>
                                                Current Status
                                            </span>
                                          `
                                        : ""
                                }

                            </div>

                        </div>

                    `;

                }).join("")}

            </div>


            <div class="tracking-products">

                <h3>Order Items</h3>

                ${itemsHTML}

            </div>


            <div class="tracking-total">

                <span>Order Total</span>

                <strong>
                    ₹${Number(order.total)
                        .toLocaleString("en-IN")}
                </strong>

            </div>

        </div>

    `;


    document.body.appendChild(overlay);


    const closeButton =
        overlay.querySelector(".tracking-close");


    closeButton.addEventListener(
        "click",
        function () {

            overlay.remove();

        }
    );


    overlay.addEventListener(
        "click",
        function(event) {

            if (
                event.target === overlay
            ) {

                overlay.remove();

            }

        }
    );

}
// =========================================
// STEP 8.4 — PROFILE EDIT
// =========================================

const profileName =
    document.getElementById("profileName");

const profileEmail =
    document.getElementById("profileEmail");

const profilePhone =
    document.getElementById("profilePhone");

const saveProfileBtn =
    document.getElementById("saveProfileBtn");

const profileMessage =
    document.getElementById("profileMessage");


function loadProfile() {

    if (!profileName || !profileEmail) {
        return;
    }

    const user =
        JSON.parse(
            localStorage.getItem("kaloraUser")
        );

    if (!user) {
        return;
    }

    profileName.value =
        user.name || "";

    profileEmail.value =
        user.email || "";

    profilePhone.value =
        user.phone || "";
}


if (saveProfileBtn) {

    saveProfileBtn.addEventListener(
        "click",
        function () {

            const user =
                JSON.parse(
                    localStorage.getItem("kaloraUser")
                );

            if (!user) {
                return;
            }


            user.name =
                profileName.value.trim();

            user.phone =
                profilePhone.value.trim();


            localStorage.setItem(
                "kaloraUser",
                JSON.stringify(user)
            );


            profileMessage.textContent =
                "Your profile has been updated successfully.";

        }
    );
}


loadProfile();
// =========================================
// STEP 9.1 — CHECKOUT CART DISPLAY
// =========================================

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutTotal =
    document.getElementById("checkoutTotal");


function displayCheckoutCart() {

    if (!checkoutItems) {
        return;
    }

    const cart =
        JSON.parse(
            localStorage.getItem("kaloraCart")
        ) || [];


    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <div class="empty-account">

                <p>
                    Your bag is empty.
                </p>

                <a href="shop.html">
                    CONTINUE SHOPPING
                </a>

            </div>
        `;

        if (checkoutTotal) {
            checkoutTotal.textContent = "₹0";
        }

        return;
    }


    checkoutItems.innerHTML = "";

    let total = 0;


    cart.forEach(item => {

        const itemPrice =
            Number(item.price) || 0;

        const quantity =
            Number(item.quantity) || 1;

        total += itemPrice * quantity;


        const itemElement =
            document.createElement("div");

        itemElement.className =
            "checkout-item";


        itemElement.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="checkout-item-info">

                <div class="checkout-item-name">
                    ${item.name}
                </div>

                <div class="checkout-item-details">

                    Size: ${item.size || "M"}<br>

                    Colour: ${item.colour || "Burgundy"}<br>

                    Quantity: ${quantity}

                </div>

            </div>

            <div class="checkout-item-price">
                ₹${(
                    itemPrice * quantity
                ).toLocaleString("en-IN")}
            </div>

        `;


        checkoutItems.appendChild(
            itemElement
        );

    });


    checkoutTotal.textContent =
        "₹" + total.toLocaleString("en-IN");
}


displayCheckoutCart();
// =========================================
// STEP 9.1 — GO TO CHECKOUT
// =========================================

const checkoutBtn =
    document.getElementById("checkoutBtn");


if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        function () {

            const cart =
                JSON.parse(
                    localStorage.getItem("kaloraCart")
                ) || [];


            if (cart.length === 0) {

                alert(
                    "Your bag is empty."
                );

                return;
            }


            window.location.href =
                "checkout.html";
        }
    );
}
// =========================================
// STEP 9.2 — LOAD SAVED ADDRESS
// =========================================

const savedAddressSelect =
    document.getElementById(
        "savedAddressSelect"
    );


function loadSavedAddresses() {

    if (!savedAddressSelect) {
        return;
    }

    const addresses =
        JSON.parse(
            localStorage.getItem(
                "kaloraAddresses"
            )
        ) || [];


    addresses.forEach((address, index) => {

        const option =
            document.createElement("option");

        option.value = index;

        option.textContent =
            address.name +
            " — " +
            address.city +
            " — " +
            address.pincode;

        savedAddressSelect.appendChild(
            option
        );
    });
}


if (savedAddressSelect) {

    savedAddressSelect.addEventListener(
        "change",
        function () {

            const index =
                Number(this.value);

            if (
                this.value === "" ||
                isNaN(index)
            ) {
                return;
            }


            const addresses =
                JSON.parse(
                    localStorage.getItem(
                        "kaloraAddresses"
                    )
                ) || [];


            const address =
                addresses[index];


            if (!address) {
                return;
            }


            document.getElementById(
                "checkoutName"
            ).value = address.name;


            document.getElementById(
                "checkoutPhone"
            ).value = address.phone;


            document.getElementById(
                "checkoutAddress"
            ).value = address.address;


            document.getElementById(
                "checkoutCity"
            ).value = address.city;


            document.getElementById(
                "checkoutState"
            ).value = address.state;


            document.getElementById(
                "checkoutPincode"
            ).value = address.pincode;

        }
    );
}


loadSavedAddresses();
// =========================================
// STEP 9.3 — VALIDATE + PLACE ORDER
// =========================================

const placeOrderBtn =
    document.getElementById("placeOrderBtn");

const checkoutMessage =
    document.getElementById("checkoutMessage");


if (placeOrderBtn) {

    placeOrderBtn.addEventListener(
        "click",
        function () {

            // GET FORM VALUES

            const name =
                document.getElementById(
                    "checkoutName"
                ).value.trim();

            const phone =
                document.getElementById(
                    "checkoutPhone"
                ).value.trim();

            const address =
                document.getElementById(
                    "checkoutAddress"
                ).value.trim();

            const city =
                document.getElementById(
                    "checkoutCity"
                ).value.trim();

            const state =
                document.getElementById(
                    "checkoutState"
                ).value.trim();

            const pincode =
                document.getElementById(
                    "checkoutPincode"
                ).value.trim();


            // GET CART

            const cart =
                JSON.parse(
                    localStorage.getItem(
                        "kaloraCart"
                    )
                ) || [];


            // VALIDATE CART

            if (cart.length === 0) {

                checkoutMessage.textContent =
                    "Your bag is empty.";

                return;
            }


            // VALIDATE ADDRESS

            if (
                !name ||
                !phone ||
                !address ||
                !city ||
                !state ||
                !pincode
            ) {

                checkoutMessage.textContent =
                    "Please complete all delivery details.";

                return;
            }


            // PHONE VALIDATION

            if (!/^[0-9]{10}$/.test(phone)) {

                checkoutMessage.textContent =
                    "Please enter a valid 10-digit phone number.";

                return;
            }


            // PINCODE VALIDATION

            if (!/^[0-9]{6}$/.test(pincode)) {

                checkoutMessage.textContent =
                    "Please enter a valid 6-digit pincode.";

                return;
            }


            // PAYMENT METHOD

            const paymentMethod =
                document.querySelector(
                    'input[name="payment"]:checked'
                )?.value || "cod";


            // CALCULATE TOTAL

            let total = 0;

            cart.forEach(item => {

                const price =
                    Number(item.price) || 0;

                const quantity =
                    Number(item.quantity) || 1;

                total +=
                    price * quantity;

            });


            // CREATE ORDER NUMBER

            const orderNumber =
                "KL" +
                Date.now()
                    .toString()
                    .slice(-6);


            // CREATE ORDER

            const order = {

                orderNumber:
                    orderNumber,

               items: cart.map(item => ({
    name: item.name,
    image: item.image,
    price: Number(item.price) || 0,
    size: item.size || "M",
    colour: item.colour || "Burgundy",
    quantity: Number(item.quantity) || 1
})),

totalQuantity:
    cart.reduce(
        (sum, item) =>
            sum + Number(item.quantity || 1),
        0
    ),
                total:
                    total,

                status:
                    "Confirmed",

                paymentMethod:
                    paymentMethod,

                customer: {

                    name:
                        name,

                    phone:
                        phone,

                    address:
                        address,

                    city:
                        city,

                    state:
                        state,

                    pincode:
                        pincode

                },

                date:
                    new Date().toLocaleDateString(
                        "en-IN"
                    )

            };


            // GET EXISTING ORDERS

            const orders =
                JSON.parse(
                    localStorage.getItem(
                        "kaloraOrders"
                    )
                ) || [];


            // SAVE ORDER

            orders.unshift(order);


            localStorage.setItem(
                "kaloraOrders",
                JSON.stringify(orders)
            );


            // CLEAR CART

            localStorage.removeItem(
                "kaloraCart"
            );


            // SHOW SUCCESS MESSAGE

            checkoutMessage.textContent =
                "Order placed successfully!";


            // GO TO ORDER CONFIRMATION

            setTimeout(function () {

                window.location.href =
                    "order-success.html?order=" +
                    orderNumber;

            }, 800);

        }
    );
}
// =========================================
// STEP 10.2 — MOBILE MENU
// =========================================

const menuBtn = document.querySelector(".menu-btn");
const navLeft = document.querySelector(".nav-left");

if (menuBtn && navLeft) {

    menuBtn.addEventListener("click", function () {

        navLeft.classList.toggle("mobile-menu");

        if (navLeft.classList.contains("mobile-menu")) {
            menuBtn.textContent = "✕";
        } else {
            menuBtn.textContent = "☰";
        }

    });

}
// =========================================
// STEP 10.12 — SCROLL REVEAL
// =========================================

const revealElements =
    document.querySelectorAll(".reveal");

if (revealElements.length > 0) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

}
// =========================================
// KALORA RECENTLY VIEWED PRODUCTS
// =========================================

function getRecentlyViewed() {

    return JSON.parse(
        localStorage.getItem("kaloraRecentlyViewed")
    ) || [];

}


function saveRecentlyViewed(products) {

    localStorage.setItem(
        "kaloraRecentlyViewed",
        JSON.stringify(products)
    );

}


function addRecentlyViewed(product) {

    if (!product) return;

    let recentlyViewed =
        getRecentlyViewed();


    // Remove existing copy
    recentlyViewed =
        recentlyViewed.filter(
            item => item.name !== product.name
        );


    // Add latest product to beginning
    recentlyViewed.unshift({

        name: product.name,

        price: Number(product.price),

        image: product.image,

        category: product.category

    });


    // Keep only latest 6 products
    recentlyViewed =
        recentlyViewed.slice(0, 6);


    saveRecentlyViewed(
        recentlyViewed
    );

}
function getProductKey(product) {

    if (!product) return "";

    const productKeys = {
        "Burgundy Grace Maxi": "maxi",
        "Royal Aura Churidar": "churidar",
        "Noir Silk Top": "tops",
        "Golden Bloom Frock": "frocks",
        "Midnight Glam Dress": "party",
        "Eclipse Western Dress": "western"
    };

    return productKeys[product.name] || "";
}

function displayRecentlyViewed() {

    const container =
        document.getElementById(
            "recentlyViewedContainer"
        );


    if (!container) return;


    const recentlyViewed =
        getRecentlyViewed();


    if (recentlyViewed.length === 0) {

        container.innerHTML = `
            <div class="empty-account">
                <span>◌</span>
                <p>
                    You haven't viewed any products yet.
                </p>
                <a href="shop.html">
                    EXPLORE COLLECTION
                </a>
            </div>
        `;

        return;

    }


    container.innerHTML =
        recentlyViewed.map(product => `

            <article class="recently-viewed-card">

                <a
                    href="product.html?product=${getProductKey(product)}"
                    class="recently-viewed-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}">

                </a>


                <div class="recently-viewed-info">

                    <p>
                        ${product.category || ""}
                    </p>

                    <h3>
                        ${product.name}
                    </h3>

                    <span>
                        ₹${Number(product.price)
                            .toLocaleString("en-IN")}
                    </span>

                </div>

            </article>

        `).join("");

}


displayRecentlyViewed();
// =========================================
// KALORA — YOU MAY ALSO LIKE
// =========================================

function displayRelatedProducts() {

    const container =
        document.getElementById("relatedProducts");

    if (!container) return;


    const urlParams =
        new URLSearchParams(window.location.search);

    const currentProductKey =
        urlParams.get("product");


    if (
        typeof productData === "undefined" ||
        !currentProductKey
    ) {
        return;
    }


    const relatedProducts =
        Object.entries(productData)
            .filter(
                ([key]) =>
                    key !== currentProductKey
            )
            .slice(0, 3);


    container.innerHTML =
        relatedProducts.map(
            ([key, product]) => `

                <article class="related-product-card">

                    <a
                        href="product.html?product=${key}"
                        class="related-product-image">

                        <img
                            src="${product.image}"
                            alt="${product.name}">

                    </a>


                    <div class="related-product-info">

                        <p>
                            ${product.category}
                        </p>

                        <h3>
                            ${product.name}
                        </h3>

                        <span>
                            ₹${Number(product.price)
                                .toLocaleString("en-IN")}
                        </span>

                    </div>

                </article>

            `
        ).join("");
}


displayRelatedProducts();