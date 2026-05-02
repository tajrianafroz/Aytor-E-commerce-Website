// ================ NAV START ================
let navMenus = document.querySelectorAll(".nav_menu");

navMenus.forEach(function (navMenu) {
  navMenu.addEventListener("click", function () {
    navMenus.forEach(function (menu) {
      menu.classList.remove("nav_active");
    });
    navMenu.classList.add("nav_active");
  });
});

let navIcons = document.querySelectorAll(".nav_icon");

navIcons.forEach(function (navIcon) {
  navIcon.addEventListener("click", function () {
    navIcons.forEach(function (icon) {
      icon.classList.remove("nav_icon_active");
    });
    navIcon.classList.add("nav_icon_active");
  });
});

// ================ NAV POP_UP START ================

window.addEventListener("scroll", function () {
  let currentScrollY = window.scrollY;
  let mainNavbar = document.querySelector(".navbar");
  if (currentScrollY > 500) {
    mainNavbar.classList.add("popUp_nav");
  } else {
    mainNavbar.classList.remove("popUp_nav");
  }

  initvalue = currentScrollY;
});
// ================ NAV POP_UP END ================

// ================ SEARCH POP_UP START ================
let searchPopup = document.querySelector(".search_popup");
let searchIcon = document.querySelector(".search_icon");
let searchCross = document.querySelector(".cross_btn");
let searchForm = document.querySelector(".search_form");

searchIcon.addEventListener("click", function () {
  if (!searchPopup.classList.contains("search_popup_active")) {
    searchPopup.classList.add("search_popup_active");
    searchForm.classList.add("search_form_active");
  }
});

searchCross.addEventListener("click", function () {
  if (searchPopup.classList.contains("search_popup_active")) {
    searchPopup.classList.remove("search_popup_active");
    searchForm.classList.remove("search_form_active");
  }
});

searchPopup.addEventListener("click", (e) => {
  if (e.target.classList.contains("search_popup_active")) {
    searchPopup.classList.remove("search_popup_active");
    searchForm.classList.remove("search_form_active");
  }
});
// ================ SEARCH POP_UP END ================
//main login/reg start
let roleBox = document.querySelector(".roleBox");
let roleButtons = document.querySelectorAll(".roleBtn");
let selectedRole = null;

// ================= AUTO ADMIN CREATE =================
let users = JSON.parse(localStorage.getItem("users")) || [];

if (!users.find((u) => u.role === "admin")) {
  users.push({
    name: "Admin",
    email: "admin@gmail.com",
    username: "admin",
    password: "12345678",
    role: "admin",
  });

  localStorage.setItem("users", JSON.stringify(users));
}

