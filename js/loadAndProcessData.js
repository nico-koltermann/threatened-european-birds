import { feature } from 'topojson';
import { dsv, json } from 'd3';
export const loadAndProcessData = () => 
  Promise.all ([
    d3.dsv(';', 'data/merged_dataset01.11.csv'),
    d3.json('data/data.json')
  ])
  .then(([dsvData, topoJSONdata]) => {
    const rowById = tsvData.reduce((accumulator, d) => {
      accumulator[d.speciesname] = d;
      return accumulator;
    }, {});

    const countries = feature(topoJSONdata, topoJSONdata.objects.countries);

    countries.features.forEach (d => {
      Object.assign(d.properties, rowById[d.id]);
    });
    
    return countries;
  });