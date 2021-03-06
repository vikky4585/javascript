
var csvData = [];


d3.csv("data/wi_2016.csv", function (data) {

  data.forEach(function (d) {
    csvData.push(d);

  });



  // Creating map object
  var myMap = L.map("map", {
    center: [44.7844, -88.7879],
    zoom: 7,
    label: "test"
  });

  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);


  function getDetails(county) {

    var countyData = csvData.filter(x => (x.county_name.includes(county)))

    let dem = +countyData[0].votes_dem;
    let gop = +countyData[0].votes_gop;

    let diff = dem - gop;
    console.log("diff " + diff);
    let clr ;
    if (diff > 0) {
      clr = "blue";
    } else {
      clr = "red";
    }
    let opacity;
    let absDiff = Math.abs(diff);
    if(absDiff > 100000){
      opacity = 0.9;
    } else if(absDiff <= 100000 && absDiff > 75000){
      opacity = 0.8;
    }else if(absDiff <= 75000 && absDiff > 30000){
      opacity = 0.6;
    }else if(absDiff <= 30000 && absDiff > 5000){
      opacity = 0.5;
    } else if(absDiff <= 5000 && absDiff > 1000){
      opacity = 0.4;
    }else {
      opacity = 0.2;
    }
    return [clr, opacity, dem, gop];

  }

  // Grabbing our GeoJSON data..
  d3.json("data/WI.geojson", function (data) {
    L.geoJson(data, {
      style: function (feature) {
        let details = getDetails(feature.properties.COUNTY_NAME);

        return {
          color: "white",
          fillColor: details[0],
          fillOpacity: details[1],
          weight: 1.5
        }
      },

      onEachFeature: function(feature, layer) {
        let details = getDetails(feature.properties.COUNTY_NAME);

        layer.bindPopup("<h5>" + feature.properties.COUNTY_NAME + "</h5>"
        +"<h5> D: " + details[2] + "</h5>"
        + "<h5> R: " + details[3] + "</h5>"
        );

      }
    }).addTo(myMap);
  });


});



