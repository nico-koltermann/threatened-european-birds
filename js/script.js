function init() {
  d3.dsv(";", dataPath).then(function(data) {
    createTestChart(data, "#dotMatrix");
    createScatterPlot(data, "#scatterPlot");
  });

}
