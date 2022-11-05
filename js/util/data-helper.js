function dataToNodesAndLinks(data) {

  links = [];

  data_2020 = { 'CR': 0, 'EN': 0, 'VU': 0, 'NT': 0, 'LC': 0 }
  data_2015 = { 'CR': 0, 'EN': 0, 'VU': 0, 'NT': 0, 'LC': 0 }
  data_2012 = { 'CR': 0, 'EN': 0, 'VU': 0, 'NT': 0, 'LC': 0 }

  data.forEach(species => {
    if ( allRedListCats.includes(species.red_list_cat) 
      && allRedListCats.includes(species.red_list_cat_prev)) {
        data_2020[species.red_list_cat] += 1;
        data_2015[species.red_list_cat_prev] += 1;
        // data_2012[species.red_list_cat_prev] += 1;
        
        // index_2012 = allRedListCats.indexOf(species.red_list_cat_prev);
        index_2015 = allRedListCats.indexOf(species.red_list_cat_prev);
        index_2020 = allRedListCats.indexOf(species.red_list_cat);
        
        // links.push( { "source":index_2012, "target": index_2015 + 5, "value": 1, "species": species  } );
        links.push( {"source":index_2015,"target": index_2020 + 5,"value": 1, "species": species} );
      }
    });

  return links;
}

function getNodes() {
  return [
    // {"node":0, "red_list_cat":"LC"},
    // {"node":1, "red_list_cat":"NT"},
    // {"node":2, "red_list_cat":"VU"},
    // {"node":3, "red_list_cat":"EN"},
    // {"node":4, "red_list_cat":"CR"},
    {"node":5, "red_list_cat":"LC"},
    {"node":6, "red_list_cat":"NT"},
    {"node":7, "red_list_cat":"VU"},
    {"node":8, "red_list_cat":"EN"},
    {"node":9, "red_list_cat":"CR"},
    {"node":10, "red_list_cat":"LC"},
    {"node":11, "red_list_cat":"NT"},
    {"node":12, "red_list_cat":"VU"},
    {"node":13, "red_list_cat":"EN"},
    {"node":14, "red_list_cat":"CR"}
  ];
}