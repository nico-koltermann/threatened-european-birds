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
  d3.selectAll(".itemValue")
    .attr("r", scatterCircleSize);  
  d3.selectAll(".singleItem")
    .attr("r", dotMatrixCircleSize);
}

function redListCatButton(cat) {
  
  const grey = "rgb(176, 176, 176)";
  btn = document.getElementById('btn-' + cat);

  if (btn.style.background == grey) {
    btn.style.background = getColor(cat);
    d3.selectAll(".itemValue")
      .filter(function (d, i) {
        return d.red_list_cat.includes(cat);
      })
      .style("fill", function(d){ return getColor(d.red_list_cat); });
    d3.selectAll(".singleItem")
      .filter(function (d, i) {
        return d.red_list_cat.includes(cat);
      })
      .style("fill", function(d){ return getColor(d.red_list_cat); });
  } else {
    btn.style.background = grey;
    d3.selectAll(".itemValue")
      .filter(function (d, i) {
        return d.red_list_cat.includes(cat);
      })
      .style("fill", function(d){ return grey; });
    d3.selectAll(".singleItem")
      .filter(function (d, i) {
        return d.red_list_cat.includes(cat);
      })
      .style("fill", function(d){ return grey; }); 
  }
}

function handleDotMatrixClick () {

}

function handleGeneralInteractions() {
  d3.selectAll(".dotMatrixDot").on("click", (e) => {
    console.log(e);
    // d3.select(this)
      // .attr('background-color', '#b5b5b5');
    // updateScatterPlot(LC, dataPath);
    //updateDotMatrix(LC);
  });
}