//=========getting latitude & longitude from user/patient=========

let rideRequested = false; // Flag to track whether ride is already requested

document.getElementById('request-ride-button').addEventListener('click', () => {
    if (rideRequested) {
        console.log("Ride already requested.");
        return; // If ride is already requested, exit the function
    }

    rideRequested = true; // Set flag to true to indicate ride is requested

    navigator.geolocation.getCurrentPosition(position => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;

        fetch('http://localhost:3000/user/req', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userLatitude,
                userLongitude
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); 
            // You could update the UI here based on the response
        })
        .catch(error => {
            console.error('Error requesting ride:', error);
            // Handle any errors that might occur during the fetch
            // This is where you might show an error message to the user
        })
        .finally(() => {
            rideRequested = false; // Reset flag after request is complete
        });
    }, error => {
        console.error('Error getting location:', error);
        // Handle errors that might occur when trying to get the user's location
        rideRequested = false; // Reset flag if error occurs
    });
});


//=========getting latitude & longitude from driver=========

// let dloc = false;

// document.getElementById('driver-loc-button').addEventListener('click', () => {
//     if (dloc) {
//         console.log("location already sented.");
//         return;
//     }

//     dloc = true;

//     navigator.geolocation.getCurrentPosition(position => {
//         const userLatitude = position.coords.latitude;
//         const userLongitude = position.coords.longitude;

//         fetch('http://localhost:3000/driver/location', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 userLatitude,
//                 userLongitude
//             })
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log(data); 
//         })
//         .catch(error => {
//             console.error('Error requesting ride:', error);
//         })
//         .finally(() => {
//             dloc = false;
//         });
//     }, error => {
//         console.error('Error getting location:', error);
//         dloc = false;
//     });
// });

document.getElementById('start-driver-loc-button').addEventListener('click', () => {
    // Functionality for the maps API
    startMapFunction(); // This is a placeholder for whatever you need to do with the map.
  
    // Your existing code for sending the driver's location.
    navigator.geolocation.getCurrentPosition(position => {
      const driverLatitude = position.coords.latitude;
      const driverLongitude = position.coords.longitude;
  
      fetch('http://localhost:3000/driver/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          driverLatitude,
          driverLongitude
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then(data => {
        console.log(data); 
      })
      .catch(error => {
        console.error('Error requesting ride:', error);
      });
    }, error => {
      console.error('Error getting location:', error);
    });
  });
  
  // Placeholder function for the maps API functionality
  function startMapFunction() {
    // Insert code related to the map's API here.
    console.log('Map functionality triggered.');
  }
  