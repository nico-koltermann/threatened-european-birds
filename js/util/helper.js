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
    return d3.symbols[4];
  }
}

function comparePop(a, b) {
  if (a.population_maximum_size >= b.population_maximum_size) {
    return -1;
  }
  // a must be equal to b
  return 1;
}

const red_list_rank = { CR: 1, EN: 2, VU: 3, NT: 4, LC: 5 }
function compareRedList( left, right ) {
  if (!red_list_rank[left.red_list_cat])  return -1;
  if (!red_list_rank[right.red_list_cat]) return 1;
  return red_list_rank[left.red_list_cat] - red_list_rank[right.red_list_cat];
}

const quantile = (arr, q) => {
  const sorted = arr.reverse();
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
      return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  } else {
      return sorted[base];
  }
};

function getFilteredData(data) {

  let arr = [];
  
  let temp = [];
  data.forEach(species => {
    if (!___filterStates___.CR && species.red_list_cat == 'CR') {
      temp.push(species);
    } 
    if (!___filterStates___.EN && species.red_list_cat == 'EN') {
      temp.push(species);
    } 
    if (!___filterStates___.VU && species.red_list_cat == 'VU') {
      temp.push(species);
    } 
    if (!___filterStates___.NT && species.red_list_cat == 'NT') {
      temp.push(species);
    } 
    if (!___filterStates___.LC && species.red_list_cat == 'LC') {
      temp.push(species);
    } 
    if (!___filterStates___.CR && species.red_list_cat == 'CR') {
      temp.push(species);
    } 
  });

  // temp.forEach(species => {
  //   if (!___filterStates___.Breeding && species.keywintering == 'N') {
  //     arr.push(species);
  //   } 
  //   if (!___filterStates___.Wintering && species.keywintering == 'Y') {
  //     arr.push(species);
  //   } 
  // });

  return temp;
}

function filterData() {
}
