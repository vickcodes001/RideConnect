// Warning! this code will be mad long because of my wrong doings which I paid for

const form = document.getElementById('form');
const fullName = document.getElementById('full-name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const phoneNumber = document.getElementById('phone-number');

// Listen for input changes
[fullName, email, password, phoneNumber].forEach(function(input){
  input.addEventListener('input', () => validateInputs())
})


form.addEventListener('submit', function(event){
  event.preventDefault();

  validateInputs();
});

// function for validateInputs
const validateInputs = function() {
  const fullNameValue = fullName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const phoneNumberValue = phoneNumber.value.trim();

  // Fullname  
  if (fullNameValue === '') {
    setError(fullName, 'Fullname is required');
  } else {
    setSuccess(fullName);
  }
  
  // Email 
  if (emailValue === '') {
    setError(email, 'Email cannot be empty');
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
    setError(email, 'Enter a valid email');
  } else {
    setSuccess(email);
  }

  // Password
  if(passwordValue.length < 8) {
    setError(password, 'Password must be atleast 8 characters');
  } else {
    setSuccess(password);
  }

  // PhoneNumber
  if (phoneNumberValue === '') {
    setError(phoneNumber, 'Phone number cannot be empty');
  } else if (!phonePattern.test(phoneNumberValue)) {
    setError(phoneNumber, 'Enter a valid phone number (+2349012345678)'); 
  } else {
    setSuccess(phoneNumber);
  }
}  

// error for the input fields 
const setError = function(element, message) {
  const field = element.parentElement;
  const errorDisplay = field.querySelector('.error');

  errorDisplay.innerText = message;
  field.classList.add('error');
  field.classList.remove('success');
}

// success for input fields
const setSuccess = function(element) {
  const field = element.parentElement;
  const errorDisplay = field.querySelector('.error');
  
  errorDisplay.innerText = '';
  field.classList.add('success');
  field.classList.remove('error');
}

// Regex to allow optional + sign, followed by 7–15 digits (ITU standard)
const phonePattern = /^\+?[1-9]\d{6,14}$/;


