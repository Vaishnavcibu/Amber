
var map = L.map('map').setView([51.505, -0.09], 3);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


let user_marker, ambulance_marker, user_circle, user, userCord, driverLatitude, driverLongitude, accuracy;
let isFirstSuccess = true;
let isSecondSuccess = false;
const amulanceIcon  = L.icon({
    iconUrl: 'ambulance.png',
    iconSize: [120, 70]
})

navigator.geolocation.watchPosition(success);
document.querySelector('#start-driver-loc-button').addEventListener('click', () => {
    L.Routing.control({
        waypoints: [
          L.latLng(driverLatitude, driverLongitude),
          L.latLng(userCord[0], userCord[1])
        ]
      }).on('routesfound', function (e) {
        var routes = e.routes;
        console.log(routes);

        e.routes[0].coordinates.forEach(function (coord, index) {
            setTimeout(function () {
                user_marker.setLatLng([coord.lat, coord.lng]);
            }, 1000 * index)
        })

    }).addTo(map);
});



function success(pos) {
    if(user_marker) {
        map.removeLayer(user_marker);
    }

    if(user_circle) {
        map.removeLayer(user_circle)
    }
    driverLatitude = pos.coords.latitude;
    driverLongitude = pos.coords.longitude;
    accuracy = pos.coords.accuracy;
    console.log(driverLatitude, driverLongitude);
    
    user_marker = L.marker([driverLatitude, driverLongitude], {icon: amulanceIcon }).addTo(map);
    user_circle = L.circle([driverLatitude, driverLongitude], {radius: accuracy});
    user = L.featureGroup([user_marker, user_circle]).addTo(map);
    if (isFirstSuccess) {
        map.fitBounds(user.getBounds());
        user_marker.bindPopup("<b>You</b>").openPopup(); 
        userCord = getUserCords(driverLatitude, driverLongitude);
        ambulance_marker = L.marker([userCord[0], userCord[1]]).addTo(map);
        isFirstSuccess = false;
        isSecondSuccess = true;

    }
    else if(isSecondSuccess) {
        let driverloc = false; // Flag to track whether ride is already requested

document.getElementById('start-driver-loc-button').addEventListener('click', () => {
    if (driverloc) {
        console.log("loc already sent.");
        return; // If ride is already requested, exit the function
    }

    driverloc = true;
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
      })});
        console.log('ambu' + userCord[0], userCord[1]);
        L.Routing.control({
            waypoints: [
              L.latLng(userCord[0], userCord[1]),
              L.latLng(driverLatitude, driverLongitude)
            ]
          }).addTo(map);
        isSecondSuccess = false;
    }
    
}


function getUserCords(driverLatitude, driverLongitude) {
    randomNum = Math.floor(Math.random() * 4);
    if(randomNum == 0) {
        return [driverLatitude + (Math.random() / 10), driverLongitude + (Math.random() / 10)];
    }
    else if(randomNum == 1) {
        return [driverLatitude - (Math.random() / 10), driverLongitude - (Math.random() / 10)];
    }
    else if(randomNum == 2) {
        return [driverLatitude + (Math.random() / 10), driverLongitude - (Math.random() / 10)];
    }
    else {
        return [driverLatitude - (Math.random() / 10), driverLongitude + (Math.random() / 10)];
    }

}


