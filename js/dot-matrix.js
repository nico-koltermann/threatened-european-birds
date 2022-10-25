function createTestChart(data, id) {

  // ---------------------------------------------
  // ---------          Config         -----------
  // ---------------------------------------------

  // set the dimensions and margins of the graph
  const margin = {top: 20, right: 20, bottom: 60, left: 150};
  const width = 600 - margin.left - margin.right;
  const height = 1000 - margin.top - margin.bottom;

  const step = 10;
  const normalSizeMatrixDot = 4;
  const zoomSizeMatrixDot = 8;

  // ---------------------------------------------
  // ---------        Filter Data      -----------
  // ---------------------------------------------

  familyNames = [];
  data.forEach(species => {
    if (!familyNames.includes(species.taxFamily_en)) {
      familyNames.push(species.taxFamily_en);
    }
  });

  // ---------------------------------------------
  // ---------    Basic Chart Layout      --------
  // ---------------------------------------------

  // create svg element, respecting margins
  var svg = d3.select(id)
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // Add X axis
  var x = d3.scaleLinear().domain([]).range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Configure Y axis
  var y = d3.scaleLinear().domain([0, 66]).range([height -10, 0]);
  yScale = d3.axisLeft(y)
              .ticks(familyNames.length)
              .tickFormat(function (d) {
                return familyNames[d];
              });

  // Y AXIS
  svg.append("g")
    .attr("class", "y-axis")
    .call(yScale);

  // Add X axis label:
  svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top + 20)
    .text("Species");

  // Save values of ticks for adding points
  let yValues = []
  d3.select(".y-axis").selectAll(".tick")
    .each(function(d){
        yValues.push(d)
    }) 
      
  // ---------------------------------------------
  // ---------       Chart Data           --------
  // ---------------------------------------------

  // Remember x values
  let counter = new Array(familyNames.length).fill(10);

  let i;
  let arr = [];
  for(var j = 0; j < data.length; j++) {
    i = familyNames.indexOf(data[j].taxFamily_en);    
    xVal = counter[i];
    counter[i] = counter[i] + step; 
    arr.push({
      y: yValues[i], 
      x: parseFloat(xVal), 
      red_list_cat: data[j].red_list_cat,
      speciesname: data[j].speciesname,
      taxFamily_en: data[j].taxFamily_en,
      speciescode: data[j].speciescode,
      distribution_surface_area: data[j].distribution_surface_area,
      population_maximum_size: data[j].population_maximum_size
    });
  }

 // Add dots
  svg.append('g')
  .selectAll("dot")
  .data(arr)
  .enter()
  .append("circle")
    .attr("cx", function(d,i) {return d.x ; })
    .attr("cy", function(d,i) { return y(d.y); })
    .attr("r", normalSizeMatrixDot)
    .style("fill",function(d){
      return getColor(d);
    });

  // ---------------------------------------------
  // ---------     Interaction            --------
  // ---------------------------------------------

  var tooltip = d3.select(id)
    .append('div')
    .attr('class', 'tooltip');

  tooltip.append('div')
    .attr('class', 'code');
  tooltip.append('div')
    .attr('class', 'name');
  tooltip.append('div')
    .attr('class', 'family');
  tooltip.append('div')
    .attr('class', 'surface_area');
  tooltip.append('div')
    .attr('class', 'copopulationunt');

  svg.selectAll("circle")
    .on('mouseover', function(e, d) {
      tooltip.select('.code').html("<b>Code: " + d.speciescode + "</b>");
      tooltip.select('.name').html("<b>Name: " + d.speciesname+ "</b>");
      tooltip.select('.family').html("<b>Family: " + d.taxFamily_en + "</b>");
      tooltip.select('.population').html("<b>Population: " + d.population_maximum_size + "</b>");

      const area = d.distribution_surface_area == -1 ? "-" : d.distribution_surface_area;
      tooltip.select('.surface_area').html("<b>Suface Area: " + area + "</b>");

      tooltip.style('display', 'block');
      tooltip.style('border', '6px solid' + getColor(d));
      tooltip.style('opacity', 2);

    })
    .on('mousemove', function(e, d) {
        d3.select(this)
          .attr("r", zoomSizeMatrixDot)
          .style('cursor', 'pointer');
        tooltip
          .style('top', (e.layerY + 10) + 'px')
          .style('left', (e.layerX - 25) + 'px');
    })
    .on('mouseout', function() {
        d3.select(this)
          .attr("r", normalSizeMatrixDot);
        tooltip.style('display', 'none');
        tooltip.style('opacity',0);
    });

}