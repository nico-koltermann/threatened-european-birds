const dataPath = "data/energy_ranking.csv"

const svgId1 = "#vi1";
const svgId2 = "#vi2";

function init() {
  createChart(svgId1, dataPath);
  createFinalChart(svgId2, dataPath);
}