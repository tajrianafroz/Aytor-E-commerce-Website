// ================ PRODUCT CART START ================
let decrement = document.querySelector(".decrement");
let increment = document.querySelector(".increment");
let input = document.querySelector(".input");

if (decrement && increment && input) {
  decrement.addEventListener("click", function () {
    if (Number(input.value) > 1) {
      input.value = Number(input.value) - 1;
      increment.style.cursor = "pointer";
    }
  });

  increment.addEventListener("click", function () {
    if (Number(input.value) + 1 < 15) {
      input.value = Number(input.value) + 1;
      decrement.style.cursor = "pointer";
    }
  });
}
// ================ PRODUCT CART END ================

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartBody;
let container = document.querySelector(".cart-items");

// ================= INIT =================
document.addEventListener("DOMContentLoaded", function () {
  cartBody = document.getElementById("cartBody");
  loadCart();
  updateCartCount();
});

// ================= CART BADGE (GLOBAL) =================
function updateCartCount() {
  let cartData = JSON.parse(localStorage.getItem("cart")) || [];

  let count = cartData.reduce((sum, item) => {
    return sum + Number(item.quantity || 0);
  }, 0);

  let badge = document.querySelector(".zero");
  if (badge) {
    badge.innerText = count;
  }
}

// ================= SAVE CART =================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// ================= ADD TO CART (CALL FROM ANY PAGE) =================
function addToCart(name, price, img, quantity) {
  let existing = cart.find((item) => item.name === name);

  if (existing) {
    existing.quantity += Number(quantity);
  } else {
    cart.push({
      name,
      price: Number(price),
      img,
      quantity: Number(quantity),
    });
  }

  saveCart();
}

// ================= LOAD CART (CART PAGE ONLY) =================
function loadCart() {
  if (!cartBody) return;

  cartBody.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item, index) => {
    let price = Number(item.price);
    let qty = Number(item.quantity);

    let total = price * qty;
    subtotal += total;

    cartBody.innerHTML += `
      <tr>
        <td><img src="${item.img}" width="80"></td>
        <td>${item.name}</td>
        <td>$${price}</td>
        <td>
          <div class="inputGrp">
            <button onclick="updateQty(${index}, -1)">-</button>
            <input type="text" value="${qty}">
            <button onclick="updateQty(${index}, 1)">+</button>
          </div>
        </td>
        <td>$${total}</td>
        <td>
          <a href="#" onclick="removeItem(${index})">
            <i class="fa-regular fa-trash-can"></i>
          </a>
        </td>
      </tr>
    `;
  });

  updateCartCount();
}

// ================= UPDATE QTY =================
function updateQty(index, change) {
  cart[index].quantity += change;

  if (cart[index].quantity < 1) {
    cart[index].quantity = 1;
  }

  saveCart();
  loadCart();
}

// ================= REMOVE ITEM =================
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  loadCart();
}

function renderCart() {
  container.innerHTML = "";

  cart.forEach((item, index) => {
    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" width="60">
        <h4>${item.name}</h4>
        <p>${item.price}</p>

        <div>
          Qty: ${item.qty}
        </div>

        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

document.querySelector(".checkout-btn").addEventListener("click", function () {
  window.location.href = "checkout.html";
});

renderCart();

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function goToCheckout() {
  saveCart();
  window.location.href = "./checkout.html";
}
