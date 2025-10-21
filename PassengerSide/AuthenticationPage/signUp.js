// Warning! this code will be mad long because of my wrong doings which I paid for

const form = document.getElementById('form');
const fullName = document.getElementById('full-name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const phoneNumber = document.getElementById('phone-number');

// Listen for input changes
[fullName, email, password, phoneNumber].forEach(function(input){
  input.addEventListener('input', validateInputs)
})


form.addEventListener('submit', function(event){
  event.preventDefault();

  validateInputs();
});

// error for field 1
const setError1 = function(element, message) {
  const field1 = element.parentElement;
  const errorDisplay = field1.querySelector('.error');

  errorDisplay.innerText = message;
  field1.classList.add('error');
  field1.classList.remove('success');
}

// success for field 1
const setSuccess1 = function(element) {
  const field1= element.parentElement;
  const errorDisplay = field1.querySelector('.error');

  errorDisplay.innerText = '';
  field1.classList.add('success');
  field1.classList.remove('error');
}

const validateInputs = function() {
  const fullNameValue = fullName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const phoneNumberValue = phoneNumber.value.trim();

  if(fullNameValue === '') {
    setError1(fullName, 'Fullname is required');
  } else {
    setSuccess1(fullName);
  }
  console.log('Nna mehn');
