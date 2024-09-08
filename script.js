$(function () {
  // setup function time
  const timeOpened = new Date();
  setInterval(() => {
    const date = new Date(); // new ambil object time bang
    const time = new Intl.DateTimeFormat("id-ID", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(date);
    console.log(time);
    // Set Countdown Hot Deals
  }, 1000);
});

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
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  document.documentElement.classList.toggle("dark-mode");
  const darkIcon = document.getElementById("darkIcon");
  const lightIcon = document.getElementById("lightIcon");
  if (document.body.classList.contains("dark-mode")) {
    darkIcon.style.display = "none";
    lightIcon.style.display = "inline-block";
  } else {
    darkIcon.style.display = "inline-block";
    lightIcon.style.display = "none";
  }
}

// Event listener untuk tombol toggle
document.getElementById("toggleMode").addEventListener("click", toggleDarkMode);
