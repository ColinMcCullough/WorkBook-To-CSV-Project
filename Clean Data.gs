  // need to import a couple of things if using as library
  // the rest are added to the prototypes
var Set = cEs6Shim.Set;
var Map = cEs6Shim.Map;

var stateMap = new Map([
                        ["Alabama","AL"],["Alaska","AK"],["Arizona","AZ"],["Arkansas","AR"],["California","CA"],["Colorado","CO"],["Connecticut","CT"],
                        ["Delaware","DE"],["Florida","FL"],["Georgia","GA"],["Hawaii","HI"],["Idaho","ID"],["Illinois","IL"],["Indiana","IN"],["Iowa","IA"],
                        ["Kansas","KS"],["Kentucky","KY"],["Louisiana","LA"],["Maine","ME"],["Maryland","MD"],["Massachusetts","MA"],["Michigan","MI"],["Minnesota","MN"],
                        ["Mississippi","MS"],["Missouri","MO"],["Montana","MT"],["Nebraska","NE"],["Nevada","NV"],["New Hampshire","NH"],["New Jersey","NJ"],["New Mexico","NM"],
                        ["New York","NY"],["North Carolina","NC"],["North Dakota","ND"],["Ohio","OH"],["Oklahoma","OK"],["Oregon","OR"],["Pennsylvania","PA"],["Rhode Island","RI"],
                        ["South Carolina","SC"],["South Dakota","SD"],["Tennessee","TN"],["Texas","TX"],["Utah","UT"],["Vermont","VT"],["Virginia","VA"],["Washington","WA"],
                        ["West Virginia","WV"],["Wisconsin","WI"],["Wyoming","WY"],["Alberta","AB"],["British Columbia","BC"],["Manitoba","MB"],["New Brunswick","NB"],
                        ["Newfoundland And Labrador","NL"],["Nova Scotia","NS"],["Northwest Territories","NT"],["Nunavut","NU"],["Ontario","ON"],["Prince Edward Island","PE"],
                        ["Quebec","QC"],["Saskatchewan","SK"],["Yukon","YT"],
                       ]); 

var tester = stateMap.get("AL");


function cleanData(rowRange,rowValues,searchString,chainBranding,domainType) {
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
      else if(searchString == "state") {
        y = mapState(y);
      }
      else if(searchString == "landmark_1_name" || searchString == "nearby_healthcare_1" || searchString == "nearby_gasoline" || searchString == "nearby_roadway_1" || searchString == "nearby_roadway_2" || searchString == "community_amenity_1") {
        y = findFirstValue(y);
      }
      else if(searchString == "nearby_restaurants" || searchString == "nearby_shopping" || searchString == "nearby_employers" || searchString == "nearby_schools") {
        y = cleanLists(y);
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
  if(y.substr(y.length - 1) == "/") { //checks if last character in url is trailing slash
    y = y.substr(0, y.length - 1);
  }
  y = y.split("/").pop();
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
  var y = stateMap.get(val);
  return y; 
}

function cleanLists(val) {
  var y = val;
  if(y != "" && hasLineBreakComma(y) == false) {
    y = y.replace(/(\r\n|\n|\r)/gm,",").replace(/\;|,+/g,',').toString().trim();
  } 
  else if (y != "" && hasLineBreakComma(y) == true) {
    y = y.replace(/(\r\n|\n|\r)/gm," ").toString().trim();
  }
  else {
    y = "";
  }
  Logger.log(y)  
  return y;
}
// returns true if last character on line is a ","
function hasLineBreakComma(y) {
  var indexPosition = y.indexOf("\n")-1;
  var character = y.charAt(indexPosition);
  var lineBreakComma;
  if (character == ",") {
    lineBreakComma = true;
  } else {
    lineBreakComma = false;
  }
  return lineBreakComma;
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
    var fillDefaultArrayValues = fillArray("Pending", getColumnLength);  
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