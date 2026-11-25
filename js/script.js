// ---------- 1. Mobile menu ----------
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", function () {
    menu.classList.toggle("open");
  });
}


// ---------- 2. Places filter ----------
const filterButtons = document.querySelectorAll(".filter-btn");
const placeCards = document.querySelectorAll("#places-container .card");

function filterPlaces(category) {
  placeCards.forEach(function (card) {
    const cardCategory = card.getAttribute("data-category");

    if (category === "all" || cardCategory === category) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
}

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (b) { b.classList.remove("active"); });
    button.classList.add("active");
    filterPlaces(button.getAttribute("data-filter"));
  });
});

if (filterButtons.length > 0) {
  filterButtons[0].classList.add("active");
}


// ---------- 3. Form validation ----------
const form = document.getElementById("tripForm");

if (form) {

  const dateInput = document.getElementById("date");
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);

  function showError(inputId, message) {
    document.getElementById(inputId + "Error").textContent = message;
    document.getElementById(inputId).classList.add("invalid");
  }

  function clearError(inputId) {
    document.getElementById(inputId + "Error").textContent = "";
    document.getElementById(inputId).classList.remove("invalid");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;
    document.getElementById("successMsg").textContent = "";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const date = document.getElementById("date").value;
    const travellers = document.getElementById("travellers").value;
    const interest = document.getElementById("interest").value;

    // Name
    if (name === "") {
      showError("name", "Please enter your name.");
      isValid = false;
    } else if (name.length < 3) {
      showError("name", "Name must be at least 3 characters.");
      isValid = false;
    } else {
      clearError("name");
    }

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      showError("email", "Please enter your email.");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      showError("email", "Please enter a valid email (example@gmail.com).");
      isValid = false;
    } else {
      clearError("email");
    }

    // Phone
    const phonePattern = /^[0-9]{10}$/;
    if (phone === "") {
      showError("phone", "Please enter your phone number.");
      isValid = false;
    } else if (!phonePattern.test(phone)) {
      showError("phone", "Phone number must be exactly 10 digits.");
      isValid = false;
    } else {
      clearError("phone");
    }

    // Date
    if (date === "") {
      showError("date", "Please select your travel date.");
      isValid = false;
    } else if (date < today) {
      showError("date", "Travel date cannot be in the past.");
      isValid = false;
    } else {
      clearError("date");
    }

    // Travellers
    const count = Number(travellers);
    if (travellers === "") {
      showError("travellers", "Please enter number of travellers.");
      isValid = false;
    } else if (count < 1 || count > 20) {
      showError("travellers", "Travellers must be between 1 and 20.");
      isValid = false;
    } else {
      clearError("travellers");
    }

    // Interest
    if (interest === "") {
      showError("interest", "Please select your main interest.");
      isValid = false;
    } else {
      clearError("interest");
    }

    // Success
    if (isValid) {
      document.getElementById("successMsg").textContent =
        "Thank you, " + name + "! Your enquiry has been received.";
      form.reset();
    }
  });
}