function dataToNodesAndLinks(data) {

  links = [];


  data_2012 = { 'CR': 0, 'EN': 0, 'VU': 0, 'NT': 0, 'LC': 0 }

  data.forEach(species => {
    if ( allRedListCats.includes(species.red_list_cat) 
      && allRedListCats.includes(species.red_list_cat_prev)) {
        
        // index_2012 = allRedListCats.indexOf(species.red_list_cat_prev);
        index_2015 = allRedListCats.indexOf(species.red_list_cat_prev);
        index_2020 = allRedListCats.indexOf(species.red_list_cat);
        
        // links.push( { "source":index_2012, "target": index_2015 + 5, "value": 1, "species": species  } );
        links.push( {"source":index_2015,"target": index_2020 + 5,"value": 1, "species": species} );
      }
    });

  return links;
}

function getNodes(data) {
  // {"node":1, "red_list_cat":"NT"},
  // {"node":0, "red_list_cat":"LC"},
    // {"node":2, "red_list_cat":"VU"},
    // {"node":3, "red_list_cat":"EN"},
    // {"node":4, "red_list_cat":"CR"},
    
    data_2020 = { 'CR': 0, 'EN': 0, 'VU': 0, 'NT': 0, 'LC': 0 }
    data_2015 = { 'CR': 0, 'EN': 0, 'VU': 0, 'NT': 0, 'LC': 0 }

    data.forEach(species => {
      if ( allRedListCats.includes(species.red_list_cat) 
        && allRedListCats.includes(species.red_list_cat_prev)) {
          data_2020[species.red_list_cat] += 1;
          data_2015[species.red_list_cat_prev] += 1;
        }
    });
    
  nodes = [
    {"node":5, "red_list_cat":"LC", "percent": data_2015["LC"] / data.length * 100 },
    {"node":6, "red_list_cat":"NT", "percent": data_2015["NT"] / data.length * 100 },
    {"node":7, "red_list_cat":"VU", "percent": data_2015["VU"] / data.length * 100 },
    {"node":8, "red_list_cat":"EN", "percent": data_2015["EN"] / data.length * 100 },
    {"node":9, "red_list_cat":"CR", "percent": data_2015["CR"] / data.length * 100 },
    {"node":10, "red_list_cat":"LC", "percent": data_2020["LC"] / data.length * 100 },
    {"node":11, "red_list_cat":"NT", "percent": data_2020["NT"] / data.length * 100 },
    {"node":12, "red_list_cat":"VU", "percent": data_2020["VU"] / data.length * 100 },
    {"node":13, "red_list_cat":"EN", "percent": data_2020["EN"] / data.length * 100 },
    {"node":14, "red_list_cat":"CR", "percent": data_2020["CR"] / data.length * 100 }
  ];
  return nodes;
}

function getFilteredData(___filterStates___) {

  d3.dsv(";", dataPath).then( function(data) {

    data.forEach(species => {
      if (___filterStates___[species.red_list_cat]) {
        species.showData = false;
      } else {
        species.showData = true;
      }
    });
    createScatterPlot(data, "#scatterPlot");
  });

}