//Global Variables
var ssSlSeoLiquidValuesArray = ["name","rec_brand_name","acc_rej","usps","street_address_1","city","state","postal_code","neighborhood","neighborhood_2","landmark","custom_slug"];
var mfSeoLiquidValuesArray = ["name","","","","street_address_1","city","state","postal_code","","","floor_plans","","property_feature_1","","","custom_slug"];

//self storage/sl headers for SEO Liquid Values Tab                          
var ssSlHeaderArrayValues = [
                              ["name","rec_brand_name", "acc_rej", "usps", "street_address_1", "city", "state","postal_code", "neighborhood", "neighborhood_2",  "landmark", "custom_slug", "population", "strategy", "gmb", "ga", "redirects", "notes", "pr", "pr_notes", "", "", "", "", "", ""],
                              ["V1.0", "SEO Liquid Values", "", "", "", "", "", "","", "", "", "", "", "", "", "", "", "", "Links to Strategies", "", '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit","MF Community A")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1798205500","Townhomes")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1581508741","55+ Apartments")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=320995540","SS Facility A")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=649440825","SL Community A")',""],
                              ["Locations", "Recommended Branded Name", "Accepted/Rejected", "USPS Verified", "Address", "City", "State","Zip", "Neighborhood", "Neighborhood_2", "Landmark Required for MF", "Custom Slug (if single domain)", "City Population", "Strategy to Implement", "GMB", "GA", "Redirects", "Notes", "Peer Review Status", "Peer Review Notes", '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=205657231","MF Community B")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=780478088", "Apartments & Townhomes")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=2023923072", "Senior Apartments")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=286369603", "SS Facility A (Landmark Only)")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1742592240", "SL Community B")',""],
                              ["", "", "", "", "", "", "","", "comes before City", "comes after City needs near in etc.", "comes after near", "", "", "", "", "", "", "Provide screenshots of search volume and note discrepencies in brand name or address", "", "", '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1615577095", "MF Community C")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1HiTnlOI1LdJbZgMKKUkA16kHfA3IfKZODdGJgitYy84/edit#gid=2128876466", "MF Mobile Homes")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1242508099", "Student Apartments")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1478939980", "SS Facility B")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1248672502", "SL Community C")',""]
                            ]
//multi-family headers for SEO Liquid Values Tab 
var mfHeaderArrayValues = [
                            ["name","rec_brand_name", "acc_rej", "usps", "street_address_1", "city", "state","postal_code", "neighborhood", "neighborhood_2", "floor_plans", "landmark", "property_feature_1", "apart_amen", "comm_amen", "custom_slug", "population", "strategy", "gmb", "ga", "redirects", "notes", "pr", "pr_notes", "", "", "", "", "", ""],
                            ["V1.0", "SEO Liquid Values", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "Links to Strategies", "", '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit","MF Community A")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1798205500","Townhomes")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1581508741","55+ Apartments")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=320995540","SS Facility A")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=649440825","SL Community A")', ""],
                            ["Locations", "Recommended Branded Name", "Accepted/Rejected", "USPS Verified", "Address", "City", "State","Zip", "Neighborhood", "Neighborhood_2", "Floor Plans", "Landmark Required for MF", "First property feature", "Primary Apartment Amenity", "Primary Community Amenity", "Custom Slug (if single domain)", "City Population", "Strategy to Implement", "GMB", "GA", "Redirects", "Notes", "Peer Review Status", "Peer Review Notes", '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=205657231","MF Community B")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=780478088", "Apartments & Townhomes")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=2023923072", "Senior Apartments")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=286369603", "SS Facility A (Landmark Only)")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1742592240", "SL Community B")', ""],
                            ["", "", "", "", "", "", "", "", "comes before City", "comes after City needs near in etc.", "do not include bedrooms use numerical format (ie 1 & 2)", "comes after near", "comes before apartments (ie Luxury Apartments)", "comes after including or with", "", "", "", "", "", "", "", "Provide screenshots of search volume and note discrepencies in brand name or address", "", "", '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1615577095", "MF Community C")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1HiTnlOI1LdJbZgMKKUkA16kHfA3IfKZODdGJgitYy84/edit#gid=2128876466", "MF Mobile Homes")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1242508099", "Student Apartments")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1478939980", "SS Facility B")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1248672502", "SL Community C")', ""]
                          ]  

