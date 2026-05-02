let admin = JSON.parse(localStorage.getItem("currentUser"));

if (!admin || admin.role !== "admin") {
  window.location.href = "index.html";
}

// ================= LOGOUT =================
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("role");
  window.location.href = "index.html";
});

//Poduct add/update/delete
let products = JSON.parse(localStorage.getItem("products")) || [];
let editId = null;
let imageBase64 = "";

document
  .getElementById("inputGroupFile02")
  .addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {
      imageBase64 = reader.result;
    };

    reader.readAsDataURL(file);
  });

// ================= SAVE GLOBAL =================
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));

  window.dispatchEvent(new Event("productsUpdated"));
}

// ================= CLEAR FORM =================
function clearForm() {
  document.getElementById("pName").value = "";
  document.getElementById("pCategory").value = "";
  document.getElementById("pPrice").value = "";
  document.getElementById("inputGroupFile02").value = "";

  imageBase64 = "";
}

// ================= ADD / UPDATE =================
function addProduct() {
  let name = document.getElementById("pName").value;
  let category = document.getElementById("pCategory").value;
  let price = document.getElementById("pPrice").value;

  if (!name || !category || !price) return alert("Fill all fields");

  const newProduct = {
    id: Date.now(),
    name,
    category: category.toLowerCase(),
    price: parseFloat(price),
    image: imageBase64 || "https://via.placeholder.com/150",
    stock: 10,
    createdAt: Date.now(),
  };

  if (editId === null) {
    products.unshift(newProduct);
  } else {
    products = products.map((p) =>
      p.id === editId ? { ...p, ...newProduct, id: p.id } : p,
    );
    editId = null;
  }

  saveProducts();
  clearForm();
  renderProducts();
}

// ================= DELETE =================
function deleteProduct(id) {
  products = products.filter((p) => p.id !== id);
  saveProducts();
  renderProducts();
}

// ================= EDIT =================
function editProduct(id) {
  let product = products.find((p) => p.id === id);

  document.getElementById("pName").value = product.name;
  document.getElementById("pCategory").value = product.category;
  document.getElementById("pPrice").value = product.price;

  imageBase64 = product.image;
  editId = id;

  document.querySelector("button[onclick='addProduct()']").innerText = "Update";
}

// ================= RENDER ADMIN =================
function renderProducts() {
  let container = document.getElementById("adminProducts");
  container.innerHTML = "";

  products.forEach((p) => {
    container.innerHTML += `
      <div class="admin-row-card">

        <div class="row-left">
          <img src="${p.image}" />
        </div>

        <div class="row-middle">
          <div class="row-item"><span>Name:</span> ${p.name}</div>
          <div class="row-item"><span>Category:</span> ${p.category}</div>
          <div class="row-item"><span>Price:</span>$${p.price}</div>
        </div>

        <div class="row-right">
          <button class="edit-btn" onclick="editProduct(${p.id})">Edit</button>
          <button class="delete-btn" onclick="deleteProduct(${p.id})">Delete</button>
        </div>

      </div>
    `;
  });
}

// INIT
renderProducts();
