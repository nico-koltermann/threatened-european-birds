
function createScatterPlot(id, dataPath) {
  const margin = { top: 20, right: 90, bottom: 40, left: 60 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  const svg = d3
    .select(id)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("id", "gScatterPlot")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
    d3.json("data/data.json").then(function (data) {

      const x = d3
          .scaleLinear()
          .domain([0, 4500000])
          .range([0,width]);
      svg
          .append("g")
          .attr("id", "gXAxis")
          .attr("transform", `translate(0, ${height + margin.top})`)
          .call(d3.axisBottom(x).tickFormat((x) => x / 1000000 + "M"));
      
      const y = d3
          .scaleLinear()
          .domain([0, 80000000])
          .range([height, 0])
          
      svg
          .append("g")
          .call(d3.axisLeft(y))
          .attr("id", "gYAxis");
      svg
          .selectAll("circle")
          .data(data)
          .join("circle")
          .attr("class", "circleValues itemValue")
          .attr("cx", (d) => x(d.distribution_surface_area))
          .attr("cy", (d) => y(d.population_maximum_size))
          .attr("r", 4)
          .style("fill", "green")
          .on("mouseover", (event, d) => handleMouseOver(d))
          .on("mouseleave", (event, d) => handleMouseLeave())
          .append("speciesname")
          .text((d) => d.speciesname)

  });
}

function updateScatterPlot(id, dataPath) {
  d3.json("data/data.json").then(function (data) {
    data = data.filter(function (elem) {
      return start <= elem.speciesname && elem.speciesname <= finish;
    });

    const svg = d3.select("#gScatterPlot");

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.distribution_surface_area)])
      .range([0, width]);
    svg
      .select("#gXAxis")
      .call(d3.axisBottom(x).tickFormat((x) => x / 1000000 + "M"));

    const y = d3.scaleLinear().domain([0, 80000000]).range([height, 0]);
    svg.select("gYAxis").call(d3.axisLeft(y));

    svg
      .selectAll("circle.circleValues")
      .data(data, (d) => d.speciesname)
      .join(
        (enter) => {
          circles = enter
            .append("circle")
            .attr("class", "circleValues itemValue")
            .attr("cx", (d) => x(d.distribution_surface_area))
            .attr("cy", (d) => y(0))
            .attr("r", 4)
            .style("fill", "green")
            .on("mouseover", (event, d) => handleMouseOver(d))
            .on("mouseleave", (event, d) => handleMouseLeave())
          circles
            .transition()
            .duration(1000)
            .attr("cy", (d) => y(d.population_maximum_size));
          circles.append("title").text((d) => d.speciesname);
        },
        (update) => {
          update
            .transition()
            .duration(1000)
            .attr("cx", (d) => x(d.distribution_surface_area))
            .attr("cy", (d) => y(d.population_maximum_size))
            .attr("r", 4);
        },
        (exit) => {
          exit.remove();
        }
      );
  });
}
function handleMouseOver(item) {
  d3.selectAll(".itemValue")
    .filter(function (d, i) {
      return d.title == item.title;
    })
    .attr("r", 10)
    .style("fill", "red");
}

