const form = document.getElementById("form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phone-number");
const password = document.getElementById("password");
const registerBtn = document.getElementById("registerBtn");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const isValid = validateInputs();
  if (!isValid) return;

  registerBtn.classList.add("loading")
  startLoading(); // Start loader immediately
  

  const userData = {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    email: email.value.trim(),
    phoneNumber: phoneNumber.value.trim(),
    password: password.value.trim(),
  };

  try {
    const response = await fetch(
      "https://rideconnect.azurewebsites.net/api/Authentication/register-user",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );

    const result = await response.json();

    // Save to localStorage
    localStorage.setItem("passengerDetails", JSON.stringify(result));

    if (response.ok) {
      alert("Registration Successful!");
      // window.location.href = "/PassengerSide/Verification/verify.html";
    } else if (response.status === 409) {
      alert("Account already exists. Please log in instead.");
    } else {
      alert(`Registration Failed: ${result.message || "Something went wrong"}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Network error. Please try again.");
  }

  stopLoading(); // Stop loader after everything
});

const phonePattern = /^\+?\d{7,15}$/;

function validateInputs() {
  let isValid = true;

  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const phoneValue = phoneNumber.value.trim();
  const passwordValue = password.value.trim();

  if (firstNameValue === "") {
    setError(firstName, "First name is required");
    isValid = false;
  } else setSuccess(firstName);

  if (lastNameValue === "") {
    setError(lastName, "Last name is required");
    isValid = false;
  } else setSuccess(lastName);

  if (emailValue === "") {
    setError(email, "Email cannot be empty");
    isValid = false;
  } else if (!/^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
    setError(email, "Enter a valid email");
    isValid = false;
  } else setSuccess(email);

  if (phoneValue === "") {
    setError(phoneNumber, "Phone number cannot be empty");
    isValid = false;
  } else if (!phonePattern.test(phoneValue)) {
    setError(phoneNumber, "Enter a valid phone number (7–15 digits)");
    isValid = false;
  } else setSuccess(phoneNumber);

  if (passwordValue.length < 8) {
    setError(password, "Password must be at least 8 characters");
    isValid = false;
  } else setSuccess(password);

  return isValid;
}

function setError(element, message) {
  const field = element.closest(".field1, .field2, .field3, .field4");
  const errorDisplay = field.querySelector(".error");
  errorDisplay.innerText = message;
  field.classList.add("error");
  field.classList.remove("success");
}

function setSuccess(element) {
  const field = element.closest(".field1, .field2, .field3, .field4");
  const errorDisplay = field.querySelector(".error");
  errorDisplay.innerText = "";
  field.classList.add("success");
  field.classList.remove("error");
}

// Loader Functions
function startLoading() {
  registerBtn.classList.add("loading");
  registerBtn.disabled = true;
}

function stopLoading() {
  registerBtn.classList.remove("loading");
  registerBtn.disabled = false;
}
