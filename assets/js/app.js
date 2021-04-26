// Verify that JavaScript app has loaded
console.log("JavaScript app is loaded.");

// Define scalable vector graphics size
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top:  20,
    right:  40,
    bottom:  60,
    left:  100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper
var svg = d3.select(".scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append an SVG group to hold our plot and shift the latter by left and top margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data
d3.csv("assets/data/data.csv").then(function(censusData) {

    // Parse data and cast as numbers
    censusData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    // Create linear scale functions for x axis and y axis
    var xLinearScale = d3.scaleLinear()
        .domain([20, d3.max(censusData, d => d.poverty)])
        .range([0, width]);
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(censusData, d => d.healthcare)])
        .range([height, 0]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append axes to the plot
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    chartGroup.append("g")
        .call(leftAxis);
    
    // Create scatter plot circles


});