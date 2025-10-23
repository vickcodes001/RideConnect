let id = (id) => document.getElementById(id);

let classes = (classes) => document.getElementsByClassName(classes);


let phonenumber = id("phonenumber"),
    password = id("password"),
    form = id("form"),
    errorMsg = classes("error"),
    successIcon = classes("success-icon"),
    failureIcon = classes("failure-icon");




form.addEventListener("submit", (e) => {
    e.preventDefault();
    engine(phonenumber, 0, "phone number cannot be blank");
    engine(password, 1, "password cannot be blank");

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

















