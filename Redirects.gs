/*
* Deletes duplicate rows in active spreadsheet 
* Deletes image files
* Formats urls for CMS in column D if its a same domain redirect
*/              
function cleanUpAndFormatUrls() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Redirects Tool');
  removeGarbageRedirect(sheet); //removed duplicates in column C
  try {
    var redirectSetRange = sheet.getRange(2, 4, sheet.getLastRow() - 1, 1);
    var redirectValues = sheet.getRange(2, 2, sheet.getLastRow() - 1, 2).getValues();
    var err = false;
    for(var i = 0; i < redirectValues.length; i++) {
      var row = redirectValues[i];
      if(row[1] == '' && row[0] !== 'No Redirects') {
        err =  true
        break;
      }
    }
    if (err) {
      ui.alert("Some lines are missing redirects");
    }
    else {
      formatRedirects(redirectSetRange, redirectValues);
    }
  } catch(e) {
    ui.alert("There are no redirects to format");
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
  for(var i = 0; i < values.length; i++) {
    var newStr = "";
    if(values[i][0] == "Same Domain") {
      newStr = formatRedirectStrings(values[i][1].toString());     
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
    str = str.split(/\.com\/|\.com|\.net\/|\.org\/|\.co\//)[1]     //strips everthing left of the TLD (ex: www.myapartments.com/units -> units)
             .split(/\.html|[?]/)[0];                            //strips everything to the right of .html or ? 
    if(str.substr(-1) === '/')  {
        str = str.slice(0, -1);                                 //pops last slash in url
    }   
    str = str.replace(/%20|\s/g,'\\s')
            .replace(/[[\]{}()*+?.,^$|#]/g, '\\$&')            //escapes special characters with \
            .replace(/\/\//g,'/+')                               //replaces // with /+
            .replace(/%5B|%5b/g,'\\[')                                   
            .replace(/%5D|%5d/g,'\\]')
            .replace(/%7C/g,'\\|');
    if(str.length == 1) {
      str = "[" + str + "]";
    }
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
      if((row[2] == newData[j][2] || indexMatch(data[i][2])) && row[1] !== 'No Redirects') {
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
  var arryOfBadVal = [".jpg",".js",".gif",".JPG",".css",".pdf",".json",".jpeg",".jpeg",".png",".svg","sitemap.xml","sitemap"];
  for(i = 0; i < arryOfBadVal.length; i++) {
    if(string.indexOf(arryOfBadVal[i]) != -1) {
      return true;
    }    
  }
  return false;
}

/*
Function tests redirects for column C in Redirects Tool tab,
Gathers status codes and redirect endpoints for 301/302s and
Sets Values in appropriate columns
*/
function getStatusCodes() {
  var redirectsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Redirects Tool');  
  try {
    var redirectValues = redirectsSheet.getRange(2, 3, redirectsSheet.getLastRow() - 1, 1).getValues();
    var flatRedirectArry = redirectValues.map(function(v){ return v[0] }).filter(Boolean);
    var statusRequest = []; var statusCodes = [];
    redirectsSheet.getRange(2,6,redirectValues.length,2).clearContent();
    //builds array of objects to fetch with
    flatRedirectArry.forEach(function(e) { 
      var request = {
        url: e,
        muteHttpExceptions: true,
        followRedirects: false
      };
      statusRequest.push(request);
    });  
    //fetches all statuses and 301 end points
    Logger.log(statusRequest);
    UrlFetchApp.fetchAll(statusRequest).forEach(function(e) {
      var statusResponse = e.getResponseCode();  
      if(statusResponse === 301 || statusResponse === 302) {
        var header = e.getHeaders();
        var location = header['Location'];
        statusCodes.push([statusResponse,location]);
      } else {
        statusCodes.push([statusResponse,"Not Redirecting"]);
      }
    });
    redirectsSheet.getRange(2,6,statusCodes.length,statusCodes[0].length).setValues(statusCodes);
  } 
  catch(e) {
    ui.alert('Error: Check your to ensure you have no invalid URLs entered or empty rows');
  }   
}



function statuscode(urls, user, pwd) {
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

function testForward() {
 var forwardingTo = location('https://www.55westaptsorlando.com/photos');
  Logger.log(forwardingTo);
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
               
