let csvToJson = require('convert-csv-to-json');

let fileInputName = 'birdsEUPopulation(Dataset1).csv'; 
let fileOutputName = 'data.json';

csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);