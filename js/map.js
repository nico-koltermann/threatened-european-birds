function createMap(data, id, filter, winter, breed) {

	filter_cat = ['LC', 'NT', "-1", "EX"];

	
	d3.selectAll(id).selectAll('*').remove();
	
	filter.forEach(x => filter_cat.push(x));

	let width = 500, height = 350;

	let europeProjection = d3.geoMercator()
			.center([ 13, 52 ])
			.scale([ width / 1.5 ])
			.translate([ width / 2.0, height / 1.6 ]);

	var svg = d3.select(id)
							.append("svg")
							.attr("width", width)
							.attr("height", height)
							.attr("class", "chloroMap");

  pathGenerator = d3.geoPath().projection(europeProjection);

	var colorScale = d3.scaleThreshold()
		.domain([0, 1,  6, 11, 16])
		.range(['#d1d4d8', '#d1d4d8', '#a2d7e3', '#7eaedf', '#0b3e94', '#062a4a']);

	
	var colorScaleHover = d3.scaleThreshold()
		.domain([0, 1,  6, 11, 16])
		.range(['#e8eaeb', '#edeef0', '#cdeef5', '#aecff0', '#2459b2', '#184064']);

		country_count = { };
		country_summary = { };

		d3.dsv(";", geoDataPath).then(geodata => {
			geodata.forEach(col => {
				if (!filter_cat.includes(col.red_list_cat)) {
					if ((winter && col.keywintering == "Y") || breed && col.keywintering == "N") {
						if (country_count[col.country] == null) {
							country_summary[col.country] = []
							country_summary[col.country].push(col)
							country_count[col.country] = 1;
						} else {
							country_summary[col.country].push(col)
							country_count[col.country] += 1;
						}
					}
				}
		});

	d3.json(geoJsonUrl).then(geojson => {
	
  var tooltip = d3.select(id)
		.append('div')
		.attr('class', 'tooltip');

	tooltip.append('div')
		.attr('class', 'tp-map-country');
	tooltip.append('div')
		.attr('class', 'tp-map-species');


	svg.selectAll("path")
		.data(geojson.features)
		.enter()
		.append("circle")
			.attr("class", countryDot)
			.attr("r","6")
			.attr("fill","black")
			.attr("opacity","0.0")
			.attr("transform", function(d) {  
				d.alldata = country_summary; 
				var cen = d3.geoCentroid(d);	
				var p = europeProjection(cen);
				return "translate("+ p +")";
			});	

	svg.selectAll("path")
		.data(geojson.features)
		.enter()
		.append("path")
		.attr("class", "countryItem")
		.attr("d", pathGenerator) // This is where the magic happens
		.attr("stroke", "grey") // Color of the lines themselves
		.attr("fill", "white") // Color uses to fill in the lines
		.attr("fill", function (d) {
			d.total = country_count[d.properties.name] || 0;
			d.summary = country_summary[d.properties.name];
			return colorScale(d.total);
		})
		.on('mouseover', function (e, d) {
			tooltip.select('.tp-map-country').html('<b>Country: <span class="tooltip-text">' + d.properties.name + '</span></b>');
			tooltip.select('.tp-map-species').html('<b>Total: <span class="tooltip-text">' + d.total + '</span></b>');

			tooltip.style('display', 'block');
			tooltip.style('border', '6px solid ' + colorScale(d.total));
			tooltip.style('opacity', 2);

			d3.select(this)
				.style('fill', function (d) {
					d.total = country_count[d.properties.name] || 0;
					return colorScaleHover(d.total);
				});
			handleMapMouseOver(d);
		})
		.on('mousemove', function(e, d) {
			tooltip
				.style('top', (e.layerY + 30) + 'px')
				.style('left', (e.layerX - 25) + 'px');
		})
		.on('mouseleave', function (e, d) {
			tooltip.style('display', 'none');
			tooltip.style('opacity',0);
			d3.select(this)
				.style('fill', function (d) {
					d.total = country_count[d.properties.name] || 0;
					return colorScale(d.total);
				});
			handleMapMouseLeave(d);
		});	

		});
	});
}