function testIndex() {
  var index = ssSlHeaderArrayValues[0].indexOf("rec_brand_name") + 1;
  Logger.log(index);
}

/*
  @param vertical
  also calls printDefaultNotes which prints notes column in SEO Liquid Values Tab,
  also calls seoLvTabFormatting which bolds notes column, adds data validation, and sets border around range
*/
function setSeoLvTabData(val,val1) { 
  var tabToFormat = val1;
  var vertical = val;
  printDefaultNotes(val)
  seoLvTabFormatting(vertical,tabToFormat);
}


/*
  @param vertical
  @param tabToFormat
  This function bolds notes column, adds data validation, and sets border around range
*/
function seoLvTabFormatting(vertical,tabToFormat) {
  var headerRange = tabToFormat.getRange(1,1,1,tabToFormat.getLastColumn()).getValues();
  var notesColumn = tabToFormat.getRange(5,headerRange[0].indexOf("notes") + 1, tabToFormat.getLastRow() -4,1);
  var columnLimit = headerRange[0].indexOf("pr_notes") + 1;
  notesColumn.setFontWeight("bold");
  tabToFormat.getRange(5,1,tabToFormat.getLastRow() -4,columnLimit).setBorder(true, true, true, true, true, true, "black",null)
  seoLvDataValidation(vertical,tabToFormat);
}

/*
  @param vertical
  This formats rows 2-4. Freezes 1st column, hides 1st row, freezes row 1 - 4, sets color
  and size for first 3 rows, sets appropriates borders
*/
function setLVHeaderFormatting(val,val1,val2) {
  var tabToFormat = val2
  var vertical = val;
  var domainType = val1;
  var domainAndVerticalPrint = [["Vertical:",vertical,"Domain:",domainType]];
  tabToFormat.setRowHeights(2, 3, 70);
  tabToFormat.setColumnWidth(2, 227); tabToFormat.setColumnWidths(4, 3, 114); 
  tabToFormat.hideRows(1);
  tabToFormat.setFrozenRows(4);
  tabToFormat.setFrozenColumns(1);
  var rowTwoRange = "";
  var rowThreeRange = "";
  var rowFourRange = "";
  var strategiesRange = "";
  if(vertical == "mf") {
    rowTwoRange = tabToFormat.getRange(2,1,1,24);
    rowThreeRange = tabToFormat.getRange(3,1,1,24);
    rowFourRange = tabToFormat.getRange(4,1,1,24);
    strategiesRange = tabToFormat.getRange(2,25,3,5);
    tabToFormat.setColumnWidth(22, 262); tabToFormat.setColumnWidth(24, 227); tabToFormat.setColumnWidths(25, 5, 150); // sets column widths
  }
  else if(vertical == "ss" || "sl") {
    rowTwoRange = tabToFormat.getRange(2,1,1,20);
    rowThreeRange = tabToFormat.getRange(3,1,1,20);
    rowFourRange = tabToFormat.getRange(4,1,1,20);
    strategiesRange = tabToFormat.getRange(2,21,3,5);
    tabToFormat.setColumnWidth(18, 262); tabToFormat.setColumnWidth(20, 227); // sets column widths
  }
  rowTwoRange.setBackgroundRGB(11, 34, 63).setFontColor('white').setFontWeight("bold").setHorizontalAlignment("left").setFontSize(20).setWrapStrategy(SpreadsheetApp.WrapStrategy.OVERFLOW);
  rowThreeRange.setBackgroundRGB(120, 150, 170).setFontColor('white').setHorizontalAlignment("center").setVerticalAlignment("middle").setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP).setFontSize(12).setBorder(true, true, true, true, true, true, "white",null);
  rowFourRange.setBackgroundColor("light grey 3").setFontColor('black').setFontSize(10).setHorizontalAlignment("left").setVerticalAlignment("middle").setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP).setBorder(true, true, true, true, true, true, "black",null);
  strategiesRange.setFontSize(11).setHorizontalAlignment("left").setVerticalAlignment("middle").setBorder(true, true, true, true, true, true, "black",null);
  tabToFormat.getRange(2,4,1,4).setValues(domainAndVerticalPrint);
}


