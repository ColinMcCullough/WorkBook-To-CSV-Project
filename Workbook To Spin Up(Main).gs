//Global Variables  
var spinUpFileHeaders = [
                        "name","internal_branded_name","corporate","street_address_1","city","state","postal_code","country","neighborhood",
                        "neighborhood_2","email","office_hours_note","status","status_note","no_deploy","secure_domain","custom_slug",
                        "twitter_username","facebook_username","yelp_username","pinterest_username","instagram_username","youtube_username",
                        "google_cid","linkedin_username","local_phone_number","display_phone_number","gtm_codes","spinup_web_theme",
                        "spinup_strategy","naked_domain","off_platform_link","business_description","location_listing_category_id",
                        "secondary_listing_categories","pay_online_url","license_number","nearby_schools","nearby_school_1","nearby_school_2",
                        "nearby_employers","nearby_employer_1","nearby_employer_2","nearby_employer_3","apartment_amenity_1","apartment_amenity_2",
                        "apartment_amenity_3","nearby_restaurants","nearby_shopping","landmark_1_name","landmark_2_name","landmark_3_name",
                        "floor_plans","community_amenity_1","community_amenity_2","community_amenity_3","care_level_1","care_level_2",
                        "care_level_3","care_level_4","care_level_5","care_level_6","nearby_healthcare_1","nearby_roadway_1","nearby_roadway_2",
                        "nearby_gasoline","property_feature_1","property_feature_2","property_feature_3","property_feature_4"
                       ];
                       
var excludedMFSEOValues = ["apartment_amenity_1", "community_amenity_1"];
var excludedSSSLSEOValues = ["", "neighborhood", "landmark_1_name"];
var defaultPrintTags = ["corporate", "status", "no_deploy", "secure_domain", "spinup_web_theme"];
var spinUpTab = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('spinUpFile');
var seoLvTab = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SEO Liquid Values');
var propertySheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("**Paste Property Info**");
var dashboardSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Keyword Research Accelerator');
var NUM_LV_HEADER_ROWS = 4;
/*
  Prints all headers used for every vertical as well as headers for SEO Liquid Values Tab
  @param vertical Users entry from UI ("mf", "ss", or "sl")
  @param domainType Users entry from UI ("single", "multi")
*/
function printHeaders(clientProp) {
  var seoLvTab = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SEO Liquid Values');
  var headerRange = spinUpTab.getRange(1,1,1,spinUpFileHeaders.length);
  headerRange.setValues([spinUpFileHeaders]); //updated this from header names
  if (clientProp.vertical == "mf") {
    var lvheaderRange = seoLvTab.getRange(1,1,NUM_LV_HEADER_ROWS,seoLiquidValueTabHeaders.mf[0].length);
    lvheaderRange.setValues(seoLiquidValueTabHeaders.mf);
  }
  else if (clientProp.vertical == "ss" || clientProp.vertical == "sl") {
    var lvheaderRange = seoLvTab.getRange(1,1,NUM_LV_HEADER_ROWS,seoLiquidValueTabHeaders.ssSl[0].length);
    lvheaderRange.setValues(seoLiquidValueTabHeaders.ssSl);
  }
  setLVHeaderFormatting(clientProp.vertical,clientProp.domainType,seoLvTab);
}

function excludedValueMatch(value,clientProp) {
  if(excludedMFSEOValues.indexOf(value) != -1 && clientProp.vertical === 'mf' || excludedSSSLSEOValues.indexOf(value) != -1) {
    return true;
  }
}

/*
  finds range of brand names in project workbook
  @return Returns array of row values matching search value tag   //propSheetObj
  propSheetObj, tagToSearch, clientProp
*/
function collectTagResults(propSheetObj, tagToSearch, clientProp)  {
  var rowValues;
  //does nothing if tags are values seo will fill out
  if(excludedValueMatch(tagToSearch,clientProp)) { 
    rowValues = null;
  } //sets default value if searchString matches defaultPrintTags array value
  else if(defaultPrintTags.indexOf(tagToSearch) != -1) { //default values
    defaultValuePrint(propSheetObj.numOfLoc(), tagToSearch, clientProp.vertical, clientProp.domainType);
    rowValues = null;
  }
  else {
    rowValues = getRowValues(propSheetObj, tagToSearch, clientProp);
  return rowValues;
  }
}

