const confirmBtn = document.getElementById("confirmBtn");

// confirmBtn.style.background = "red";

confirmBtn.addEventListener("click", () => {
  console.log("this was clicked");
  window.location.href = "../DriverAssigned/driverassigned.html";
});

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
