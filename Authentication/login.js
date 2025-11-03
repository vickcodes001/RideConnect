const form = document.getElementById('form');
const phoneNumber = document.getElementById('phonenumber');
const password = document.getElementById('password');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    validateInputs();
});

const phonePattern = /^\+?\d{7,15}$/; 

const validateInputs = function () {
    let isValid = true;

    const rawPhoneNumberValue = phoneNumber.value.trim();
    const cleanPhoneNumberValue = rawPhoneNumberValue.replace(/[ \-\(\)]/g, '');

    const passwordValue = password.value.trim();
    
    // phonenumber 
    if(rawPhoneNumberValue === '') {
        setError(phoneNumber, 'Phone number cannot be empty');
    } else if (!phonePattern.test(cleanPhoneNumberValue)) {
        setError(phoneNumber, 'Enter a valid number (7-15 digits, optional + prefix).')
    } else {
        setSuccess(phoneNumber);
    }

    //password
    if (passwordValue === '') {
        setError(password, 'Password cannot be empty');
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be atleast 8 characters');
    } else {
        setSuccess(password)
    }

    // if (isValid) {
    //     window.location.href = "../PassengerSide/LocationSelectionPage/locationSelection.html";
    // }
}



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
    const errorDisplay = field.querySelector('.error');

    errorDisplay.innerText = '';
    field.classList.add('success');
    field.classList.remove('error');
}

