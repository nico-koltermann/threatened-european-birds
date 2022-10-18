function createChart(id, dataPath) {
  
  const svg = d3
    .select(id)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("id", "gBarChart")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  d3.csv(dataPath).then(function (data) {

    const x = d3.scaleLinear().domain([0, 100]).range([0, width]);

    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.Country))
      .range([0, height])
      .padding(0.2);

    svg
      .append("g")
      .attr("id", "gXAxis")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));
      
    svg
    .append("g")
    .attr("id", "gYAxis")
    .call(d3.axisLeft(y));

    //Bars
    svg.selectAll(id)
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d.Country); })
    .attr("width", function(d) { return x(d.Share); })
    .attr("height", y.bandwidth() )
    .attr("fill", "#69b3a2")

  });
}

