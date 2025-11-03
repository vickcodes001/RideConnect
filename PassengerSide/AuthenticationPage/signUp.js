const form = document.getElementById('form');
const fullName = document.getElementById('full-name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const phoneNumber = document.getElementById('phone-number');

form.addEventListener('submit', async function(event) {
  event.preventDefault();

  const isValid = validateInputs();

  if (!isValid) return;

  const userData = {
    fullName: fullName.value.trim(),
    email: email.value.trim(),
    password: password.value.trim(),
    phoneNumber: phoneNumber.value.trim()
  };

  try {
    const response = await fetch("https://rideconnect.azurewebsites.net/api/Authentication/register-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    const result = await response.json();

    if (response.ok) {
      alert("Registration Successful!");
      window.location.href = "/PassengerSide/Verification/verify.html";
    } else {
      alert(`Registration Failed: ${result.message || "Something went wrong"}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Network error. Please try again.");
  }
});

const phonePattern = /^\+?\d{7,15}$/;

function validateInputs() {
  let isValid = true;

  const fullNameValue = fullName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const phoneValue = phoneNumber.value.trim();

  if (fullNameValue === '') {
    setError(fullName, 'Full name is required');
    isValid = false;
  } else {
    setSuccess(fullName);
  }

  if (emailValue === '') {
    setError(email, 'Email cannot be empty');
    isValid = false;
  } else if (!/^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
    setError(email, 'Enter a valid email');
    isValid = false;
  } else {
    setSuccess(email);
  }

  if (passwordValue.length < 8) {
    setError(password, 'Password must be at least 8 characters');
    isValid = false;
  } else {
    setSuccess(password);
  }

  if (phoneValue === '') {
    setError(phoneNumber, 'Phone number cannot be empty');
    isValid = false;
  } else if (!phonePattern.test(phoneValue)) {
    setError(phoneNumber, 'Enter a valid phone number (7–15 digits)');
    isValid = false;
  } else {
    setSuccess(phoneNumber);
  }

  return isValid;
}

function setError(element, message) {
  const field = element.closest('.field1, .field2, .field3, .field4');
  const errorDisplay = field.querySelector('.error');
  errorDisplay.innerText = message;
  field.classList.add('error');
  field.classList.remove('success');
}

function setSuccess(element) {
  const field = element.closest('.field1, .field2, .field3, .field4');
  const errorDisplay = field.querySelector('.error');
  errorDisplay.innerText = '';
  field.classList.add('success');
  field.classList.remove('error');
}
