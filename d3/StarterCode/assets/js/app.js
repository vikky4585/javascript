
var svgH = 600;
var svgW = 900;

var margin = {
    left: 80,
    right:20,
    top:20,
    bottom:60
}

var chartH = svgH - margin.top - margin.bottom;
var chartW = svgW - margin.left - margin.right;

var svg = d3.select(".scatter")
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
                   .domain([0, d3.max(data, d => d.poverty)])
                   .range([0, chartW]);
    
    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(data, d => d.healthcare)])
                   .range([0, chartH]);

    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    g.append("g")
     .attr("transform",`translate(0, ${chartH})`)
     .call(bottomAxis);
    
    g.append("g").call(leftAxis);

}

d3.csv("assets/data/data.csv").then(prepareChart);

