const toggle = document.getElementById('toggle_switch');
const offCircle = document.querySelector('.off-circle');
const onCircle = document.querySelector('.on-circle');
const notisBell = document.getElementById('notis');
const overlay = document.getElementById('modal-overlay');
const notisCard = document.getElementById('ride-request-card-div');

// For the toogle switch
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
};
notisBell.addEventListener('click', openPopup);

// for closing popup
function closePopup() {
  overlay.classList.remove('active');
  notisCard.classList.remove('active');
};

// notisBell.addEventListener('click', closePopup);

overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      closePopup();
    }
  });


// function to show the driver name
const driverName = localStorage.getItem("driverName")
console.log("driver name", driverName);


// Display name on dashboard if found
if (driverName) {
  const driverNameDisplay = document.getElementById("driver-name");
  driverNameDisplay.textContent = `${driverName}`;
} else {
  console.warn("No driver name found in localStorage");
}