// ================= DOM READY =================
document.addEventListener("DOMContentLoaded", function () {
  let loginBox = document.querySelector(".loginBox");
  let accountLoginIcon = document.querySelector(".accountLogin_icon");
  let loginClose = document.querySelector(".loginClose");

  let loginPanel = document.querySelector(".login-panel");
  let registerPanel = document.querySelector(".register-panel");

  let showRegister = document.querySelector("#showRegister");
  let showLogin = document.querySelector("#showLogin");

  let registerBtn = document.querySelector("#registerBtn");
  let loginBtn = document.querySelector("#loginBtn");

  // ================= NAVBAR ICON CLICK =================
  if (accountLoginIcon) {
    accountLoginIcon.addEventListener("click", () => {
      let isLoggedIn = localStorage.getItem("isLoggedIn");
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (!isLoggedIn || !currentUser) {
        roleBox.classList.add("active");
        return;
      }

      if (currentUser.role === "admin") {
        window.location.href = "./admin.html";
      } else {
        window.location.href = "./profile.html";
      }
    });
  }

  // ================= ROLE SELECT =================
  roleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedRole = btn.dataset.role;
      localStorage.setItem("role", selectedRole);

      roleBox.classList.remove("active");
      loginBox.classList.add("loginBox_active");

      document.querySelector(".login-panel h1").innerText =
        selectedRole === "admin" ? "Admin Login" : "User Login";

      document.querySelector(".register-panel h1").innerText =
        selectedRole === "admin" ? "Admin Register" : "User Register";
    });
  });

  // ================= CLOSE ROLE BOX =================
  roleBox.addEventListener("click", (e) => {
    if (e.target === roleBox) {
      roleBox.classList.remove("active");
    }
  });

  // ================= RESET =================
  function resetAll() {
    document
      .querySelectorAll(".auth-container input")
      .forEach((input) => (input.value = ""));

    document
      .querySelectorAll(".auth-message")
      .forEach((msg) => (msg.innerText = ""));

    registerPanel.classList.remove("active");
    loginPanel.classList.add("active");
  }

  if (loginClose) {
    loginClose.addEventListener("click", () => {
      loginBox.classList.remove("loginBox_active");
      resetAll();
    });
  }

  if (loginBox) {
    loginBox.addEventListener("click", (e) => {
      if (e.target.classList.contains("loginBox_active")) {
        loginBox.classList.remove("loginBox_active");
        resetAll();
      }
    });
  }

  // ================= SWITCH PANEL =================
  if (showRegister) {
    showRegister.addEventListener("click", () => {
      loginPanel.classList.remove("active");
      registerPanel.classList.add("active");
      document.getElementById("loginMessage").innerText = "";
    });
  }

  if (showLogin) {
    showLogin.addEventListener("click", () => {
      registerPanel.classList.remove("active");
      loginPanel.classList.add("active");
      document.getElementById("registerMessage").innerText = "";
    });
  }

  // ================= PASSWORD TOGGLE =================
  document.querySelectorAll(".togglePass").forEach((icon) => {
    icon.addEventListener("click", function () {
      let input = this.parentElement.querySelector("input");

      if (input.type === "password") {
        input.type = "text";
        this.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
      } else {
        input.type = "password";
        this.innerHTML = '<i class="fa-solid fa-eye"></i>';
      }
    });
  });

  // ================= REGISTER =================
  if (registerBtn) {
    registerBtn.addEventListener("click", () => {
      let name = regName.value.trim();
      let email = regEmail.value.trim();
      let username = regUsername.value.trim();
      let password = regPassword.value.trim();
      let confirmPassword = regConfirmPassword.value.trim();

      let message = document.getElementById("registerMessage");

      if (!name || !email || !username || !password || !confirmPassword) {
        message.innerText = "All fields required!";
        message.style.color = "red";
        return;
      }

      if (password.length < 8) {
        message.innerText = "Password must be 8+ characters!";
        message.style.color = "red";
        return;
      }

      if (password !== confirmPassword) {
        message.innerText = "Passwords do not match!";
        message.style.color = "red";
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];

      if (users.find((u) => u.username === username)) {
        message.innerText = "Username already exists!";
        message.style.color = "red";
        return;
      }

      users.push({
        name,
        email,
        username,
        password,
        role: selectedRole || "user",
      });

      localStorage.setItem("users", JSON.stringify(users));

      message.innerText = "Registration successful!";
      message.style.color = "green";

      document
        .querySelectorAll(".register-panel input")
        .forEach((i) => (i.value = ""));
    });
  }

  // ================= LOGIN =================
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      let username = loginUsername.value.trim();
      let password = loginPassword.value.trim();

      let users = JSON.parse(localStorage.getItem("users")) || [];
      let message = document.getElementById("loginMessage");
      let selectedRole = localStorage.getItem("role");

      if (!username || !password) {
        message.innerText = "Fill all fields!";
        message.style.color = "red";
        return;
      }

      let user = users.find((u) => u.username === username);

      if (!user) {
        message.innerText = "User not found!";
        message.style.color = "red";
        return;
      }

      if (user.password !== password) {
        message.innerText = "Incorrect password!";
        message.style.color = "red";
        return;
      }

      if (user.role !== selectedRole) {
        message.innerText =
          selectedRole === "admin"
            ? "This is not an admin account!"
            : "This is not a user account!";
        message.style.color = "red";
        return;
      }

      message.innerText = "Login successful!";
      message.style.color = "green";

      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");

      document
        .querySelectorAll(".login-panel input")
        .forEach((i) => (i.value = ""));

      setTimeout(() => {
        window.location.href =
          user.role === "admin" ? "./admin.html" : "./profile.html";
      }, 1000);
    });
  }
});
//main login/reg end
// ================ OFF-CANVAS START ================
let menuUps = document.querySelectorAll(".menu_up");
let menuDowns = document.querySelectorAll(".menu_down");

menuUps.forEach(function (menuUp) {
  menuUp.addEventListener("click", function () {
    menuUp.classList.add("down_active");
    let parent = menuUp.closest("li");
    parent.querySelector(".menu_down").classList.add("down_active");
  });
});

menuDowns.forEach(function (menuDown) {
  menuDown.addEventListener("click", function () {
    menuDown.classList.remove("down_active");
    menuDown.parentNode
      .querySelector(".menu_up")
      .classList.remove("down_active");
  });
});

// LOGIN / REGISTER START

let offcanvasLogin = document.querySelector(".loginBox");
let loginRegisterIcon = document.querySelector(".loginRegisterIcon");
let canvaLoginClose = document.querySelector(".loginClose");

