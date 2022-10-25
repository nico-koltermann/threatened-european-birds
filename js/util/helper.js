function getColor(item) {
  let col = redListCatColorScale[item.red_list_cat];
  if (col == undefined ){
    return "#808080"
  }
  else {
    return col;
  }
}

function comparePop(a, b) {
  if (a.population_maximum_size >= b.population_maximum_size) {
    return -1;
  }
  // a must be equal to b
  return 1;
}

