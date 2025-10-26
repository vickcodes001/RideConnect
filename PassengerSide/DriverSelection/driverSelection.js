const confirmBtn = document.getElementById("confirmBtn");
const buttons = document.querySelectorAll(".dec-btn");
const cards = document.querySelectorAll(".driver-card");


// loop through the buttons to see the selected button
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    console.log("clicked");
    
  });
});

// select a driver and show the selected driver in the next page
cards.forEach((card) => {
  const acceptBtn = card.querySelector(".dec-btn");

  acceptBtn.addEventListener("click", () => {
    const name = card.querySelector("h5").innerText;
    const car = card.querySelector(".car-details p").innerText;
    const plate = card.querySelector(".car-details p:last-child").innerText;
    const image = card.querySelector(".driver-card-img").src; 
    const rating = card.querySelector(".ratings p").innerText
    
    const selectedDriver = { name, car, plate, image, rating };
    console.log("selected driver", selectedDriver);
    
    
    localStorage.setItem("selectedDriver", JSON.stringify(selectedDriver));
    
    confirmBtn.addEventListener("click", () => {
      window.location.href = "/PassengerSide/DriverAssigned/driverAssigned.html";
    });
  });
});



// this is to get the availablel drivers from the backend make the driver selected show in the next page

// // 1. Create an object
// const users = {
//   user1: "Victor",
//   user2: "Amaka",
//   user3: "John",
//   user4: "Mary",
// };

// // 2. Get the <ul> element
// const list = document.getElementById("user");

// // 3. Loop (map) through the object
// Object.keys(users).forEach((key) => {
//   const li = document.createElement("li");
//   li.textContent = users[key];
//   list.appendChild(li);
// });
