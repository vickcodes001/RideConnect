// const toggle = document.getElementById("toggle_switch");
// const offCircle = document.querySelector(".off-circle");
// const onCircle = document.querySelector(".on-circle");
// const notisBell = document.getElementById("notis");
// const overlay = document.getElementById("modal-overlay");
// const notisCard = document.getElementById("ride-request-card-div");
// const logoutBtn = document.getElementById("logout-btn");

// const loggedInDriver = JSON.parse(localStorage.getItem("loggedInDriver"));
// const authToken = localStorage.getItem("authToken");

// // ---------------- Toggle Switch ----------------
// toggle.addEventListener("click", function () {
//   toggle.classList.toggle("active");

//   if (toggle.classList.contains("active")) {
//     onCircle.classList.add("active");
//     offCircle.classList.add("active");
//   } else {
//     onCircle.classList.remove("active");
//     offCircle.classList.remove("active");
//   }
// });

// // ---------------- Logout ----------------
// logoutBtn.addEventListener("click", () => {
//   localStorage.removeItem("authToken");
//   window.location.href = "/";
// });

// // ---------------- Notification Popup ----------------
// function openPopup() {
//   overlay.classList.add("active");
//   notisCard.classList.add("active");

//   // Hide the notification dot after viewing
//   const notisShow = document.querySelector(".notis_show");
//   if (notisShow) notisShow.style.visibility = "hidden";
// }
// notisBell.addEventListener("click", openPopup);

// function closePopup() {
//   overlay.classList.remove("active");
//   notisCard.classList.remove("active");
// }
// overlay.addEventListener("click", function (event) {
//   if (event.target === overlay) closePopup();
// });

// // ---------------- Polling for Assigned Rides ----------------
// async function checkAssignedRides() {
//   if (!loggedInDriver || !authToken) return;

//   try {
//     const response = await fetch(
//       `https://rideconnect.azurewebsites.net/api/Driver/get-all-drivers/${loggedInDriver.id}`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${authToken}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       console.error("Failed to fetch assigned rides:", response.status);
//       return;
//     }

//     const rides = await response.json();
//     const notisShow = document.querySelector(".notis_show");

//     if (rides && rides.length > 0) {
//       notisShow.style.visibility = "visible";

//       // Update the popup with the first ride's info
//       const passengerName = rides[0].passengerName || "Passenger";
//       const location = rides[0].location;
//       const price = rides[0].price;
//       const rideType = rides[0].rideType || "Ride";

//       const rideCardTitle = document.querySelector(
//         "#ride-request-card-div .passenger-details-general h4"
//       );
//       const rideCardDesc = document.querySelector(
//         "#ride-request-card-div .passenger-details-general p"
//       );

//       if (rideCardTitle) rideCardTitle.textContent = passengerName;
//       if (rideCardDesc)
//         rideCardDesc.textContent = `${location} - ₦${price} - [${rideType}]`;
//     } else {
//       notisShow.style.visibility = "hidden";
//     }
//   } catch (err) {
//     console.error("Error fetching assigned rides:", err);
//   }
// }

// // Check every 5 seconds
// setInterval(checkAssignedRides, 5000);

// // ---------------- Initial Check on Page Load ----------------
// window.addEventListener("load", () => {
//   checkAssignedRides();
// });
