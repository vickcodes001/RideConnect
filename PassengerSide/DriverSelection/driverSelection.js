const driverContainer = document.getElementById("driverContainer");
const confirmBtn = document.getElementById("confirmBtn");

let selectedDriver = null; // store currently selected driver

// --- 1️⃣ Fetch Drivers from the API ---
async function fetchDrivers() {
  try {
    const response = await fetch("https://rideconnect.azurewebsites.net/api/Driver/get-all-drivers");
const result = await response.json();

const drivers = Array.isArray(result) ? result : result.data || [];

if (!drivers.length) {
  driverContainer.innerHTML = "<p>No drivers found at the moment.</p>";
  return;
}

displayDrivers(drivers);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    driverContainer.innerHTML = "<p>Unable to load drivers. Please try again later.</p>";
  }
}

// --- 2️⃣ Display the Drivers in the Page ---
function displayDrivers(drivers) {
  driverContainer.innerHTML = ""; // clear existing content

  drivers.forEach((driver) => {
    const car = driver.driverPersonalDataResponse?.carDetails || {};

    const card = document.createElement("div");
    card.classList.add("driver-card");

    card.innerHTML = `
      <div class="first-section">
        <div>
          <img
            src="/asset/driver.jpg"
            alt="driver picture"
            class="driver-card-img"
          />
        </div>
        <div class="driver-details">
          <h5>${driver.fullName || "Unnamed Driver"}</h5>
          <div class="car-details">
            <p>${car.vehicleMake || "Unknown"} (${car.productionYear || "N/A"}), ${car.carColor || "N/A"}</p>
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

    driverContainer.appendChild(card);
  });

  setupButtonListeners();
}

// --- 3️⃣ Handle Accept / Decline Buttons ---
function setupButtonListeners() {
  const cards = document.querySelectorAll(".driver-card");

  cards.forEach((card) => {
    const acceptBtn = card.querySelector(".dec-btn");
    const declineBtn = card.querySelector(".decline-btn");

    // accept driver
    acceptBtn.addEventListener("click", () => {
      document.querySelectorAll(".dec-btn").forEach((btn) => btn.classList.remove("active"));
      acceptBtn.classList.add("active");

      const name = card.querySelector("h5").innerText;
      const car = card.querySelector(".car-details p").innerText;
      const plate = card.querySelector(".car-details p:last-child").innerText;
      const image = card.querySelector(".driver-card-img").src;

      selectedDriver = { name, car, plate, image };
      localStorage.setItem("selectedDriver", JSON.stringify(selectedDriver));
    });

    // decline driver
    declineBtn.addEventListener("click", () => {
      card.style.display = "none";
    });
  });
}

// --- 4️⃣ Confirm Selection ---
confirmBtn.addEventListener("click", () => {
  if (!selectedDriver) {
    alert("Please select a driver first!");
    return;
  }

  window.location.href = "/PassengerSide/DriverAssigned/driverAssigned.html";
});

// --- 5️⃣ Run on Page Load ---
fetchDrivers();