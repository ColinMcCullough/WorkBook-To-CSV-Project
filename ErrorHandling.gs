var tags = {
  standard: ["current_website","naked_domain","name","street_address_1","city","state","postal_code","country","local_phone_number","display_phone_number","email","negative_keywords"],
  mfTags: ["current_website","naked_domain","name","street_address_1","city","state","postal_code","country","local_phone_number","display_phone_number","email","property_feature_1","primary_type","floor_plans","negative_keywords"]
}
/*
 Checks for errors in the property info tab that need to be fixed prior to spinning up csv
*/
function checkErrors(propSheetObj,clientProperties) {
  var errorObj = new PropertySheetErrors();
  var tierOneErrors = errorObj.checkTierOneErrors(propSheetObj,clientProperties);
  if(tierOneErrors) {
    return true;
  }
  var tierTwoErrors = errorObj.checkTierTwoErrors(propSheetObj,clientProperties);
  if(tierTwoErrors) {
    return true;
  }
  else {
    return false;
  }
}
/*
  Checks for blanks in display phone number row.
  Copies values from local phone number to blank display phone number
  @return array of new display phone number values
*/
function copyLocalToDefaultPhone(propSheetObj) {
  var localPhoneNumVal = propSheetObj.getRowValByTag("local_phone_number");
  var defaultPhoneNumVal = propSheetObj.getRowValByTag("display_phone_number");
  var defaultPhoneRange = propertySheet.getRange(propSheetObj.getRowIndexByTag("display_phone_number") + 1,4,1,propSheetObj.numOfLoc());
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
  var trueLen = arryVal.filter(Boolean).length;
  return arrylen - trueLen;
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
/*
  This class offers methods to check property info sheet errors to ensure an appropriate state
*/
function PropertySheetErrors() {
  
  this.checkTierOneErrors = function(propSheetObj,clientProperties) {
    var propTagArry = propSheetObj.propertyTagsArry();
    if(this.checkMissingTags(clientProperties,propTagArry) || this.checkMissingNames(propTagArry,propSheetObj) || this.checkMissingAddress(propSheetObj)) {
      return true;
    } 
  }
  
  this.checkTierTwoErrors = function(propSheetObj,clientProperties) {
    var alerts = [];
    var propTagArry = propSheetObj.propertyTagsArry();
    var missingDomains = this.checkMissingDomains(clientProperties,propTagArry,propSheetObj);
    var phoneIssues = this.checkPhoneIssues(propTagArry,propSheetObj);
    var floorPlanIssues = this.checkFloorPlans(propTagArry,propSheetObj);
    alerts.push(missingDomains,phoneIssues,floorPlanIssues);
    alerts = alerts.filter(Boolean);
    if(alerts.length > 0) {
      ui.alert(alerts.join("\n"));
      return true;
    } 
  }
  
  this.checkMissingTags = function(clientProperties,propTagArry) {
    var missingTags = (clientProperties.vertical === "mf") ? tags.mfTags.diff(propTagArry) : tags.standard.diff(propTagArry);
    if(missingTags.length > 0) {
      ui.alert("Error: \nYou are missing the following required tags in the workbook:\nMissing Tags: " + missingTags + "\nCheck to ensure the workbook is up to date");
      return true;
    }
  }
  
  this.checkMissingNames = function(propTagArry,propSheetObj) {
    var nameRowNum = propTagArry.indexOf("name") + 1; 
    var nameRangeValues = propSheetObj.getRowValByTag('name');
    var numNameBlanks = numOfBlanks(nameRangeValues,nameRangeValues.length);
    if(numNameBlanks > 0) {
      ui.alert("Error: \nYou either have values in a property info tab past the last locations column or are missing brand names in row " + nameRowNum + 
               "\nAdd brand names to all locations in row " + nameRowNum + " and clear all columns past the last location column in use.");
      return true;
    } 
  }
  
  this.checkMissingAddress = function(propSheetObj) {
    var addressIndexes = propSheetObj.getLocAddressProp();
    var keys = ["street_address_1","city","state","postal_code"];
    for(var i = 0; i < keys.length; i++) {
      var getRowVal = propSheetObj.getRowValByTag(keys[i]);
      var numBlank = numOfBlanks(getRowVal, getRowVal.length);
      if(numBlank > 0) {
        ui.alert("Error: All locations address, city, state and zip cells must be filled out in the projects workbook. \n" +
               "\nAddress Rows: " + addressIndexes.streetAddIndx + " - " + addressIndexes.postalCodeIndx);
      return true;
      }
    }
  }
  
  this.checkMissingDomains = function(clientProperties,propTagArry,propSheetObj) {
    if(clientProperties.domainType == "multi") {    
      var domainIndex = propTagArry.indexOf("naked_domain") + 1;  
      var rowRangeValues = propSheetObj.getRowValByTag("naked_domain");
      var domainArrylen = propSheetObj.numOfLoc();
      var numDomainBlanks = numOfBlanks(rowRangeValues,domainArrylen);
      if(numDomainBlanks > 0) {
        var missingDomain = "Error: \nAll multi domain locations need their domain field filled out." + "\nAdd domains to all locations in row " + domainIndex;
        return missingDomain;
      }
    }
  }
  
  this.checkPhoneIssues = function(propTagArry,propSheetObj) {
    var newPhoneArray = copyLocalToDefaultPhone(propSheetObj); //copies local number to display phone number field if display phone number is blank
    var numPhoneBlanks = numOfBlanks(newPhoneArray,newPhoneArray.length);
    if(numPhoneBlanks > 0) {
      var phoneRowNum = propTagArry.indexOf("display_phone_number") + 1; 
      var missingDefaultPhoneNum = "Error: \nYour missing phone number values in row " + phoneRowNum + ". Please enter the locations city area code followed by 555-5555(EX: 541-555-5555) in row " + phoneRowNum;
      return missingDefaultPhoneNum;
    }
  }
  
  this.checkFloorPlans = function(propTagArry,propSheetObj) {
    if(propTagArry.indexOf("floor_plans") != -1) {
      var floorPlansIndex = propTagArry.indexOf("floor_plans") + 1;  
      var rowRangeValues = propSheetObj.getRowValByTag("floor_plans");
      var hasBathroomData = checkForBathValues(rowRangeValues,rowRangeValues.length);
      if(hasBathroomData == true) {
        var bathroomValuesError = "Error: \nLooks like some floor plans cells are using bathroom numbers" + "\nDelete all bathroom numbers and references to bathroom from floor plans cells in row " + floorPlansIndex;
        return bathroomValuesError;
      }
    }
  }
  
}


