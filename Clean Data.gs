var stateMap =  { 
                  "Alabama":"AL","Alaska":"AK","Arizona":"AZ","Arkansas":"AR","California":"CA","Colorado":"CO","Connecticut":"CT",
                  "Delaware":"DE","Florida":"FL","Georgia":"GA","Hawaii":"HI","Idaho":"ID","Illinois":"IL","Indiana":"IN","Iowa":"IA",
                  "Kansas":"KS","Kentucky":"KY","Louisiana":"LA","Maine":"ME","Maryland":"MD","Massachusetts":"MA","Michigan":"MI","Minnesota":"MN",
                  "Mississippi":"MS","Missouri":"MO","Montana":"MT","Nebraska":"NE","Nevada":"NV","New Hampshire":"NH","New Jersey":"NJ","New Mexico":"NM",
                  "New York":"NY","North Carolina":"NC","North Dakota":"ND","Ohio":"OH","Oklahoma":"OK","Oregon":"OR","Pennsylvania":"PA","Rhode Island":"RI",
                  "South Carolina":"SC","South Dakota":"SD","Tennessee":"TN","Texas":"TX","Utah":"UT","Vermont":"VT","Virginia":"VA","Washington":"WA",
                  "West Virginia":"WV","Wisconsin":"WI","Wyoming":"WY","Alberta":"AB","British Columbia":"BC","Manitoba":"MB","New Brunswick":"NB",
                  "Newfoundland And Labrador":"NL","Nova Scotia":"NS","Northwest Territories":"NT","Nunavut":"NU","Ontario":"ON","Prince Edward Island":"PE",
                  "Quebec":"QC","Saskatchewan":"SK","Yukon":"YT"
                };
 
function cleanData(rowValues,searchString,chainBranding,domainType) {
  var newArray = []
  var numRows = rowValues.length;
  var numCols = rowValues[0].length;
  for (var i = 0; i < numRows; i++) {
    for (var j = 0; j < numCols; j++) {
      var x = rowValues[i][j];
      var y = x.toString().trim();
      switch(searchString) {
        case "email":
          y = cleanEmail(y);
          break;
        case "custom_slug":
          y = createCustomSlug(domainType, chainBranding, y);
          break;
        case "twitter_username": case "facebook_username": case "yelp_username": case "pinterest_username": case "instagram_username": case "youtube_username": case "linkedin_username":
          y = cleanSocialLinks(y, searchString);
          break;
        case "local_phone_number": case "display_phone_number":
          y = cleanPhoneNumber(y);
          break;
        case "naked_domain":
          y = cleanDomain(y,domainType);
          break;
        case "floor_plans":
          y = cleanFloorPlans(y);
          break;
        case "state":
          y = mapState(y);
          break;
        case "landmark_1_name": case "nearby_healthcare_1": case "nearby_gasoline": case "nearby_roadway_1": case "nearby_roadway_2": case "community_amenity_1":
          y = findFirstValue(y);
          break;
        case "nearby_restaurants": case "nearby_shopping": case "nearby_employers": case "nearby_schools":
          y = cleanLists(y);
          break;
      }
      newArray.push(y); 
    }
  }
  return [newArray];
}

function cleanEmail(y) {
  if(y.indexOf("@") != -1) {
    //y = y.replace(/\n/g, " " ).split(" ", 1).toString().trim();
    y = y.toString().match(/\b([^\s]+@[^\s]+)\b/);
  } else {
    y = "";
  }
  return y;
}

function createCustomSlug(domainType, chainBranding, y) {
  if(domainType == "single" && chainBranding == "yes") { //this will pass in the address range and values to clean for a slug
    y = y.replace(/[^A-Za-z0-9|" "]/g, '').substr(y.indexOf(' ')+1).toString().toLowerCase().trim().replace(/\s\s+|\s/g, '-');
  }
  if(domainType == "single" && chainBranding == "no") {  // this will pass in the brand name to clean for a slug
    y = y.toString().toLowerCase().trim().replace(/\s\s+|\s/g, '-');
  }
  return y;
}

