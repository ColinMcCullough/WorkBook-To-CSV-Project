/*
* Deletes duplicate rows in active spreadsheet 
* Deletes image files
* Formats urls for CMS in column D if its a same domain redirect
*/              
function cleanUpAndFormatUrls() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Redirects Tool');
  removeGarbageRedirect(sheet); //removed duplicates in column C
  var redirectSetRange = sheet.getRange(2, 4, sheet.getLastRow() - 1, 1);
  var redirectValues = sheet.getRange(2, 2, sheet.getLastRow() - 1, 2).getValues();
  var flatRedirectValues =  [].concat.apply([], redirectValues);
  var hasBlanks = flatRedirectValues.indexOf("");
  if(hasBlanks > -1) {
    ui.alert("You need to fill in all Redirect Strategies to continue");
  }
  else {
    formatRedirects(redirectSetRange, redirectValues);
  }
}
/*
  Loops through a 2D arry of urls calling formatRedirectStrings and passing returned string in new Array
  Sets new array in the param setRange
  @param [][] 2D Array Range
  @param values 2D array of column values
*/
function formatRedirects(setRange, values) {
  var newRedirectsArry = [];
  for(i = 0;i < values.length; i++) {
    if(values[i][0] == "Same Domain") {
      var newStr = formatRedirectStrings(values[i][1].toString());     
    } else {
      var newStr = "";
    }
    newRedirectsArry.push([newStr]);
  }  
  setRange.setValues(newRedirectsArry);
}
/*
  Formats a url for cloud redirect manager
  @param String
  @return String
*/
function formatRedirectStrings(str) {
    str = str.split(/\.com\/|\.net\/|\.org\/|\.co\//)[1]     //strips everthing left of the TLD (ex: www.myapartments.com/units -> units)
            .split(/\.html|[?]/)[0];                            //strips everything to the right of .html or ? 
    if(str.substr(-1) === '/')  {
        str = str.slice(0, -1);                                 //pops last slash in url
    }   
    str = str.replace(/%20|\s/g,'\\s')
            .replace(/[[\]{}()*+?.%,^$|#]/g, '\\$&')            //escapes special characters with \
            .replace(/\/\//g,'/+')                               //replaces // with /+
            .replace(/5B|5b/g,'\\[')                                   
            .replace(/5D|5d/g,'\\]');
    return str + '$';
}

/**
 * Removes rows with duplicate data in column C from the current sheet.
 * Removes rows with ulrs containing values we do not want to redirect(.jpg,.pdf,etc)
 * @param sheet object
 */
function removeGarbageRedirect(sheet) {
  var data = sheet.getDataRange().getValues();
  var newData = [];
  for (var i in data) {
    var row = data[i];
    var duplicate = false;
    for (var j in newData) {
      if(row[2] == newData[j][2] || indexMatch(data[i][2])) {
        duplicate = true;
       }
    }
    if (!duplicate) {
      newData.push(row);
    }
  }
  sheet.clearContents();
  sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData);
}


/**
 * Deletes rows with ulrs containing values we do not want to redirect
 * @param string to match against array in function of file types we do not want
 * @return boolean returns true if string has value from array, false if it does not
 */
function indexMatch(string) {
  if(string == null || string == "") {
    return false;
  }
  var arryOfBadVal = [".jpg",".js",".gif",".JPG",".css",".pdf",".json",".jpeg",".jpeg",".png"];
  for(i = 0; i < arryOfBadVal.length; i++) {
    if(string.indexOf(arryOfBadVal[i]) != -1) {
      return true;
    }    
  }
  return false;
}

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
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Redirects Tool');
  ss.getRange("F2").setFormula('=if(ISBLANK(C2),"",statuscode(C2))');       

  var lr = ss.getLastRow();
  var fillDownRange = ss.getRange(2, 6, lr-1);
  ss.getRange("F2").copyTo(fillDownRange);  
  
//Fills Column G (Redirecting To URL)
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Redirects Tool');
    ss.getRange("G3:G").setFormula('=If(C3:C="","",if(OR(F3:F=302,F3:F=301),location(C3:C),"Is not redirecting"))');
}


function clearData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Redirects Tool');
  ss.getRange('a2:G').clearContent();
}
               
