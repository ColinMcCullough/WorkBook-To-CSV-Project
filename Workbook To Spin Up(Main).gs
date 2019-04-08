//Global Variables  
var headerArrayNames = ["name","internal_branded_name","corporate","street_address_1","city","state","postal_code","country","neighborhood","neighborhood_2","email","office_hours_note","status","status_note","no_deploy","secure_domain","custom_slug","twitter_username","facebook_username","yelp_username","pinterest_username","instagram_username","youtube_username","google_cid","linkedin_username","local_phone_number","display_phone_number","gtm_codes","spinup_web_theme","spinup_strategy","naked_domain","off_platform_link","business_description","location_listing_category_id","secondary_listing_categories","pay_online_url","license_number","nearby_schools","nearby_school_1","nearby_school_2","nearby_employers","nearby_employer_1","nearby_employer_2","nearby_employer_3","apartment_amenity_1","apartment_amenity_2","apartment_amenity_3","nearby_restaurants","nearby_shopping","landmark_1_name","landmark_2_name","landmark_3_name","floor_plans","community_amenity_1","community_amenity_2","community_amenity_3","care_level_1","care_level_2","care_level_3","care_level_4","care_level_5","care_level_6","nearby_healthcare_1","nearby_roadway_1","nearby_roadway_2","nearby_gasoline","property_feature_1","property_feature_2","property_feature_3","property_feature_4"];

var headerNames = [
                     ["name","internal_branded_name","corporate","street_address_1","city","state","postal_code","country","neighborhood","neighborhood_2","email","office_hours_note","status","status_note","no_deploy","secure_domain","custom_slug","twitter_username","facebook_username","yelp_username","pinterest_username","instagram_username","youtube_username","google_cid","linkedin_username","local_phone_number","display_phone_number","gtm_codes","spinup_web_theme","spinup_strategy","naked_domain","off_platform_link","business_description","location_listing_category_id","secondary_listing_categories","pay_online_url","license_number","nearby_schools","nearby_school_1","nearby_school_2","nearby_employers","nearby_employer_1","nearby_employer_2","nearby_employer_3","apartment_amenity_1","apartment_amenity_2","apartment_amenity_3","nearby_restaurants","nearby_shopping","landmark_1_name","landmark_2_name","landmark_3_name","floor_plans","community_amenity_1","community_amenity_2","community_amenity_3","care_level_1","care_level_2","care_level_3","care_level_4","care_level_5","care_level_6","nearby_healthcare_1","nearby_roadway_1","nearby_roadway_2","nearby_gasoline","property_feature_1","property_feature_2","property_feature_3","property_feature_4"]
                  ];

var spinUpTab = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('spinUpFile');
var seoLvTab = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SEO Liquid Values');
var propertySheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1. Property Info: MF");


/*
  Prints all headers used for every vertical as well as headers for SEO Liquid Values Tab
  @param vertical Users entry from UI ("mf", "ss", or "sl")
  @param domainType Users entry from UI ("single", "multi")
*/
function printHeaders(vertical,domainType) {
  var seoLvTab = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SEO Liquid Values');
  var headerRange = spinUpTab.getRange(1,1,1,headerArrayNames.length);
  headerRange.setValues(headerNames);
  if (vertical == "mf") {
    var lvheaderRange = seoLvTab.getRange(1,1,4,mfHeaderArrayValues[0].length);
    lvheaderRange.setValues(mfHeaderArrayValues);
  }
  else if (vertical == "ss" || vertical == "sl") {
    var lvheaderRange = seoLvTab.getRange(1,1,4,ssSlHeaderArrayValues[0].length);
    lvheaderRange.setValues(ssSlHeaderArrayValues);
  }
    setLVHeaderFormatting(vertical,domainType,seoLvTab);
}

/*
  finds range of brand names in project workbook
  @return Returns array of row values matching search value tag
*/
function searchRowIndexArray(searchString, vertical, domainType, flatColumnValues, chainBranding)  {
  var rowValues;
  var spinupLastRow = spinUpTab.getLastRow();
  if(searchString == "" || searchString == "neighborhood" || searchString == "apartment_amenity_1" || searchString == "community_amenity_1" && vertical == "mf" || searchString == "landmark_1_name" && vertical == "mf") { //SEO Liquid Values that be populated by team after keyword research
    rowValues = null;
  }
  else if(searchString == "corporate" || searchString == "status" || searchString == "no_deploy" || searchString == "secure_domain" || searchString == "spinup_web_theme") { //default values
    defaultValuePrint(searchString, vertical, domainType);
    rowValues = null;
  }
  else {
    rowValues = getRowValues(searchString, vertical, domainType, flatColumnValues, chainBranding ,spinupLastRow);
  return rowValues;
  }
}

