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