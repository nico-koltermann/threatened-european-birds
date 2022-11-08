function getGradID(d){ return "linkGrad-" + d.source.name + d.target.name; }

function createSankeyDiagram(data, id) {

  // append the svg object to the body of the page
  let svg = d3.select(id)
    .append("svg")
      .attr("width", width_sankey + margin_sankey.left + margin_sankey.right)
      .attr("height", height_sankey + margin_sankey.top + margin_sankey.bottom)
    .append("g")
       .attr("transform", 
            "translate(" + margin_sankey.left + "," + margin_sankey.top + ")");

    // format variables
    var formatNumber = d3.format(",.0f"), // zero decimal places
      format = function(d) {
        return formatNumber(d);
      },
      color = d3.scaleOrdinal(d3.schemeCategory10);

    // Set the sankey diagram properties
    var sankey = d3
      .sankey()
      .nodeWidth(50)
      .nodePadding(0)
      .size([width_sankey, height_sankey]);


    links = dataToNodesAndLinks(data);
    nodes = getNodes(data);

    d3.json("data/sankeyTest.json").then(function(sankeydata) {
      graph = sankey({ nodes, links });

    // create gradients for the links

    function getLinkID(d){
      return "link-" + d.source.red_list_cat + "-" + d.target.red_list_cat;
    }

    // add in the links
    var link = svg.append("g").selectAll(".link")
        .data(graph.links)
        .enter().append("path")
        .attr("class", "link " + sankeyItem)
        .attr("d", d3.sankeyLinkHorizontal())
        .attr("stroke-width", function(d) { 
          sankeyWidthNormal = d.width;
          return sankeyWidthNormal;
        })
        .style('stroke', function(d) {

          if (d.source.red_list_cat === d.target.red_list_cat) {
            return getColor(d.source.red_list_cat);
          }

          var sourceColor = getColor(d.source.red_list_cat.replace(/ .*/, "")).replace("#", "");
          var targetColor = getColor(d.target.red_list_cat.replace(/ .*/, "")).replace("#", "");
          var id = 'c-' + sourceColor + '-to-' + targetColor;
            var gradient = svg.append('defs')
              .append('linearGradient')
              .attr('id', id)
              .attr('x1', '0%')
              .attr('y1', '0%')
              .attr('x2', '100%')
              .attr('y2', '0%')
              .attr('spreadMethod', 'pad');

            gradient.append('stop')
              .attr('offset', '0%')
              .attr('stop-color', "#" + sourceColor)
              .attr('stop-opacity', 1);

            gradient.append('stop')
              .attr('offset', '100%')
              .attr('stop-color', "#" + targetColor)
              .attr('stop-opacity', 1);
          return "url(#" + id + ")";
        })
        .on('mouseover', function(d) { handleMouseOver(d.originalTarget.__data__.species  ); })
        .on('mouseleave', function(d) { handleMouseLeave(d.originalTarget.__data__.species  ); });

      // add the link titles
      link.append("title").text(function(d) {
        return d.source.red_list_cat + " -> " + d.target.red_list_cat;
      });

     // add in the nodes
      var node = svg
        .append("g")
        .selectAll(".node")
        .data(graph.nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .call(
          d3
            .drag()
            .subject(function(d) {
              return d;
            })
            .on("start", function() {
              this.parentNode.appendChild(this);
            })
        );

      // add the rectangles for the nodes
      node
        .append("rect")
        .attr("x", function(d) {
          return d.x0;
        })
        .attr("y", function(d) {
          return d.y0;
        })
        .attr("height", function(d) {
          d.rectHeight = d.y1 - d.y0;
          return d.y1 - d.y0;
        })
        .attr("width", sankey.nodeWidth())
        .style("fill", function(d) {
          return getColor(d.red_list_cat);
        })
        .attr("stroke", "#000")
        .append("title")
        .text(function(d) {
          return d.red_list_cat + "\n" + format(d.value);
        });

      // add in the title for the nodes
      node
        .append("text")
        .attr("x", function(d) {
          let mult = 0.85;
          if (d.index < 5) {
            return d.x0 - 80 * mult;
          } else {
            return d.x0 + 70 * mult;
          }
        })
        .attr("y", function(d) {
          plus = 0;
          if (d.red_list_cat == 'CR') {
            plus = 10;
          } 
          return ((d.y1 + d.y0) / 2) + plus;
        })
        .attr("dy", "0.35em")
        .text(function(d) {
          return d.red_list_cat + " - " + Math.round(d.percent) + "%";
        })
        .attr('fill', function(d) {
          return getColor(d.red_list_cat);
        })
        .filter(function(d) {
          return d.x0 + 20;
        })
        .attr("text-anchor", "start");

    });
     
}

