// Get form and all input fields directly
const form = document.getElementById("form");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const phonenumber = document.getElementById("phonenumber");
const text = document.getElementById("text");
const vehicle = document.getElementById("vehicle");
const model = document.getElementById("model");
const year = document.getElementById("year");
const color = document.getElementById("color");
const license = document.getElementById("license");
const errorMsg = document.getElementsByClassName("error");

// Validation function
function validateField(field, index, message) {
  const value = field.value.trim();

  // Check for phone number digits only
  if (field === phonenumber && value && !/^\d+$/.test(value)) {
    errorMsg[index].innerHTML = "Phone number must contain only digits";
    errorMsg[index].style.color = "red";
    return;
  }

  // Check for empty input
  if (value === "") {
    errorMsg[index].innerHTML = message;
    errorMsg[index].style.color = "red";

    // Clear message after 3 seconds
    setTimeout(() => {
      errorMsg[index].innerHTML = "";
    }, 3000);
  } else {
    errorMsg[index].innerHTML = "";
  }
}

// Form submit validation
form.addEventListener("submit", function (e) {
  e.preventDefault();

  validateField(fullname, 0, "Full name cannot be blank");
  validateField(email, 1, "Email cannot be blank");
  validateField(password, 2, "Password cannot be blank");
  validateField(phonenumber, 3, "Phone number cannot be blank");
  validateField(text, 4, "Driver’s license number cannot be blank");
  validateField(vehicle, 5, "Vehicle make cannot be blank");
  validateField(model, 6, "Model cannot be blank");
  validateField(year, 7, "Year cannot be blank");
  validateField(color, 8, "Color cannot be blank");
  validateField(license, 9, "License plate cannot be blank");
});
