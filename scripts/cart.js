import products from "../data/product.js";

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

