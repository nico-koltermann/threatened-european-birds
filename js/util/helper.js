function getColor(red_list_cat) {
  let col = redListCatColorScale[red_list_cat];
  if (col == undefined ){
    return "#808080"
  }
  else {
    return col;
  }
}

function getSymbol(d) {
  if (d.keywintering == 'N') {
    return d3.symbols[0]; 
  } else {
    return d3.symbols[1];
  }
}

function comparePop(a, b) {
  if (a.population_maximum_size >= b.population_maximum_size) {
    return -1;
  }
  // a must be equal to b
  return 1;
}

