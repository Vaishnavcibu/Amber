
var map = L.map('map').setView([51.505, -0.09], 3);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


let user_marker, ambulance_marker, user_circle, user, userCord, latitude, longitude, accuracy;
let isFirstSuccess = true;
let isSecondSuccess = false;
const amulanceIcon  = L.icon({
    iconUrl: 'ambulance.png',
    iconSize: [120, 70]
})

navigator.geolocation.watchPosition(success);
document.querySelector('#start').addEventListener('click', () => {
    L.Routing.control({
        waypoints: [
          L.latLng(latitude, longitude),
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
    latitude = pos.coords.latitude;
    longitude = pos.coords.longitude
    accuracy = pos.coords.accuracy;
    console.log(latitude, longitude);
    user_marker = L.marker([latitude, longitude], {icon: amulanceIcon }).addTo(map);
    user_circle = L.circle([latitude, longitude], {radius: accuracy});
    user = L.featureGroup([user_marker, user_circle]).addTo(map);
    if (isFirstSuccess) {
        map.fitBounds(user.getBounds());
        user_marker.bindPopup("<b>You</b>").openPopup(); 
        userCord = getUserCords(latitude, longitude);
        ambulance_marker = L.marker([userCord[0], userCord[1]]).addTo(map);
        isFirstSuccess = false;
        isSecondSuccess = true;

    }
    else if(isSecondSuccess) {
        console.log('ambu' + userCord[0], userCord[1]);
        L.Routing.control({
            waypoints: [
              L.latLng(userCord[0], userCord[1]),
              L.latLng(latitude, longitude)
            ]
          }).addTo(map);
        isSecondSuccess = false;
    }
    
}

function getUserCords(latitude, longitude) {
    randomNum = Math.floor(Math.random() * 4);
    if(randomNum == 0) {
        return [latitude + (Math.random() / 10), longitude + (Math.random() / 10)];
    }
    else if(randomNum == 1) {
        return [latitude - (Math.random() / 10), longitude - (Math.random() / 10)];
    }
    else if(randomNum == 2) {
        return [latitude + (Math.random() / 10), longitude - (Math.random() / 10)];
    }
    else {
        return [latitude - (Math.random() / 10), longitude + (Math.random() / 10)];
    }

}


