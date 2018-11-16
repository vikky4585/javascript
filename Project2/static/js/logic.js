
var csvData = [];


d3.csv("data/wi_2016.csv", function (data) {

  data.forEach(function (d) {
    csvData.push(d);

  });



  // Creating map object
  var myMap = L.map("map", {
    center: [44.7844, -88.7879],
    zoom: 7
  });

  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
  function selectColor(county) {

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
    return [clr, opacity];

  }

  // Grabbing our GeoJSON data..
  d3.json("data/WI.geojson", function (data) {
    //console.log("geoJson" + JSON.stringify(data))
    L.geoJson(data, {
      style: function (feature) {
        let clr = selectColor(feature.properties.COUNTY_NAME);

        return {
          color: "white",
          fillColor: clr[0],
          fillOpacity: clr[1],
          weight: 1.5
        }
      }
    }).addTo(myMap);
  });


});



// Link to GeoJSON

var geojson;

// Grab data with d3
// d3.csv("data/wi_2016.csv", function(data) {


//   // Create a new choropleth layer
//   geojson = L.choropleth(data, {

//     // Define what  property in the features to use
//     valueProperty: "MHI",

//     // Set color scale
//     scale: ["#ffffb2", "#b10026"],

//     // Number of breaks in step range
//     steps: 10,

//     // q for quartile, e for equidistant, k for k-means
//     mode: "q",
//     style: {
//       // Border color
//       color: "#fff",
//       weight: 1,
//       fillOpacity: 0.8
//     },

//     // Binding a pop-up to each layer
//     onEachFeature: function(feature, layer) {
//       layer.bindPopup(feature.properties.LOCALNAME + ", " + feature.properties.State + "<br>Median Household Income:<br>" +
//         "$" + feature.properties.MHI);
//     }
//   }).addTo(myMap);

//   // Set up the legend
//   var legend = L.control({ position: "bottomright" });
//   legend.onAdd = function() {
//     var div = L.DomUtil.create("div", "info legend");
//     var limits = geojson.options.limits;
//     var colors = geojson.options.colors;
//     var labels = [];

//     // Add min & max
//     var legendInfo = "<h1>Median Income</h1>" +
//       "<div class=\"labels\">" +
//         "<div class=\"min\">" + limits[0] + "</div>" +
//         "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//       "</div>";

//     div.innerHTML = legendInfo;

//     limits.forEach(function(limit, index) {
//       labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//     });

//     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//     return div;
//   };

//   // Adding legend to the map
//   legend.addTo(myMap);

// });
