
var map = L.map('map').setView([51.505, -0.09], 3);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


let driver_marker, ambulance_marker, driver_circle, user, userCord, driverLatitude, driverLongitude, accuracy;
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
                driver_marker.setLatLng([coord.lat, coord.lng]);
            }, 1000 * index)
        })

    }).addTo(map);
});



function success(pos) {

    if(driver_marker) {
        map.removeLayer(driver_marker);
    }

    if(driver_circle) {
        map.removeLayer(driver_circle)
    }
    
    
    if (isFirstSuccess) {
        driverLatitude = pos.coords.latitude;
        driverLongitude = pos.coords.longitude;
        accuracy = pos.coords.accuracy;
        driver_marker = L.marker([driverLatitude, driverLongitude], {icon: amulanceIcon });
        driver_circle = L.circle([driverLatitude, driverLongitude], {radius: accuracy});
        user = L.featureGroup([driver_marker, driver_circle]).addTo(map);
        map.fitBounds(user.getBounds());
        driver_marker.bindPopup("<b>You</b>").openPopup(); 
        userCord = getUserCords(driverLatitude, driverLongitude);
        ambulance_marker = L.marker([userCord[0], userCord[1]]).addTo(map);
        isFirstSuccess = false;
        isSecondSuccess = true;

    }
    else if(isSecondSuccess) {
        user = L.featureGroup([driver_marker, driver_circle]).addTo(map);
        
        document.getElementById('start-driver-loc-button').addEventListener('click', (e) => {
        e.target.classList.add('disabled');

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
    else {
      user = L.featureGroup([driver_marker, driver_circle]).addTo(map);
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


