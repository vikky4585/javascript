
var svgH = 350;
var svgW = 550;

var margin = {
    left: 80,
    right:20,
    top:20,
    bottom:60
}

var chartH = svgH - margin.top - margin.bottom;
var chartW = svgW - margin.left - margin.right;
var svg = d3.select("#scatter")
            .append("svg")
            .attr("width", svgW)
            .attr("height", svgH);

var g = svg.append("g")
           .attr("transform", `translate(${margin.left}, ${margin.top})`);

function prepareChart(data){

    data.forEach(d => {
        d.age = +d.age;
        d.healthcare = +d.healthcare;
        d.poverty = +d.poverty;
        d.smokes = +d.smokes;
    });

    var xScale = d3.scaleLinear()
                   .domain([d3.min(data, d => d.poverty) - 1, d3.max(data, d => d.poverty)])
                   .range([0, chartW]);
    console.log("min " + d3.min(data, d => d.poverty))

    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(data, d => d.healthcare)])
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
                        .attr("cx", x => xScale(x.poverty))
                        .attr("cy", y => yScale(y.healthcare))
                        .attr("r", "8")
                        .attr("fill", "darkblue")
                        .attr("opacity", "0.5")
    var textGroup = g.selectAll("text")
                        .data(data)
                        .enter()
                        .append("text")
                        .attr("x", x => xScale(x.poverty))
                        .attr("y", y => yScale(y.healthcare))
                        .attr("color", "black")
                        .text(t => t.abbr)




}

d3.csv("assets/data/data.csv").then(prepareChart);