//helper method for searchRowIndexArray to get values of rows not using default values or rows that should be skipped
function getRowValues(searchString, vertical, domainType, flatColumnValues, chainBranding, spinupLastRow) {
  var searchResult = flatColumnValues.indexOf(searchString); //Row Index - 2
  if (searchResult != -1) {
    //searchResult + 2 is row index.
    searchResult = searchResult + 2;     
    var lastColumn = propertySheet.getLastColumn();
    var rowRange = propertySheet.getRange(searchResult, 4, 1, lastColumn - 3);
    var rowRangeValues = rowRange.getValues();
    var rowValues = cleanData(rowRange,rowRangeValues,searchString,chainBranding,domainType);
  }
  else if(searchString == "custom_slug" && domainType == "single" && chainBranding == "yes") { //this will pass in the address range and values to clean for a slug
    var columnRange = spinUpTab.getRange(2, 4, spinupLastRow - 1, 1);
    var columnRangeValues = columnRange.getValues();
    var rowValues = cleanData(columnRange,columnRangeValues,searchString,chainBranding,domainType);
  }
  else if(searchString == "custom_slug" && domainType == "single" && chainBranding == "no") { // this will pass in the brand name to clean for a slug
    var rowRange = spinUpTab.getRange(2, 1, spinupLastRow - 1, 1);
    var columnRangeValues = rowRange.getValues();
    var rowValues = cleanData(rowRange,columnRangeValues,searchString,chainBranding,domainType);
  }
  else {
    rowValues = null;
  }
  return rowValues;
}


/*
  fuction takes a row array and transposes it to a column array
*/
function transposeArray(searchStrings, vertical, domainType, flatColumnValues, chainBranding) {
  var searchString = searchStrings;
  var rowValue = searchRowIndexArray(searchStrings, vertical, domainType, flatColumnValues, chainBranding);
  var result;
  
  if (rowValue != null) { //ensures there are values to transpose
    result = rowValue[0].map(function(elem) {return [elem];});
    
    /*  
    for (var col = 0; col < rowValue[0].length; col++) { // Loop over array cols
      result[col] = [];
      for (var row = 0; row < rowValue.length; row++) { // Loop over array rows
        result[col][row] = rowValue[row][col]; // Rotate
      }
    }
    */
    
  } else {
    result = null; 
  }
  return result;
}

//get Print Ranges
function getPrintRanges(searchString,vertical, result) {
  if(result != null) {
    var printColumnIndex = headerArrayNames.indexOf(searchString) + 1;
    
    if(searchString == "custom_slug") {
      var namePrintRange = spinUpTab.getRange(2, printColumnIndex, spinUpTab.getLastRow() -1, 1);
      
    } else {
      var namePrintRange = spinUpTab.getRange(2, printColumnIndex, propertySheet.getLastColumn() -3, 1);
    }  
    var namePrintRangeFormatted = namePrintRange.setNumberFormat("@").setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
    
    namePrintRangeFormatted.setValues(result);
    printSeoLiquidValues(searchString, result, vertical);
  }
}


/*
 Searches through an array for a text value match. 
 @return index position - 2. If text value not found returns -1
*/
Array.prototype.findIndex = function(search){
    for (var i=0; i<this.length; i++) {
      if (this[i] == search) {
        return i;
      }
    }
    return -1;
}

function main() {
  var seoLvTab = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SEO Liquid Values');
  clearHeaders();
  var prompt = runPrompts();
  if(prompt[0] != null && prompt[1] != null && prompt[2] != null) {
    var vertical = prompt[0];
    var domainType = prompt[1];
    var chainBranding = prompt[2];
    var headerArrayLength = headerArrayNames.length;
    var columnValues = propertySheet.getRange(2, 1, propertySheet.getLastRow()).getValues(); //column range in propertyInfoSheet
    var flattenColumnval = [].concat.apply([], columnValues);
    var errors = checkErrors(flattenColumnval)
    if(errors != null) {
      printHeaders(vertical,domainType);
      for(var i = 0; i <= headerArrayLength - 1; i++) {
        var searchStrings = headerArrayNames[i];
        var result = transposeArray(searchStrings, vertical, domainType, flattenColumnval, chainBranding);
        getPrintRanges(searchStrings,vertical, result);
      }
      setSeoLvTabData(vertical,seoLvTab);
    }
  }
}