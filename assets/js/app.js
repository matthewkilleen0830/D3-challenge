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

// START OF BONUS CODE --------------------------------------------------------------

// Initial Params
// var chosenXAxis = "poverty";
// var chosenYAxis = "healthcare";

// // function used for updating x-scale var upon click on axis label
// function xScale(censusData, chosenXAxis) {

//     // create scales
//     var xLinearScale = d3.scaleLinear()
//     .domain([d3.min(censusData, d => d[chosenXAxis]) * 0.8,
//         d3.max(censusData, d => d[chosenXAxis]) * 1.2
//     ])
//     .range([0, width]);

//     return xLinearScale;
// }

// // function used for updating xAxis var upon click on axis label
// function renderAxes(newXScale, xAxis) {
//     var bottomAxis = d3.axisBottom(newXScale);
//     xAxis.transition()
//     .duration(1000)
//     .call(bottomAxis);

//     return xAxis;
// }

// // function used for updating circles group with a transition to
// // new circles
// function renderCircles(circlesGroup, newXScale, chosenXAxis) {
//     circlesGroup.transition()
//     .duration(1000)
//     .attr("cx", d => newXScale(d[chosenXAxis]));

//     return circlesGroup;
// }

// // function used for updating circles group with new tooltip
// function updateToolTip(chosenXAxis, circlesGroup) {
//     var label;

//     if (chosenXAxis === "poverty") {
//         label = "In Poverty (%)";
//     }
//     else if (chosenXAxis === "age") {
//         label = "Age (Median)";
//     }
//     else {
//         label = "Household Income (Median)"
//     } 

//     var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([80, -60])
//     .html(function(d) {
    
//     return (`${d.state}<br>${label} ${d[chosenXAxis]}`);
//     });

//     circlesGroup.call(toolTip);

//     circlesGroup.on("mouseover", function(data) {
//     toolTip.show(data);
//     })

//     // onmouseout event
//     .on("mouseout", function(data, index) {
//     toolTip.hide(data);
//     });

//     return circlesGroup;
// }

// // Retrieve data from the CSV file and execute everything below
// d3.csv("assets/data/data.csv").then(function(censusData, err) {
//     if (err) throw err;

//     // parse data
//     censusData.forEach(function(data) {
//         data.poverty = +data.poverty;
//         data.healthcare = +data.healthcare;
//         data.age = +data.age;
//         data.income = +data.income;
//   });

//     // xLinearScale function above csv import
//     var xLinearScale = xScale(censusData, chosenXAxis);

//     // Create y scale function
//     var yLinearScale = d3.scaleLinear()
//     .domain([0, d3.max(censusData, d => d.healthcare)])
//     .range([height, 0]);

//     // Create initial axis functions
//     var bottomAxis = d3.axisBottom(xLinearScale);
//     var leftAxis = d3.axisLeft(yLinearScale);

//     // append x axis
//     var xAxis = chartGroup.append("g")
//     .classed("x-axis", true)
//     .attr("transform", `translate(0, ${height})`)
//     .call(bottomAxis);

//     // append y axis
//     chartGroup.append("g")
//     .call(leftAxis);

//     // append initial circles
//     var circlesGroup = chartGroup.selectAll("circle")
//     .data(censusData)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d[chosenXAxis]))
//     .attr("cy", d => yLinearScale(d.healthcare))
//     .attr("r", 10)
//     .attr("fill", "#8abcd5")
//     .attr("opacity", "1.0");

// // Create another variable to display state abbreviations on circles
// // var textGroup = chartGroup.selectAll(null)
// //     .data(censusData)
// //     .enter()
// //     .append("text")
// //     .text(d => d.abbr)
// //     .attr("x", d => xLinearScale(d.[chosenXAxis]))
// //     .attr("y", d => yLinearScale(d.healthcare))
// //     .attr("dx", d => -7.5)
// //     .attr("dy", d => 4)
// //     .attr("font-size", "10px")
// //     .attr("font-weight", "bold")
// //     .attr("fill", "#ffffff");

//     // Create group for two x-axis labels
//     var labelsGroup = chartGroup.append("g")
//     .attr("transform", `translate(${width / 2}, ${height + 20})`);

//     var povertyLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 20)
//     .attr("value", "poverty") // value to grab for event listener
//     .classed("active", true)
//     .text("In Poverty (%)");

//     var ageLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 40)
//     .attr("value", "age") // value to grab for event listener
//     .classed("inactive", true)
//     .text("Age (Median)");

//     var incomeLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 40)
//     .attr("value", "age") // value to grab for event listener
//     .classed("inactive", true)
//     .text("Household Income (Median)");

//     // append y axis
//     chartGroup.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left)
//     .attr("x", 0 - (height / 2))
//     .attr("dy", "1em")
//     .classed("axis-text", true)
//     .text("Lacks Healthcare (%)");

//     // updateToolTip function above csv import
//     var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//     // x axis labels event listener
//     labelsGroup.selectAll("text")
//     .on("click", function() {
//         // get value of selection
//         var value = d3.select(this).attr("value");
//         if (value !== chosenXAxis) {

//         // replaces chosenXAxis with value
//         chosenXAxis = value;

//         // console.log(chosenXAxis)

//         // functions here found above csv import
//         // updates x scale for new data
//         xLinearScale = xScale(censusData, chosenXAxis);

//         // updates x axis with transition
//         xAxis = renderAxes(xLinearScale, xAxis);

//         // updates circles with new x values
//         circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

//         // updates tooltips with new info
//         circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//         // changes classes to change bold text
//         if (chosenXAxis === "age") {
//             ageLabel
//             .classed("active", true)
//             .classed("inactive", false);
//             povertyLabel
//             .classed("active", false)
//             .classed("inactive", true);
//         }
//         else {
//             ageLabel
//             .classed("active", false)
//             .classed("inactive", true);
//             povertyLabel
//             .classed("active", true)
//             .classed("inactive", false);
//         }
//       }
//     });
// });

// END OF BONUS CODE ----------------------------------------------------------------
    
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