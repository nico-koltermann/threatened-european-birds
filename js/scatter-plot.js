function createScatterPlot(data, id) {

  const svg = d3
    .select(id)
    .attr("width", width_scatter + margin_scatter.left + margin_scatter.right)
    .attr("height", height_scatter + margin_scatter.top + margin_scatter.bottom)
    .append("g")
    .attr("id", "gScatterPlot")
    .attr("transform", `translate(${margin_scatter.left}, ${margin_scatter.top})`);

  const x = d3
    .scaleLog()
    .domain([1, 50000000])
    .range([0, width_scatter]);

  svg
    .append("g")
    .attr("id", "gXAxis")
    .attr("transform", `translate(0, ${height_scatter + margin_scatter.top})`)
    .call(d3.axisBottom(x)
      .ticks(6)
      .tickFormat((x) => x)
    );

  const y = d3
      .scaleLog()
      .domain([1, 500000000])
      .range([height_scatter, 0]);

  data = data.filter(function (d) { return d.distribution_surface_area > 0 });

  createQuartileLines();

  svg
    .append("g")
    .call(d3.axisLeft(y)
      .ticks(5)
      .tickFormat((x) => x)
    )
    .attr("id", "gYAxis");

  // Add X axis label:
  svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width_scatter - 30)
    .attr("y", height_scatter + 70)
    .text("Surface Area");

  // Add X axis label:
  svg.append("text")
  .attr("text-anchor", "end")
  .attr("x", 0)
  .attr("y", -10)
  .text("Population");

  svg
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("class", "" + scatterItem)
    .attr("cx", (d) => x(d.distribution_surface_area))
    .attr("cy", (d) => y(d.population_maximum_size))
    .attr("r", scatterCircleSize)
    .attr("fill", function(d){return getColor(d.red_list_cat) })
    .on("mouseover", (event, d) => handleMouseOver(d))
    .on("mouseleave", (event, d) => handleMouseLeave())
    .append("speciesname")
    .text((d) => d.speciesname);
}

function createQuartileLines() {

  d3.dsv(";", dataPath).then(function(data) {

    let populations = [];
    let filterData = getFilteredData(data);

    filterData.forEach(element => {
      populations.push(+element.population_maximum_size);
    })

    populations = populations.sort(function(a, b){return a - b});

    var len =  populations.length;

    d3.selectAll(".qt-lines").remove(); 
    
    if (len < 2) return;

    var qt1 =  populations[Math.floor(len * .25) - 1];
    var qt2 =  populations[Math.floor(len * .5) - 1];
    var qt3 =  populations[Math.floor(len * .75) - 1];
    
    if (!(qt1 < qt2 < qt3)) return;
    if (qt1 < 1 || qt2 < 1 || qt3 < 1) return;
      
    let svg = d3.select('#gScatterPlot');

    const y = d3
      .scaleLog()
      .domain([1, 500000000])
      .range([height_scatter, 0]);

    // First Quartile
    svg.append('line')
      .attr('class', 'qt-lines')
      .style("stroke", "grey")
      .style("stroke-width", 0.8)
      .attr("x1", 0)
      .attr("y1", y(qt1))
      .attr("x2", width_scatter)
      .attr("y2", y(qt1));

    svg.append("text")
      .attr('class', 'qt-lines qt-text')
      .attr("x", 10)
      .attr("y", y(qt1) + 8)
      .attr("dy", ".35em")
      .style("color", "grey")
      .text("1 Qt.");

    // Second Quartile
    svg.append('line')
      .attr('class', 'qt-lines')
      .style("stroke", "grey")
      .style("stroke-width", 1)
      .attr("x1", 0)
      .attr("y1", y(qt2))
      .attr("x2", width_scatter)
      .attr("y2", y(qt2));  
    
    svg.append("text")
      .attr('class', 'qt-lines qt-text')
      .attr("x", 10)
      .attr("y", y(qt2) + 8)
      .attr("dy", ".35em")
      .style("fill", "grey")
      .text("2 Qt.");

    // Third Quartile
    svg.append('line')
      .attr('class', 'qt-lines')
      .style("stroke", "grey")
      .style("stroke-width", 1)
      .attr("x1", 0)
      .attr("y1", y(qt3))
      .attr("x2", width_scatter)
      .attr("y2", y(qt3));

      svg.append("text")
      .attr('class', 'qt-lines qt-text')
      .attr("x", 10)
      .attr("y", y(qt3) + 8)
      .attr("dy", ".35em")
      .style("fill", "grey")
      .text("3 Qt.");

  });

}

function updateScatterPlot(id, dataPath) {
  

  
}


  