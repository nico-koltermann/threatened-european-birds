// width and height
var w = 800;
var h = 600;

// define map projection
var projection = d3.geo.mercator() 	// utiliser une projection standard pour aplatir les pôles, voir D3 projection plugin
	.center([13, 52]) 					// modifica latitudine e longitudine di visualizzazione della mappa [13 ,52]
	.translate([w/2, h/2]) 				// centra l'immagine ottenuta dentro l'svg
	.scale([w/1.5]); 						// zoom (più il valore è piccolo e maggiore è lo zoom) 

// define path generator
var path = d3.geo.path()
	.projection(projection);

// create SVG
var svg = d3.select("#mapEurope")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

var div = d3.select("body").append("div")   
	.attr("class", "tooltip")               
	.style("opacity", 0);

// load in GeoJSON data
d3.json("europe.json", function(json) {
	// bind data and create one path per GeoJSON feature
	svg.selectAll("path")
	   .data(json.features)
	   .enter()
	   .append("path")
	   .attr("d", path)
	   .attr("stroke", "rgba(8, 81, 156, 0.2)")
	   .attr("fill", "rgba(8, 81, 156, 0.6)");
});

// ADDED
// bind data and create one path per GeoJSON feature
svg.selectAll("path")
	.data(json.features)
	.enter()
	.append("path")
	.attr("d", path)
	.attr("stroke", "rgba(255, 255, 255, 0.5)")
	.style("fill", function(d) {
		// get data value
		var value = d.properties.earnings;
		if(value) { // if value exists…
			return color(value);
		} 
		else { // if value is undefined…
			return "#fff";
		}
	})

	.attr("class", function(d) {
		// get data value
		var value = d.properties.earnings;
		if(value) { // if value exists…
			return "pays";
		} 
	})

	.on("mouseover", function(d) {
		var value = d.properties.earnings;
		if(value) {
			d3.select(this);
			div.transition().duration(300)
				.style("opacity", 1)
			div.html("<strong>" + d.properties.name + "</strong>: " + d.properties.earnings + " pps")
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY -30) + "px");
		}
	})

	.on("mouseout", function() {
		d3.select(this);
		div.transition().duration(300)
			.style("opacity", 0);
	});
