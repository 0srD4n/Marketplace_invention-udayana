// mobile nav
function toggleMobileMenu() {
  document.querySelector(".menu-overlay").classList.toggle("active");
  document.querySelector(".menu-backdrop").classList.toggle("active");
}

document.querySelector(".menu-toggle").addEventListener("click", function () {
  toggleMobileMenu();
});

document.querySelector(".menu-backdrop").addEventListener("click", function () {
  toggleMobileMenu();
});

document.querySelectorAll(".menu-overlay nav a").forEach(function (link) {
  link.addEventListener("click", function () {
    toggleMobileMenu();
  });
});

function showNotification(message) {
  const notification = document.getElementById("notification");
  const notificationMessage = document.getElementById("notification-message");
  notificationMessage.textContent = message;
  notification.style.display = "block";

  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

document.querySelectorAll(".product-card").forEach((button) => {
  button.addEventListener("click", function () {
    const productName = this.getAttribute("data-name");
    showNotification(`${productName} berhasil ditambahkan ke keranjang`);
  });
});
function addToCart(productId, productName, productPrice) {
  showNotification(`${productName} berhasil ditambahkan ke keranjang`);
}

// Event listener untuk tombol "Tambah ke Keranjang"
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".product-card");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const productId = this.getAttribute("data-id");
      const productName = this.getAttribute("data-name");
      const productPrice = this.getAttribute("data-price");
      addToCart(productId, productName, productPrice);
    });
  });
});
