function createChoropleth(data, id) {
  margin = { top: 20, right: 30, bottom: 40, left: 90 };
  width = 1000 - margin.left - margin.right;
  height = 700 - margin.top - margin.bottom;

  var svg = d3.select(id);
  svg.attr("width", width);
  svg.attr("height", height);

  projection = d3.geoMercator();

    topo = data;
    svg
        .append("g")
        .selectAll("path")
        .data(topojson.feature(topo, topo.countries).features)
        .join("path")
        .attr("d", d3.geoPath().projection(projection))
        .attr("fill", function (d) {
            return d3.schemeReds[4];
        });

  world = FileAttachement("countries-50m.json").json();

  chart = Choropleth(data, {
      id: d => d.id,
      value: d => d.Risk_Country,
      range: d3.schemeReds[4],
      features: countries,
      featureId: function(d) { return d.properties.name },
      borders: countrymesh,
      domain: ['Few', 'Considerable', 'Alarming', 'High'],
      range: d3.schemeReds[4],
      //title: (f, d) => `${f.properties.name}, ${map.get(f.id.slice(0, 2)).properties.name}\n${d?.Risk_Country}%,
  
  });
  
  //Compute values.
  const N = d3.map(data, id);
  const V = d3.map(data, value).map(d => d == null ? NaN : +d);
  const Im = new d3.InternMap(N.map((id, i) => [id, i]));
  const If = d3.map(features.features, featureId);

  //Compute default domains.
  if (domain === undefined) domain = d3.extent(V);

  // Construct scales.
  const color = scale(domain, range);
  if (color.unknown && unknown !== undefined) color.unknown(unknown);

  // Compute titles.
  if (title === undefined) {
    format = color.tickFormat(100, format);
    title = (f, i) => '${ f.properties.name }\n${ format(V[i])}';
  } else if (title !== null) {
    const T = title;
    const O = d3.map(data, d => d);
    title = (f, i) => T(f, O[i]);
  }

  // Compute the default height. If an outline object is specified, scale the projection to fit
  // the width, and then compute the corresponding height.
  if (height === undefined) {
    if (outline === undefined) {
      height = 400;
    } else {
      const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, outline)).bounds(outline);
      const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
      projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
      height = dy;
    }
  }
  // Construct a path generator.
  const path = d3.geoPath(projection);

  // const svg = d3.create("svg")
  //     .attr("width", width)
  //     .attr("height", height)
  //     .attr("viewBox", [0, 0, width, height])
  //     .attr("style", "width: 100%; height: auto; height: intrinsic;");

  // if (outline != null) svg.append("path")
  //     .attr("fill", fill)
  //     .attr("stroke", "currentColor")
  //     .attr("d", path(outline));

  // svg.append("g")
  //   .selectAll("path")
  //   .data(features.features)
  //   .join("path")
  //     .attr("fill", (d, i) => color(V[Im.get(If[i])]))
  //     .attr("d", path)
  //   .append("title")
  //     .text((d, i) => title(d, Im.get(If[i])));

  // if (borders != null) svg.append("path")
  //     .attr("pointer-events", "none")
  //     .attr("fill", "none")
  //     .attr("stroke", stroke)
  //     .attr("stroke-linecap", strokeLinecap)
  //     .attr("stroke-linejoin", strokeLinejoin)
  //     .attr("stroke-width", strokeWidth)
  //     .attr("stroke-opacity", strokeOpacity)
  //     .attr("d", path(borders));

  // return Object.assign(svg.node(), {scales: {color}});
}
