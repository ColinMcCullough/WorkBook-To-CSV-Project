
               
/*
1. Deletes duplicate rows in active spreadsheet 
2. Deletes image files
3. Formats urls for CMS
*/
               
function cleanUpAndFormatUrls() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getLastRow();
  var firstColumn = sheet.getRange(1, 3, rows, 1).getValues();
  firstColumn = firstColumn.map(function (e) {return e[0]})
  for (var i = rows; i >0; i--) {
    if (firstColumn.indexOf(firstColumn[i-1]) != i-1) {
      sheet.deleteRow(i);
    }
  }

// Deletes rows in the active spreadsheet that contain 'word' in column C

 var rows = sheet.getDataRange();
 var numRows = rows.getNumRows();
 var values = rows.getValues();

 var rowsDeleted = 0;
 for (var i = 0; i <= numRows - 1; i++) {

 var row = values[i];

 if (row[2].indexOf(".jpg") > -1) {
 sheet.deleteRow((parseInt(i)+1) - rowsDeleted);
 rowsDeleted++;
 }
 if (row[2].indexOf(".js") > -1) {
 sheet.deleteRow((parseInt(i)+1) - rowsDeleted);
 rowsDeleted++;
 }
 if (row[2].indexOf(".gif") > -1) {
 sheet.deleteRow((parseInt(i)+1) - rowsDeleted);
 rowsDeleted++;
 }
 if (row[2].indexOf(".JPG") > -1) {
 sheet.deleteRow((parseInt(i)+1) - rowsDeleted);
 rowsDeleted++;
 }
 if (row[2].indexOf(".css") > -1) {
 sheet.deleteRow((parseInt(i)+1) - rowsDeleted);
 rowsDeleted++;
 }
  if (row[2].indexOf(".pdf") > -1) {
 sheet.deleteRow((parseInt(i)+1) - rowsDeleted);
 rowsDeleted++;
 }
 if (row[2].indexOf(".json") > -1) {
 sheet.deleteRow((parseInt(i)+1) - rowsDeleted);
 rowsDeleted++;
 }
 if (row[2].indexOf(".jpeg") > -1) {
 sheet.deleteRow((parseInt(i)+1) - rowsDeleted);
 rowsDeleted++;
 }
 if (row[2].indexOf(".png") > -1) {
 sheet.deleteRow((parseInt(i)+1) - rowsDeleted);
 rowsDeleted++;
 }
 }

