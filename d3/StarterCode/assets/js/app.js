
var svgH = 350;
var svgW = 550;

var margin = {
    left: 80,
    right:20,
    top:20,
    bottom:78
}

var chartH = svgH - margin.top - margin.bottom;
var chartW = svgW - margin.left - margin.right;
var svg = d3.select("#scatter")
            .append("svg")
            .attr("width", svgW)
            .attr("height", svgH);

var g = svg.append("g")
           .attr("transform", `translate(${margin.left}, ${margin.top})`);
var xVal = "poverty";
var yVal = "healthcare";

function prepareChart(data){

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

    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(data, d => d[yVal])])
                   .range([chartH, 0]);

    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    g.append("g")
     .attr("transform",`translate(0, ${chartH})`)
     .call(bottomAxis);
    
    g.append("g").call(leftAxis);


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
    
    for(var i =0 ; i < data.length; i++){
        g.append("text").attr("x", xScale(data[i][xVal]))
        .attr("y", yScale(data[i][yVal]))
        .attr("text-anchor","middle")
        .attr("fill", "white")
        .attr("dy",".3em")
        .attr("style", "font-size:8")
        .text(data[i].abbr);

    }
    // var textGroup = g.selectAll("text")
    //                     .data(data)
    //                     .enter()
    //                     .append("text")
    //                     .attr("x", x => xScale(x.poverty))
    //                     .attr("y", y => yScale(y.healthcare))
    //                     .attr("text-anchor","middle")
    //                     .attr("fill", "white")
    //                     .attr("dy",".3em")
    //                     .attr("style", "font-size:8")
    //                     .text(t => t.abbr)

    var tooltip = d3.tip()
                    .attr("class","tooltip")
                    .offset([60,20])
                    .html(d => `<br>Poverty: ${d.abbr} <br> HealthCare: ${d.healthcare}`);

    g.call(tooltip);

    markerGroup.on("click", function(data){
        tooltip.show(data, this);
    }).on("mouseout", function(data){
        tooltip.hide(data)
    });

    //Axis Labels

    g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("class", "axisText")
    .attr("x", 0 - margin.left -140  )
    .attr("y", 0 - margin.bottom + 50)
    .text("Lacks Healthcare(%)")
    .attr("id", "healthcare")
    .attr("style", "font-size:12")
    //.attr("style", "font-weight:bold")

    g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("class", "axisText")
    .attr("x", 0 - margin.left -140  )
    .attr("y", 0 - margin.bottom + 30)
    .text("Smokes(%)")
    .attr("style", "font-size:12")

    g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("class", "axisText")
    .attr("x", 0 - margin.left -140  )
    .attr("y", 0 - margin.bottom + 10)
    .text("Obese(%)")
    .attr("style", "font-size:12")


    g.append("text").attr("class", "axisText")
        .attr("x", margin.left + 80)
        .attr("y", margin.bottom + 210)
        .text("In Poverty(%)")
        .attr("style", "font-size:12")
    
    g.append("text").attr("class", "axisText")
        .attr("x", margin.left + 80)
        .attr("y", margin.bottom + 230)
        .text("Age(%)")
        .attr("style", "font-size:12")
    
    g.append("text").attr("class", "axisText")
        .attr("x", margin.left + 80)
        .attr("y", margin.bottom + 250)
        .text("Household Income(%)")
        .attr("style", "font-size:12")



}

d3.csv("assets/data/data.csv").then(prepareChart);

d3.select("#healthcare").on("mouseover", function(x){
    console.log("clicked healthcare label")
});



