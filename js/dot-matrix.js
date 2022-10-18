function createDotMatrix(id, dataPath) {
  const margin = { top: 20, right: 30, bottom: 40, left: 90 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select(id)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("id", "gDotMatrix")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
}

function updateDotMatrix(id, dataPath) {

}