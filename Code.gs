//Global Variables  
var headerArrayNames = ["name","internal_branded_name","corporate","street_address_1","city","state","postal_code","country","neighborhood","neighborhood_2","email","office_hours_note","status","status_note","no_deploy","secure_domain","custom_slug","twitter_username","facebook_username","yelp_username","pinterest_username","instagram_username","youtube_username","google_cid","linkedin_username","local_phone_number","display_phone_number","gtm_codes","spinup_web_theme","spinup_strategy","naked_domain","off_platform_link","business_description","location_listing_category_id","secondary_listing_categories","pay_online_url","license_number","nearby_schools","nearby_school_1","nearby_school_2","nearby_employers","nearby_employer_1","nearby_employer_2","nearby_employer_3","apartment_amenity_1","apartment_amenity_2","apartment_amenity_3","nearby_restaurants","nearby_shopping","landmark_1_name","landmark_2_name","landmark_3_name","floor_plans","community_amenity_1","community_amenity_2","community_amenity_3","care_level_1","care_level_2","care_level_3","care_level_4","care_level_5","care_level_6","nearby_healthcare_1","nearby_roadway_1","nearby_roadway_2","nearby_gasoline","property_feature_1","property_feature_2","property_feature_3","property_feature_4"];

var headerNames = [
["name","internal_branded_name","corporate","street_address_1","city","state","postal_code","country","neighborhood","neighborhood_2","email","office_hours_note","status","status_note","no_deploy","secure_domain","custom_slug","twitter_username","facebook_username","yelp_username","pinterest_username","instagram_username","youtube_username","google_cid","linkedin_username","local_phone_number","display_phone_number","gtm_codes","spinup_web_theme","spinup_strategy","naked_domain","off_platform_link","business_description","location_listing_category_id","secondary_listing_categories","pay_online_url","license_number","nearby_schools","nearby_school_1","nearby_school_2","nearby_employers","nearby_employer_1","nearby_employer_2","nearby_employer_3","apartment_amenity_1","apartment_amenity_2","apartment_amenity_3","nearby_restaurants","nearby_shopping","landmark_1_name","landmark_2_name","landmark_3_name","floor_plans","community_amenity_1","community_amenity_2","community_amenity_3","care_level_1","care_level_2","care_level_3","care_level_4","care_level_5","care_level_6","nearby_healthcare_1","nearby_roadway_1","nearby_roadway_2","nearby_gasoline","property_feature_1","property_feature_2","property_feature_3","property_feature_4"]
  ];

var headerObjectNames = [
  ["name"],["internal_branded_name"],["corporate"],["street_address_1"],["city"],["state"],["postal_code"],["country"],["neighborhood"],["neighborhood_2"],["email"],["office_hours_note"],["status"],["status_note"],["no_deploy"],["secure_domain"],["custom_slug"],["twitter_username"],["facebook_username"],["yelp_username"],["pinterest_username"],["instagram_username"],["youtube_username"],["google_cid"],["linkedin_username"],["local_phone_number"],["display_phone_number"],["gtm_codes"],["spinup_web_theme"],["spinup_strategy"],["naked_domain"],["off_platform_link"],["business_description"],["location_listing_category_id"],["secondary_listing_categories"],["pay_online_url"],["license_number"],["nearby_schools"],["nearby_school_1"],["nearby_school_2"],["nearby_employers"],["nearby_employer_1"],["nearby_employer_2"],["nearby_employer_3"],["apartment_amenity_1"],["apartment_amenity_2"],["apartment_amenity_3"],["nearby_restaurants"],["nearby_shopping"],["landmark_1_name"],["landmark_2_name"],["landmark_3_name"],["floor_plans"],["community_amenity_1"],["community_amenity_2"],["community_amenity_3"],["care_level_1"],["care_level_2"],["care_level_3"],["care_level_4"],["care_level_5"],["care_level_6"],["nearby_healthcare_1"],["nearby_roadway_1"],["nearby_roadway_2"],["nearby_gasoline"],["property_feature_1"],["property_feature_2"],["property_feature_3"],["property_feature_4" ]
  ];
