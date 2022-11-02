import { 
  select,
  geoPath,
  geoNaturalEarth1,
  zoom,
  event,
  scaleOrdinal,
  schemeReds
} from 'd3';

import { loadAndProcessData } from './loadAndProcessData';
import {colorLegend} from './colorLegend';



function createChoropleth(dataPath) {
  margin = { top: 20, right: 30, bottom: 40, left: 90 };
  width = 1000 - margin.left - margin.right;
  height = 700 - margin.top - margin.bottom;

  const svg = select ('svg');
  const projection = geoNaturalEarth1();
  const pathGenerator = geoPath().projection(projection);
  //Map Structure
  const g = svg.append('g');
  //Legend Structure (Translate refers to position in the screen - check backGroundRect for a box for the legend)
  const colorLegendG = svg.append('g')
      .attr('transform', `translate(30,300)`);

  g.append('path')  
    .attr('class', 'sphere')  
    .attr('d', pathGenerator({type: 'Sphere'}));
  svg.call(zoom().on('zoom', () => {
    g.attr('transform', event.transform);
  }));

  // Color Scale from https://github.com/d3/d3-scale-chromatic
  const colorScale = scaleOrdinal (schemeReds[4]);

  //Simplificando..
  const colorValue = d => d.properties.Risk_Country;

  loadAndProcessData().then(countries => {
    //1st domain - getting rid of the duplicates
    //2nd domain - sorting the values
    colorScale
      .domain(countries.features.map (colorValue)) 
      .domain(colorScale.domain().sort().reverse()); 
      //.range(schemeReds[colorScale.domain().length]); - Can be used instead of the schemeReds[4]

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
}

    
