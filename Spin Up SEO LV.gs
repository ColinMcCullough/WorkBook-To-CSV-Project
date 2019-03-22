//Global Variables
var ssSlSeoLiquidValuesArray = ["name","","","","street_address_1","city","state","","","","custom_slug"];
var mfSeoLiquidValuesArray = ["name","","","","street_address_1","city","state","","","floor_plans","","property_feature_1","","","custom_slug"];

//self storage/sl headers for SEO Liquid Values Tab                          
var ssSlHeaderArrayValues = [
                              ["name","", "", "", "street_address_1", "city", "state", "", "",  "", "custom_slug", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                              ["V1.0", "SEO Liquid Values", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "Links to Strategies", "", '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit","MF Community A")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1798205500","Townhomes")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1581508741","55+ Apartments")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=320995540","SS Facility A")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=649440825","SL Community A")',""],
                              ["Locations", "Recommended Branded Name", "Accepted/Rejected", "USPS Verified", "Address", "City", "State", "Neighborhood", "Neighborhood_2", "Landmark Required for MF", "Custom Slug (if single domain)", "City Population", "Strategy to Implement", "GMB", "GA", "Redirects", "Notes", "Peer Review Status", "Peer Review Notes", '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=205657231","MF Community B")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=780478088", "Apartments & Townhomes")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=2023923072", "Senior Apartments")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=286369603", "SS Facility A (Landmark Only)")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1742592240", "SL Community B")',""],
                              ["", "", "", "", "", "", "", "comes before City", "comes after City needs near in etc.", "comes after near", "", "", "", "", "", "", "Provide screenshots of search volume and note discrepencies in brand name or address", "", "", '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1615577095", "MF Community C")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1HiTnlOI1LdJbZgMKKUkA16kHfA3IfKZODdGJgitYy84/edit#gid=2128876466", "MF Mobile Homes")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1242508099", "Student Apartments")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1478939980", "SS Facility B")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1248672502", "SL Community C")',""]
                            ]
//multi-family headers for SEO Liquid Values Tab 
var mfHeaderArrayValues = [
                            ["name","", "", "", "street_address_1", "city", "state", "", "", "floor_plans", "", "property_feature_1", "", "", "custom_slug", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                            ["V1.0", "SEO Liquid Values", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "Links to Strategies", "", '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit","MF Community A")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1798205500","Townhomes")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1581508741","55+ Apartments")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=320995540","SS Facility A")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=649440825","SL Community A")', ""],
                            ["Locations", "Recommended Branded Name", "Accepted/Rejected", "USPS Verified", "Address", "City", "State", "Neighborhood", "Neighborhood_2", "Floor Plans", "Landmark Required for MF", "First property feature", "Primary Apartment Amenity", "Primary Community Amenity", "Custom Slug (if single domain)", "City Population", "Strategy to Implement", "GMB", "GA", "Redirects", "Notes", "Peer Review Status", "Peer Review Notes", '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=205657231","MF Community B")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=780478088", "Apartments & Townhomes")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=2023923072", "Senior Apartments")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=286369603", "SS Facility A (Landmark Only)")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1742592240", "SL Community B")', ""],
                            ["", "", "", "", "", "", "", "comes before City", "comes after City needs near in etc.", "do not include bedrooms use numerical format (ie 1 & 2)", "comes after near", "comes before apartments (ie Luxury Apartments)", "comes after including or with", "", "", "", "", "", "", "", "Provide screenshots of search volume and note discrepencies in brand name or address", "", "", '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1615577095", "MF Community C")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1HiTnlOI1LdJbZgMKKUkA16kHfA3IfKZODdGJgitYy84/edit#gid=2128876466", "MF Mobile Homes")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1242508099", "Student Apartments")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1478939980", "SS Facility B")', '=HYPERLINK("https://docs.google.com/spreadsheets/d/1QR7EH32NxyeGOqARCIt0qYtDX1WpzKMR2BcBqgqz0jY/edit#gid=1248672502", "SL Community C")', ""]
                          ]                          

/*
  @param vertical
  also calls printDefaultNotes which prints notes column in SEO Liquid Values Tab,
  also calls seoLvTabFormatting which bolds notes column, adds data validation, and sets border around range
*/
function setSeoLvTabData(val) { 
  var vertical = val;
  printDefaultNotes(val)
  seoLvTabFormatting(vertical);
}


/*
  @param vertical
  This function bolds notes column, adds data validation, and sets border around range
*/
function seoLvTabFormatting(val) {
  var vertical = val;
  var notesColumn = "";
  var columnLimit = 0;
  if(vertical == "mf") {
    notesColumn = seoLvTab.getRange(5,21, seoLvTab.getLastRow() -4,1);
    columnLimit = 23;
  }
  else if(vertical == "ss" || "sl") {
    notesColumn = seoLvTab.getRange(5,17, seoLvTab.getLastRow() -4,1);
    columnLimit = 19;
  }
  notesColumn.setFontWeight("bold");
  seoLvTab.getRange(5,1,seoLvTab.getLastRow() -4,columnLimit).setBorder(true, true, true, true, true, true, "black",null)
  seoLvDataValidation(vertical);
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
  tabToFormat.hideRows(1);
  tabToFormat.setFrozenRows(4);
  tabToFormat.setFrozenColumns(1);
  var rowTwoRange = "";
  var rowThreeRange = "";
  var rowFourRange = "";
  var strategiesRange = "";
  if(vertical == "mf") {
    rowTwoRange = tabToFormat.getRange(2,1,1,23);
    rowThreeRange = tabToFormat.getRange(3,1,1,23);
    rowFourRange = tabToFormat.getRange(4,1,1,23);
    strategiesRange = tabToFormat.getRange(2,24,3,5);
  }
  else if(vertical == "ss" || "sl") {
    rowTwoRange = tabToFormat.getRange(2,1,1,19);
    rowThreeRange = tabToFormat.getRange(3,1,1,19);
    rowFourRange = tabToFormat.getRange(4,1,1,19);
    strategiesRange = tabToFormat.getRange(2,20,3,5);
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
function seoLvDataValidation(val) {
  var vertical = val;
  var gmbColumn = 0;
  var gaColumn = 0;
  var redirectsColumn = 0;
  var prColumn = 0;
  if(vertical == "mf") {
    gmbColumn = 18;
    gaColumn = 19;
    redirectsColumn = 20;
    prColumn = 22;
  } else {
    gmbColumn = 14;
    gaColumn = 15;
    redirectsColumn = 16;
    prColumn = 18;
  }
  defineDataValidation(gmbColumn,gaColumn,redirectsColumn,prColumn)
}

/*
  @param gmbColumn is the column number where the GMB data Validation will be built
  @param gaColumn is the column number where the GA data Validation will be built
  @param redirectsColumn is the column number where the redirects data Validation will be built
  @param prColumn is the column number where the peer review data Validation will be built
  This function builds and places data validation for the parameters
*/
function defineDataValidation(gmbColumn,gaColumn,redirectsColumn,prColumn) {
  var acceptedRejectValRange = seoLvTab.getRange(5,3,seoLvTab.getLastRow() -4,1); //Accepted/Rejected range
  var acceptedRejectVal = SpreadsheetApp.newDataValidation().requireValueInList(["Accepted", "Rejected"], true).build(); //Accepted/Rejected validation builder
  var uspsValRange = seoLvTab.getRange(5,4,seoLvTab.getLastRow() -4,1); //usps range
  var uspsVal = SpreadsheetApp.newDataValidation().requireValueInList(["Yes", "No"], true).build(); //usps validation builder
  var gmbValRange = seoLvTab.getRange(5,gmbColumn,seoLvTab.getLastRow() -4,1); //gmb range
  var gmbVal = SpreadsheetApp.newDataValidation().requireValueInList(["Requested","Accessed","Create New","Unverified","N/A LP"], true).build(); //gmb validation builder
  var gaValRange = seoLvTab.getRange(5,gaColumn,seoLvTab.getLastRow() -4,1); //ga range
  var gaVal = SpreadsheetApp.newDataValidation().requireValueInList(["Requested","Accessed","Create New"], true).build(); //ga validation builder
  var redirectsValRange = seoLvTab.getRange(5,redirectsColumn,seoLvTab.getLastRow() -4,1); //redirects range
  var redirectsVal = SpreadsheetApp.newDataValidation().requireValueInList(["Same Domain","Cross Domain","Secure Naked - Same Domain","Secure - Cross Domain","No Redirects"], true).build(); //redirects validation builder
  var prValRange = seoLvTab.getRange(5,prColumn,seoLvTab.getLastRow() -4,1); //peer review range
  var prVal = SpreadsheetApp.newDataValidation().requireValueInList(["Incomplete","Complete"], true).build(); //peer review validation builder
  //sets Data validation that was built above
  acceptedRejectValRange.setDataValidation(acceptedRejectVal); // sets accepted rejected validation
  uspsValRange.setDataValidation(uspsVal); // sets usps column validation
  gmbValRange.setDataValidation(gmbVal); // sets gmb column validation
  gaValRange.setDataValidation(gaVal); // sets ga column validation
  redirectsValRange.setDataValidation(redirectsVal); // sets redirects column validation
  prValRange.setDataValidation(prVal); // sets redirects column validation
}



/*
  @param val = vertical
  sets notes column in seo liquid values tab
  This function is used in the initial set header function called in main()
*/
function printDefaultNotes(val) {
  var vertical = val;
  var notesColumn = 0;
  if(vertical == "mf") {
    notesColumn = 21;
  } else {
    notesColumn = 17;
  }
  var fillDefaultArrayValues = fillArray("Existing Site:" + "\nNeighborhood:" + "\nLandmark:" + "\nAmenity:", seoLvTab.getLastRow() -4);
  var notesRange = seoLvTab.getRange(5,notesColumn,seoLvTab.getLastRow() -4,1);
  notesRange.setValues(fillDefaultArrayValues);
}
