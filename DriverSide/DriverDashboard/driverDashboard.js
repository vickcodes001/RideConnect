const toggle = document.getElementById('toggle_switch');
const offCircle = document.querySelector('.off-circle');
const onCircle = document.querySelector('.on-circle');
const notisBell = document.getElementById('notis');
const overlay = document.getElementById('modal-overlay');
const notisCard = document.getElementById('ride-request-card-div');
const logoutBtn = document.getElementById("logout-btn");


// For the toggle switch
// --- Driver Availability Toggle ---
toggle.addEventListener("click", async function () {
  toggle.classList.toggle("active");

  if (toggle.classList.contains("active")) {
    onCircle.classList.add("active");
    offCircle.classList.add("active");
  } else {
    onCircle.classList.remove("active");
    offCircle.classList.remove("active");
  }

  // 🔹 Get token for authentication
  const token = localStorage.getItem("authToken");
  if (!token) {
    alert("You must be logged in to change your status.");
    return;
  }

  try {
    // 🔹 Call API to toggle availability
    const response = await fetch(
      "https://rideconnect.azurewebsites.net/api/Driver/toggle-is-available",
      {
        method: "PUT", // (if your backend uses POST, change it)
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Toggle failed:", errorText);
      alert("Failed to update availability: " + errorText);
      return;
    }

    const result = await response.json();
    console.log("Driver availability updated:", result);

    // Optional visual feedback
    if (toggle.classList.contains("active")) {
      alert("You are now available for rides!");
    } else {
      alert("You are now unavailable.");
    }
  } catch (error) {
    console.error("Error toggling availability:", error);
    alert("Network error. Please try again.");
  }
});

// function to remove the driver token
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("authToken");
  window.location.href = "/"
})

// for the notification popup; opening
function openPopup() {
  overlay.classList.add('active');
  notisCard.classList.add('active');

  // Clear the notification after viewing
  localStorage.removeItem("selectedDriver");

  // Hide the notification dot
  const notisShow = document.querySelector(".notis_show");
  if (notisShow) notisShow.style.visibility = "hidden";
}
notisBell.addEventListener('click', openPopup);

// for closing popup
function closePopup() {
  overlay.classList.remove('active');
  notisCard.classList.remove('active');
};

overlay.addEventListener("click", function (event) {
  if (event.target === overlay) {
    closePopup();
  }
});

console.log(" selectedDriver:", selectedDriver);
console.log(" loggedInDriver:", loggedInDriver);


// ADD THIS BLOCK AT THE VERY BOTTOM ↓↓↓
window.addEventListener("load", () => {
  const notisShow = document.querySelector(".notis_show");
  if (!notisShow) return;

  const selectedDriver = JSON.parse(localStorage.getItem("selectedDriver"));
  const loggedInDriver = JSON.parse(localStorage.getItem("loggedInDriver")); 
  // ^ This should be set when the driver logs in — contains the driver’s ID or name.

  if (selectedDriver && loggedInDriver && selectedDriver.id === loggedInDriver.id) {
    //  Show notification ONLY to the driver who was selected
    notisShow.style.visibility = "visible";
  } else {
    // Hide for all other drivers
    notisShow.style.visibility = "hidden";
  }
});

