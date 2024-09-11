// Inisialisasi peta
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -6.2088, lng: 106.8456 },
    zoom: 12,
  });

  const marker = new google.maps.Marker({
    position: { lat: -6.2088, lng: 106.8456 },
    map: map,
    title: "Lokasi Pengiriman",
  });

  function updateLocation(position) {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    marker.setPosition(pos);
    map.setCenter(pos);

    document.getElementById(
      "current-location"
    ).textContent = `Lat: ${pos.lat.toFixed(4)}, Lng: ${pos.lng.toFixed(4)}`;

    // Atur ETA selama 1 jam
    const eta = new Date();
    eta.setHours(eta.getHours() + 1);
    document.getElementById("eta").textContent = eta.toLocaleTimeString();
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(updateLocation, function () {
      handleLocationError(true, marker, map.getCenter());
    });
  } else {
    handleLocationError(false, marker, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, marker, pos) {
  marker.setPosition(pos);
  document.getElementById("current-location").textContent =
    browserHasGeolocation
      ? "Error: Layanan Geolocation gagal bang."
      : "Error: Browser Anda tidak mendukung geolocation apinter lancar nya.";
}

const script = document.createElement("script");
script.src =
  "https://cdn.jsdelivr.net/gh/somanchiu/Keyless-Google-Maps-API@v6.8/mapsJavaScriptAPI.js";
script.async = true;
script.defer = true;
document.head.appendChild(script);
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
import products from "data/product.js";

$(document).ready(function () {
  $(".quantity-btn").click(function () {
    var input = $(this).siblings(".quantity-input");
    var value = parseInt(input.val());
    if ($(this).text() === "+") {
      input.val(value + 1);
    } else if (value > 1) {
      input.val(value - 1);
    }
  });

  $(".remove-item").click(function () {
    $(this).closest(".cart-item").remove();
  });
});
$(document).ready(function () {
  function updateCart() {
    const cartItemsDIV = $("#cart-items");
    cartItemsDIV.empty();

    let total = 0;

    products.forEach((item) => {
      const cartItemDIV = $(`
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" />
            <div class="item-details">
              <div class="item-name">${item.name}</div>
              <div class="item-price">Rp ${item.price.toLocaleString()}</div>
              <div class="item-quantity">
                <button class="quantity-btn minus">-</button>
                <input type="number" class="quantity-input" value="1" min="1" />
                <button class="quantity-btn plus">+</button>
              </div>
            </div>
            <span class="remove-item"><i class="bi bi-trash"></i></span>
          </div>
        `);

      cartItemsDIV.append(cartItemDIV);
      total += item.price * item.quantity;
    });

    $("#cart-total").text(`Rp ${total.toLocaleString()}`);
  }

  // Event listener untuk tombol quantity
  $(document).on("click", ".quantity-btn", function () {
    const $input = $(this).siblings(".quantity-input");
    const id = $(this).closest(".cart-item").data("id");
    const item = cartItems.find((item) => item.id === id);

    if ($(this).hasClass("plus")) {
      item.quantity++;
    } else if ($(this).hasClass("minus") && item.quantity > 1) {
      item.quantity--;
    }

    updateCart();
  });

  $(document).on("click", ".remove-item", function () {
    const id = $(this).closest(".cart-item").data("id");
    const index = cartItems.findIndex((item) => item.id === id);

    if (index !== -1) {
      cartItems.splice(index, 1);
      updateCart();
    }
  });

  updateCart();
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

