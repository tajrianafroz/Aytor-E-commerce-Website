document.addEventListener("DOMContentLoaded", function () {
  let allProducts = Array.from(
    document.querySelectorAll("#all_grids .row.g-4 > .col"),
  );

  let filteredProducts = [...allProducts];

  const itemsPerPage = 8;
  let currentPage = 1;

  const paginationContainer = document.querySelector(".pagination");
  const progressText = document.querySelector(".progressTitle");
  const progressBar = document.querySelector(".progressBar");

  //Filter Dropdown
  const filterSelect = document.querySelector(".sorting");

  // ========== SHOW PAGE ==========
  function showPage(page) {
    currentPage = page;

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    allProducts.forEach((p) => (p.style.display = "none"));

    filteredProducts.slice(start, end).forEach((p) => {
      p.style.display = "block";
    });

    updatePagination();
    updateProgress();
  }

  // ========== PAGINATION ==========
  function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    paginationContainer.innerHTML = "";

    // Prev
    const prev = document.createElement("li");
    prev.classList.add("page-item");
    prev.innerHTML = `<a href="#">Pre</a>`;
    prev.onclick = (e) => {
      e.preventDefault();
      if (currentPage > 1) showPage(currentPage - 1);
    };
    paginationContainer.appendChild(prev);

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.classList.add("page-item");

      const a = document.createElement("a");
      a.href = "#";
      a.innerText = i;

      if (i === currentPage) a.classList.add("active");

      a.onclick = (e) => {
        e.preventDefault();
        showPage(i);
      };

      li.appendChild(a);
      paginationContainer.appendChild(li);
    }

    // Next
    const next = document.createElement("li");
    next.classList.add("page-item");
    next.innerHTML = `<a href="#">Next</a>`;
    next.onclick = (e) => {
      e.preventDefault();
      if (currentPage < totalPages) showPage(currentPage + 1);
    };
    paginationContainer.appendChild(next);
  }

  // ========== PROGRESS ==========
  function updateProgress() {
    const total = filteredProducts.length;
    const shown = Math.min(itemsPerPage * currentPage, total);

    progressText.innerText = `Showing ${shown} of ${total} Posts`;

    const percent = (shown / total) * 100;
    progressBar.style.width = percent + "%";
  }

  // ========== FILTER ==========
  filterSelect.addEventListener("change", function () {
    const value = this.value;

    if (value === "all") {
      filteredProducts = [...allProducts];
    } else {
      filteredProducts = allProducts.filter(
        (p) => p.dataset.category === value,
      );
    }

    showPage(1);
  });

  // INIT
  showPage(1);
});

//LOAD PRODUCTS FROM LOCALSTORAGE
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".row.g-4");

  const htmlProducts = Array.from(container.children);

  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

  function createProductCard(p) {
    const div = document.createElement("div");
    div.className = "col product-item";
    div.setAttribute("data-category", p.category);

    div.innerHTML = `
      <div class="card h-100">
        <div class="product_image">
          <img src="${p.image}" />
        </div>
        <div class="card-body product_content">
          <h4>${p.name}</h4>
          <p>$${p.price}</p>
        </div>
      </div>
    `;

    return div;
  }

  container.innerHTML = "";

  htmlProducts.forEach((el) => container.appendChild(el));

  storedProducts.forEach((p) => {
    const card = createProductCard(p);
    container.appendChild(card);
  });
});
