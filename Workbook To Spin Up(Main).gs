function testthis() {
  var clientProp = getClientProp('ss','mulit','no');
  Logger.log(seoLiquidValueTabHeaders[clientProp.vertical][0].length);
}
//Global Variables  
var spinUpFileHeaders = 
[
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
  var headerRange = spinUpTab.getRange(1,1,1,spinUpFileHeaders.length).setValues([spinUpFileHeaders]);
  var lvheaderRange = seoLvTab.getRange(1,1,NUM_LV_HEADER_ROWS,seoLiquidValueTabHeaders[clientProp.vertical][0].length);
  lvheaderRange.setValues(seoLiquidValueTabHeaders[clientProp.vertical]);
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
function collectTagResults(propSheetObj, tagToSearch, clientProp,dataValObj)  {
  var rowValues = null;
  //sets default value if searchString matches defaultPrintTags array value
  if(defaultPrintTags.indexOf(tagToSearch) != -1) { //default values
    rowValues = defaultValuePrint(propSheetObj.numOfLoc(), tagToSearch, clientProp.domainType);    
  }
  else if(!excludedValueMatch(tagToSearch,clientProp)) { 
    rowValues = getRowValues(propSheetObj, tagToSearch, clientProp,dataValObj);
  } 
  return rowValues;
}

//helper method for collectTagResults to get values of rows not using default values or rows that should be skipped
function getRowValues(propSheetObj, searchString, clientProp, dataValObj) {
  var tagIndex = propSheetObj.getRowIndexByTag(searchString); //Row Number - 1
  var rowValues = null;
  
  var customSlug = {
    "multi": {
      "yes": null,
      "no": null
    }, 
    "single": {
      "yes": "street_address_1",
      "no": "name"
    } 
  }
  
  var stringTest = function() {
    return searchString === "custom_slug" ? customSlug[clientProp.domainType][clientProp.chainBranding] : searchString; 
  }();
    
  if (tagIndex != -1 || searchString === "custom_slug" && stringTest) {
    var dataByTag = propSheetObj.getRowValByTag(stringTest);
    rowValues = dataValObj.runDataVal(searchString,dataByTag);
  }
  
  return rowValues;
}


/*
  function takes a row array and transposes it to a column array
*/
function collectAndFormatResults(propSheetObj, tagToSearch, clientProp,dataValObj) {
  var rowValue = collectTagResults(propSheetObj, tagToSearch, clientProp,dataValObj);
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
    var hasErrors = checkErrors(propSheetObj,clientProperties);
    if(!hasErrors) {
      clearSpinUpAndLVTab();
      printHeaders(clientProperties);
      propSheetObj.getNewPropertyValues();
      var numLocations = propSheetObj.numOfLoc();
      var dataValObj = new DataVal(clientProperties);
      for(var i = 0; i <= spinUpFileHeaders.length - 1; i++) {
        var headerTag = spinUpFileHeaders[i];
        var result = collectAndFormatResults(propSheetObj,headerTag, clientProperties,dataValObj);        
        printResults(numLocations, headerTag,vertical, result);
      }
      spinUpTab.getRange(2, 1, numLocations, spinUpFileHeaders.length).setNumberFormat("@").setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
      seoLvTab.getRange(5, 1, numLocations, seoLiquidValueTabHeaders.mf[0].length).setNumberFormat("@").setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
      setSeoLvTabData(propSheetObj,numLocations,vertical,seoLvTab);
    }
  }
}

function test1() {
  var redirects = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Redirects Tool');
  var redrange = redirects.getRange(1,1,5,3).getValues()
  Logger.log(redrange)
}