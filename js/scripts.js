var map;
var geoJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "icon": "/static/images/icons/map-marker-do.png",
        "coordinates": [
          -4.2625116,
          55.8584792
        ]
      },
      "properties": {
        "name": "Cathedral",
        "description": "One of Europeâ€™s finest Gothic buildings, once the tallest building in the world that dominates Lincoln's skyline.",
        "icon": "img/icons/hotel.png"
      }
    },
    {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "icon": "img/icons/food.png",
          "coordinates": [
            -4.2507607,
            55.8617537
          ]
        },
        "properties": {
          "name": "TEST",
          "description": "TEST DESC",
          "icon": "img/icons/food.png"
        }
      }
  ]
};

var Cathedral = { lat: geoJSON["features"][0].geometry.coordinates[1], lng: geoJSON["features"][0].geometry.coordinates[0] };
var TEST = { lat: geoJSON["features"][1].geometry.coordinates[1], lng: geoJSON["features"][1].geometry.coordinates[0] };



function drawMarker() {
  marker = new google.maps.Marker({
    position: Cathedral, map: map, title: geoJSON["features"][0].properties.description,
    icon: {
      url: geoJSON["features"][0].properties.icon
    }
  });

  google.maps.event.addListener(marker, 'click', function () {
    findMarkersNearMe();
 });
}

function findMarkersNearMe(){
    console.log("find markers near me")
    var marker2 = new google.maps.Marker({
        position: TEST, map: map, title: geoJSON["features"][1].properties.description,
        icon: {
          url: geoJSON["features"][1].properties.icon
        }
      });
    
      google.maps.event.addListener(marker2, 'click', function () {
        alert("Take me to the website");
     });
}