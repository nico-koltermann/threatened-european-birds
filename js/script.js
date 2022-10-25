const dataPath = "data/birdsEUPopulation_Dataset1.csv"

function init() {
  d3.dsv(";", dataPath).then(function(data) {
    createTestChart(data, "#dotMatrix");
  });
}
