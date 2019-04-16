var tags = ["current_website","naked_domain","name","street_address_1","city","state","postal_code","country","local_phone_number","display_phone_number","email"];
var mfTags = ["current_website","naked_domain","name","street_address_1","city","state","postal_code","country","local_phone_number","display_phone_number","email","property_feature_1","primary_type","floor_plans"];
/*
 *Checks for errors before running the main function fully
 *Checks for Missing Tags, Missing location names, values to the right of the last location column
 @param Flattened Array list of tags in workbook
 @param Domain type for the project (multi or single)
 @return Returns null if there are errors and "good" if there are no errors
*/ 
function checkErrors(flatColumnArry,domainType,vertical) {
  var missingTags;
  if(vertical == "mf") {
    missingTags = mfTags.diff(flatColumnArry);
  } else {
    missingTags = tags.diff(flatColumnArry);
  }
  if(missingTags.length > 0) {
    ui.alert("You are missing the following required tags in the workbook:\nMissing Tags: " + missingTags + "\nCheck to ensure the workbook is up to date");
    return null;
  }
  var nameIndex = flatColumnArry.indexOf("name") + 2;
  var nameRangeValues = propertySheet.getRange(nameIndex, 4, 1, propertySheet.getLastColumn() - 3).getValues();
  var nameArrylen = nameRangeValues[0].length;
  var numNameBlanks = numOfBlanks(nameRangeValues,nameArrylen);
  if(numNameBlanks > 0) {
    ui.alert("Error: \nYou either have values in a project workbook past the last locations column use or are missing brand names in the project workbook." + 
             "\nAdd names to all locations in row " + nameIndex + "and clear all columns past the last location column in use.");
    return null;
  } 
  if(domainType == "multi") {
    var domainIndex = flatColumnArry.indexOf("naked_domain") + 2;  
    var rowRangeValues = propertySheet.getRange(domainIndex, 4, 1, propertySheet.getLastColumn() - 3).getValues();
    var domainArrylen = nameRangeValues[0].length;
    var numDomainBlanks = numOfBlanks(rowRangeValues,domainArrylen);
    if(numDomainBlanks > 0) {
      ui.alert("Error: \nAll multi domain locations need their domain field filled out." + "\nAdd domains to all locations in row " + domainIndex);
      return null;
    }
  }
  return "good";
}

/*
 *Checks for the number of blanks in an array list
 @param Array list to check for blanks in
 @param length of arrayList
 *
*/ 
function numOfBlanks(arryVal,arrylen) {
  var numBlanks = 0;
  var i = 0;
  while(i < arrylen && numBlanks == 0) {
    if(arryVal[0][i] == "") {
      numBlanks += 1; 
    }
    i++;
  }
  return numBlanks;
}

/*
 *compares 2 array lists for missing values
 *@returns an array with elements that the original array contains 
 *but the list being compared to does not contain
*/ 
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};







