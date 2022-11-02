(function (topojson, d3) {
  'use strict';
  
  const loadAndProcessData = () =>
    Promise.all ([
      d3.dsv('data/merged_dataset01.11.csv'),
      d3.json('data/data.json')
    ])
    .then(([dsvData, topoJSONdata]) => {
      const rowById = dsvData.reduce((accumulator, d) => {
        accumulator[d.speciesname] = d;
        return accumulator;
      }, {});

      const countries = feature(topoJSONdata, topoJSONdata.objects.countries);

      countries.features.forEach (d => {
        Object.assign(d.properties, rowById[d.id]);
      });
      
      return countries;
    });

  const colorLegend = (selection, props) => {
    const { 
      colorScale, 
      circleRadius, 
      spacing, 
      textOffset
    } = props;

  const groups = selection.selectAll ('.tick')
    .data(colorScale.domain());
  const groupsEnter = groups
    .enter().append('g')
      .attr('class', 'tick');
    groupsEnter
      .merge(groups)
        .attr('transform', (d, i) => 
          `translate(0, ${i * spacing}))`
        );
    groups.exit().remove();

    groupsEnter.append('circle')
      .merge(groups.select('circle'))
        .attr('r', circleRadius)
        .attr('fill', colorScale);

    groupsEnter.append('text')
      .merge(groups.select('text'))
        .text(d => d)
        .attr('dy', '0.32em')
        .attr('x', textOffset);
};
const svg = d3.select('svg');

const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection);

  //Map Structure
const g = svg.append('g');

  //Legend Structure (Translate refers to position in the screen - check backGroundRect for a box for the legend)
const colorLegendG = svg.append('g')
    .attr('transform', `translate(30,300)`);

  g.append('path')  
    .attr('class', 'sphere')  
    .attr('d', pathGenerator({type: 'Sphere'}));

  svg.call(d3.zoom().on('zoom', () => {
    g.attr('transform', d3.event.transform);
  }));

// Color Scale from https://github.com/d3/d3-scale-chromatic
const colorScale = d3.scaleOrdinal();

//Simplifying..
const colorValue = d => d.properties.Risk_Country;

loadAndProcessData().then(countries => {
  
  colorScale
    .domain(country.features.map (colorValue)) 
    .domain(colorScale.domain().sort().reverse()) 
    .range(schemeReds[colorScale.domain().length]); //Can be used instead of the schemeReds[4]

  //Decoration of Color Legend
  colorLegendG.call(colorLegend, {
    colorScale,
    circleRadius:15, 
    spacing: 40, 
    textOffset:15
  });

  g.selectAll('path').data(countries.features)
    .enter().append('path')
      .attr('class', 'country')
      .attr('d', pathGenerator)
      .attr('fill', d => colorScale(colorValue(d)))
    .append('title')
      .text(d => d.properties.country + ': ' + colorVaue(d));

    });
}(topojson, d3));



