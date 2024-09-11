import products from "/data/product.js";

$(document).ready(function () {
  // Fungsi untuk memperbarui keranjang belanja
  function updateCart() {
    const cartItemsDIV = $("#cart-items");
    cartItemsDIV.empty();

    let total = 0;

    products.forEach((item) => {
      const cartItemDIV = $(`
          <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" />
            <div class="item-details">
              <div class="item-name">${item.name}</div>
              <div class="item-price">Rp ${item.price.toLocaleString()}</div>
              <div class="item-quantity">
                <button class="quantity-btn minus">-</button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" />
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
    const item = products.find((item) => item.id === id);

    if ($(this).hasClass("plus")) {
      item.quantity++;
    } else if ($(this).hasClass("minus") && item.quantity > 1) {
      item.quantity--;
    }

    $input.val(item.quantity);
    updateCart();
  });

  $(document).on("click", ".remove-item", function () {
    const id = $(this).closest(".cart-item").data("id");
    const index = products.findIndex((item) => item.id === id);

    if (index !== -1) {
      products.splice(index, 1);
      updateCart();
    }
  });

  // Inisialisasi keranjang belanja
  updateCart();
});

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
  const notification = document.getElementById("notification");
  const notificationMessage = document.getElementById("notification-message");
  notificationMessage.textContent = message;
  notification.style.display = "block";

  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}
