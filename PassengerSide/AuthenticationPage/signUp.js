const form = document.getElementById('form');
const fullName = document.getElementById('full-name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const phoneNumber = document.getElementById('phone-number');

form.addEventListener('submit', function(event){
  event.preventDefault();

  validateInputs();
});

// Regex to allow optional + sign, followed by 7–15 digits (ITU standard)
const phonePattern = /^\+?\d{7,15}$/; 

// function for validateInputs
const validateInputs = function() {
  let isValid = true; 

  const fullNameValue = fullName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  const rawPhoneNumberValue = phoneNumber.value.trim();
  const cleanPhoneNumberValue = rawPhoneNumberValue.replace(/[ \-\(\)]/g, '');

  // Fullname  
  if (fullNameValue === '') {
    setError(fullName, 'Fullname is required');
  } else {
    setSuccess(fullName);
  }
  
  // Email 
  if (emailValue === '') {
    setError(email, 'Email address cannot be empty');
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
  if (rawPhoneNumberValue === '') {
    setError(phoneNumber, 'Phone number cannot be empty');
    isValid = false;
  } else if (!phonePattern.test(cleanPhoneNumberValue)) {
    setError(phoneNumber, 'Enter a valid number (7-15 digits, optional + prefix).'); 
    isValid = false;
  } else {
    setSuccess(phoneNumber);
  }

  // Return the final status
  return isValid;
}  

// error for the input fields 
const setError = function(element, message) {
    const field = element.parentElement.classList.contains('field4B')
        ? element.parentElement.parentElement
        : element.parentElement;

    const errorDisplay = field.querySelector('.error');

    errorDisplay.innerText = message;
    field.classList.add('error');
    field.classList.remove('success');

    // error timeout function
    setTimeout(() => errorDisplay.innerText = '', 5000); 
}

// success for input fields
const setSuccess = function(element) {
    const field = element.parentElement.classList.contains('field4B')
        ? element.parentElement.parentElement
        : element.parentElement;
        
    const errorDisplay = field.querySelector('.error');
    
    errorDisplay.innerText = '';
    field.classList.add('success');
    field.classList.remove('error');
}


