// ================ PRODUCT DETAILS START ================

const params = new URLSearchParams(window.location.search);

const name = params.get("name");
const img = params.get("img");
const price = params.get("price");

const productName = document.getElementById("productName");
const productImg = document.getElementById("productImg");
const productPrice = document.getElementById("productPrice");

if (productName && productImg && productPrice) {
  productName.innerText = name;
  productImg.src = "./Assets/Images/" + img;
  productPrice.innerText = "$" + price;
}

const decrement = document.querySelector(".decrement");
const increment = document.querySelector(".increment");
const input = document.querySelector(".input");

const MIN = 1;
const MAX = 15;

decrement.addEventListener("click", () => {
  let val = Number(input.value);
  if (val > MIN) input.value = val - 1;
});

increment.addEventListener("click", () => {
  let val = Number(input.value);
  if (val < MAX - 1) input.value = val + 1;
});

document.querySelector(".addCart").addEventListener("click", (e) => {
  e.preventDefault();

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = {
    name: productName.innerText,
    price: Number(productPrice.innerText.replace("$", "")),
    img: productImg.getAttribute("src"),
    quantity: Number(input.value),
  };

  let existing = cart.find((item) => item.name === product.name);

  if (existing) {
    existing.quantity += product.quantity;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
});

// ================ PRODUCT DETAILS END ================
