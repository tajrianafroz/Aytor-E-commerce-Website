document.addEventListener("DOMContentLoaded", function () {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let container = document.getElementById("orderContainer");

  if (!currentUser) {
    container.innerHTML = `<p class="empty">Please login to see your orders</p>`;
    return;
  }

  // 🔥 filter user orders
  let userOrders = orders.filter((o) => o.user === currentUser.username);

  if (!userOrders.length) {
    container.innerHTML = `<p class="empty">No orders found 😔</p>`;
    return;
  }

  userOrders.reverse().forEach((order) => {
    let total = 0;
    let itemsHTML = "";

    order.items.forEach((item) => {
      let price = Number(item.price) || 0;
      let qty = Number(item.qty) || 0;
      let itemTotal = price * qty;

      total += itemTotal;

      itemsHTML += `
        <tr>
          <td>${item.name}</td>
          <td>$${price}</td>
          <td>${qty}</td>
          <td>$${itemTotal}</td>
        </tr>
      `;
    });

    container.innerHTML += `
      <div class="order-card">
        <div class="order-header">
          <strong>Order ID: ${order.id}</strong>
          <span>${order.date}</span>
        </div>

        <table border="1">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>${itemsHTML}</tbody>
        </table>

        <h5>Total: $${total}</h5>
      </div>
    `;
  });
});
