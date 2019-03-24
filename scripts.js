var map;
var markers = [];
var latLong;
var obj;
var i = 0;
var link;
var body;
var title;

// DrawMarkers on page load
$(document).ready(function () {
  drawMarker();
});

// Just places the markers on the google maps
function drawMarker() {

  markers = [];

  // loops through all elements in geoJSON
  for (i = 0; i < geoJSON.features.length; i++) {

    // draw all of the hotels on the map
    if (geoJSON.features[i].geometry.type == "Hotel") {

      // gets the longitude and latitude of current element in geoJSON
      latLong = getLatLong(geoJSON["features"][i].geometry.coordinates[1], geoJSON["features"][i].geometry.coordinates[0]);

      // draws the marker on the map
      markers[i] = new google.maps.Marker({
        position: latLong,
        map: map,
        title: geoJSON["features"][i].properties.name,
        icon: {
          url: geoJSON["features"][i].properties.icon
        }
      });

      // adds a function call on current marker when clicked
      google.maps.event.addListener(markers[i], 'click', function (event) {
        var l1, l2;
        // get current marker longitude and latitude
        for (var j = 0; j < geoJSON.features.length; j++) {
          if (geoJSON.features[j].properties.name == this.title) {
            l1 = geoJSON["features"][j].geometry.coordinates[1];
            l2 = geoJSON["features"][j].geometry.coordinates[0];
          }
        }
        findMarkersNearMe(l1, l2);
      });
    }
  }

}

// returns positision object
function getLatLong(lat, long) {
  pos = {
    lat: lat,
    lng: long
  }
  return pos;
}

// draw al markers around the current marker given the longitude and latitude
function findMarkersNearMe(lat1, lng1) {

  removeMarkers();
  drawMarker();

  var lat2, lng2;

  // loop through all the elements in the geoJSON
  for (i = 0; i < geoJSON.features.length; i++) {

    // find all elements in geoJSON that are attractions or restaurants
    if (geoJSON.features[i].geometry.type == "Attraction" || geoJSON.features[i].geometry.type == "Restaurant" || geoJSON.features[i].geometry.type == "Mosque") {
      lat2 = geoJSON["features"][i].geometry.coordinates[1];
      lng2 = geoJSON["features"][i].geometry.coordinates[0];

      if (findUclidianDistance(lat1, lng1, lat2, lng2) < 0.01) {
        latLong = getLatLong(lat2, lng2);
        markers[i] = new google.maps.Marker({
          position: latLong,
          map: map,
          title: geoJSON["features"][i].properties.name,
          icon: {
            url: geoJSON["features"][i].properties.icon
          }
        });

        google.maps.event.addListener(markers[i], 'click', function () {
          for (var j = 0; j < geoJSON.features.length; j++) {
            if (geoJSON.features[j].properties.name == this.title) {
              title = this.title;
              link = geoJSON.features[j].properties.link;
              body = geoJSON.features[j].properties.description;
            }
          }
          //Show modal with attraction details
          $('#ModalLabel').text(this.title);
          $('#ModalBody').text(body);
          $('#Modal').modal('toggle');
        });
      }
    }
  }
}

// the distance between two points in the plane with coordinates (x, y) and (a, b)
// use pythagorean theorum a^2 = b^2 + c^2
// applied to distances, we do distance^2 = (a-x)^2 + (b-y)^2
function findUclidianDistance(x1, y1, x2, y2) {

  var p1, p2;

  // p1 = (x2-x1)^2
  p1 = Math.pow((x2 - x1), 2);

  // p2 = (y1 -y2)^2
  p2 = Math.pow((y2 - y1), 2);

  // returns the sqaure root of the above two added together
  return Math.sqrt(p1 + p2);
}

function removeMarkers() {



  for (i = 0; i < markers.length; i++) {

    //skip over any empty elements
    if (markers[i] == undefined) {
      continue;
    }

    //remove markers from map
    markers[i].setMap(null);
  }

  //empty array of markers
  markers = [];
}

function goToWebsite() {
  for (var j = 0; j < geoJSON.features.length; j++) {
    if (geoJSON.features[j].properties.name == title) {
      if (geoJSON.features[j].properties.link != undefined
          && geoJSON.features[j].properties.link != "") {
        window.open(geoJSON.features[j].properties.link);
      } else {
        alert("We do not have a valid link for this location");
      }
    }
  }
}
