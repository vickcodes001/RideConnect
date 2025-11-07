const form = document.getElementById("form");
const phoneNumber = document.getElementById("phonenumber");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const isValid = validateInputs();
  if (!isValid) return;

  loginBtn.classList.add("loading");
  startLoading(); //start loading

  const userData = {
    username: phoneNumber.value.trim(),
    password: password.value.trim(),
  };

  try {
    console.log("Login payload:", userData);

    const response = await fetch(
      "https://rideconnect.azurewebsites.net/api/Authentication/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(userData),
      }
    );
    const result = await response.json();

    if (response.ok) {
  console.log("Full login response:", result);

  // Save the token
  if (result.token) {
    localStorage.setItem("authToken", result.token);
  }

  const userRole = result.data.userType; 

  if (userRole === "Driver") {
    // 🟢 Save driver info for dashboard notification check
    const driverData = {
      id: result.data.driverPersonalDataResponse?.id || result.data.id || result.data.userId,
      fullName: `${result.data.firstName || ""} ${result.data.lastName || ""}`.trim(),
      phoneNumber: result.data.phoneNumber,
};
localStorage.setItem("loggedInDriver", JSON.stringify(driverData));

    // Redirect to Driver Dashboard
    window.location.href = "/DriverSide/DriverDashboard/driverDashboard.html";

  } else {
    // Redirect to Passenger Location Page
    window.location.href = "/PassengerSide/LocationSelectionPage/locationSelection.html";
  }
}
  } catch (error) {
    console.error("Error:", error);
  }

  stopLoading(); //stop loading after everything
});

const phonePattern = /^\+?\d{7,15}$/;

const validateInputs = function () {
  let isValid = true;

  const rawPhoneNumberValue = phoneNumber.value.trim();
  const cleanPhoneNumberValue = rawPhoneNumberValue.replace(/[ \-\(\)]/g, "");
  const passwordValue = password.value.trim();

  // Phone number
  if (rawPhoneNumberValue === "") {
    setError(phoneNumber, "Phone number cannot be empty");
    isValid = false;
  } else if (!phonePattern.test(cleanPhoneNumberValue)) {
    setError(
      phoneNumber,
      "Enter a valid number (7-15 digits, optional + prefix)."
    );
    isValid = false;
  } else {
    setSuccess(phoneNumber);
  }

  // Password
  if (passwordValue === "") {
    setError(password, "Password cannot be empty");
    isValid = false;
  } else if (passwordValue.length < 8) {
    setError(password, "Password must be at least 8 characters");
    isValid = false;
  } else {
    setSuccess(password);
  }

  return isValid;
};

// error for the input fields
const setError = function (element, message) {
  // find the closest parent that has the error-message div
  const field = element.closest('.field-input');
  const errorDisplay = field.querySelector('.error-message');

  errorDisplay.innerText = message;
  field.classList.add('error');
  field.classList.remove('success');

  setTimeout(() => {
    errorDisplay.innerText = '';
  }, 5000);
};

const setSuccess = function (element) {
  const field = element.closest('.field-input');
  const errorDisplay = field.querySelector('.error-message');

  if (errorDisplay) {
    errorDisplay.innerText = '';
  }

  field.classList.add('success');
  field.classList.remove('error');
};

//loader functions
function startLoading() {
  loginBtn.classList.add("loading");
  loginBtn.disabled = true;
}

function stopLoading() {
  loginBtn.classList.remove("loading");
  loginBtn.disabled = false;
}

// Toggle password visibility
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);

  // Add slash effect (optional)
  togglePassword.classList.toggle('slash', type === 'text');
});
