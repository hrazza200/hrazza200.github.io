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
        "name": "Radison_blu",
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
            55.8601314
          ]
        },
        "properties": {
          "name": "GOMA",
          "description": "Gallery of Modern Art",
          "icon": "img/icons/theater.png"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "icon": "img/icons/food.png",
          "coordinates": [
            -4.2927926,
            55.8685891
          ]
        },
        "properties": {
          "name": "Kelvingrove",
          "description": "Kelvingrove Art Gallery",
          "icon": "img/icons/theater.png"
        }
      }
  ]
};

var Hotel1 = { lat: geoJSON["features"][0].geometry.coordinates[1], lng: geoJSON["features"][0].geometry.coordinates[0] };
var GOMA = { lat: geoJSON["features"][1].geometry.coordinates[1], lng: geoJSON["features"][1].geometry.coordinates[0] };
var Kelvingrove = { lat: geoJSON["features"][2].geometry.coordinates[1], lng: geoJSON["features"][2].geometry.coordinates[0] };



function drawMarker() {
  marker = new google.maps.Marker({
    position: Hotel1, map: map, title: geoJSON["features"][0].properties.description,
    icon: {
      url: geoJSON["features"][0].properties.icon
    }
  });

  google.maps.event.addListener(marker, 'click', function () {
    findMarkersNearMe();
 });
}

function findMarkersNearMe(){

    if(findUclidianDistance(GOMA["lat"],GOMA["lng"],Hotel1["lat"],Hotel1["lng"]) < 0.02){
    var marker2 = new google.maps.Marker({
        position: GOMA, map: map, title: geoJSON["features"][1].properties.description,
        icon: {
          url: geoJSON["features"][1].properties.icon
        }
      });
    
      google.maps.event.addListener(marker2, 'click', function () {
        alert("Take me to the website");
     });
    }

    if(findUclidianDistance(Kelvingrove["lat"],Kelvingrove["lng"],Hotel1["lat"],Hotel1["lng"]) < 0.02){
     var marker3 = new google.maps.Marker({
        position: Kelvingrove, map: map, title: geoJSON["features"][2].properties.description,
        icon: {
          url: geoJSON["features"][2].properties.icon
        }
      });
    
      google.maps.event.addListener(marker3, 'click', function () {
        alert("Take me to the website");
     });
    } else {
        alert("TOO FAR!");
    }
}

function findUclidianDistance(x1,y1,x2,y2){
    var dist;

    var p1,p2;

    p1 = Math.pow((x2 - x1),2);
    p2 = Math.pow((y2 - y1),2);

    dist = Math.sqrt(p1 + p2);

    return dist;
}