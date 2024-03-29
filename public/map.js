
var map = L.map('map').setView([51.505, -0.09], 3);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


let user_marker, ambulance_marker, user_circle, user, ambulanceCord;
let isFirstSuccess = true;
let isSecondSuccess = false;
const amulanceIcon  = L.icon({
    iconUrl: 'ambulance.png',
    iconSize: [120, 70]
})
navigator.geolocation.watchPosition(success);



function success(pos) {
    if(user_marker) {
        map.removeLayer(user_marker);
    }

    if(user_circle) {
        map.removeLayer(user_circle)
    }

    const {latitude, longitude, accuracy} = pos.coords;
    console.log(latitude, longitude);
    user_marker = L.marker([latitude, longitude])
    user_circle = L.circle([latitude, longitude], {radius: accuracy})
    user = L.featureGroup([user_marker, user_circle]).addTo(map);
    if (isFirstSuccess) {
        map.fitBounds(user.getBounds());
        user_marker.bindPopup("<b>You</b>").openPopup(); 
        ambulanceCord = getAmbulanceCords(latitude, longitude);
        ambulance_marker = L.marker([ambulanceCord[0], ambulanceCord[1]], { icon: amulanceIcon }).addTo(map);
        isFirstSuccess = false;
        isSecondSuccess = true;

    }
    else if(isSecondSuccess) {
        console.log('ambu' + ambulanceCord[0], ambulanceCord[1]);
        L.Routing.control({
            waypoints: [
              L.latLng(ambulanceCord[0], ambulanceCord[1]),
              L.latLng(latitude, longitude)
            ]
          }).on('routesfound', function (e) {
            var routes = e.routes;
            console.log(routes);

            e.routes[0].coordinates.forEach(function (coord, index) {
                setTimeout(function () {
                    ambulance_marker.setLatLng([coord.lat, coord.lng]);
                }, 1000 * index)
            })

        }).addTo(map);
        isSecondSuccess = false;
    }
    
}

function getAmbulanceCords(latitude, longitude) {
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


