// Get form and all input fields directly
const form = document.getElementById("form");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const phonenumber = document.getElementById("phonenumber");
const text = document.getElementById("text"); // Assuming this is Driver's License Number
const vehicle = document.getElementById("vehicle");
const model = document.getElementById("model");
const year = document.getElementById("year");
const color = document.getElementById("color");
const license = document.getElementById("license"); // Assuming this is License Plate
const errorMsg = document.getElementsByClassName("error"); // Assumes these match the input fields' order

// --- 1. SET/DISPLAY ERROR (Modified to use the class name for clarity) ---

function displayError(fieldIndex, message) {
    const errorElement = errorMsg[fieldIndex];
    if (errorElement) {
        errorElement.innerHTML = message;
        errorElement.style.color = "red";
        
        // Clear message after 3 seconds
        if (message) {
            setTimeout(() => {
                errorElement.innerHTML = "";
            }, 3000);
        }
    }
}

// --- 2. VALIDATION CORE FUNCTION ---

// This new function runs all checks and returns true only if EVERYTHING passes.
function validateAllFields() {
    let isValid = true;

    // Array of fields, their corresponding error index, and error message
    const fieldsToValidate = [
        { field: firstName, index: 0, message: "First name cannot be blank" },
        { field: lastName, index: 1, message: "Last name cannot be blank" },
        { field: email, index: 2, message: "Email cannot be blank" },
        { field: phonenumber, index: 3, message: "Phone number cannot be blank" },
        { field: password, index: 4, message: "Password cannot be blank" },
        { field: text, index: 5, message: "Driver’s license number cannot be blank" },
        { field: vehicle, index: 6, message: "Vehicle make cannot be blank" },
        { field: model, index: 7, message: "Model cannot be blank" },
        { field: year, index: 8, message: "Year cannot be blank" },
        { field: color, index: 9, message: "Color cannot be blank" },
        { field: license, index: 10, message: "License plate cannot be blank" },
    ];

    fieldsToValidate.forEach(({ field, index, message }) => {
        const value = field.value.trim();
        displayError(index, ""); // Clear previous error

        if (value === '') {
            displayError(index, message);
            isValid = false;
        } 
        
        // Specific checks for Phone Number (moved to a function to handle cleaning)
        if (field === phonenumber && value && !isValidPhone(value)) {
             displayError(index, "Phone number must be valid (digits only, no spaces/symbols).");
             isValid = false;
        }
        
        // Add more specific checks here (e.g., isValidEmail, password complexity)
    });

    return isValid;
}

// Helper for simple phone number check (you should use a more robust regex)
function isValidPhone(value) {
    // We clean the input to remove common separators for the check
    const cleanValue = value.replace(/[ \-\(\)]/g, ''); 
    // Basic check: must contain at least 7 digits and optionally a leading + sign
    return /^\+?\d{7,}$/.test(cleanValue); 
}


// --- 3. FORM SUBMIT HANDLER (Fixed Logic) ---

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // CRITICAL FIX: Run all validation first. If it fails, EXIT the function.
    if (!validateAllFields()) {
        console.log("Validation failed. Submission blocked.");
        return; 
    }
    
    // If validation passes, proceed to API call
    const userData = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        phonenumber: phonenumber.value.trim(),
        password: password.value.trim(),
        // Note: 'text' is assumed to be 'driversLicenseNumber'
        dlNumber: text.value.trim(), 
        vehicleMake: vehicle.value.trim(),
        carModel: model.value.trim(),
        productionYear: year.value.trim(),
        carColor: color.value.trim(),
        carPlateNumber: license.value.trim(), // Note: 'license' is assumed to be 'licensePlate'
    };
    
    // CRITICAL FIX: The try...catch structure is now correct.
    try {
        const response = await fetch("https://rideconnect.azurewebsites.net/api/Authentication/register-driver", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        
        if (response.ok) {
            // HTTP 200-299 status code
            alert("Registration Successful!");
            // window.location.href = "/PassengerSide/Verification/verify.html"; // Uncomment when ready
        } else {
            // HTTP 4xx or 5xx status code (e.g., email already exists)
            // Note: Ensure your API returns a clear error message in the 'result' object
            alert(`Registration Failed: ${result.message || result.title || "Something went wrong on the server."}`);
        }
    } catch (error) {
        // Network errors (e.g., API is down, no internet connection)
        console.error("Network Error:", error);
        // alert("Network error. Please check your connection and try again.");
    }
});
