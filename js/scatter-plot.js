//Implementing Categorical Color Scale in D3//
var data = ["LC", "NT", "VU", "EN", "CR", "EX"]
var myColor = d3.scaleOrdinal().domain(data)
  .range(["#05700f", "#7AD600", "#FFD740", "#FF8400", "#D90000", "rgb(99, 27, 27)"])

function createScatterPlot(id, dataPath) {
  const margin = { top: 20, right: 90, bottom: 40, left: 60 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select(id)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("id", "gScatterPlot")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
    //.attr("fill", function(d){return myColor(d) })
    d3.json("data/data.json").then(function (data) {

      const x = d3
        .scaleLog()
        .domain([1, 50000000])
        .range([0,width]);
      svg
        .append("g")
        .attr("id", "gXAxis")
        .attr("transform", `translate(0, ${height + margin.top})`)
        .call(d3.axisBottom(x).tickFormat((x) => x / 1000000 + "M"));
      
      const y = d3
          .scaleLog()
          .domain([1, 500000000])
          .range([height, 0])

      data = data.filter(function (d) { return d.distribution_surface_area > 0 });

      svg.append('line')
        .style("stroke", "black")
        .style("stroke-width", 1)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", width)
        .attr("y2", 0);

      svg
        .append("g")
        .call(d3.axisLeft(y))
        .attr("id", "gYAxis");
      svg
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("class", "circleValues itemValue")
        .attr("cx", (d) => x(d.distribution_surface_area))
        .attr("cy", (d) => y(d.population_maximum_size))
        .attr("r", scatterCircleSize)
        .attr("fill", function(d){return getColor(d.red_list_cat) })
        //.style("fill",function(d){return redListCatColorScale[d.red_list_cat] ;});
        .on("mouseover", (event, d) => handleMouseOver(d))
        .on("mouseleave", (event, d) => handleMouseLeave())
        .append("speciesname")
        .text((d) => d.speciesname)
        //.style("fill",function(d){return redListCatColorScale[d.red_list_cat] ;});

  });
}

function updateScatterPlot(id, dataPath) {
  

  
}


  