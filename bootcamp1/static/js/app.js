// from data.js
var tableData = data;
var tbody = d3.select("tbody");

function updateTable(filtered){


    filtered.forEach( x => {
        console.log("printing " + x["city"])
        var row = tbody.append("tr");
        row.append("td").text(x["datetime"]);
        row.append("td").text(x["city"]);
        row.append("td").text(x["state"]);
        row.append("td").text(x["country"]);
        row.append("td").text(x["shape"]);
        row.append("td").text(x["durationMinutes"]);
        row.append("td").text(x["comments"]);


    });



}

// YOUR CODE HERE!
function filterData(){
    d3.event.preventDefault();

    //var s = d3.select("#datetime").text();
    var s = d3.select("#datetime").property("value");
    
    var filtered = tableData.filter(val => (s === val["datetime"]));
    console.log("Filtering for " + filtered.length);
    if(filtered.length !== 0){
        updateTable(filtered);
    } else{

    }

}






d3.select("#filter-btn").on("click",filterData);
