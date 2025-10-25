// Helper functions
let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);

// Form fields and elements
let fullname = id("fullname"),
    email = id("email"),
    password = id("password"),
    phonenumber = id("phonenumber"),
    text = id("text"),
    vehicle = id("vehicle"),
    model = id("model"),
    year = id("year"),
    color = id("color"),
    license = id("license"),
    form = id("form"),
    errorMsg = classes("error"),
    successIcon = classes("success-icon"),
    failureIcon = classes("failure-icon");

// Validation engine
let engine = (field, serial, message) => {
    const value = field.value.trim();

    // Special check for phone number
    if (field === phonenumber && value && !/^\d+$/.test(value)) {
        errorMsg[serial].innerHTML = "Phone number must contain only digits";
        failureIcon[serial].style.opacity = "1";
        successIcon[serial].style.opacity = "0";
        return;
    }

    if (value === "") {
        errorMsg[serial].innerHTML = message;
        failureIcon[serial].style.opacity = "1";
        successIcon[serial].style.opacity = "0";

        // Clear error after 3 seconds
        setTimeout(() => {
            errorMsg[serial].innerHTML = "";
            failureIcon[serial].style.opacity = "0";
        }, 3000);
    } else {
        errorMsg[serial].innerHTML = "";
        failureIcon[serial].style.opacity = "0";
        successIcon[serial].style.opacity = "1";

        // Hide success icon after 3 seconds
        setTimeout(() => {
            successIcon[serial].style.opacity = "0";
        }, 3000);
    }
};

// Form submit validation
form.addEventListener("submit", (e) => {
    e.preventDefault();
    engine(fullname, 0, "Fullname cannot be blank");
    engine(email, 1, "Email cannot be blank");
    engine(password, 2, "Password cannot be blank");
    engine(phonenumber, 3, "Phone number cannot be blank");
    engine(text, 4, "Text cannot be blank");
    engine(vehicle, 5, "Vehicle cannot be blank");
    engine(model, 6, "Model cannot be blank");
    engine(year, 7, "Year cannot be blank");
    engine(color, 8, "Color cannot be blank");
    engine(license, 9, "License cannot be blank");
});

// Real-time phone number input check
phonenumber.addEventListener("input", () => {
    engine(phonenumber, 3, "Phone number cannot be blank");
});







