
let ___filterStates___ = {
  CR: false,
  EN: false,
  NT: false,
  VU: false,
  LC: false,
  Breeding: false,
  Wintering: false
}

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
    .attr( "d", d3.symbol().size(zoomSymbolSizeDotMatrix).type( function(d) { return getSymbol(d); }) )
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
    .attr( "d", d3.symbol().size(symbolSizeDotMatrix).type( function(d) { return getSymbol(d); }) )
}

function redListCatButton(cat) {

  btn = document.getElementById('btn-' + cat);

  if (btn.style.background == grey) {
    ___filterStates___[cat] = false;
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
    ___filterStates___[cat] = true;
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

  createQuartileLines();

}
function winteringFilter(filter) {

  filterMatch = {
    Breeding: 'N',
    Wintering: 'Y'
  }

  if (filter == 'Breeding') {
    if (!___filterStates___[filter]) {
      d3.selectAll('.legendEntryBreed')
      .attr('fill', grey);
    } else {
      d3.selectAll('.legendEntryBreed')
        .attr('fill', 'brown');
    }
  }

  if (filter == 'Wintering') {
    if (!___filterStates___[filter]) {
      d3.selectAll('.legendEntryWinter')
      .attr('fill', grey);
    } else {
      d3.selectAll('.legendEntryWinter')
        .attr('fill', 'blue');
    }
  }

  console.log(___filterStates___[filter]);
  console.log(filterMatch[filter]);

  if (___filterStates___[filter]) {
    ___filterStates___[filter] = false;
    d3.selectAll(".itemValue")
      .filter(function (d, i) {
        return d.keywintering == filterMatch[filter];
      })
      .style("fill", function(d){ return getColor(d.red_list_cat); });
    d3.selectAll(".singleItem")
      .filter(function (d, i) {
        return d.keywintering == filterMatch[filter];
      })
      .style("fill", function(d){ return getColor(d.red_list_cat); });
  } else {
    ___filterStates___[filter] = true;
    d3.selectAll(".itemValue")
      .filter(function (d, i) {
        return d.keywintering == filterMatch[filter];
      })
      .style("fill", function(d){ return grey; });
    d3.selectAll(".singleItem")
      .filter(function (d, i) {
        return d.keywintering == filterMatch[filter];
      })
      .style("fill", function(d){ return grey; });
  }
}

function handleDotMatrixClick () {

}

function handleDotMatrixLegendClick () {

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