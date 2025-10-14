
document.addEventListener('DOMContentLoaded', function() {

    const searchInput = document.getElementById('search');
    const destinations = document.querySelectorAll('.places');
    
    // Create the "not found" message
    const notFoundMessage = document.createElement('p');
    notFoundMessage.textContent = 'Destination not found';
    notFoundMessage.style.display = 'none';
    notFoundMessage.style.textAlign = 'center';
    notFoundMessage.style.marginTop = '1rem';
    notFoundMessage.style.color = 'gray';
    document.body.appendChild(notFoundMessage); // You can append this somewhere else if needed

    searchInput.addEventListener('input', function(event) {

        const searchQuery = event.target.value.toLowerCase().trim();
        let matchFound = false;

        destinations.forEach(function(destination) {
            const destinationName = destination.querySelector('p').textContent.toLowerCase();

            if (destinationName.includes(searchQuery)) {
                destination.style.display = 'flex';
                matchFound = true;
            } else {
                destination.style.display = 'none';
            }
        });

        // Show message only if no match found
        if (!matchFound && searchQuery !== '') {
            notFoundMessage.style.display = 'block';
        } else {
            notFoundMessage.style.display = 'none';
        }
    });

});

function selectDestination(destination, soloPrice, sharedPrice) {
    const rideData = {
        destination: destination,
        soloPrice: soloPrice,
        sharedPrice: sharedPrice
    };
    localStorage.setItem('selectedRide', JSON.stringify(rideData));
    window.location.href = '../BookingPage/bookRide.html';
}