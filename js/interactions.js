
let ___filterStates___ = {
  CR: false,
  EN: false,
  NT: false,
  VU: false,
  LC: false,
  Breeding: false,
  Wintering: false
}

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

function handleMouseOver(item) {
  d3.selectAll("." + scatterItem)
  .filter(function (d, i) {
    return d.speciescode == item.speciescode;
  })
  .moveToFront()
  .style('stroke', 'black')
  .style('stroke-width', dotStrokeWidth)
  .attr('r', scatterZoomSize);

  d3.selectAll("." + sankeyItem)
  .filter(function (d, i) {
    return d.species.speciescode == item.speciescode;
  })
  .style("stroke-width", sankeyWidthHighlight)
  .style("stroke-opacity", sankeyHighlight);

  d3.selectAll("." + dotMatrixItem)
    .filter(function (d, i) {
      return d.speciescode == item.speciescode;
    })
    .moveToFront()
    .style('stroke', 'black')
    .style('stroke-width', dotStrokeWidth)
    .attr( "d", d3.symbol().size(zoomSymbolSizeDotMatrix).type( function(d) { return getSymbol(d); }) )
}

function handleSingleMouseOver(item) {
  d3.selectAll("." + scatterItem)
    .filter(function (d, i) {
      return d.speciescode == item.speciescode;
    })
    .attr("r", scatterZoomSize);
}

function handleMouseLeave(item) {
  d3.selectAll("." + scatterItem)
    .style('stroke', 'transparent')
    .style('stroke-width', '0')
    .attr("r", scatterCircleSize);  
  d3.selectAll("." + dotMatrixItem)
    .style('stroke', 'transparent')
    .style('stroke-width', '0')
    .attr( "d", d3.symbol().size(symbolSizeDotMatrix).type( function(d) { return getSymbol(d); }) );
  d3.selectAll("." + sankeyItem)
    .style("stroke-width", sankeyWidthNormal)
    .style("stroke-opacity", sankeyNormal);
}

function redListCatButton(cat) {

  btn = document.getElementById('btn-' + cat);

  if (btn.style.background == grey) {
    ___filterStates___[cat] = false;
    btn.style.background = getColor(cat);
    d3.selectAll("." + scatterItem)
      .filter(function (d, i) {
        return d.red_list_cat.includes(cat);
      })
      .style("fill", function(d){ return getColor(d.red_list_cat); });
    d3.selectAll("." + dotMatrixItem)
      .filter(function (d, i) {
        return d.red_list_cat.includes(cat);
      })
      .style("fill", function(d){ return getColor(d.red_list_cat); });
    d3.selectAll("." + countryItem)
      .filter(function (d, i) {
        return d.country_count.includes(cat);
      })
      .style("fill", function(d){ return colorScaleHover(d.country_count); });
  } else {
    ___filterStates___[cat] = true;
    btn.style.background = grey;
    d3.selectAll("." + scatterItem)
      .filter(function (d, i) {
        return d.red_list_cat.includes(cat);
      })
      .style("fill", function(d){ return grey; });
    d3.selectAll("." + dotMatrixItem)
      .filter(function (d, i) {
        return d.red_list_cat.includes(cat);
      })
      .style("fill", function(d){ return grey; });
     d3.selectAll("." + countryItem)
      .filter(function (d, i) {
        return d.country_count.includes(cat);
      })
      .style("fill", function(d){ return grey; });
  }
  createQuartileLines();
}

function onRedListButtonHover(cat) {
  d3.selectAll("." + scatterItem)
  .filter(function (d, i) {
    return d.red_list_cat == cat;
  })
  .moveToFront()
  .style('stroke', 'black')
  .style('stroke-width', dotStrokeWidth)
  .attr("r", scatterZoomSize);
}

function onRedListButtonLeave(cat) {
  d3.selectAll("." + scatterItem)
  .filter(function (d, i) {
    return d.red_list_cat == cat;
  })
  .style('stroke', 'transparent')
  .style('stroke-width', '0')
  .attr("r", scatterCircleSize);
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
        .attr('fill', breedingColor);
    }
  }

  if (filter == 'Wintering') {
    if (!___filterStates___[filter]) {
      d3.selectAll('.legendEntryWinter')
      .attr('fill', grey);
    } else {
      d3.selectAll('.legendEntryWinter')
        .attr('fill', winteringColor);
    }
  }

  if (___filterStates___[filter]) {
    ___filterStates___[filter] = false;
    d3.selectAll("." + scatterItem)
      .filter(function (d, i) {
        return d.keywintering == filterMatch[filter];
      })
      .style("fill", function(d){ return getColor(d.red_list_cat); });
    d3.selectAll("." + dotMatrixItem)
      .filter(function (d, i) {
        return d.keywintering == filterMatch[filter];
      })
      .style("fill", function(d){ return getColor(d.red_list_cat); });
    d3.selectAll("." + sankeyItem)
    .filter(function (d, i) {
      return d.keywintering == filterMatch[filter];
    })
  } else {
    ___filterStates___[filter] = true;
    d3.selectAll("." + scatterItem)
      .filter(function (d, i) {
        return d.keywintering == filterMatch[filter];
      })
      .style("fill", function(d){ return grey; });
    d3.selectAll("." + dotMatrixItem)
      .filter(function (d, i) {
        return d.keywintering == filterMatch[filter];
      })
      .style("fill", function(d){ return grey; });
  }
}

function handleMapMouseOver(item) {
  species = item.summary;
  if (species != undefined) {
    species.forEach(specie => {
      handleMouseOver(specie);
    });
  }
}

function handleMapMouseLeave(item) {
  species = item.summary;
  if (species != undefined) {
    species.forEach(specie => {
      handleMouseLeave(specie);
    });
  }
}
