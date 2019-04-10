function checkErrors(flatColumnArry,domainType) {
  var nameIndex = flatColumnArry.indexOf("name") + 2;
  var nameRangeValues = propertySheet.getRange(nameIndex, 4, 1, propertySheet.getLastColumn() - 3).getValues();
  var nameArrylen = nameRangeValues[0].length;
  var numNameBlanks = numOfBlanks(nameRangeValues,nameArrylen);
  if(numNameBlanks > 0) {
    ui.alert("Error: \nYou either have values in a project workbook past the last locations column use or are missing brand names in the project workbook." + "\nAdd names to all locations in row " + nameIndex + "and clear all columns past the last location column in use.");
    return null;
  } else if(domainType == "multi") {
    var domainIndex = flatColumnArry.indexOf("naked_domain") + 2;  
    var rowRangeValues = propertySheet.getRange(domainIndex, 4, 1, propertySheet.getLastColumn() - 3).getValues();
    var domainArrylen = nameRangeValues[0].length;
    var numDomainBlanks = numOfBlanks(rowRangeValues,domainArrylen);
    if(numDomainBlanks > 0) {
      ui.alert("Error: \nAll multi domain locations need their domain field filled out." + "\nAdd domains to all locations in row " + domainIndex);
      return null;
    }
  }  
  else {
    return "good";
  }
}

function numOfBlanks(arryVal,arrylen) {
  var numBlanks = 0;
  for(i = 0; i < arrylen; i++) {
    if(arryVal[0][i] == "") {
      numBlanks += 1;
    }
  }
  return numBlanks;
}







