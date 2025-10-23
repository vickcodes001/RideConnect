let id = (id) => document.getElementById(id);

let classes = (classes) => document.getElementsByClassName(classes);


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



form.addEventListener("submit", (e) => {
    e.preventDefault();

    engine(fullname, 0, "Fullname cannot be blank");
    engine(email, 1, "email cannot be blank");
    engine(password, 2, "password cannot be blank");
    engine(phonenumber, 3, "phonenumber cannot be blank");
    engine(text, 4, "text cannot be blank");
    engine(vehicle, 5, "vehicle cannot be blank");
    engine(model, 6, "model cannot be blank");
    engine(year, 7, "year cannot be blank");
    engine(color, 8, "color cannot be blank");
    engine(license, 9, "cannot be blank");

});



let engine = (id, serial, message) => {
    if (id.value.trim() === "") {
        errorMsg[serial].innerHTML = message;
        failureIcon[serial].style.opacity = "1";
        successIcon[serial].style.opacity = "0";
        // Hide after 3 seconds
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






