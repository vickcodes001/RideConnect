const form = document.getElementById('form');
const phoneNumber = document.getElementById('phonenumber');
const password = document.getElementById('password');

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const isValid = validateInputs();
  if (!isValid) return;

  const userData = {
    username: phoneNumber.value.trim(), // 👈 FIXED
    password: password.value.trim(),
  };

  try {
    console.log("Login payload:", userData); // This will now log {username: "..."}

    const response = await fetch("https://rideconnect.azurewebsites.net/api/Authentication/login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify(userData),
  });
    const result = await response.json();

    if (response.ok) {
      alert("Login successful!");
      
      // Optionally save user token or info (if backend returns one)
      if (result.token) {
        localStorage.setItem("authToken", result.token);
      }

      // Redirect to Passenger Dashboard (or wherever you want)
      window.location.href = "/PassengerSide/Home/home.html";

    } else if (response.status === 401) {
      alert("Invalid phone number or password. Please try again.");
    } else if (response.status === 404) {
      alert("Account not found. Please sign up first.");
    } else {
      alert(`Login failed: ${result.message || "Something went wrong"}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Network error. Please try again.");
  }
});

const phonePattern = /^\+?\d{7,15}$/; 

const validateInputs = function () {
  let isValid = true;

  const rawPhoneNumberValue = phoneNumber.value.trim();
  const cleanPhoneNumberValue = rawPhoneNumberValue.replace(/[ \-\(\)]/g, '');
  const passwordValue = password.value.trim();

  // Phone number
  if (rawPhoneNumberValue === '') {
    setError(phoneNumber, 'Phone number cannot be empty');
    isValid = false;
  } else if (!phonePattern.test(cleanPhoneNumberValue)) {
    setError(phoneNumber, 'Enter a valid number (7-15 digits, optional + prefix).');
    isValid = false;
  } else {
    setSuccess(phoneNumber);
  }

  // Password
  if (passwordValue === '') {
    setError(password, 'Password cannot be empty');
    isValid = false;
  } else if (passwordValue.length < 8) {
    setError(password, 'Password must be at least 8 characters');
    isValid = false;
  } else {
    setSuccess(password);
  }

  return isValid;
};




// error for the input fields
const setError = function (element, message) {
    const field = element.parentElement;
    const errorDisplay = field.querySelector('.error-message');

    errorDisplay.innerText = message;
    field.classList.add('error');
    field.classList.remove('success');

    setTimeout(function () {
        errorDisplay.innerText = '';
    }, 5000);
}

// success for input fields 
const setSuccess = function(element) {
    const field = element.parentElement;
    const errorDisplay = field.querySelector('.error-message'); // 👈 FIXED

    // This will now work, because errorDisplay is found
    if (errorDisplay) { 
        errorDisplay.innerText = '';
    }
    
    field.classList.add('success');
    field.classList.remove('error');
}