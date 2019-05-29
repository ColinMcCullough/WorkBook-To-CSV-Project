function myFunction() {
  
  //Notes from Jarred. This Code works, but I pity the man that has to read it. Bother Jarred Baker if you need help figuring it out.
  
  //access doc
  var ss = SpreadsheetApp.getActiveSheet();
  var ssTypes2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Types 2');
  var ssTypes1 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Types 1');
  
  //pulls in variables for API call
  var addr = ss.getRange('b3').getValue();
  Logger.log(addr)
  //clears range where last data set got printed
  ss.getRange('B6:b500').clearContent();
  
  //function call to run places API
  var printTypes2 = ssTypes2.getRange('A1:A10').getValues();
  var printTypes1 = ssTypes1.getRange('A1:A18').getValues();
  var printHere = 5
  
  for(k=1;k<Qualityandpurpose2.lastValueShit('A','Types 2');k++){
    Logger.log(printTypes2[k])
  Qualityandpurpose2.printLocationNames(addr,printTypes2[k],k,4,printHere);
  printHere=printHere+4
  }
  printHere=41
    for(k=1;k<18;k++){
    Logger.log(printTypes1[k])
  Qualityandpurpose2.printLocationNames(addr,printTypes1[k],k+3,7,printHere);
  printHere=printHere+7
  }  
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