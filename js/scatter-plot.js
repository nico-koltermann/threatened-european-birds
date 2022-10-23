function createScatterPlot(id, dataPath) {
  const margin = { top: 20, right: 30, bottom: 40, left: 90 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3 // test comment
    .select(id)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("id", "gScatterPlot")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

}

function updateScatterPlot(id, dataPath) {

}