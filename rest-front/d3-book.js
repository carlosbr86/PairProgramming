
// Set the dimensions of the canvas / graph
console.log("D3=>",d3);
var margin = {top: 30, right: 20, bottom: 30, left: 50}, 
    width = 600 - margin.left - margin.right,            //600 hardCode Data
    height = 270 - margin.top - margin.bottom;           //270 hardCode Data
    // g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"); older code

// Parse the date / time
var parseTime = d3.time.format("%Y-%m-%d").parse;       // Changed parseDate to parseTime
// Set the ranges
var x = d3.time.scale().rangeRound([0, width]);         // Changed range. to rangeRound            - older code , only d3 instead d3.time
var y = d3.scale.linear().rangeRound([height, 0]);      // Changed range. to rangeRound
// Define the axis
var xAxis = d3.svg.axis().scale(x) .orient("bottom").ticks(5);
var yAxis = d3.svg.axis().scale(y) .orient("left").ticks(5);
// Define the line
var valueline = d3.svg.line()                             
 .x(function(d) { return x(d.date); }) 
 .y(function(d) { return y(d.value); });
// Adds the svg canvas
var svg = d3.select("body") .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
// Get the data
d3.csv("data.csv", function(error, data) { 
    data.forEach(function(d) {
        d.date = parseTime(d.date);
        d.value = +d.value;
    });
    // Scale the range of the data

    x.domain(d3.extent(data, function(d) { return d.date; })); 
    // y.domain([0, d3.max(data, function(d) { return d.value; })]); // without Y axis scale
    y.domain( d3.extent(data, function(d) { return d.value; }));

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")                //different
        .datum(data)             //check this after
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", valueline(data));
    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")             //different
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    //  .select(".domain")
    //  .remove();


    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis).
        append("text")        // all attributes bellow are NEW 
      .attr("fill", "#000") // 
      .attr("transform", "rotate(-90)")  // 
      .attr("y", 6) // 
      .attr("dy", "0.71em") // 
      .attr("text-anchor", "end") // 
      .text("Price ($)"); //
});