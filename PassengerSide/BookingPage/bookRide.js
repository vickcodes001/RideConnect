document.addEventListener('DOMContentLoaded', function() {
    const rideData = JSON.parse(localStorage.getItem('selectedRide'));
    const errorMessage = document.querySelector('.error-message');
    const confirmButton = document.getElementById('confirm-ride');

    if (rideData) {
        const formatPrice = (price) => {
            return '₦' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        const soloPrice = parseInt(rideData.soloPrice);
        const sharedPrice = parseInt(rideData.sharedPrice);
        const destiName = rideData.destiName;
        const savedAmount = soloPrice - sharedPrice;

        document.getElementById('solo-price').textContent = formatPrice(soloPrice);
        document.getElementById('shared-price').textContent = formatPrice(sharedPrice);
        document.getElementById('solo-desti-name').textContent = destiName;
        document.getElementById('shared-desti-name').textContent =destiName;
        document.getElementById('comparison-solo').textContent = formatPrice(soloPrice);
        document.getElementById('comparison-shared').textContent = formatPrice(sharedPrice);
        document.getElementById('saved-amount').textContent = formatPrice(savedAmount);

        localStorage.setItem('selectedRideType', '');
    } else {
        alert('No destination selected! Redirecting...');
        window.location.href = 'location.html';
    }

    // Prevent confirm when no ride selected
    confirmButton.addEventListener('click', function(e) {
        const rideType = localStorage.getItem('selectedRideType');
        if (!rideType) {
            e.preventDefault();
            errorMessage.textContent = 'Please select a ride type (Solo or Shared)';

            setTimeout (() => {
                errorMessage.textContent = '';
            }, 3000);
        } else {
            errorMessage.textContent = '';
        }
    });
});

function selectRideType(rideType) {
    localStorage.setItem('selectedRideType', rideType);

    const soloElement = document.querySelector('.solo-ride');
    const sharedElement = document.querySelector('.shared-ride');
    const errorMessage = document.querySelector('.error-message');

    // Clear the error when user selects something
    errorMessage.textContent = '';

    if (rideType === 'solo') {
        soloElement.style.borderColor = '#7cd04f';
        soloElement.style.backgroundColor = '#f0f9eb';
        sharedElement.style.borderColor = '#071a39';
        sharedElement.style.backgroundColor = 'white';
    } else {
        sharedElement.style.borderColor = '#7cd04f';
        sharedElement.style.backgroundColor = '#f0f9eb';
        soloElement.style.borderColor = '#071a39';
        soloElement.style.backgroundColor = 'white';
    }
}
