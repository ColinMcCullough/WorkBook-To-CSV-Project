//Global Variables
var ui = SpreadsheetApp.getUi();

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

//Drop Down Menu
function onOpen() { 
  // When the spreadsheet is first opened by anyone, set the menu to appear
  var sheet = [ 
                {name: "Spin Up CSV", functionName: "main"}
              ];
  SpreadsheetApp.getUi().createMenu('SpinUpCSV').addItem('Spin Up CSV & SEO Liquid Values', 'main').addToUi();
 }

//clear the sheet named 'spinUpFile' and 'SEO Liquid Values'
function clearHeaders() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var spinUpTab = ss.getSheetByName('spinUpFile');
  
  spinUpTab.clear("A1:BR100");
  seoLvTab.clear("A1:BR100");
  var range = seoLvTab.getRange("A1:AC100");
  range.clearDataValidations();
}


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
