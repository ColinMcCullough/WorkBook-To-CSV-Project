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
    var lvheaderRange = seoLvTab.getRange(1,1,NUM_LV_HEADER_ROWS,mfHeaderArrayValues[0].length);
    lvheaderRange.setValues(mfHeaderArrayValues);
  }
  else if (clientProp.vertical == "ss" || clientProp.vertical == "sl") {
    var lvheaderRange = seoLvTab.getRange(1,1,NUM_LV_HEADER_ROWS,ssSlHeaderArrayValues[0].length);
    lvheaderRange.setValues(ssSlHeaderArrayValues);
  }
  setLVHeaderFormatting(clientProp.vertical,clientProp.domainType,seoLvTab);
}

/*
  finds range of brand names in project workbook
  @return Returns array of row values matching search value tag
*/
function collectTagResults(propertySheetValues, propertySheetTags, tagToSearch, clientProp)  {
  var rowValues;
  //does nothing if tags are values seo will fill out
  if(excludedMFSEOValues.indexOf(tagToSearch) != -1 && clientProp.vertical === 'mf' || excludedSSSLSEOValues.indexOf(tagToSearch) != -1) { 
    rowValues = null;
  } //sets default value if searchString matches defaultPrintTags array value
  else if(defaultPrintTags.indexOf(tagToSearch) != -1) { //default values
    var numDefaultVal = getRowValByTag(propertySheetValues,"name").length;
    defaultValuePrint(numDefaultVal, tagToSearch, clientProp.vertical, clientProp.domainType);
    rowValues = null;
  }
  else {
    rowValues = getRowValues(propertySheetValues, propertySheetTags, tagToSearch, clientProp);
  return rowValues;
  }
}

//helper method for collectTagResults to get values of rows not using default values or rows that should be skipped
function getRowValues(propertySheetValues,flatColumnValues, searchString, clientProp) {
  var searchResult = flatColumnValues.indexOf(searchString); //Row Index - 2
  var rowValues;
  if (searchResult != -1) {
    //searchResult + 2 is row index.
    searchResult = searchResult + 2;     
    var rowRangeValues = [];
    rowRangeValues.push(getRowValByTag(propertySheetValues,searchString));
    rowValues = cleanData(rowRangeValues,searchString,clientProp.chainBranding,clientProp.domainType);
  }
  else if(searchString == "custom_slug" && clientProp.domainType == "single" && clientProp.chainBranding == "yes") { //this will pass in the address range and values to clean for a slug    
    var columnRangeValues = [];
    columnRangeValues.push(getRowValByTag(propertySheetValues,"street_address_1"));
    var result = columnRangeValues[0].map(function(elem) {return [elem];})
    rowValues = cleanData(result,searchString,clientProp.chainBranding,clientProp.domainType);
  }
  else if(searchString == "custom_slug" && clientProp.domainType == "single" && clientProp.chainBranding == "no") { // this will pass in the brand name to clean for a slug
    var columnRangeValues = [];
    columnRangeValues.push(getRowValByTag(propertySheetValues,"name"));
    var result = columnRangeValues[0].map(function(elem) {return [elem];})
    rowValues = cleanData(result,searchString,clientProp.chainBranding,clientProp.domainType);
  }
  else {
    rowValues = null;
  }
  return rowValues;
}


/*
  function takes a row array and transposes it to a column array
*/
function collectAndFormatResults(propSheetValues, propertySheetTags, tagToSearch, clientProp) {

  var rowValue = collectTagResults(propSheetValues, propertySheetTags, tagToSearch, clientProp);
  var result;
  
  if (rowValue) { //ensures there are values to transpose
    result = rowValue[0].map(function(elem) {return [elem];});    
    
  } else {
    result = null; 
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
    var propSheetObj = new PropertyInfo();//
    var propertySheetValues = getPropertySheetValues();
    var propertySheetValues1 = propSheetObj.propertyValues;//
    var headerArrayLength = spinUpFileHeaders.length;
    var propertySheetTags = getColumnOneVal(propertySheetValues);
    var propertySheetTagsNew = propSheetObj.propertyTagsArry();//
    var noErrors = checkErrors(propSheetObj,clientProperties);
    if(noErrors) {
      clearSpinUpAndLVTab();
      printHeaders(clientProperties);
      var newPSValues = getPropertySheetValues();  
      var numLocations = getRowValByTag(newPSValues,"name").length;
      for(var i = 0; i <= headerArrayLength - 1; i++) {
        var headerTag = spinUpFileHeaders[i];
        var result = collectAndFormatResults(newPSValues,propertySheetTags, headerTag, clientProperties);
        printResults(numLocations, headerTag,vertical, result);
      }
      spinUpTab.getRange(2, 1, numLocations, spinUpFileHeaders.length).setNumberFormat("@").setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
      seoLvTab.getRange(5, 1, numLocations, mfHeaderArrayValues[0].length).setNumberFormat("@").setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
      setSeoLvTabData(newPSValues,numLocations,vertical,seoLvTab);
    }
  }
}