//PAGE PROTECTION
let user = JSON.parse(localStorage.getItem("currentUser"));

if (!user || user.role !== "user") {
  window.location.href = "index.html";
}

//Logout
let logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");

    window.location.href = "index.html";
  });
}

