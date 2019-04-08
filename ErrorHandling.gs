function checkErrors(flattenColumnVal) {
  var searchResult = flattenColumnVal.indexOf("name") + 2;  
  var lastColumn = propertySheet.getLastColumn();
  var rowRange = propertySheet.getRange(searchResult, 4, 1, propertySheet.getLastColumn() - 3);
  var rowRangeValues = rowRange.getValues();
  var length = rowRangeValues[0].length;
  var numBlanks = 0;
  for(i = 0; i < rowRangeValues[0].length; i++) {
    if(rowRangeValues[0][i] == "") {
      numBlanks += 1;
    }
  }
  if(numBlanks > 0) {
    ui.alert("Error: \nYou either have values in a project workbook past the last locations column use or are missing brand names in project workbook." + "\nAdd names to all locations in row " + searchResult + "and clear all columns past last location in use.");
    return null;
  } else {
    return "good";
  }
}