/*
  @param val = vertical
  @param val1 = searchString
  @param val3 = result
  This function prints relevant SEO liquid values contstants in SEO Liquid Values
  Tab based on headers in tab.
  MF Prints: Name, address, city, state, zip, floor plans, custom slug, property feature 1
  SS/SL Print: Name, address, city, state, zip,  custom slug
*/
function printSeoLiquidValues(val, val1, val2) {
  var vertical = val2;
  var searchString = val;
  var result = val1
  var seoColumnIndex = 0;
  if(vertical == "mf") {
    var seoColumnIndex = mfSeoLiquidValuesArray.indexOf(searchString) + 1;
  } else {
    var seoColumnIndex = ssSlSeoLiquidValuesArray.indexOf(searchString) + 1;
  }
  if(seoColumnIndex != 0) {
      if(searchString != "custom_slug") {
        var seoValuesRange = seoLvTab.getRange(5, seoColumnIndex, propertySheet.getLastColumn() - 3, 1);
        var seoValuesRangeFormatted = seoValuesRange.setNumberFormat("@").setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
        seoValuesRangeFormatted.setValues(result);
      } else {
        var seoValuesRange = seoLvTab.getRange(5, seoColumnIndex, spinUpTab.getLastRow() - 1, 1);
        var seoValuesRangeFormatted = seoValuesRange.setNumberFormat("@").setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
        seoValuesRangeFormatted.setValues(result);
      }
   }
}

/*
  @param val = vertical
  This function prints defines where the data validation should be generated in the SEO Liquid Values tab
  based on vertical. It then calls the defineDataValidation which is responsible for actually building the data validation
*/
function seoLvDataValidation(vertical, tabToFormat) {
  var gmbColumn = 0;
  var gaColumn = 0;
  var redirectsColumn = 0;
  var prColumn = 0;
  if(vertical == "mf") {
    gmbColumn = 19;
    gaColumn = 20;
    redirectsColumn = 21;
    prColumn = 23;
  } else {
    gmbColumn = 15;
    gaColumn = 16;
    redirectsColumn = 17;
    prColumn = 19;
  }
  defineDataValidation(gmbColumn,gaColumn,redirectsColumn,prColumn,tabToFormat)
}

/*
  @param gmbColumn is the column number where the GMB data Validation will be built
  @param gaColumn is the column number where the GA data Validation will be built
  @param redirectsColumn is the column number where the redirects data Validation will be built
  @param prColumn is the column number where the peer review data Validation will be built
  This function builds and places data validation for the parameters
*/
function defineDataValidation(gmbColumn,gaColumn,redirectsColumn,prColumn,tabToFormat) {
  var acceptedRejectValRange = tabToFormat.getRange(5,3,tabToFormat.getLastRow() -4,1); //Accepted/Rejected range
  var acceptedRejectVal = SpreadsheetApp.newDataValidation().requireValueInList(["Accepted", "Rejected"], true).build(); //Accepted/Rejected validation builder
  var uspsValRange = tabToFormat.getRange(5,4,tabToFormat.getLastRow() -4,1); //usps range
  var uspsVal = SpreadsheetApp.newDataValidation().requireValueInList(["Yes", "No"], true).build(); //usps validation builder
  var gmbValRange = tabToFormat.getRange(5,gmbColumn,tabToFormat.getLastRow() -4,1); //gmb range
  var gmbVal = SpreadsheetApp.newDataValidation().requireValueInList(["Requested","Accessed","Create New","Unverified","N/A LP"], true).build(); //gmb validation builder
  var gaValRange = tabToFormat.getRange(5,gaColumn,tabToFormat.getLastRow() -4,1); //ga range
  var gaVal = SpreadsheetApp.newDataValidation().requireValueInList(["Requested","Accessed","Create New"], true).build(); //ga validation builder
  var redirectsValRange = tabToFormat.getRange(5,redirectsColumn,tabToFormat.getLastRow() -4,1); //redirects range
  var redirectsVal = SpreadsheetApp.newDataValidation().requireValueInList(["Same Domain","Cross Domain","Secure Naked - Same Domain","Secure - Cross Domain","No Redirects"], true).build(); //redirects validation builder
  var prValRange = tabToFormat.getRange(5,prColumn,tabToFormat.getLastRow() -4,1); //peer review range
  var prVal = SpreadsheetApp.newDataValidation().requireValueInList(["Incomplete","Complete"], true).build(); //peer review validation builder
  //sets Data validation that was built above
  acceptedRejectValRange.setDataValidation(acceptedRejectVal); // sets accepted rejected validation
  uspsValRange.setDataValidation(uspsVal); // sets usps column validation
  gmbValRange.setDataValidation(gmbVal); // sets gmb column validation
  gaValRange.setDataValidation(gaVal); // sets ga column validation
  redirectsValRange.setDataValidation(redirectsVal); // sets redirects column validation
  prValRange.setDataValidation(prVal); // sets redirects column validation
  defineConditionalFormatting(acceptedRejectValRange,uspsValRange,gmbValRange,gaValRange,redirectsValRange,prValRange,tabToFormat); //created conditional formatting
}

