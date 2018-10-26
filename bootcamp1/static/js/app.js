// from data.js
var tableData = data;
var tbody = d3.select("tbody");

function updateTable(filtered){
    tbody.append("p").text(`${filtered.length} records found`);
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

function filterData(){
    d3.event.preventDefault();
    tbody.selectAll("td").remove();
    tbody.selectAll("p").remove();
    var s = d3.select("#datetime").property("value");    
    var filtered = tableData.filter(val => (s === val["datetime"]));
    console.log("Filtering for " + filtered.length);
    if(filtered.length !== 0){
        updateTable(filtered);
    } else{
        tbody.append("p").text(`No UFO activity observed on ${s}`);
    }

}

function filterData1(){
    d3.event.preventDefault();
    tbody.selectAll("td").remove();
    tbody.selectAll("p").remove();

    var d = d3.select("#datetime").property("value");
    var filtered = tableData;
    if(d !== null && d !== ''){
        filtered = filtered.filter(val => (d === val["datetime"]));
    }
    var c = d3.select("#city").property("value"); 
    if(c !== null && c !== ''){
        filtered = filtered.filter(val => (c === val["city"]));
    }   
    var s = d3.select("#state").property("value"); 
    if(s !== null && s !== ''){
        filtered = filtered.filter(val => (s === val["state"]));
    }  

    var co = d3.select("#country").property("value"); 
    if(co !== null && co !== ''){
        filtered = filtered.filter(val => (co === val["country"]));
    }  

    var sh = d3.select("#shape").property("value"); 
    if(sh !== null && sh !== ''){
        filtered = filtered.filter(val => (sh === val["shape"]));
    }  

    console.log("Filtering for " + filtered.length);
    if(filtered.length !== 0){
        updateTable(filtered);
    } else{
        tbody.append("p").text(`No UFO activity observed`);
    }

}


//d3.select("#city").append("")



d3.select("#filter-btn").on("click",filterData1);
