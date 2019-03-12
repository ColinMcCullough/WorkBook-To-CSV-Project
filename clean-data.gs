function cleanData(val,val1,val2,val3,val4) {
  var rowRange = val;
  var rowValues = val1;
  var searchString = val2;
  var chainBranding = val3;
  var domainType = val4;
  var newArray = []
  var numRows = rowRange.getNumRows();
  var numCols = rowRange.getNumColumns();
  for (var i = 0; i < numRows; i++) {
    for (var j = 0; j < numCols; j++) {
      var x = rowValues[i][j];
      var y = x.toString().trim();
      if(searchString == "email") {
        y = cleanEmail(y);
      }
      else if(searchString == "custom_slug") {
        y = createCustomSlug(domainType, chainBranding, y);
      }
      else if(searchString == "twitter_username" || searchString == "facebook_username" || searchString == "yelp_username" || searchString == "pinterest_username" || searchString == "instagram_username" || searchString == "youtube_username" || searchString == "linkedin_username") {
        y = cleanSocialLinks(y, searchString);
      }
      else if(searchString == "local_phone_number" || searchString == "display_phone_number") {
        y = cleanPhoneNumber(y);
      }
      else if(searchString == "naked_domain") {
        y = cleanDomain(y,domainType);
      }
      else if(searchString == "floor_plans") {
        y = cleanFloorPlans(y);
      }
      else if(searchString == "landmark_1_name") {
        y = cleanLandmark(y);
      }
      newArray.push(y); 
    }
  }
  Logger.log([newArray]);
  return [newArray];
}

function cleanEmail(val) {
  var y = val;
  if(y.indexOf("@") != -1) {
    //y = y.replace(/\n/g, " " ).split(" ", 1).toString().trim();
    y = y.toString().match(/\b([^\s]+@[^\s]+)\b/);
    Logger.log(y);
  } else {
    y = "";
  }
  return y;
}

function createCustomSlug(val, val1, val2) {
  var domainType = val;
  var chainBranding = val1;
  var y = val2;
  if(domainType == "single" && chainBranding == "yes") { //this will pass in the address range and values to clean for a slug
    y = y.toString().toLowerCase().replace(/[^a-zA-Z ]/g, '').trim().replace(/ /g, '-');
  }
  if(domainType == "single" && chainBranding == "no") {  // this will pass in the brand name to clean for a slug
    y = y.toString().toLowerCase().trim().replace(/ /g, '-');
  }
  return y;
}

function cleanSocialLinks(val) {
  var y = val;
  y = y.replace(/https:\/\/www.|http:\/\/www.|https:\/\/|http:\/\/|www.|facebook.com\/|twitter.com\/|yelp.com\/biz|yelp.com\/|instagram.com\/|pinterest.com\/|youtube.com\/user\/|youtube.com\/|linkedin.com\/in\/|linkedin.com\/company\/|linkedin.com\/|\/ /gi, "" ).split("/", 1).toString().trim();
  return y;
}

function cleanPhoneNumber(val) {
  var y = val;

  y = y.replace(/[^0-9\.]+/g, '').replace(/\./g, '').toString().trim();
  if(y == "") {
    return y;
  } else {
    var areaCode = y.substr(0, 3);
    var first3 = y.substr(3, 3);
    var last4 = y.substr(6, 4);
    z = areaCode + '-' + first3 + '-' + last4;
  }
  return z;
}

function cleanDomain(val, val1) {
  var y = val;
  var domainType = val1;
  if(domainType == "single") {
    y = "";
    return y;
  } else {
  y = y.replace(/https:\/\/www.|https:\/\/|http:\/\/www.|http:\/\/|www\./gi, "" ).split("/", 1).toString().trim();
  }
  return y;
}

function cleanFloorPlans(val) {
  var y = val;
  y = y.replace(/[^0-9\.]+/g,"").toString().trim();
  if(y == "") {
    return y;
  } else {
    var x = y.substr(-1);
    y = y.slice(0, -1).split("").join(", ");
    y = y + " & " + x;
  }
  return y;
}

function cleanLandmark(val) {
  var y = val;
  if(y != "") {
    y = y.split(",", 1)
  } else {
    y = "";
  }
  return y;
}

function defaultValuePrint(val, val1, val2) { //this function is used in the searchRowIndexArray to print out default values in columns where the values are static
  var search = val;
  var vertical = val1;
  var domainType = val2;
  var printColumnIndex = headerArrayNames.indexOf(search) + 1;
  var fillColumnArray = spinUpTab.getRange(2, printColumnIndex, spinUpTab.getLastRow()-1, 1);
  var getColumnLength = fillColumnArray.getValues().length;
  if (search == "corporate") {
    var fillDefaultArrayValues = fillArray("false", getColumnLength);  
    fillColumnArray.setValues(fillDefaultArrayValues);
  }
  else if (search == "status") {
    var fillDefaultArrayValues = fillArray("pending", getColumnLength);  
    fillColumnArray.setValues(fillDefaultArrayValues);
  }
  else if (search == "no_deploy") {
    var fillDefaultArrayValues = fillArray("false", getColumnLength);  
    fillColumnArray.setValues(fillDefaultArrayValues);
  }
  else if (search == "secure_domain" && domainType == "multi") {
    var fillDefaultArrayValues = fillArray("true", getColumnLength);  
    fillColumnArray.setValues(fillDefaultArrayValues);
  }
  else if (search == "spinup_web_theme") {
    var fillDefaultArrayValues = fillArray("default", getColumnLength);  
    fillColumnArray.setValues(fillDefaultArrayValues);
  }
}

function fillArray(value, len) {  //this function works the defaultValuePrint function to fill an array full of default values to be printed in a range
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push([value]);
  }
  return arr;
}