//helper method for collectTagResults to get values of rows not using default values or rows that should be skipped
function getRowValues(propSheetObj, searchString, clientProp) {
  var searchResult = propSheetObj.getRowIndexByTag(searchString); //Row Number - 1
  var rowValues = null;
  var columnRangeValues = [];
  if (searchResult != -1) {
    //searchResult + 1 is row number.
    searchResult = searchResult + 1;         
    columnRangeValues.push(propSheetObj.getRowValByTag(searchString));
    rowValues = cleanData(columnRangeValues,searchString,clientProp.chainBranding,clientProp.domainType);
  }  
  else if(searchString == "custom_slug" && clientProp.domainType == "single") {
    var slugSearchStr; 
    if(clientProp.chainBranding == "yes") {
      slugSearchStr = "street_address_1";
    } 
    else {
      slugSearchStr = "name";
    }
    columnRangeValues.push(propSheetObj.getRowValByTag(slugSearchStr));
    var result = columnRangeValues[0].map(function(elem) {return [elem];})
    rowValues = cleanData(result,searchString,clientProp.chainBranding,clientProp.domainType);
  }
  return rowValues;
}


/*
  function takes a row array and transposes it to a column array
*/
function collectAndFormatResults(propSheetObj, tagToSearch, clientProp) {
  var rowValue = collectTagResults(propSheetObj, tagToSearch, clientProp);
  var result = null;  
  if (rowValue) { //ensures there are values to transpose
    result = rowValue[0].map(function(elem) {return [elem];});        
  } 
  return result;
}

//get Print Ranges
function printResults(numLocations,searchString,vertical,result) {
  if(result) {
    var printColumnIndex = spinUpFileHeaders.indexOf(searchString) + 1;
    var namePrintRange = spinUpTab.getRange(2, printColumnIndex, numLocations, 1);
    if(searchString == "postal_code") {
      namePrintRange.setNumberFormat("@").setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);  
    } 
    namePrintRange.setValues(result);
    printSeoLiquidValues(numLocations,searchString, result, vertical);
  }
}

function testMain() {
  main("mf","multi","yes");
}

function getClientProp(vert,domType,branding) {
  var cleintProp = {
      vertical: vert,
      domainType: domType,
      chainBranding: branding
  }
  return cleintProp;
}

/*
//This function runs the workbook >> Csv functionality
*/
function main(vertical,domainType,chainBranding) {
  var isValid = valid(vertical,domainType,chainBranding);
  if(isValid) {
    var clientProperties = getClientProp(vertical,domainType,chainBranding);
    var propSheetObj = new PropertyInfo();
    var headerArrayLength = spinUpFileHeaders.length;
    var hasErrors = checkErrors(propSheetObj,clientProperties);
    if(!hasErrors) {
      clearSpinUpAndLVTab();
      printHeaders(clientProperties);
      propSheetObj.getNewPropertyValues();  
      var numLocations = propSheetObj.numOfLoc();
      for(var i = 0; i <= headerArrayLength - 1; i++) {
        var headerTag = spinUpFileHeaders[i];
        var result = collectAndFormatResults(propSheetObj,headerTag, clientProperties);
        printResults(numLocations, headerTag,vertical, result);
      }
      spinUpTab.getRange(2, 1, numLocations, spinUpFileHeaders.length).setNumberFormat("@").setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
      seoLvTab.getRange(5, 1, numLocations, seoLiquidValueTabHeaders.mf[0].length).setNumberFormat("@").setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
      setSeoLvTabData(propSheetObj,numLocations,vertical,seoLvTab);
    }
  }
}