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

    confirmButton.addEventListener('click', async function(e) {
        // Prevent default action if needed
        e.preventDefault();

        // read which ride type user picked
        const rideType = localStorage.getItem('selectedRideType');

        // if no selection, show error and stop
        if (!rideType) {
            errorMessage.textContent = 'Please select a ride type (Solo or Shared)';
            setTimeout(() => {
                errorMessage.textContent = '';
            }, 3000);
            return;
        }

        // clear any previous error
        errorMessage.textContent = '';

        // get the stored ride data we used to populate the page
        const storedRide = JSON.parse(localStorage.getItem('selectedRide'));
        if (!storedRide) {
            alert('Ride data lost, please choose destination again.');
            window.location.href = 'location.html';
            return;
        }

        // build the object the API expects
        const dataToSend = {
            from: "Akanu Ibiam International Airport",
            location: storedRide.destiName,
            rideTypeId: rideType, // 'solo' or 'shared'
            driverId: "12345", // replace with actual driver id if available
            price: rideType === 'solo' ? storedRide.soloPrice.toString() : storedRide.sharedPrice.toString()
        };

        console.log('Sending to API:', dataToSend);

        // call the API using fetch
        try {
            const response = await fetch('https://rideconnect.azurewebsites.net/api/RideManagement/book-ride', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            // if server returned 4xx or 5xx, handle as error
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server error text:', errorText);
                throw new Error(`Server responded with status ${response.status}`);
            }

            // parse JSON response
            const result = await response.json();
            console.log('API Response:', result);

            // success feedback and optional redirect
            alert('Ride booked successfully!');
            // window.location.href = 'confirmation.html';
        } catch (err) {
            console.error('Booking failed:', err);
            alert('Something went wrong while booking the ride. Try again.');
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
