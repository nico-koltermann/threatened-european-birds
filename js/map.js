function createMap(data, id) {

	let width = 800, height = 600

	let europeProjection = d3.geoMercator()
			.center([ 13, 52 ])
			.scale([ width / 1.5 ])
			.translate([ width / 2, height / 2 ]);

	var svg = d3.select(id)
							.append("svg")
							.attr("width", width)
							.attr("height", height);

  pathGenerator = d3.geoPath().projection(europeProjection);

	d3.json(geoJsonUrl).then(geojson => {

		svg.selectAll("path")
			.data(geojson.features)
			.enter()
			.append("path")
			.attr("d", pathGenerator) // This is where the magic happens
			.attr("stroke", "grey") // Color of the lines themselves
			.attr("fill", "white") // Color uses to fill in the lines
	});
}