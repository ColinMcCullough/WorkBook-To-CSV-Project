//sets headers in place within newly generated seo liquid values tab of wireframe
function generateWFLiquidValueHeaders(vertical,sheetID,domainType) {
  var wireframeLVTab = SpreadsheetApp.openById(sheetID).getSheetByName("SEO Liquid Values(v1)");
  var lvheaderRange;
  if (vertical == "mf") {
    lvheaderRange = wireframeLVTab.getRange(1,1,4,mfHeaderArrayValues[0].length);
    lvheaderRange.setValues(mfHeaderArrayValues);
  }
  else if (vertical == "ss" || vertical == "sl") {
    lvheaderRange = wireframeLVTab.getRange(1,1,4,ssSlHeaderArrayValues[0].length);
    lvheaderRange.setValues(ssSlHeaderArrayValues);
  }
    setLVHeaderFormatting(vertical,domainType,wireframeLVTab);
    var protection = lvheaderRange.protect().setDescription('SEO Liquid Values Headers'); // creates protected range
    var authEditors = ["colin.mccullough@getg5.com", "pat.kane@getg5.com"]; //adds authorized users to range
    protection.addEditors(authEditors); //adds authorized users to protected range
}

/**
  @return 2D array of liquid values in seo liquid values tab of SEO Implementation Toolset
*/
function getLiquidValues(seoLVSheetValues,vertical,headerRange) {
  var lastColumn;
  var seoLiquidValues;
  var len = seoLVSheetValues.length;
  if(seoLVSheetValues.length < 5) {
    ui.alert('There are no liquid values to copy over.');
    seoLiquidValues = null;
  } else {
    seoLiquidValues = seoLvTab.getRange(5,1,seoLVSheetValues.length -4,headerRange[0].indexOf('pr_notes')+1).getValues();
  }
  return seoLiquidValues;
}

function setLiquidValues(vertical, values, sheetID, domainType, strategies) {
  var wfSeoLiquidTab;
  if(hasNewLiquidValuesTab(sheetID) == true) {
    hideWfLiquidValuesTab(sheetID);
    wfSeoLiquidTab = SpreadsheetApp.openById(sheetID).getSheetByName('SEO Liquid Values(v1)');
    var lastRow = wfSeoLiquidTab.getLastRow()+1;
    wfSeoLiquidTab.getRange(lastRow, 1,values.length,values[0].length).setValues(values);
    var headers = wfSeoLiquidTab.getRange(1,1,1,wfSeoLiquidTab.getLastColumn()).getValues();
    wfSeoLiquidTab.getRange(lastRow,headers[0].indexOf('strategy')+1,wfSeoLiquidTab.getLastRow() - (lastRow - 1),1).setFormulasR1C1(strategies);
  } else {
    hideWfLiquidValuesTab(sheetID);
    createNewWFLiquidValuesTab(sheetID)
    generateWFLiquidValueHeaders(vertical,sheetID,domainType);
    wfSeoLiquidTab = SpreadsheetApp.openById(sheetID).getSheetByName('SEO Liquid Values(v1)');
    var rowStart = wfSeoLiquidTab.getLastRow()+1;
    wfSeoLiquidTab.getRange(rowStart, 1,values.length,values[0].length).setValues(values);
    var headers = wfSeoLiquidTab.getRange(1,1,1,wfSeoLiquidTab.getLastColumn()).getValues();
    wfSeoLiquidTab.getRange(rowStart,headers[0].indexOf('strategy')+1,wfSeoLiquidTab.getLastRow() - (rowStart - 1),1).setFormulasR1C1(strategies);
  } 
  seoLvTabFormatting(vertical,wfSeoLiquidTab)
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
  var seoLVSheetValues = seoLvTab.getRange(1, 1, seoLvTab.getLastRow(),seoLvTab.getLastColumn()).getValues(); //everything in the seolvsheet(added for text)
  var headerRange = [];
  headerRange.push(getHeaderRow(seoLVSheetValues));

  //Logger.log(headerRange[0].indexOf('pr_notes')+1);
  var sheetID = sheetKeyPrompt();
  if(sheetID != null) {
    var vertical = seoLVSheetValues[1][headerRange[0].indexOf('street_address_1')];
    var domainType = seoLVSheetValues[1][headerRange[0].indexOf('state')];
    //var redirectValues = getRedirects();
    var liquidValues = getLiquidValues(seoLVSheetValues,vertical,headerRange);
    var strategies = seoLvTab.getRange(5,headerRange[0].indexOf('strategy')+1,seoLVSheetValues.length -4,1).getFormulasR1C1();
    var missStrategies = numOfBlanks(strategies,strategies.length);
    if(missStrategies > 0) {
      ui.alert('Looks like some locations are missing strategies. Make sure to enter these before sending to the wireframe');
    } else {
      if(/*redirectValues != null && */liquidValues != null) {
      //setRedirects(sheetID, redirectValues);
      setLiquidValues(vertical,liquidValues,sheetID,domainType,strategies);
      }
    }
  }
}

/*
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
*/