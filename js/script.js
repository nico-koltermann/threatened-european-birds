const dataPath = "data/birdsEUPopulation_Dataset1.csv";

function init() {
  d3.dsv(";", dataPath).then(function(data) {
    createTestChart(data, "#dotMatrix");
  });
  createScatterPlot("#scatterPlot");
  
  d3.select("#LC").on("click", () => {
    updateScatterPlot(LC, dataPath);
    //updateDotMatrix(LC);
  });
  d3.select("#NT").on("click", () => {
    updateScatterPlot(NT, dataPath);
    //updateDotMatrix(NT);
  });
  d3.select("#VU").on("click", () => {
    updateScatterPlot(VU, dataPath);
    //updateDotMatrix(VU);
  });
  d3.select("#EN").on("click", () => {
    updateScatterPlot(EN, dataPath);
    //updateDotMatrix(EN);
  });
  d3.select("#CR").on("click", () => {
    updateScatterPlot(CR, dataPath);
    //updateDotMatrix(CR);
  });
  d3.select("#EX").on("click", () => {
    updateScatterPlot(EX, dataPath);
    //updateDotMatrix(EX);
  });

}
