function createTestChart(input_data, id) {

  // ---------------------------------------------
  // ---------          Config         -----------
  // ---------------------------------------------

  // set the dimensions and margins of the graph
  const margin = {top: 20, right: 20, bottom: 60, left: 150};
  const width = 630 - margin.left - margin.right;
  const height = 1000 - margin.top - margin.bottom;

  // ---------------------------------------------
  // ---------        Filter Data      -----------
  // ---------------------------------------------

  // Filter data for color
  // TODO: This is a fast and dirty way, rewrite this section
  data_CR = [];
  data_EN = [];
  data_VU = [];
  data_NT = [];
  data_LC = [];
  data_UNK = [];
  input_data.forEach( x => { if (x.red_list_cat == 'Unknown' ||
    (  !x.red_list_cat.includes('CR')
    && !x.red_list_cat.includes('EN')
    && !x.red_list_cat.includes('VU')
    && !x.red_list_cat.includes('NT')
    && !x.red_list_cat.includes('LC')
    )) data_UNK.push(x) });
  input_data.forEach( x => { if (x.red_list_cat.includes('CR')) data_CR.push(x) });
  input_data.forEach( x => { if (x.red_list_cat.includes('EN')) data_EN.push(x) });
  input_data.forEach( x => { if (x.red_list_cat.includes('VU')) data_VU.push(x) });
  input_data.forEach( x => { if (x.red_list_cat.includes('NT')) data_NT.push(x) });
  input_data.forEach( x => { if (x.red_list_cat.includes('LC')) data_LC.push(x) });
  
  // Build final data, sort by population size 
  data = data_UNK
    .concat(data_CR.sort(comparePop))
    .concat(data_EN.sort(comparePop))
    .concat(data_VU.sort(comparePop))
    .concat(data_NT.sort(comparePop))
    .concat(data_LC.sort(comparePop));

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
    .attr("transform", "translate(0," + height + 30 + ")")
    .call(d3.axisBottom(x));

  // Configure Y axis
  var y = d3.scaleLinear().domain([0, familyNames.length]).range([height - 30, 0]);
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
    .attr("y", height)
    .text("Species");

  // Save values of ticks for adding points
  let yValues = []
  d3.select(".y-axis").selectAll(".tick")
    .each(function(d){
        yValues.push(d)
    }) 

  svg.append('line')
    .style("stroke", "black")
    .style("stroke-width", 1)
    .attr("x1", width)
    .attr("y1", height - 20)
    .attr("x2", width)
    .attr("y2", 0); 

  svg.append('line')
    .style("stroke", "black")
    .style("stroke-width", 1)
    .attr("x1", 0)
    .attr("y1", height - 20)
    .attr("x2", width)
    .attr("y2", height - 20); 

  svg.append('line')
    .style("stroke", "black")
    .style("stroke-width", 1)
    .attr("x1", 0)
    .attr("y1", height - 20)
    .attr("x2", width)
    .attr("y2", height - 20); 

  svg.append('line')
    .style("stroke", "black")
    .style("stroke-width", 1)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", width)
    .attr("y2", 0);
      
  // ---------------------------------------------
  // ---------       Chart Data           --------
  // ---------------------------------------------

  // Remember x values

  let counter = new Array(familyNames.length).fill(10);

  var maxValue = d3.max(data, function(d){
    return +d.population_maximum_size; //<-- convert to number
  });

  let i;
  let finalData = [];
  for(var j = 0; j < data.length; j++) {
    i = familyNames.indexOf(data[j].taxFamily_en);    
      xVal = counter[i];
      counter[i] = counter[i] + step; 
      finalData.push({
        y: yValues[i], 
        x: parseFloat(xVal),
        multiplier: parseFloat(data[j].population_maximum_size) / maxValue,
        red_list_cat: data[j].red_list_cat,
        speciesname: data[j].speciesname,
        taxFamily_en: data[j].taxFamily_en,
        speciescode: data[j].speciescode,
        keywintering: data[j].keywintering,
        distribution_surface_area: data[j].distribution_surface_area,
        population_maximum_size: data[j].population_maximum_size
      });
  }

  svg.append('g')
    .selectAll("dot")
    .data(finalData)
    .enter()
      .append("circle")
      // .append("svg:marker") 
      // .attr("class", function(d) {
      //   if (d.keywintering == 'N') {
      //     return 'circle';
      //   } else {
      //     return 'rect';
      //   }
      // })
        .attr("class", "dotMatrixDot singleItem")
        // .attr("d", customSqr)
        // .attr("transform", 'translate(' + x + ',' + y + ')');
        .attr("cx", function(d,i) {return d.x ; })
        .attr("cy", function(d,i) { return y(d.y); })
        .attr("r", function(d,i) {
          return dotMatrixCircleSize; 
        })
        .style("fill",function(d){
          return getColor(d.red_list_cat);
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
    .attr('class', 'population');
  tooltip.append('div')
    .attr('class', 'red_list');

  svg.selectAll("circle")
    .on('mouseover', function(e, d) {
      handleSingleMouseOver(d);
      tooltip.select('.red_list').html("<b>Red List: " + d.red_list_cat + "</b>");
      tooltip.select('.code').html("<b>Code: " + d.speciescode + "</b>");
      tooltip.select('.name').html("<b>Name: " + d.speciesname+ "</b>");
      tooltip.select('.family').html("<b>Family: " + d.taxFamily_en + "</b>");
      tooltip.select('.population').html("<b>Population: " + d.population_maximum_size + "</b>");

      const area = d.distribution_surface_area == -1 ? "-" : d.distribution_surface_area;
      tooltip.select('.surface_area').html("<b>Suface Area: " + area + "</b>");

      tooltip.style('display', 'block');
      tooltip.style('border', '6px solid' + getColor(d.red_list_cat));
      tooltip.style('opacity', 2);

    })
    .on('mousemove', function(e, d) {
        handleSingleMouseOver(d);
        d3.select(this)
          .attr("r", zoomSizeMatrixDot)
          .style('cursor', 'pointer');
        tooltip
          .style('top', (e.layerY + 10) + 'px')
          .style('left', (e.layerX - 25) + 'px');
    })
    .on('mouseout', function(e, d) {
        handleMouseLeave(d);
        d3.select(this)
          .attr("r", function(d,i) {
            return dotMatrixCircleSize; 
          });
        tooltip.style('display', 'none');
        tooltip.style('opacity',0);
    });

}