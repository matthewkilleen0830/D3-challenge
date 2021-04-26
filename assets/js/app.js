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
var svg = d3.select("#scatter")
    .append("svg")
    // .attr("viewBox", `0 0 500 960`);
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
        .domain([d3.min(censusData, d => d.poverty) - 1, d3.max(censusData, d => d.poverty) + 1])
        .range([0, width]);
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(censusData, d => d.healthcare) - 1, d3.max(censusData, d => d.healthcare) + 1])
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
    var circlesGroup = chartGroup.selectAll("circle")
        .data(censusData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "10")
        .attr("fill", "#8abcd5")
        .attr("opacity", "1.0");

    // Create another variable to display state abbreviations on circles
    var textGroup = chartGroup.selectAll(null)
        .data(censusData)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .attr("dx", d => -7.5)
        .attr("dy", d => 4)
        .attr("font-size", "10px")
        .attr("font-weight", "bold")
        .attr("fill", "#ffffff");
        
    // Initialize tool tip
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        // .offset([80, -60])
        .html(function(d) {
        return (`${d.state}<br>In Poverty (%):  ${d.poverty}<br>Lacks Healthcare (%):  ${d.healthcare}`);
        });

    // Create tool tip in the plot
    chartGroup.call(toolTip);

    // Create event listeners to display and hide tool tip
    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
    })
        .on("mouseout", function(data, index) {
            toolTip.hide(data);
        });

    textGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
    })
        .on("mouseout", function(data, index) {
            toolTip.hide(data);
        });

    // Create axis labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2) - 50)
        .attr("dy", "1em")
        .attr("class", "axisText")
        .attr("font-weight", "bold")
        .text("Lacks Healthcare (%)");
    chartGroup.append("text")
        .attr("transform", `translate(${(width / 2) - 50}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .attr("font-weight", "bold")
        .text("In Poverty (%)");
});