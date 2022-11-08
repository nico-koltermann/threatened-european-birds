function init() {
  d3.dsv(";", dataPath).then(function(data) {
    createDotMatrix(data, "#dotMatrix");
    createScatterPlot(data, "#scatterPlot");
    createSankeyDiagram(data, '#sankey');
    createMap(data, '#map', [], true, true);
  });
}
