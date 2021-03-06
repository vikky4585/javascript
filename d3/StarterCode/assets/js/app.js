
var svgH = 350;
var svgW = 550;

var margin = {
    left: 80,
    right: 20,
    top: 20,
    bottom: 78
}


var chartH = svgH - margin.top - margin.bottom;
var chartW = svgW - margin.left - margin.right;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgW)
    .attr("height", svgH);
var g = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


function resetGraph() {
    g.selectAll("circle").remove();
    g.select("#x-axis").remove();
    g.select("#y-axis").remove();
    prepareChart(csvData);

}

var xVal = "poverty";
var yVal = "healthcare";
var csvData = [];

function prepareChart(data) {

    csvData = data;
    data.forEach(d => {
        d.age = +d.age;
        d.healthcare = +d.healthcare;
        d.poverty = +d.poverty;
        d.smokes = +d.smokes;
        d.obesity = +d.obesity;
        d.income = +d.income;
    });

    var xScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[xVal]) - 1, d3.max(data, d => d[xVal])])
        .range([0, chartW]);

    if (xVal === "income") {
        xScale = d3.scaleLinear()
            .domain([d3.min(data, d => d[xVal]) - 1000, d3.max(data, d => d[xVal]) + 2000])
            .range([0, chartW])
    }

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[yVal])])
        .range([chartH, 0]);

    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    g.append("g")
        .attr("transform", `translate(0, ${chartH})`)
        .attr("id", "x-axis")
        .call(bottomAxis);

    g.append("g").attr("id", "y-axis").call(leftAxis);

    var tooltip = d3.tip()
        .attr("class", "tooltip")
        .offset([60, 20])
        .html(d => `<br>Poverty: ${d.abbr} <br> HealthCare: ${d.healthcare}`);

    g.call(tooltip);

    //create markers
    var markerGroup = g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", x => xScale(x[xVal]))
        .attr("cy", y => yScale(y[yVal]))
        .attr("r", "8")
        .attr("fill", "darkgreen")
        .attr("opacity", "0.5")
        



    for (var i = 0; i < data.length; i++) {
        var txtData = data[i];

        g.append("text").attr("x", xScale(data[i][xVal]))
            .attr("y", yScale(data[i][yVal]))
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .attr("dy", ".3em")
            .attr("style", "font-size:8")
            .attr("id", "circle-labels")
            .text(data[i].abbr)
            .on("click", function (txtData) {
                tooltip.show(txtData, this);
            }).on("mouseout", function (txtData) {
                tooltip.hide(txtData)
            });


    }

    g.selectAll("circle")
        .data(data)
        .enter()
        .transition()
        .duration(1000)
        .attr("cx", x => xScale(x[xVal]))
        .attr("cy", y => yScale(y[yVal]));




    markerGroup.on("click", function (data) {
        tooltip.show(data, this);
    }).on("mouseout", function (data) {
        tooltip.hide(data)
    });

    //Axis Labels
    g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("class", "axisText")
        .attr("x", 0 - margin.left - 140)
        .attr("y", 0 - margin.bottom + 50)
        .text("Lacks Healthcare(%)")
        .attr("id", "healthcare")
        .attr("style", "font-size:12")
        .on("click", function (d) {
            yVal = "healthcare";
            resetGraph();
            let coords = d3.mouse(this);
            console.log("coords are " + coords);
        })
        .on("mouseover", function(d){
            g.select("#healthcare").attr("style","font-weight:bold")
        })
        .on("mouseout", function(d){
            g.select("#healthcare").attr("style","font-size:12")
        })
        
    //.attr("style", "font-weight:bold")

    g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("class", "axisText")
        .attr("x", 0 - margin.left - 140)
        .attr("y", 0 - margin.bottom + 30)
        .text("Smokes(%)")
        .attr("id", "smoke")
        .attr("style", "font-size:12")
        .on("click", function (d) {
            yVal = "smokes";
            resetGraph();
            let coords = d3.mouse(this);
            console.log("coords " + coords)
            g.append("circle")
                .attr("class","click-circle")
                .attr("cx",0 - margin.left - 140)
                .attr("cy",0 - margin.bottom + 30)
                .attr("r", 100)
                .attr("fill","blue")
        })
        .on("mouseover", function(d){
            g.select("#smoke").attr("style","font-weight:bold")
        })
        .on("mouseout", function(d){
            g.select("#smoke").attr("style","font-size:12")
        });

    g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("class", "axisText")
        .attr("x", 0 - margin.left - 140)
        .attr("y", 0 - margin.bottom + 10)
        .attr("id", "obese")
        .text("Obese(%)")
        .attr("style", "font-size:12")
        .on("click", function (x) {
            yVal = "obesity";
            resetGraph();

        })
        .on("mouseover", function(d){
            g.select("#obese").attr("style","font-weight:bold")
        })
        .on("mouseout", function(d){
            g.select("#obese").attr("style","font-size:12")
        });


    g.append("text").attr("class", "axisText")
        .attr("x", margin.left + 80)
        .attr("y", margin.bottom + 210)
        .text("In Poverty(%)")
        .attr("id", "poverty")
        .attr("style", "font-size:12")
        .on("click", function (x) {
            xVal = "poverty";
            resetGraph();
        })
        .on("mouseover", function(d){
            g.select("#poverty").attr("style","font-weight:bold")
        })
        .on("mouseout", function(d){
            g.select("#poverty").attr("style","font-size:12")
        });

    g.append("text").attr("class", "axisText")
        .attr("x", margin.left + 80)
        .attr("y", margin.bottom + 230)
        .text("Age(%)")
        .attr("id", "age")
        .attr("style", "font-size:12")
        .on("click", function (x) {
            xVal = "age";
            resetGraph();

        })
        .on("mouseover", function(d){
            g.select("#age").attr("style","font-weight:bold")
        })
        .on("mouseout", function(d){
            g.select("#age").attr("style","font-size:12")
        });

    g.append("text").attr("class", "axisText")
        .attr("x", margin.left + 80)
        .attr("y", margin.bottom + 250)
        .attr("id", "income")
        .text("Household Income(%)")
        .attr("style", "font-size:12")
        .on("click", function (x) {
            xVal = "income";
            resetGraph();
        })
        .on("mouseover", function(d){
            g.select("#income").attr("style","font-weight:bold")
        })
        .on("mouseout", function(d){
            g.select("#income").attr("style","font-size:12")
        });

}


d3.csv("assets/data/data.csv").then(
    function (d) {
        for (let i = 0; i < d.length; i++) {
            csvData.push(d[i]);
        }
        prepareChart(csvData);
    }
);











