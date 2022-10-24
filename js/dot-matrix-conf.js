function createDotMatrix(id, data) {

  // ---------------------------------------------
  // ---------          Config         -----------
  // ---------------------------------------------

  // set the dimensions and margins of the graph
  let margin = {top: 20, right: 20, bottom: 60, left: 150},
  width = 800 - margin.left - margin.right,
  height = 1000 - margin.top - margin.bottom;


  let redListCatColorScale = {
    "CE": "#D90000",
    "EN": "#FF8400",
    "VU ": "#FFD740",
    "NT ": "#7AD600",
    "LC": "#00D216",
    "Unknown": "#808080"
  }

  // Information
  const maxItemsInRow = 20;
  const dotRadius = 5;
  const dotPadding = 5;
  const step = 20;

  // Data
  let familyInformation = {};
  let familyNames = [];  
  let familes = [];  
  let yValues = [];

  let counter = new Array(familyNames.length).fill(10);
  
  // ---------------------------------------------
  // ---------          Filter         -----------
  // ---------------------------------------------

  data.forEach(species => {
    if (!familyNames.includes(species.taxFamily_en)) {
      familyNames.push(species.taxFamily_en);
    }
  });

  data.forEach( species => {
    if (familyInformation[species.taxFamily_en] == null) {
      familyInformation[species.taxFamily_en]  = 1;
    } else {
      familyInformation[species.taxFamily_en] += 1;
    }
  });
  
  let i = 0;
  let arr = [];
  for(let j = 0; j < data.length; j++) {
      i = familyNames.indexOf(data[j].taxFamily_en);    
      xVal = counter[i];
      counter[i] = counter[i] + step; 
      arr.push({
        y: yValues[i], x: parseFloat(xVal), red_list_cat: data[j].red_list_cat
      });
  }

  // ---------------------------------------------
  // ---------    Layout Information   -----------
  // ---------------------------------------------

  let maxLinesRow = 0;
  for (let species in familyInformation) {
    if (familyInformation[species] / maxItemsInRow > maxLinesRow) {
      maxLinesRow = Math.ceil(familyInformation[species] / maxItemsInRow);
    }
  }

  // ---------------------------------------------
  // ---------          Chart          -----------
  // ---------------------------------------------


  // create svg element, respecting margins
  let svg = d3.select("#testChart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  // Add X axis
  let x = d3.scaleLinear().domain([]).range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  let y = d3.scaleLinear().domain([0, 66]).range([height, 0]);

  yScale = d3.axisLeft(y)
            .ticks(familyNames.length)
            .tickFormat(function (d) {
              return familyNames[d];
            });

  svg.append("g")
  .attr("class", "y-axis")
  .call(yScale);

  // Add X axis label:
  svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top + 20)
    .text("Species");

  d3.select(".y-axis").selectAll(".tick")
    .each(function(d){
        yValues.push(d)
    }) 

  // Add dots
  svg.append('g')
  .selectAll("dot")
  .data(arr)
  .enter()
  .append("circle")
  .attr("cx", function(d,i) {return d.x ; })
  .attr("cy", function(d,i) { return y(d.y); })
  .attr("r", 5)
  .style("fill",function(d){return redListCatColorScale[d.red_list_cat] ;});

}

function updateDotMatrix(id, dataPath) {

}