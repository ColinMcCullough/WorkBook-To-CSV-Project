//sets headers in place within newly generated seo liquid values tab of wireframe
function generateWFLiquidValueHeaders(vertical,sheetID,domainType) {
  var wireframeLVTab = SpreadsheetApp.openById(sheetID).getSheetByName("SEO Liquid Values(v1)");
  if (vertical == "mf") {
    var lvheaderRange = wireframeLVTab.getRange(1,1,4,29);
    lvheaderRange.setValues(mfHeaderArrayValues);
  }
  else if (vertical == "ss" || vertical == "sl") {
    var lvheaderRange = wireframeLVTab.getRange(1,1,4,25);
    lvheaderRange.setValues(ssSlHeaderArrayValues);
  }
    setLVHeaderFormatting(vertical,domainType,wireframeLVTab);
}

/**
  @return 2D array of liquid values in seo liquid values tab of SEO Implementation Toolset
*/
function getLiquidValues(vertical) {
  var lastColumn;
  var seoLiquidValues;
  if(seoLvTab.getLastRow() < 5) {
    ui.alert('There are no liquid values to copy over.');
    seoLiquidValues = null;
  } else {
    if(vertical == "mf") {
      lastColumn = 23;
      seoLiquidValues = seoLvTab.getRange(5,1,seoLvTab.getLastRow() -4,lastColumn).getValues();
    }
    else if(vertical == "ss" || vertical == "sl" ) {
      lastColumn = 19;
      seoLiquidValues = seoLvTab.getRange(5,1,seoLvTab.getLastRow() -4,lastColumn).getValues();
    }
  }
  return seoLiquidValues;
}


function setLiquidValues(val, val1, val2, val3) {
  var vertical = val
  var values = val1;
  var sheetID = val2;
  var domainType = val3;
  var wfSeoLiquidTab;
  if(hasNewLiquidValuesTab(sheetID) == true) {
    hideWfLiquidValuesTab(sheetID);
    wfSeoLiquidTab = SpreadsheetApp.openById(sheetID).getSheetByName('SEO Liquid Values(v1)');
    wfSeoLiquidTab.getRange(wfSeoLiquidTab.getLastRow()+1, 1,values.length,values[0].length).setValues(values);
  } else {
    hideWfLiquidValuesTab(sheetID);
    createNewWFLiquidValuesTab(sheetID)
    generateWFLiquidValueHeaders(vertical,sheetID,domainType);
    wfSeoLiquidTab = SpreadsheetApp.openById(sheetID).getSheetByName('SEO Liquid Values(v1)');
    var rowStart = wfSeoLiquidTab.getLastRow()+1;
    wfSeoLiquidTab.getRange(rowStart, 1,values.length,values[0].length).setValues(values);
  } 
}

function getRedirects() {
  var redirectValues;
  var redirectsTab = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Redirects Tool');
  if(redirectsTab.getLastRow() == 1) { //checks if redirects are empty
    redirectValues = null;
    ui.alert('There are no redirects to copy over.');
  } else {
    redirectValues = redirectsTab.getRange(2,1,redirectsTab.getLastRow() -1, 4).getValues();
  }
  return redirectValues;
}

function setRedirects(val, val1) {
  var sheetID = val;
  var redirectValues = val1;
  var wfRedirectsTab = SpreadsheetApp.openById(sheetID).getSheetByName('Redirects');
  wfRedirectsTab.getRange(wfRedirectsTab.getLastRow()+1,1,redirectValues.length,4).setValues(redirectValues); 
}

function sheetKeyPrompt() {
  var ui = SpreadsheetApp.getUi()
  var userResponse = "";
  var result = ui.prompt("Please Enter WF Spreadsheet Key","Key is located between 'd/'and '/edit'" + "\nEX: https://docs.google.com/spreadsheets/d/1WUcj_6CUEVPzGgUfg-6K8zYgnVa_Ztg3i-wrLqXYGfA/edit" + 
                        "\nKey = 1WUcj_6CUEVPzGgUfg-6K8zYgnVa_Ztg3i-wrLqXYGfA",ui.ButtonSet.OK_CANCEL);
  var button = result.getSelectedButton();
  if(button == ui.Button.OK) {
    userResponse = result.getResponseText().trim();
  } else {
    userResponse = null;
    ui.alert('Have a good day!'); 
  }
  return userResponse;
}

//hides current wireframe seo liquid values tab
function hideWfLiquidValuesTab(sheetID) {
  var wfCurrentLVTab = SpreadsheetApp.openById(sheetID).getSheetByName('SEO Liquid Values');
  if(wfCurrentLVTab != null) {
    wfCurrentLVTab.hideSheet();
  }
}
  
//creates new seo liquid valuestab and sets up header
function createNewWFLiquidValuesTab(sheetID) {
  var wireframe = SpreadsheetApp.openById(sheetID);
  wireframe.insertSheet("SEO Liquid Values(v1)");
}
//checks if receiving wireframe has the new seo tab
function hasNewLiquidValuesTab(sheetID) {
  var hasNewLVTab;
  var wireframeLVTab = SpreadsheetApp.openById(sheetID).getSheetByName("SEO Liquid Values(v1)");
  if(wireframeLVTab != null) {
    hasNewLVTab = true;
  } else {
    hasNewLVTab = false;
  }
  return hasNewLVTab;
}

function sendRedirectsAndLiquidValues() {
  var sheetID = sheetKeyPrompt();
  if(sheetID != null) {
    var vertical = seoLvTab.getRange("E2").getValue();
    var domainType = seoLvTab.getRange("G2").getValue();
    var redirectValues = getRedirects();
    var liquidValues = getLiquidValues(vertical);
    if(redirectValues != null && liquidValues != null) {
      //setRedirects(sheetID, redirectValues);
      setLiquidValues(vertical,liquidValues,sheetID,domainType);
    }
  }
}