var spinUpTab = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('spinUpFile');
var seoLvTab = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SEO Liquid Values');
var propertySheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1. Property Info: MF");

/*
  Prints all headers used for every vertical as well as headers for SEO Liquid Values Tab
  @param vertical
*/
function printHeaders(val,domainType) {
  var vertical = val;
  var headerRange = spinUpTab.getRange("A1:BR1");
  headerRange.setValues(headerNames);
  if (vertical == "mf") {
    var lvheaderRange = seoLvTab.getRange(1,1,4,29);
    lvheaderRange.setValues(mfHeaderArrayValues);
  }
  else if (vertical == "ss" || vertical == "sl") {
    var lvheaderRange = seoLvTab.getRange(1,1,4,25);
    lvheaderRange.setValues(ssSlHeaderArrayValues);
  }
    setLVHeaderFormatting(vertical,domainType);
}

/*
  finds range of brand names in project workbook
  @return Returns array of row values matching search value tag
*/
function searchRowIndexArray(val, val1, val2, val3, val4)  {
  var searchString = val;
  var vertical = val1;
  var column = 1; //column Index
  var domainType = val2;
  var columnValues = val3;
  var chainBranding = val4;
  var spinupLastRow = spinUpTab.getLastRow();
  if(searchString == "" || searchString == "neighborhood" || searchString == "apartment_amenity_1" || searchString == "community_amenity_1" && vertical == "mf" || searchString == "landmark_1_name" && vertical == "mf") { //SEO Liquid Values that be populated by team after keyword research
    rowValues = null;
  }
  else if(searchString == "corporate" || searchString == "status" || searchString == "no_deploy" || searchString == "secure_domain" || searchString == "spinup_web_theme") {
    defaultValuePrint(searchString, vertical, domainType);
    rowValues = null;
  }
  else {
    var searchResult = columnValues.findIndex(searchString); //Row Index - 2
      if (searchResult != -1) {
        //searchResult + 2 is row index.
        searchResult = searchResult + 2;
        var lastColumn = propertySheet.getLastColumn();
        var rowRange = propertySheet.getRange(searchResult, column + 3, 1, lastColumn - 3);
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
}


/*
  fuction takes a row array and transposes it to a column array
*/
function transposeArray(searchStrings, vertical, domainType, columnValues, chainBranding) {
  var searchString = searchStrings;
  var rowValue = searchRowIndexArray(searchStrings, vertical, domainType, columnValues, chainBranding);
  var result = [];
  
  if (rowValue != null) {
    for (var col = 0; col < rowValue[0].length; col++) { // Loop over array cols
      result[col] = [];
      for (var row = 0; row < rowValue.length; row++) { // Loop over array rows
        result[col][row] = rowValue[row][col]; // Rotate
      }
    }
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
  @parm searchString 
  @param result
  @param vertical
  function sets column array in spinup tab
*/
//function setValuesInSpinUpFile(searchString,result,vertical) {
  
//}

/*
// Searches through an array for a text value match. 
// @return index position - 2. If text value not found returns -1
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
  clearHeaders();
  var prompt = runPrompt();
  var vertical = prompt[0];
  var domainType = prompt[1];
  var chainBranding = prompt[2];
  var headerArrayLength = headerObjectNames.length;
  var columnValues = propertySheet.getRange(2, 1, propertySheet.getLastRow()).getValues(); //column range in propertyInfoSheet
  printHeaders(vertical,domainType);
  for(var i = 0; i <= headerArrayLength - 1; i++) {
    var searchStrings = headerArrayNames[i];
    transposeArray(searchStrings, vertical, domainType, columnValues, chainBranding);
  }
  setSeoLvTabData(vertical);
}



