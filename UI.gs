//Global Variables
var ui = SpreadsheetApp.getUi();


//Drop Down Menu UImf
function onOpen() { 
  // When the spreadsheet is first opened by anyone, set the menu to appear
  var sheet = [ 
                {name: "Spin Up CSV", functionName: "main"}
              ];
  SpreadsheetApp.getUi().createMenu('SpinUpCSV').addItem('Spin Up CSV & SEO Liquid Values', 'main').addToUi();
 }

//clear the sheet named 'spinUpFile'
function clearHeaders() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var spinUpTab = ss.getSheetByName('spinUpFile');
  
  spinUpTab.clear("A1:BR100");
  seoLvTab.clear("A1:BR100");
  var range = seoLvTab.getRange("A1:AC100");
  range.clearDataValidations();
}

function verticalPrompt() {
  var response = ui.prompt('Enter Client Vertical', "Options: MF, SS, SL", ui.ButtonSet.OK_CANCEL);
  if(response.getSelectedButton() == ui.Button.OK) {
     var goodValue = false;
     while(!goodValue){
       var userChoice = response.getResponseText().trim().toLowerCase();
       if(userChoice == 'mf' || userChoice == 'sl' || userChoice == 'ss') {
            goodValue = true;
          }
        else {
          ui.alert("Bad Entry, please cick ok and enter: MF, SS, or SL");
          response = ui.prompt('Enter Client Vertical', "Options: MF, SS, SL", ui.ButtonSet.OK_CANCEL);
        }
     }
  } else {
    ui.alert('Have a good day!');
  }  
  return userChoice;
}

function domainPrompt() {
  var response = ui.prompt('Enter Client Domain Strategy', "Options: Multi, Single", ui.ButtonSet.OK_CANCEL);
  if(response.getSelectedButton() == ui.Button.OK) {
     var goodValue = false;
     while(!goodValue){
       var userChoice = response.getResponseText().trim().toLowerCase();
       if(userChoice == 'multi' || userChoice == 'single') {
            goodValue = true;  
       }   
       else {
          ui.alert("Bad Entry, please cick ok and enter: Multi or Single");
          response = ui.prompt('Enter Client Domain Strategy', "Options: Multi, Single", ui.ButtonSet.OK_CANCEL);
       }
     }
  } else {
    ui.alert('Have a good day!');
  }  
  return userChoice;
}

function chainBrandingPrompt() {
  var response = ui.prompt('Does this client use "chain branding" (all locations branded the same)', "Options: Yes, No", ui.ButtonSet.OK_CANCEL);
  if(response.getSelectedButton() == ui.Button.OK) {
     var goodValue = false;
     while(!goodValue){
       var userChoice = response.getResponseText().trim().toLowerCase();
       if(userChoice == 'yes' || userChoice == 'no') {
            goodValue = true;
          }
        else {
          ui.alert("Bad Entry, please cick ok and enter: Yes or No");
          response = ui.prompt('Does this client use "chain branding" (all locations branded the same)', "Options: Yes, No", ui.ButtonSet.OK_CANCEL);
        }
     }
  } else {
    ui.alert('Have a good day!');
  }  
  return userChoice;
}

//allows users to enter text to specify the clients domain strategy and vertical and stores in 2 variables
function runPrompt() {
  var vertical = verticalPrompt(); //users vertical choice
  var domainStrategy = domainPrompt();//users domain strategy choice
  var chainBranding = chainBrandingPrompt();
  return [vertical, domainStrategy, chainBranding];
}
