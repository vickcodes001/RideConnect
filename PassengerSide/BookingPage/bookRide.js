// Runs when the page loads
document.addEventListener("DOMContentLoaded", function () {
  const rideData = JSON.parse(localStorage.getItem("selectedRide"));
  const errorMessage = document.querySelector(".error-message");
  const confirmButton = document.getElementById("confirm-ride");

  // If no ride data exists, redirect user
  if (!rideData) {
    window.location.href = "location.html";
    return;
  }

  // Format currency for UI
  const formatPrice = (price) =>
    "₦" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const soloPrice = parseInt(rideData.soloPrice);
  const sharedPrice = parseInt(rideData.sharedPrice);
  const destiName = rideData.destiName;
  const savedAmount = soloPrice - sharedPrice;

  // Display prices and destination in UI
  document.getElementById("solo-price").textContent = formatPrice(soloPrice);
  document.getElementById("shared-price").textContent =
    formatPrice(sharedPrice);
  document.getElementById("solo-desti-name").textContent = destiName;
  document.getElementById("shared-desti-name").textContent = destiName;
  document.getElementById("comparison-solo").textContent =
    formatPrice(soloPrice);
  document.getElementById("comparison-shared").textContent =
    formatPrice(sharedPrice);
  document.getElementById("saved-amount").textContent =
    formatPrice(savedAmount);

  // Handle Confirm Ride button
  confirmButton.addEventListener("click", function (e) {
    const rideSelection = JSON.parse(localStorage.getItem("rideSelection"));

    // Stop if user has not selected a ride type
    if (!rideSelection) {
      e.preventDefault();
      errorMessage.textContent = "Please select a ride type (Solo or Shared)";
      setTimeout(() => (errorMessage.textContent = ""), 3000);
      return;
    }

    console.log("Ride selection saved:", rideSelection);

    // Proceed to next page
    window.location.href = "../DriverSelection/driverSelection.html";
  });
});

// Triggered when user selects Solo or Shared
function selectRideType(type) {
  const rideData = JSON.parse(localStorage.getItem("selectedRide"));

  // Prepare object containing type, destination and price
  const price = type === "solo" ? rideData.soloPrice : rideData.sharedPrice;

  const rideSelection = {
    type,
    destination: rideData.destiName,
    price,
  };

  // Store everything in one localStorage item
  localStorage.setItem("rideSelection", JSON.stringify(rideSelection));
  console.log("Saved to storage:", rideSelection);

  // UI highlight for selected ride
  const soloElement = document.querySelector(".solo-ride");
  const sharedElement = document.querySelector(".shared-ride");

  if (type === "solo") {
    soloElement.style.borderColor = "#7cd04f";
    soloElement.style.backgroundColor = "#f0f9eb";
    sharedElement.style.borderColor = "#071a39";
    sharedElement.style.backgroundColor = "white";
  } else {
    sharedElement.style.borderColor = "#7cd04f";
    sharedElement.style.backgroundColor = "#f0f9eb";
    soloElement.style.borderColor = "#071a39";
    soloElement.style.backgroundColor = "white";
  }
}
