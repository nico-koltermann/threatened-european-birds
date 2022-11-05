function createMap(data, id) {

	let width = 800, height = 600;

	let europeProjection = d3.geoMercator()
			.center([ 13, 52 ])
			.scale([ width / 1.5 ])
			.translate([ width / 2.0, height / 1.6 ]);

	var svg = d3.select(id)
							.append("svg")
							.attr("width", width)
							.attr("height", height);

  pathGenerator = d3.geoPath().projection(europeProjection);

	var colorScale = d3.scaleThreshold()
		.domain([null, 0, 5, 10, 15, 20])
		.range(['#d5d8dc', '#d5d8dc', '#f4d03f', '#f5b041', '#e74c3c', '#7b241c' ]);

	d3.json(geoJsonUrl).then(geojson => {
		
		let country_count = { };
		let country_summary = { };
		
		d3.dsv(";", geoDataPath).then(geodata => {
			filter_cat = ['LC', 'NT'];
			geodata.forEach(col => {
				if (!filter_cat.includes(col.red_list_cat)) {
					if (country_count[col.country] == null) {
						country_summary[col.country] = []
						country_summary[col.country].push(col.speciescode)
						country_count[col.country] = 1;
					} else {
						country_summary[col.country].push(col.speciescode)
						country_count[col.country] += 1;
					}
				}
			});

			console.log(country_count);

			svg.selectAll("path")
				.data(geojson.features)
				.enter()
				.append("path")
				.attr("d", pathGenerator) // This is where the magic happens
				.attr("stroke", "grey") // Color of the lines themselves
				.attr("fill", "white") // Color uses to fill in the lines
				.attr("fill", function (d) {
					d.total = country_count[d.properties.name] || 0;
					d.summary = country_summary[d.properties.name];
					return colorScale(d.total);
				})
				.on('mouseover', function (e, d) {
					handleMapMouseOver(d);
				})
				.on('mouseleave', function (e, d) {
					handleMapMouseLeave(d);
				});
		});


	});
}