function defineConditionalFormatting(acceptedRejectValRange,uspsValRange,gmbValRange,gaValRange,redirectsValRange,prValRange,tabToFormat) {
  var brandNameRuleAccepted = SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("Accepted").setBackground("#b7e1cd").setRanges([acceptedRejectValRange]).build();
  var brandNameRuleAcceptedRejected = SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("Rejected").setBackground("#f4c7c3").setRanges([acceptedRejectValRange]).build();
  var uspsVerified = SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("Yes").setBackground("#b7e1cd").setRanges([uspsValRange]).build();
  var uspsNotVerified = SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("No").setBackground("#f4c7c3").setRanges([uspsValRange]).build();
  var gmbAccessed = SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("Accessed").setBackground("#b7e1cd").setRanges([gmbValRange]).build();
  var gmbRequested = SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("Requested").setBackground("#fce8b2").setRanges([gmbValRange]).build();
  var gmbCreateNew = SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("Create New").setBackground("#d9d9d9").setRanges([gmbValRange]).build();
  var gaAccessed = SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("Accessed").setBackground("#b7e1cd").setRanges([gaValRange]).build();
  var gaRequested = SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("Requested").setBackground("#fce8b2").setRanges([gaValRange]).build();
  var gaCreateNew = SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("Create New").setBackground("#d9d9d9").setRanges([gaValRange]).build();
  var prComplete = SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("Complete").setBackground("#b7e1cd").setRanges([prValRange]).build();
  var prIncomplete = SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("Incomplete").setBackground("#f4c7c3").setRanges([prValRange]).build();
  var rules = tabToFormat.getConditionalFormatRules();
  rules.push(brandNameRuleAccepted,brandNameRuleAcceptedRejected,uspsVerified,uspsNotVerified,gmbAccessed,gmbRequested,gmbCreateNew,gaAccessed,gaRequested,gaCreateNew,prComplete,prIncomplete);
  tabToFormat.setConditionalFormatRules(rules);
}

/*
  @param val = vertical
  sets notes column in seo liquid values tab
  This function is used in the initial set header function called in main()
*/
function printDefaultNotes(val) {
  var vertical = val;
  var notesColumn = 0;
  var prColumn = 0;
  if(vertical == "mf") {
    notesColumn = 22;
    prColumn = 23;
  } else {
    notesColumn = 18;
    prColumn = 19;
  }
  var notesArry = [];
  var prArry = [];
  var currentWebsites = getCurrentWebsiteArray();
  for(i = 0; i < currentWebsites[0].length;i++) {
    notesArry.push(["Existing Site: " + currentWebsites[0][i] + "\nNeighborhood:" + "\nLandmark:" + "\nAmenity:"]);
    prArry.push(["Incomplete"]);
  } 
  var notesRange = seoLvTab.getRange(5,notesColumn,seoLvTab.getLastRow() -4,1);
  var prRange = seoLvTab.getRange(5,prColumn,seoLvTab.getLastRow() -4,1);
  notesRange.setValues(notesArry);
  prRange.setValues(prArry);
}

function getCurrentWebsiteArray() {
  var columnValues = propertySheet.getRange(2, 1, propertySheet.getLastRow()).getValues();
  var searchResult = columnValues.findIndex("current_website");
  if(searchResult != -1) {
    searchResult += 2;
    var numofItems = seoLvTab.getLastRow() - 4;
    var currentWebsiteArray = propertySheet.getRange(searchResult, 4, 1, numofItems).getValues();
    return currentWebsiteArray;
  }
}
