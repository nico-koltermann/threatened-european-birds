function createChoropleth(id) {
  margin = { top: 20, right: 30, bottom: 40, left: 90 };
  width = 1000 - margin.left - margin.right;
  height = 700 - margin.top - margin.bottom;

  svg = d3.select(id);
  svg.attr("width", width);
  svg.attr("height", height);

  projection = d3.geoMercator();

  d3.json("merged_dataset.csv").then(function (loadData) {
    topo = loadData;
    svg
      .append("g")
      .selectAll("path")
      .data(topojson.feature(topo, topo.objects.country).features)
      .join("path")
      .attr("d", d3.geoPath().projection(projection))
      .attr("fill", function (d) {
        return d3.interpolateBlues(Math.random());
      });
  });
}