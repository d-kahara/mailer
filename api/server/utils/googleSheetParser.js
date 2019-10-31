const xlsx = require('xlsx');
const path = require('path');

const workAssessment = xlsx.readFile(path.resolve('sheet.xlsx'));

/*
* Parse a specific sheet in the workbook
*/
const currentWorksheet = workAssessment.Sheets.Sheet1;
/*
* Parse xlsx record as Json data
*/
export default xlsx.utils.sheet_to_json(currentWorksheet);
