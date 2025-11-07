const toggle = document.getElementById('toggle_switch');
const offCircle = document.querySelector('.off-circle');
const onCircle = document.querySelector('.on-circle');
const notisBell = document.getElementById('notis');
const overlay = document.getElementById('modal-overlay');
const notisCard = document.getElementById('ride-request-card-div');

// For the toggle switch
toggle.addEventListener('click', function () {
  toggle.classList.toggle('active');

  if (toggle.classList.contains('active')) {
    onCircle.classList.add('active');
    offCircle.classList.add('active');
  } else {
    onCircle.classList.remove('active');
    offCircle.classList.remove('active');
  }
}); 

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

console.log("✅ selectedDriver:", selectedDriver);
console.log("✅ loggedInDriver:", loggedInDriver);


// 🟢 ADD THIS BLOCK AT THE VERY BOTTOM ↓↓↓
window.addEventListener("load", () => {
  const notisShow = document.querySelector(".notis_show");
  if (!notisShow) return;

  const selectedDriver = JSON.parse(localStorage.getItem("selectedDriver"));
  const loggedInDriver = JSON.parse(localStorage.getItem("loggedInDriver")); 
  // ^ This should be set when the driver logs in — contains the driver’s ID or name.

  if (selectedDriver && loggedInDriver && selectedDriver.id === loggedInDriver.id) {
    // ✅ Show notification ONLY to the driver who was selected
    notisShow.style.visibility = "visible";
  } else {
    // ❌ Hide for all other drivers
    notisShow.style.visibility = "hidden";
  }
});
