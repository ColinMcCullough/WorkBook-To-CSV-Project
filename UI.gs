//Global Variables
var ui = SpreadsheetApp.getUi();

function onOpen() {
  SpreadsheetApp.getUi()
      .createAddonMenu()
      .addItem('Open App', 'showSidebar')
      .addToUi();
}

function showSidebar() {
  var SIDEBAR_TITLE = 'G5 SEO Implementation Scripts';
  var ui = HtmlService.createTemplateFromFile('Sidebar')
      .evaluate()
      .setTitle(SIDEBAR_TITLE);
  SpreadsheetApp.getUi().showSidebar(ui);
}

//clear the sheet named 'spinUpFile' and 'SEO Liquid Values'
function clearSpinUpAndLVTab() {  
  spinUpTab.clear("A1:BR100");
  seoLvTab.clear("A1:BR100");
  var range = seoLvTab.getRange("A1:AC100");
  range.clearDataValidations();
}

//clears data when changing vertical
function onEdit(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var s = ss.getActiveSheet();
  if(s.getName()=='API Call') {
    var cell = s.getActiveCell();
    if( cell.getA1Notation() == 'B1' )
      s.getRange('b2').clearContent();
  }
  if(s.getSheetName() == "Redirects Tool" && s.getActiveRange().getColumn() == 5)  {   
    var activeCell = s.getActiveCell();
    var activeCellValue = activeCell.getValue();
    var offSetCell = activeCell.offset(0, -1);
    var offSetCellValue = activeCell.offset(0, -1).getValue();
    if(activeCellValue == "Yes" && offSetCellValue.substr(-1) == "$") {
      offSetCell.setValue(offSetCellValue.slice(0,-1));
    } else if(activeCellValue == "No" && offSetCellValue.substr(-1) != "$")
      offSetCell.setValue(offSetCellValue + "$");
  }
}
/*
//vertical prompt variables
var verticalPrompt = "Enter Client Vertical";
var verticalPromptInstruct = "Options: MF, SS, SL";
var vertChoice1 = "mf"; var vertChoice2 = "sl"; var vertChoice3 = "ss";
var vertBadEntry = "Bad Entry, please cick ok and enter: MF, SS, or SL";

//domain prompt variables
var domainPrompt = "Enter Client Domain Strategy";
var domainPromptPromptInstruct = "Options: Multi, Single";
var domainChoice1 = "multi"; var domainChoice2 = "single";
var domainBadEntry = "Bad Entry, please cick ok and enter: Multi or Single";

//chain branding variables
var brandPrompt = "Does this client use \"chain branding\" (all locations branded the same)";
var brandPromptPromptInstruct = "Options: Yes, No";
var brandChoice1 = "yes"; var brandChoice2 = "no";
var brandBadEntry = "Bad Entry, please cick ok and enter: Yes or No";

function onOpen() {

  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
                    {name: "1. Workbook >> CSV", functionName: "main"},
                    {name: "2. Insert LiquidValues in SpinUp", functionName: "liquidToSpinUp"},
                    {name: "3. Send LiquidValues to WF", functionName: "sendRedirectsAndLiquidValues"}
                  ];
  var redirectItems = [
                        {name: "Clean Up & Format URLs", functionName: "cleanUpAndFormatUrls"},
                        {name:"Test Redirects", functionName: "testRedirects"},
                        {name:"Clear Data", functionName: "clearData"} 
                      ];
  var sidebar = [{name: "Test Sidebar", functionName: "showSidebar"}]                    
                      
  spreadsheet.addMenu('CheckList Review', menuItems);
  spreadsheet.addMenu('Redirect Scripts', redirectItems);
  spreadsheet.addMenu('Test Sidebar', sidebar);
  
}
*/



/**
  Runs a single prompt for client vertical or domain strategy or brand name strategy based on string parameters passed in
  @return returns string response user enters, returns null if user selects cancel button

function runPrompt(introPrompt, introSpecifics, choice1, choice2, choice3, badEntryResponse) {
  var response = ui.prompt(introPrompt, introSpecifics, ui.ButtonSet.OK_CANCEL);
  if(response.getSelectedButton() == ui.Button.OK) {
     var goodValue = false;
     while(!goodValue){
       var userChoice = response.getResponseText().trim().toLowerCase();
       if(userChoice == choice1 || userChoice == choice2 || userChoice == choice3) {
            goodValue = true;
          }
        else {
          ui.alert(badEntryResponse);
          response = ui.prompt(introPrompt, introSpecifics, ui.ButtonSet.OK_CANCEL);
        }
     }
  } else if (response.getSelectedButton() == ui.Button.CANCEL){
    userChoice = null;
    ui.alert('Have a good day!');
  }  
  return userChoice;
}
*/
/**
  Runs 3 prompts for client vertical, domain strategy, and brand name strategy
  @return array of 3 responses to prompts, returns null if user selects cancel button

function runPrompts() {
  var vertical = null;
  var domainStrategy = null;
  var chainBranding = null;
  var vertical = runPrompt(verticalPrompt,verticalPromptInstruct,vertChoice1,vertChoice2,vertChoice3,vertBadEntry); //users vertical choice
  if(vertical != null) {
    var domainStrategy = runPrompt(domainPrompt,domainPromptPromptInstruct,domainChoice1,domainChoice2,domainChoice2,domainBadEntry);//users domain strategy choice
    if(domainStrategy != null) {
      var chainBranding = runPrompt(brandPrompt,brandPromptPromptInstruct,brandChoice1,brandChoice2,brandChoice1,brandBadEntry); //users chain branding choice
    }
  }
  return [vertical, domainStrategy, chainBranding];
}
*/
/**
 * Opens a sidebar. The sidebar structure is described in the Sidebar.html
 * project file.
 */

