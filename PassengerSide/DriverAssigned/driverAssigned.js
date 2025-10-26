document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("driver-modal");
  const modalOverlay = document.getElementById("modal-overlay");
  const contactDriverBtn = document.getElementById("contact-driver-btn");
  const closeBtn = document.getElementById("close-btn");
  const callDriverBtn = document.getElementById("call-driver-btn");
  const cancelRideBtn = document.getElementById("cancel-ride-btn");
  const cancelModal = document.getElementById("cancel-modal");
  const goBackBtn = document.getElementById("go-back-btn");
  const confirmCancellationBtn = document.getElementById(
    "confirm-cancellation-btn"
  );

  // Function to open the modal
  contactDriverBtn.addEventListener("click", function () {
    modal.classList.add("active");
    modalOverlay.classList.add("active");
  });

  // Function to close the modal
  function closeModal() {
    modal.classList.remove("active");
    modalOverlay.classList.remove("active");
  }

  closeBtn.addEventListener("click", closeModal);

  // Close the modal if user clicks on the overlay
  window.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });

  // Function to trigger the phone call
  callDriverBtn.addEventListener("click", function () {
    window.location.href = "tel:+234 9130 5334 42";
  });

  // Cancel ride flow
  cancelRideBtn.addEventListener("click", function () {
    cancelModal.classList.add("active");
    modalOverlay.classList.add("active");
  });

  // Function to close cancel modal
  function closeCancelModal() {
    cancelModal.classList.remove("active");
    modalOverlay.classList.remove("active");
  }

  // Closing Cancel ride flow: both when they click on overlay and close
  window.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
      closeCancelModal();
    }
  });

  // functionality for the "Go Back Button"
  goBackBtn.addEventListener("click", function closeCancelModal() {
    cancelModal.classList.remove("active");
    modalOverlay.classList.remove("active");
  });

  // function to display the selected driver
  // get driver data
  const driver = JSON.parse(localStorage.getItem("selectedDriver"));
  console.log("selected driver", driver);

  // MAIN SECTION
  const mainSection = document.getElementById("main-driver-info");
  mainSection.querySelector(".name").innerText = driver.name;
  mainSection.querySelector(".car").innerText = driver.car;
  mainSection.querySelector(".plate").innerText = driver.plate;
  mainSection.querySelector(".image").src = driver.image;
  mainSection.querySelector(".rating").innerText = driver.rating;

  // MODAL SECTION
  modal.querySelector(".name").innerText = driver.name;
  modal.querySelector(".car").innerText = driver.car;
  modal.querySelector(".plate").innerText = driver.plate;
  modal.querySelector(".image").src = driver.image;
  modal.querySelector(".rating").innerText = driver.rating;

  // Redirection section for confirm cancellation button
  confirmCancellationBtn.addEventListener("click", function () {
    window.location.href =
      "/PassengerSide/DriverSelection/driverSelection.html";
  });
});
