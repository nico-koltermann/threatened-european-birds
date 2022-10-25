function handleMouseOver(item) {
  d3.selectAll(".itemValue")
    .filter(function (d, i) {
      return d.red_list_cat == item.red_list_cat || d.speciescode == item.speciescode;
    })
    .attr("r", zoomSize);
  d3.selectAll(".singleItem")
    .filter(function (d, i) {
      return d.speciescode == item.speciescode;
    })
    .attr("r", zoomSize);
}

function handleSingleMouseOver(item) {
  d3.selectAll(".itemValue")
    .filter(function (d, i) {
      return d.speciescode == item.speciescode;
    })
    .attr("r", zoomSize);
}

function handleMouseLeave(item) {
  d3.selectAll(".itemValue").attr("fill", function(d){return getColor(d)}).attr("r", 2);
  d3.selectAll(".singleItem").attr("fill", function(d){return getColor(d)}).attr("r", dotMatrixCircleSize);
}