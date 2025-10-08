document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("driver-modal");
  const modalOverlay = document.getElementById("modal-overlay");
  const contactDriverBtn = document.getElementById("contact-driver-btn");
  const closeBtn = document.querySelector(".close-btn");
  const callDriverBtn = document.getElementById("call-driver-btn");
  const container = document.getElementById("container")

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
    if (event.target === container) {
      closeModal()
    }
  });




  // Function to trigger the phone call
  callDriverBtn.addEventListener("click", function () {
    window.location.href = "tel:+234 813 380 9246";
  });
});
