

let margin = {top: 30, right: 10, bottom: 10, left: 150};
var padding = margin.left - 20 ;

// SVG Size
let width = 700 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var dataW;


// Load CSV file
d3.csv('data/wealth-health-2014.csv').then(function(data) {

	// Analyze the dataset in the web console

	// Analyze and prepare the data:
	data.forEach(function (d) {
		d.Income = parseInt(d.Income);
		d.Population = parseInt(d.Population);
		d.LifeExpectancy = parseFloat(d.LifeExpectancy);
	});

	dataW = data;

	//sort data (activity III):
	dataW.sort(function (a,b ){
		return a.Population - b.Population;

	})
	console.log(dataW);


	//Append a new SVG area with D3:
	//Append a new SVG area with D3:
	var svg = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.attr("id", "svg-area")

	//Create linear scales by using the D3 scale functions:
	var incomeScale = d3.scaleLinear()
		.domain([d3.min(dataW, function (d){return d.Income;}), d3.max(dataW, function (d) {
			return d.Income;
		})])
		.range([1, width]);
	var lifeExpectancyScale = d3.scaleLinear()
		.domain([d3.min(dataW, function (d){return d.LifeExpectancy / 1.5}), d3.max(dataW, function (d) {
			return d.LifeExpectancy;
		})])
		.range([height, 1]);

//scale function for the circle radius:
	var popScale = d3.scaleLinear()
		.domain([0, d3.max(dataW, function (d) {
			return d.Population;
		})])
		.range([4, 30]);

	//color scale:

	var myColor = d3.scaleLinear()
		.domain(data.map(function(d) {
			return d.Region;
		}))
		.range(["darkgreen","lightgreen"]);


// Map the countries to SVG circles:
// Create group element
	let group = svg.append("g").attr("transform", "translate(" + (margin.left + 20) + "," + margin.top + ")");


// Append circles to the group
	group.selectAll("circle")
		.data(dataW)
		.enter().append("circle")
		.attr("r", function (d){return popScale(d.Population);})
		.attr("cx", function (d){ return incomeScale(d.Income ) ; })
		.attr("cy", function (d){ return lifeExpectancyScale(d.LifeExpectancy); })
		.attr("stroke", "black")
		.attr("fill", function(d){return myColor(d.Region) })

// Create an axis function specifying orientation (top, bottom, left, right)
	var xAxis = d3.axisBottom(incomeScale);
	var yAxis = d3.axisLeft(lifeExpectancyScale).ticks(8)


// Draw the axis
	svg.append("g")
		.attr("class", "axis x-axis")
		.attr("transform", "translate(" + padding + "," + (height - margin.bottom) + ")")
		.call(xAxis);
	svg.append("g")
		.attr("class", "axis y-axis")
		.attr("transform", "translate(" + (margin.left) + "," + margin.bottom + ")")
		.call(yAxis);

	svg.append("text")
		.attr("x", margin.bottom)
		.attr("y", height / 2)
		.attr("class", "label")
		.attr("transform", "translate(-150,300) rotate("+270+")")
		.text("Life Expectancy")

	svg.append("text")
		.attr("x", width / 3 * 2)
		.attr("y", height + margin.top )
		.attr("class", "label")
		.text("Income")


});








