function getColor(item) {
  let col = redListCatColorScale[item.red_list_cat];
  if (col == undefined ){
    return "#808080"
  }
  else {
    return col;
  }
}