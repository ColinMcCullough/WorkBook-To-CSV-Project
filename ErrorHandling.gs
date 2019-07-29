var tags = ["current_website","naked_domain","name","street_address_1","city","state","postal_code","country","local_phone_number","display_phone_number","email","negative_keywords"];
var mfTags = ["current_website","naked_domain","name","street_address_1","city","state","postal_code","country","local_phone_number","display_phone_number","email","property_feature_1","primary_type","floor_plans","negative_keywords"];
/*
 *Checks for errors before running the main function fully
 *Checks for Missing Tags, Missing location names, values to the right of the last location column
 @param Flattened Array list of tags in workbook
 @param Domain type for the project (multi or single)
 @return Returns null if there are errors and "good" if there are no errors
*/ 
function checkErrors(propertySheetValues,propTagArry,clientProperties) {
  var missingTags;
  var alerts = [];
  missingTags = (clientProperties.vertical === "mf") ? mfTags.diff(propTagArry) : tags.diff(propTagArry);
  if(missingTags.length > 0) {
    ui.alert("Error: \nYou are missing the following required tags in the workbook:\nMissing Tags: " + missingTags + "\nCheck to ensure the workbook is up to date");
    return null;
  }
  var nameIndex = propTagArry.indexOf("name") + 2;
  var nameRangeValues = getRowValByTag(propertySheetValues,"name");
  var nameArrylen = nameRangeValues.length;
  var numNameBlanks = numOfBlanks(nameRangeValues,nameArrylen);
  if(numNameBlanks > 0) {
    ui.alert("Error: \nYou either have values in a property info tab past the last locations column or are missing brand names in row" + nameIndex + 
                    "\nAdd brand names to all locations in row " + nameIndex + " and clear all columns past the last location column in use.");
    return null;
  } 
  if(clientProperties.domainType == "multi") {    
    var domainIndex = propTagArry.indexOf("naked_domain") + 2;  
    var rowRangeValues = getRowValByTag(propertySheetValues,"naked_domain");
    var domainArrylen = nameRangeValues.length;
    var numDomainBlanks = numOfBlanks(rowRangeValues,domainArrylen);
    if(numDomainBlanks > 0) {
      var missingDomain = "Error: \nAll multi domain locations need their domain field filled out." + "\nAdd domains to all locations in row " + domainIndex;
       alerts.push(missingDomain);
    }
  }
  var newPhoneArray = copyLocalToDefaultPhone(propTagArry,propertySheetValues); //copies local number to display phone number field if display phone number is blank
  var numPhoneBlanks = numOfBlanks(newPhoneArray,newPhoneArray.length);
  if(numPhoneBlanks > 0) {
    var phoneRowNum = propTagArry.indexOf("display_phone_number") + 2; 
    var missingDefaultPhoneNum = "Error: \nYou have missing values in the required row number " + phoneRowNum + ". Please enter location city area code followed by 555-5555(EX: 541-555-5555) in row " + phoneRowNum;
    alerts.push(missingDefaultPhoneNum);
  }
  if(propTagArry.indexOf("floor_plans") != -1) {
    var floorPlansIndex = propTagArry.indexOf("floor_plans") + 2;  
    var rowRangeValues = getRowValByTag(propertySheetValues,"floor_plans");
    var hasBathroomData = checkForBathValues(rowRangeValues,rowRangeValues.length);
    if(hasBathroomData == true) {
       var bathroomValuesError = "Error: \nLooks like some floor plans cells are using bathroom numbers" + "\nDelete all bathroom numbers and references to bathroom from floor plans cells in row " + floorPlansIndex;
       alerts.push(bathroomValuesError);
    }
  }
  if(alerts.length > 0) {
    ui.alert(alerts.join("\n"));
    return null;
  } 
  return true;
}
/*
 *Checks for blanks in display_phone_number
 @return true if blanks exist false if they do not exist
*/
function hasPhoneIssues(tagIndexArrayCol,propertySheetValues) {
      var hasIssues;
      var requiredPhoneValues = getRowValByTag(propertySheetValues,"display_phone_number");
      var requiredPhoneBlanks = numOfBlanks(requiredPhoneValues,requiredPhoneValues.length);
      hasIssues = requiredPhoneBlanks > 0 ? true : false;
      return hasIssues;
}
/*
  Checks for blanks in display phone number row.
  Copies values from local phone number to blank display phone number
  @return array of new display phone number values
*/
function copyLocalToDefaultPhone(flatColumnArry,propertySheetValues) {
  var localPhoneNumVal = getRowValByTag(propertySheetValues,"local_phone_number");
  var defaultPhoneNumVal = getRowValByTag(propertySheetValues,"display_phone_number");
  var defaultPhoneRange = propertySheet.getRange(flatColumnArry.indexOf("display_phone_number") + 2,4,1,propertySheetValues[0].length - 3);
  var newDefPhoneNumArry = [];
  for(i = 0; i < defaultPhoneNumVal.length; i++) {
    var cleanedDefaultNum = cleanPhoneNumber(defaultPhoneNumVal[i]);
    var cleanedLocalNum = cleanPhoneNumber(localPhoneNumVal[i]);
    if(cleanedDefaultNum != "") { //checks if number is not blank after running it through the clean phone num method
      newDefPhoneNumArry.push(cleanedDefaultNum);
    }
    else if(cleanedDefaultNum == "" && cleanedLocalNum != "") {
      newDefPhoneNumArry.push(cleanedLocalNum);
    }
    else if(cleanedDefaultNum == "" && cleanedLocalNum == "")
      newDefPhoneNumArry.push("");
  }
  defaultPhoneRange.setValues([newDefPhoneNumArry]);
  return newDefPhoneNumArry;
}

function checkForBathValues(floorPlansValues,arrylen) {
  for(i = 0;  i < arrylen; i++) {
    var value = floorPlansValues[i].toString().toLowerCase().search(/bath/);
    var numVal = floorPlansValues[i].toString();
    numVal = numVal.replace(/\../g,"");
    numVal = numVal.replace(/[^0-9]+/g,"").toString().trim();
    if(value >= 0 || howManyRepeated(numVal) > 0) {
      return true;
    }
  }
  return false;
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
    if(arryVal[i] == "") {
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

function howManyRepeated(str){
   try{ return str.toLowerCase().split("").sort().join("").match(/(.)\1+/g).length; }
   catch(e){ return 0; } // if TypeError
}

function valid(vertVal,domainStrat,chainBran) {
  var arryVal = [vertVal,domainStrat,chainBran];
  for(i = 0; i < arryVal.length; i++) {
    if (arryVal[i] == "Select" || !arryVal[i]) {
      ui.alert("Please Select An Option from All Drop Downs");
      return false;
    }
  }
  return true;
}




