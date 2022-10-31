function createSankeyDiagram(data, id) {

  console.log("sankey");

  // append the svg object to the body of the page
  let svg = d3.select(id)
    .append("svg")
      .attr("width", width_sankey + margin_sankey.left + margin_sankey.right)
      .attr("height", height_sankey + margin_sankey.top + margin_sankey.bottom)
    .append("g")
      .attr("transform", 
            "translate(" + margin_sankey.left + "," + margin_sankey.top + ")");

  // Set the sankey diagram properties
  let sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(40)
    .size([width_sankey, height_sankey]);

  //set up graph in same style as original example but emptyUncaught (in promise) TypeError: d3.sankey is not a function
  graph = {"nodes" : [], "links" : []};

  allRedListCats.forEach(rlc => {
    graph.nodes.push({ "red_list_cat": rlc});
    graph.nodes.push({ "red_list_cat": rlc });
  })

  data.forEach(function (d) {
    graph.links.push({ "source": d.red_list_cat_prev,
                       "target": d.red_list_cat_prev,
                       "value": 1 });
   });

  // loop through each link replacing the text with its index from node
  graph.links.forEach(function (d, i) {
    graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
    graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
  });

  // now loop through each nodes to make nodes an array of objects
  // rather than an array of strings
  graph.nodes.forEach(function (d, i) {
    graph.nodes[i] = { "red_list_cat": d };
  });

  sankey
    .nodes(graph.nodes);
  sankey
    .links(graph.links);

  // add in the links
  var link = svg.append("g").selectAll(".link")
    .data(graph.links)
  .enter().append("path")
    .attr("class", "link")
    .attr("d", d3.sankeyLinkHorizontal())
    .style("stroke-width", function(d) { return Math.max(1, d.dy); })
    .sort(function(a, b) { return b.dy - a.dy; });

  // // add the link titles
  // link.append("title")
  //       .text(function(d) {
  //   		return d.source.red_list_cat + " -> " + 
  //               d.target.red_list_cat + "\n" + format(d.value); });

  // add in the nodes
  var node = svg.append("g").selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { 
		  return "translate(" + d.x + "," + d.y + ")"; });

  // add the rectangles for the nodes
  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) { 
		  return d.color = "blue" })
      .style("stroke", function(d) { 
		  return d3.rgb(d.color).darker(2); })
    .append("title")
      .text(function(d) { 
		  return d.red_list_cat + "\n" + d.value; });

  // add in the title for the nodes
  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.red_list_cat; })
    .filter(function(d) { return d.x < width_sankey / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

}

