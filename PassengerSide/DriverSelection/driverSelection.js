const driverContainer = document.getElementById("driverContainer");
const confirmBtn = document.getElementById("confirmBtn");

let selectedDriver = null; // store currently selected driver

// --- Fetch Drivers from the API ---
async function fetchDrivers() {
  try {
    const response = await fetch(
      "https://rideconnect.azurewebsites.net/api/Driver/get-all-drivers"
    );
    const result = await response.json();

    const drivers = Array.isArray(result) ? result : result.data || [];

    if (!drivers.length) {
      driverContainer.innerHTML = "<p>No drivers found at the moment.</p>";
      return;
    }

    displayDrivers(drivers);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    driverContainer.innerHTML =
      "<p>Unable to load drivers. Please try again later.</p>";
  }
}

// --- Display the Drivers in the Page ---
function displayDrivers(drivers) {
  driverContainer.innerHTML = ""; // clear existing content

  drivers.forEach((driver) => {
    const car = driver.driverPersonalDataResponse?.carDetails || {};

    const card = document.createElement("div");
    card.classList.add("driver-card");

    card.dataset.driverId = driver.id;

    card.innerHTML = `
      <div class="first-section">
        <div>
          <img src="/asset/driver.jpg" alt="driver picture" class="driver-card-img" loading="lazy"/>
        </div>
        <div class="driver-details">
          <h5>${driver.fullName || "Unnamed Driver"}</h5>
          <div class="car-details">
            <p>${car.vehicleMake || "Unknown"} (${
      car.productionYear || "N/A"
    }), ${car.carColor || "N/A"}</p>
            <p>Plate: ${car.carPlateNumber || "N/A"}</p>
          </div>
        </div>
      </div>

      <div class="second-section">
        <div class="decision-btn">
          <button class="decline-btn">Decline</button>
          <button class="dec-btn">Accept</button>
        </div>
      </div>
    `;

    // 🔹 Attach driver data directly to the card element
    card.dataset.driver = JSON.stringify(driver);

    driverContainer.appendChild(card);
  });

  setupButtonListeners();
}

// --- Handle Accept / Decline Buttons ---
function setupButtonListeners() {
  const cards = document.querySelectorAll(".driver-card");

  cards.forEach((card) => {
    const acceptBtn = card.querySelector(".dec-btn");
    const declineBtn = card.querySelector(".decline-btn");

    // accept driver
    acceptBtn.addEventListener("click", () => {
      document
        .querySelectorAll(".dec-btn")
        .forEach((btn) => btn.classList.remove("active"));
      acceptBtn.classList.add("active");

      // ✅ Get the actual driver data stored in the card
      const driver = JSON.parse(card.dataset.driver);
      const car = driver.driverPersonalDataResponse?.carDetails || {};

      selectedDriver = {
        id: driver.driverPersonalDataResponse?.id,  // ✅ use actual driver ID
        name: driver.fullName || "Unnamed Driver",
        car: `${car.vehicleMake || "Unknown"} (${car.productionYear || "N/A"}), ${car.carColor || "N/A"}`,
        plate: car.carPlateNumber || "N/A",
        image: "/asset/driver.jpg",
};

      // ✅ Save to localStorage
      localStorage.setItem("selectedDriver", JSON.stringify(selectedDriver));
      console.log("✅ Driver selected:", selectedDriver);
    });

    // decline driver
    declineBtn.addEventListener("click", () => {
      card.style.display = "none";
    });
  });
}

// --- Confirm Selection ---
confirmBtn.addEventListener("click", async () => {
  if (!selectedDriver) {
    alert("Please select a driver first!");
    return;
  }

  const rideSelection = JSON.parse(localStorage.getItem("rideSelection"));
  if (!rideSelection) {
    alert("Pickup or destination missing. Please go back and select again.");
    return;
  }

  const destination = rideSelection.destination;
  const rideData = {
    request: "Passenger ride request", // ✅ required by backend
    location: destination,             // ✅ send only the destination name as string
    rideTypeId: 1,
    driverId: selectedDriver.id,
    price: 2000,
  };

  try {
    const response = await fetch(
      "https://rideconnect.azurewebsites.net/api/RideManagement/book-ride",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rideData),
      }
    );

    const raw = await response.text();
    console.log("Raw Response:", raw);

    if (!response.ok) {
      alert("Ride booking failed: " + raw);
      return;
    }

    // ✅ Save selected driver for notification
    localStorage.setItem("selectedDriver", JSON.stringify(selectedDriver));

    alert("Ride booked successfully!");
    window.location.href = "/PassengerSide/DriverAssigned/driverAssigned.html";
  } catch (error) {
    console.error("Error booking ride:", error);
    alert("Error booking ride. Try again.");
  }
});


// --- Run on Page Load ---
fetchDrivers();
