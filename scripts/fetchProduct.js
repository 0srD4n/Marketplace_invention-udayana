import products from "data/product.js";


function showCarousel() {
  const carouselImages = [
    "media/ACER LAPTOP NITRO AN515-58-55E6.jpg",
    "media/MSI Modern 14 C12MO.png",
    "media/ADVAN Laptop Workplus.jpeg"
  ];
  let currentIndex = 0;

  function changeImage() {
    $(".carousel-image").attr("src", carouselImages[currentIndex]);
    $(".dot").removeClass("active");
    $(".dot").eq(currentIndex).addClass("active");
    currentIndex = (currentIndex + 1) % carouselImages.length;
  }

  setInterval(changeImage, 2000);

  $(".dot").on("click", function() {
    currentIndex = $(this).index();
    changeImage();
  });
}

$(document).ready(function() {
  showCarousel();
});

$(function () {
  const productsDIV = $(".product-list");

  products.forEach((product) => {
    const card = $("<div>").addClass("product-card");
    const link = $("<a>").attr("href", "pages/product.html").addClass("product-link").css("text-decoration", "none");
    const image = $("<img>").addClass("product-image").attr("src", product.image);
    const caption = $("<div>").addClass("product-caption");
    const name = $("<h4>").addClass("product-name").text(product.name);
    const price = $("<div>").addClass("product-price");
    const cartIcon = $("<button>").addClass("add-to-cart-icon").html('<i class="bi bi-cart-plus"></i>');
    
    price.text(
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(product.price)
    );

    caption.append(name, price);
    link.append(image, caption);
    card.append(link, cartIcon);
    
    cartIcon.on("click", function(e) {
      e.preventDefault();
      $(this).addClass("added");
      setTimeout(() => {
        $(this).removeClass("added");
      }, 500);
    });

    image.on("mouseenter", function() {
      imagepreview(product.image);
    });

    productsDIV.append(card);
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

  
  showNotification(`${productName} berhasil ditambahkan ke keranjang`);
}

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
