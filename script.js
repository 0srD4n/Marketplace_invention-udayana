// Komentar: Navigasi mobile
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

// Komentar: Fungsi untuk menampilkan notifikasi
function showNotification(message) {
  const notification = document.getElementById("notification");
  const notificationMessage = document.getElementById("notification-message");
  notificationMessage.textContent = message;
  notification.style.display = "block";

  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

// Komentar: Event listener untuk ikon "Tambah ke Keranjang"
document.addEventListener("click", function(e) {
  if (e.target.closest(".add-to-cart-icon")) {
    e.preventDefault();
    const productCard = e.target.closest(".product-card");
    const productName = productCard.querySelector(".product-name").textContent;
    showNotification(`${productName} berhasil ditambahkan ke keranjang`);
    
    e.target.closest(".add-to-cart-icon").classList.add("added");
    setTimeout(() => {
      e.target.closest(".add-to-cart-icon").classList.remove("added");
    }, 500);
  }
});

function addToCart(productId, productName, productPrice) {
  // Komentar: Di sini Anda dapat menambahkan logika untuk menyimpan produk ke keranjang
  // Misalnya, menyimpan ke localStorage atau mengirim ke server
  
  showNotification(`${productName} berhasil ditambahkan ke keranjang`);
}

// Komentar: Event listener untuk tombol "Tambah ke Keranjang" pada kartu produk
document.addEventListener("DOMContentLoaded", function () {
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach(function(card) {
    const productId = card.dataset.id;
    const productName = card.querySelector(".product-name").textContent;
    const productPrice = card.querySelector(".product-price").textContent;
    
    card.querySelector(".add-to-cart-icon").addEventListener("click", function (event) {
      event.preventDefault();
      addToCart(productId, productName, productPrice);
    });
  });
});