function cleanSocialLinks(y) {
  if(checkForSocialString(y)) {
    if(y.indexOf("?") != -1) {
      y = y.substr(0, y.indexOf("?"));
    }
    if(y.substr(y.length - 1) == "/") { //checks if last character in url is trailing slash
      y = y.substr(0, y.length - 1);
    }
    y = y.split("/").pop();
  } else {
    y = "";
  }
  return y;
}
//checks that the text in the social link cell is actually a social link
function checkForSocialString(y) {
  var socialStrings = ["yelp","facebook","twitter","pinterest","instagram","youtube","linkedin"];
  for(i = 0; i < socialStrings.length; i++) {
    if(y.indexOf(socialStrings[i]) >= 0) {
      return true;
    }
  }
  return false;
}

function cleanPhoneNumber(val) {
  var y = val;
  y = y.replace(/[^0-9\.]+/g, '').replace(/\./g, '').toString().trim();
  if(y == "" || y.length < 10) {
    return "";
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
  y = y.replace(/https:\/\/www.|https:\/\/|http:\/\/www.|http:\/\/|www\./gi, "" ).split("/", 1).toString().toLowerCase().trim();
  }
  return y;
}
//does not take into condideration decimal numbers
function cleanFloorPlans(val) {
  var y = val;
  var hasStudio;
  if(y.indexOf("studio") != -1 || y.indexOf("Studio") != -1) {
    hasStudio = true;
  } else {
    hasStudio = false;
  }
  y = y.replace(/\../g,"");
  y = y.replace(/[^0-9]+/g,"").toString().trim();
  if(y == "") {
    return y;
  } else {
    if(y.length > 1) {
      var x = y.substr(-1);
      y = y.slice(0, -1).split("").join(", ");
      if(hasStudio == true) {
        y = "Studio, " + y + " & " + x;
      }  else {
        y = y + " & " + x;
      }
    }
  }
  return y;
}

//extracts string from index 0 until it reaches a comma or line break
function findFirstValue(val) {
  var y = val;
  if(y != "") {
    y = y.split(/[\n,;(]/, 1).toString().trim();
  } else {
    y = "";
  }
  return y;
}

//maps state to abbreviation required in CMS
function mapState(val) {
  var y = stateMap[val];
  return y; 
}

//this function needs work
function cleanLists(val1) {
  var y = val1.replace(/[^\w\s|\,\;]/gi, '').trim(); 
  if(y != "" && hasLineBreakComma(y) == false) {
    y = y.replace(/(\r\n|\n|\r)/gm,", ").replace(/\;|,+/g,',').toString().trim();
    y = y.replace(/\s\s+/g, ' ');
  } 
  else if (y != "" && hasLineBreakComma(y) == true) {
    y = y.replace(/(\r\n|\n|\r)/gm," ").replace(/\s\s+/g, ' ').toString().trim();
    y = y.replace(/\s\s+/g, ' ');
  }
  else {
    y = "";
  }
  y = y.replace(/\s\,+/g,',');
  return y;
}
// returns true if last character on line is a "," or ";"
function hasLineBreakComma(y) {
  var indexPosition = y.indexOf("\n")-1;
  var character = y.charAt(indexPosition);
  var character2 = y.charAt(indexPosition -1);
  var lineBreakComma;
  if (character == /\,|\;/g || character2 == /\,|\;/g) {
    lineBreakComma = true;
  } else {
    lineBreakComma = false;
  }
  return lineBreakComma;
}

function defaultValuePrint(numLocations,search, vertical, domainType) { //this function is used in the searchRowIndexArray to print out default values in columns where the values are static
  var printColumnIndex = headerArrayNames.indexOf(search) + 1;
  var fillColumnArray = spinUpTab.getRange(2, printColumnIndex, numLocations, 1);
  if (search == "corporate") {
    var fillDefaultArrayValues = fillArray("false", numLocations);  
    fillColumnArray.setValues(fillDefaultArrayValues);
  }
  else if (search == "status") {
    var fillDefaultArrayValues = fillArray("Pending", numLocations);  
    fillColumnArray.setValues(fillDefaultArrayValues);
  }
  else if (search == "no_deploy") {
    var fillDefaultArrayValues = fillArray("false", numLocations);  
    fillColumnArray.setValues(fillDefaultArrayValues);
  }
  else if (search == "secure_domain" && domainType == "multi") {
    var fillDefaultArrayValues = fillArray("true", numLocations);  
    fillColumnArray.setValues(fillDefaultArrayValues);
  }
  else if (search == "spinup_web_theme") {
    var fillDefaultArrayValues = fillArray("default", numLocations);  
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