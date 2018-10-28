// from data.js
var tableData = data;
var tbody = d3.select("tbody");

function removeDuplicates(arr){
    var newArr = [];
    for(x = 0; x < arr.length; x++){
        if(!newArr.includes(arr[x])){
            newArr.push(arr[x]);
        }
    }
    return newArr;
}


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


function filterSelection(menu,field,filtereddata){
    var sel = document.getElementById(field + "id");
    var v = sel.options[sel.selectedIndex].value
    if( v !== '' ){
        if(v !== menu){
            filtereddata = filtereddata.filter(val => (v === val[field]));
            console.log(`Fltering for ${v}, ${filtereddata.length}`)
        }

    }

    return filtereddata;
}

function filterData(){
    d3.event.preventDefault();
    tbody.selectAll("td").remove();
    tbody.selectAll("p").remove();

    var d = d3.select("#datetime").property("value");
    var filtered = tableData;
    if(d !== null && d !== ''){
        filtered = filtered.filter(val => (d === val["datetime"]));
        console.log(`Fltering for ${d}, ${filtered.length}`)
    }
    filtered = filterSelection("Select City","city",filtered);
    filtered = filterSelection("Select State","state",filtered);
    filtered = filterSelection("Select Country","country",filtered);
    filtered = filterSelection("Select Shape","shape",filtered);

    console.log("Filtering for " + filtered.length);
    if(filtered.length !== 0){
        updateTable(filtered);
    } else{
        tbody.append("p").text(`No UFO activity observed`);
    }

}
removeDuplicates(tableData.map(a => a["city"])).forEach(d => d3.select("#cityid").append("option").text(d));
removeDuplicates(tableData.map(a => a["state"])).forEach(d => d3.select("#stateid").append("option").text(d));
removeDuplicates(tableData.map(a => a["country"])).forEach(d => d3.select("#countryid").append("option").text(d));
removeDuplicates(tableData.map(a => a["shape"])).forEach(d => d3.select("#shapeid").append("option").text(d));

d3.select("#filter-btn").on("click",filterData);