//Fills Column F  (Cleaned URL for Cloud Input)FindReplaceReplace allDone


 var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  ss.getRange("D2").setFormula('IF(B2="Cross Domain","", IF(B2="Secure - Cross Domain","", IF(B2="No Redirects","",IFERROR(IF(RegExMatch(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(IF(ISNUMBER(SEARCH(".com/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),RIGHT(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2),LEN(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))-FIND(".com/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),IF(ISNUMBER(SEARCH(".net/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),RIGHT(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2),LEN(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))-FIND(".net/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),IF(ISNUMBER(SEARCH(".ca/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),RIGHT(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2),LEN(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))-FIND(".ca/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),IF(ISNUMBER(SEARCH(".org/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),RIGHT(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2),LEN(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))-FIND(".org/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),"")))),"com/",""),"net/",""),"org/",""),"ca/",""),".html",""),"]",char(92)&"]"),"[",char(92)&"["),"%5b",char(92)&"["),"%5B",char(92)&"["),"%5d",char(92)&"]"),"%5D",char(92)&"]"),".php",char(92)&".php"),".aspx",char(92)&".aspx"),"%20",char(92)&"s"),"%",char(92)&"%"),"//","/+"),".pdf",char(92)&".pdf"),"/?"),LEFT(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(IF(ISNUMBER(SEARCH(".com/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),RIGHT(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2),LEN(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))-FIND(".com/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),IF(ISNUMBER(SEARCH(".net/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),RIGHT(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2),LEN(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))-FIND(".net/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),IF(ISNUMBER(SEARCH(".ca/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),RIGHT(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2),LEN(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))-FIND(".ca/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),IF(ISNUMBER(SEARCH(".org/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),RIGHT(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2),LEN(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))-FIND(".org/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),"")))),"com/",""),"net/",""),"org/",""),"ca/",""),".html",""),"]",char(92)&"]"),"[",char(92)&"["),"%5b",char(92)&"["),"%5B",char(92)&"["),"%5d",char(92)&"]"),"%5D",char(92)&"]"),".php",char(92)&".php"),".aspx",char(92)&".aspx"),"%20",char(92)&"s"),"%",char(92)&"%"),"//","/+"),".pdf",char(92)&".pdf"),FIND("?",SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(IF(ISNUMBER(SEARCH(".com/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),RIGHT(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2),LEN(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))-FIND(".com/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),IF(ISNUMBER(SEARCH(".net/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),RIGHT(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2),LEN(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))-FIND(".net/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),IF(ISNUMBER(SEARCH(".ca/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),RIGHT(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2),LEN(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))-FIND(".ca/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),IF(ISNUMBER(SEARCH(".org/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),RIGHT(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2),LEN(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))-FIND(".org/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),"")))),"com/",""),"net/",""),"org/",""),"ca/",""),".html",""),"]",char(92)&"]"),"[",char(92)&"["),"%5b",char(92)&"["),"%5B",char(92)&"["),"%5d",char(92)&"]"),"%5D",char(92)&"]"),".php",char(92)&".php"),".aspx",char(92)&".aspx"),"%20",char(92)&"s"),"%",char(92)&"%"),"//","/+"),".pdf",char(92)&".pdf"))-1), SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(IF(ISNUMBER(SEARCH(".com/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),RIGHT(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2),LEN(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))-FIND(".com/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),IF(ISNUMBER(SEARCH(".net/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),RIGHT(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2),LEN(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))-FIND(".net/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),IF(ISNUMBER(SEARCH(".ca/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),RIGHT(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2),LEN(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))-FIND(".ca/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),IF(ISNUMBER(SEARCH(".org/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),RIGHT(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2),LEN(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))-FIND(".org/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),"")))),"com/",""),"net/",""),"org/",""),"ca/",""),".html",""),"]",char(92)&"]"),"[",char(92)&"["),"%5b",char(92)&"["),"%5B",char(92)&"["),"%5d",char(92)&"]"),"%5D",char(92)&"]"),".php",char(92)&".php"),".aspx",char(92)&".aspx"),"%20",char(92)&"s"),"%",char(92)&"%"),"//","/+"),".pdf",char(92)&".pdf")), SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(IF(ISNUMBER(SEARCH(".com/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),RIGHT(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2),LEN(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))-FIND(".com/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),IF(ISNUMBER(SEARCH(".net/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),RIGHT(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2),LEN(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))-FIND(".net/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),IF(ISNUMBER(SEARCH(".ca/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),RIGHT(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2),LEN(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))-FIND(".ca/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),IF(ISNUMBER(SEARCH(".org/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),RIGHT(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2),LEN(IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))-FIND(".org/",IF(RIGHT(c2,(LEN(c2)-(LEN(c2)-1)))="/",LEFT(c2,(LEN(c2)-1)), c2))),"")))),"com/",""),"net/",""),"org/",""),"ca/",""),".html",""),"]",char(92)&"]"),"[",char(92)&"["),"%5b",char(92)&"["),"%5B",char(92)&"["),"%5d",char(92)&"]"),"%5D",char(92)&"]"),".php",char(92)&".php"),".aspx",char(92)&".aspx"),"%20",char(92)&"s"),"%",char(92)&"%"),"//","/+"),".pdf",char(92)&".pdf")&if(and(E2<>"yes",c2<>""),"$","")))))');
  var lr = ss.getLastRow();
  var fillDownRange = ss.getRange(2, 4, lr-1);
  ss.getRange("D2").copyTo(fillDownRange);  

};



function statuscode(url, user, pwd) {
    try {
        var response = UrlFetchApp.fetch(url, {
            muteHttpExceptions: true,
            followRedirects: false,
            headers: {
                'Authorization': 'Basic ' + Utilities.base64Encode(user+':'+pwd)
            }
        });
        return response.getResponseCode();
    } catch (error) {
        
        return "";
    }
}

function location(url, user, pwd) {
    try {
        var response = UrlFetchApp.fetch(url, {
            muteHttpExceptions: true,
            followRedirects: false,
            headers: {
                'Authorization': 'Basic ' + Utilities.base64Encode(user+':'+pwd)
            }
        });
        header = response.getHeaders();
        location = header['Location'];
        return location;
    } catch (error) {
        return "Error";
    }
}




//Generates status code & page urls is being redirected to

function testRedirects () {
    
//Fills Column D to populate status code
  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  ss.getRange("F2").setFormula('=if(ISBLANK(C2),"",statuscode(C2))');       

  var lr = ss.getLastRow();
  var fillDownRange = ss.getRange(2, 6, lr-1);
  ss.getRange("F2").copyTo(fillDownRange);  
  
//Fills Column G (Redirecting To URL)
  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    ss.getRange("G3:G").setFormula('=If(C3:C="","",if(OR(F3:F=302,F3:F=301),location(C3:C),"Is not redirecting"))');
};


function clearData () {
  var ss = SpreadsheetApp.getActiveSheet();
  ss.getRange('a2:G').clearContent();
};
               
