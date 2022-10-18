function createFinalChart(id, dataPath) {

  const svg = d3
    .select(id)
    .attr("width", 1300)
    .attr("height", 830)
    .append("g")
    .attr("id", "svg")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
      this.parentNode.appendChild(this);
    });
  };
  
  // function handleMouseOver(d, i) {       
  //   d3.select(this)
  //   .attr("width", 60)
  //   .attr("height", 60);
  //   d3.select(this).moveToFront();
  //   tooltip
  //     .style("top", "100px")
  //     .style("left","100px")
  //     .style("visibility", "visible");
  // }
  
  // function handleMouseOut(d, i) {   
  //     d3.select(this)
  //     .attr("width", 18)
  //     .attr("height", 18)
  //     // tooltip.style("visibility", "hidden");
  // }

  //Read the data
  d3.csv(dataPath).then( function(data) {

    var height_ = 750;
    var width_ = 1100;

    // Add X axis
    const x = d3.scaleLinear()
      .domain([0, 40])
      .range([ 0,  width_]);

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 200000])
      .range([ height_, 0 ]);

    svg.append("g")
      .attr("transform", "translate(0," + height_  + ")")
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));

    svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("x", -250)
      .attr("y", -80)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Supplied Energy [TWh]");

    svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", 750)
      .attr("y", 800  )
      .text("Number of Operating Reactors");

    var tooltip = d3.select(id).append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // tooltip mouseover event handler
    var tipMouseover = function(e, d) {
      d3.select(this)
        .attr("width", 60)
        .attr("height", 60);
      d3.select(this).moveToFront();
      var html  = "Test";
      
      tooltip
        .transition()
          .duration(200) // ms
          .style("opacity", .9) // started as 0!
        .html(html)
          .style("left", (e.pageX + 15) + "px")
          .style("top", (e.pageY - 28) + "px");

    };
    // tooltip mouseout event handler
    var tipMouseout = function(e, d) {
      d3.select(this)
        .attr("width", 12)
        .attr("height", 12);
        tooltip.transition()
            .duration(300) // ms
            .style("opacity", 0); // don't care about position!
    };

    svg.append('g')
      .selectAll(id)
      .data(data)
      .enter()
        .append("image")
        .attr("id", "circleBasicTooltip")
        .attr("xlink:href", function (d) { 
          return "images/circle-flags/" + d.Country + ".svg";
        })
        .attr("x", function (d) { 
          return x(d.Number_of_Operating_Reactors); } )
        .attr("y", function (d) {
          return y(d.Nuclear_Electricity_Supplied * 1000);
        })
        .attr("width", 18)
        .attr("height", 18)
        .attr("stroke", "#32CD32")
        .attr("stroke-width", 1.5)
        .on("mouseover", tipMouseover)
        .on("mouseout", tipMouseout); 
    
      // svg.selectAll(id)
      //   .data(data)
      //   .enter()
      //   .append("text")
      //   .attr("x", function(d) { return x(d.Number_of_Operating_Reactors); })
      //   .attr("y", function(d) { return y(d.Nuclear_Electricity_Supplied); })
      //   .text((d) => d.Country);


  });
}