if (loginRegisterIcon) {
  loginRegisterIcon.addEventListener("click", function () {
    if (!offcanvasLogin.classList.contains("loginBox_active")) {
      offcanvasLogin.classList.add("loginBox_active");
    }
  });
}

canvaLoginClose.addEventListener("click", function () {
  if (offcanvasLogin.classList.contains("loginBox_active")) {
    offcanvasLogin.classList.remove("loginBox_active");
  }
});

offcanvasLogin.addEventListener("click", (e) => {
  if (e.target.classList.contains("loginBox_active")) {
    offcanvasLogin.classList.remove("loginBox_active");
  }
});

// LOGIN/REGISTER END

// ================ OFF-CANVAS END ================

// ================ NAV FOOTER START ================
function toggleSearch(icon, popup, form, cross) {
  icon.addEventListener("click", () => {
    popup.classList.add("search_popup_active");
    form.classList.add("search_form_active");
  });

  cross.addEventListener("click", () => {
    popup.classList.remove("search_popup_active");
    form.classList.remove("search_form_active");
  });
}
// ================ NAV FOOTER END ================

// ================ NAV END ================

/** ::::::: JQUERY START ::::::: */

// ================ MEGA SALE START ================
$(function () {
  $(".mega_slides").slick({
    dots: true,
    arrows: false,
    dotsClass: "container slide_active",
    autoplay: true,
    autoplaySpeed: 2400,
  });
});
// ================ MEGA SALE END ================

// ================ DEALS OF THE DAYS START ================

// ============ DEALS SLIDER START ============

$(document).ready(function () {
  $(".slider").slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: "container slidesActive",
    autoplay: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

// ============ DEALS SLIDER END ============

// ============ DEALS COUNTDOWN START ============

let countdown;
let daysElement = document.querySelector(".days");
let hoursElement = document.querySelector(".hours");
let minutesElement = document.querySelector(".minutes");
let secondsElement = document.querySelector(".seconds");

if (daysElement && hoursElement && minutesElement && secondsElement) {
  // Initialize total countdown time in seconds
  let totalSeconds =
    parseInt(daysElement.textContent) * 24 * 60 * 60 +
    parseInt(hoursElement.textContent) * 60 * 60 +
    parseInt(minutesElement.textContent) * 60 +
    parseInt(secondsElement.textContent);

  countdown = setInterval(function () {
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Update the countdown display
    daysElement.textContent = days < 10 ? "0" + days : days;
    hoursElement.textContent = hours < 10 ? "0" + hours : hours;
    minutesElement.textContent = minutes < 10 ? "0" + minutes : minutes;
    secondsElement.textContent = seconds < 10 ? "0" + seconds : seconds;

    if (totalSeconds <= 0) {
      clearInterval(countdown);
      daysElement.textContent = "00";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";
      alert("Time's up!");
    }

    totalSeconds--;
  }, 1000);
}

// ============ DEALS COUNTDOWN END ============

// ================ DEALS OF THE DAYS END ================

// ================ LATEST NEWS START ================

$(function () {
  $(".all_news").slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    dotsClass: "container sliding_active",
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

// ================ LATEST NEWS END ================

/** ::::::: JQUERY END ::::::: */

/** ::::: TOOLTIP START ::::: */

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]',
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl),
);

/** ::::: TOOLTIP END ::::: */

// ================ CART CODE START ================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= CART BADGE =================
function updateCartCount() {
  let count = cart.reduce((sum, item) => {
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

// ================= ADD TO CART =================
function addToCartGlobal(name, price, img, quantity) {
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

// ================= REMOVE ITEM =================
function removeFromCartGlobal(index) {
  cart.splice(index, 1);
  saveCart();
}

// ================= UPDATE QTY =================
function updateQtyGlobal(index, change) {
  if (!cart[index]) return;

  cart[index].quantity += change;

  if (cart[index].quantity < 1) {
    cart[index].quantity = 1;
  }

  saveCart();
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
});
// ================ CART CODE END ================

//vendor product post
function loadAllProducts() {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let container = document.getElementById("productContainer");

  if (!container) return;

  container.innerHTML = "";

  products.forEach((p) => {
    container.innerHTML += `
      <div class="col-md-3">
        <div class="card p-2">
          <img src="${p.img}" height="150">
          <h5>${p.name}</h5>
          <p>$${p.price}</p>

          <button onclick="addToCart('${p.name}', '${p.price}', '${p.img}')" 
          class="btn btn-success">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", loadAllProducts);

