document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  console.log("CART FROM STORAGE:", cart); // DEBUG

  let tbody = document.getElementById("checkoutBody");

  let subtotal = 0;
  tbody.innerHTML = "";

  if (!cart.length) {
    tbody.innerHTML = `<tr><td colspan="4">Cart is empty</td></tr>`;
    return;
  }

  cart.forEach((item) => {
    let total = item.price * item.qty;
    subtotal += total;

    tbody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td>${item.qty}</td>
        <td>$${total}</td>
      </tr>
    `;
  });

  document.getElementById("subtotal").innerText = "$" + subtotal;
  document.getElementById("total").innerText = "$" + subtotal;
});

//For Payment
// show selected method description
document.addEventListener("DOMContentLoaded", function () {
  let radios = document.querySelectorAll("input[name='payment']");

  function updateView() {
    document
      .querySelectorAll(".methodBox")
      .forEach((el) => (el.style.display = "none"));

    let selected = document.querySelector(
      "input[name='payment']:checked",
    ).value;

    if (selected === "bank") {
      document.getElementById("bankBox").style.display = "block";
    } else if (selected === "check") {
      document.getElementById("checkBox").style.display = "block";
    } else if (selected === "cod") {
      document.getElementById("codBox").style.display = "block";
    }
  }

  radios.forEach((r) => r.addEventListener("change", updateView));

  updateView(); // initial load
});

//Order Logic
function placeOrder() {
  let selected = document.querySelector("input[name='payment']:checked").value;
  let result = document.getElementById("paymentResult");

  result.style.display = "block";

  if (selected === "bank") {
    result.innerHTML = `
      <div class="payment-box">
        <h4>Bank Transfer</h4>
        <p>Account No: 123456789</p>
        <button onclick="confirmOrder()">Confirm Order</button>
      </div>
    `;
  } else if (selected === "check") {
    result.innerHTML = `
      <div class="payment-box">
        <h4>Check Payment</h4>
        <p>Send check to our address</p>
        <button onclick="confirmOrder()">Confirm Order</button>
      </div>
    `;
  } else if (selected === "cod") {
    result.innerHTML = `
      <div class="payment-box">
        <h4>Cash On Delivery</h4>
        <p>Pay when delivered</p>
        <button onclick="confirmOrder()">Confirm Order</button>
      </div>
    `;
  }
  result.innerHTML += `
    <div class="payment-box">
      <h4>bKash / Nagad</h4>
      <input type="text" id="mobile" placeholder="Enter Mobile Number">
      <input type="text" id="trx" placeholder="Transaction ID">
      <button onclick="bkashPay()">Pay Now</button>
    </div>
  `;
}
//Bkash Payment Logic
function bkashPay() {
  let mobile = document.getElementById("mobile").value;
  let trx = document.getElementById("trx").value;

  if (!mobile || !trx) {
    alert("Please fill all fields!");
    return;
  }

  alert("Payment Successful!");
  confirmOrder();
}
//ORDER CONFIRM, CART CLEAR, HISTORY SAVE
function confirmOrder() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("Please login first!");
    return;
  }

  if (!cart.length) {
    alert("Cart is empty!");
    return;
  }

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  let newOrder = {
    id: Date.now(),
    user: currentUser.username, 
    items: cart,
    date: new Date().toLocaleString(),
  };

  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));

  localStorage.removeItem("cart");

  alert("Order Placed Successfully!");
  window.location.href = "./order-history.html";
}

