// ---------------------------------------------
// ---------         General         -----------
// ---------------------------------------------

// Load data path
const dataPath = "data/birdsEUPopulation(Dataset1)25.10.csv";
const geoJsonUrl = "data/geo.json";
const geoDataPath = "data/merged_dataset01.11.csv";

// TODO: Fix data
// Same as in the css
let redListCatColorScale = {
  "CR": "#D90000",
  "CR ": "#D90000",
  "EN": "#FF8400",
  "EN ": "#FF8400",
  "VU": "#FFD740",
  "VU ": "#FFD740",
  "NT": "#7AD600",
  "NT ": "#7AD600",
  "LC": "#006400",
  "LC ": "#006400",
  "EX": "#631b1b",
  "Unknown": "#808080",
  "Unknown ": "#808080"
}

allRedListCats = ['LC', 'NT', 'VU', 'EN', 'CR']

const breedingColor = 'grey'
const winteringColor = 'grey'
const breedingText = 'Breeding'
const winteringText = 'Wintering'

// Class Names
const scatterItem = "scatterItem"
const sankeyItem = "sankeyItem"
const dotMatrixItem = "dotMatrixItem"
const countryItem = "countryItem"

// Do the checks
const grey = "rgb(176, 176, 176)";

const dotStrokeWidth = 2;

// ---------------------------------------------
// ---------        Scatter Plot     -----------
// ---------------------------------------------

const margin_scatter = { top: 30, right: 100, bottom: 80, left: 100 };
const width_scatter = 600 - margin_scatter.left - margin_scatter.right;
const height_scatter = 600 - margin_scatter.top - margin_scatter.bottom;

const scatterCircleSize = 4;
const scatterZoomSize = 10;

// ---------------------------------------------
// ---------         Dot Matrix      -----------
// ---------------------------------------------

const margin_dotMatrix = {top: 10, right: 20, bottom: 10, left: 150};
const width_dotMatrix = 800 - margin_dotMatrix.left - margin_dotMatrix.right;
const height_dotMatrix = 1100 - margin_dotMatrix.top - margin_dotMatrix.bottom;

const distanceToYAxis = 10;

const step = 12;
const symbolSizeDotMatrix = 80;
const zoomSymbolSizeDotMatrix = 250;

// ---------------------------------------------
// ---------       Map               -----------
// ---------------------------------------------

// ---------------------------------------------
// ---------        Sankey Plot      -----------
// ---------------------------------------------

const margin_sankey = {top: 10, right: 20, bottom: 10, left: 20};
const width_sankey = 1000 - margin_sankey.left - margin_sankey.right;
const height_sankey = 400 - margin_sankey.top - margin_sankey.bottom;

const sankeyWidthHighlight = 10.0; 
const sankeyHighlight = 1.0; 
let sankeyWidthNormal = 1.0; 
const sankeyNormal = 0.4; 