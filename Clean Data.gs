function testdataval() {
  var clientProp = getClientProp('mf','multi','yes');
  var propSheetObj = new PropertyInfo();
  var emailData = propSheetObj.getRowValByTag('nearby_schools');
  var dataValChecker = new DataVal(clientProp);
  //var emailArry = dataValChecker.runDataVal('email');
  var customSlugs = dataValChecker.runDataVal('nearby_schools',emailData);
  Logger.log(customSlugs);

}

/*
  Data validation class that mutates property info sheet values into appropriate strings
*/
function DataVal(clientProp) {
  this.vertical = clientProp.vertical;
  this.domainType = clientProp.domainType;
  this.chainBranding = clientProp.chainBranding;
  
  this.runDataVal = function(tag,dataByTag) {
    this.dataByTag = dataByTag;
    this.numLocations = dataByTag.length;
    var cleanedData = [];
    for(var i = 0; i < this.numLocations;i++) { 
      var str = this.dataByTag[i].toString().trim();
      switch(tag) {
        case "email":
          str = this.emailVal(str);
          break;
        case "custom_slug":
          str = this.generateSlug(str);
          break;
        case "twitter_username": case "facebook_username": case "yelp_username": case "pinterest_username": case "instagram_username": case "youtube_username": case "linkedin_username":
          str = this.valSocialLinks(str);
          break;
        case "local_phone_number": case "display_phone_number":
          str = this.valPhoneNum(str);
          break;
        case "naked_domain":
          str = this.valDomain(str);
          break;
        case "floor_plans":
          str = this.valFloorPlans(str);
          break;
        case "state":
          str = this.getStateAbb(str);
          break;
        case "landmark_1_name": case "nearby_healthcare_1": case "nearby_gasoline": case "nearby_roadway_1": case "nearby_roadway_2": case "community_amenity_1":
          str = this.extractFirstVal(str);
          break;
        case "nearby_restaurants": case "nearby_shopping": case "nearby_employers": case "nearby_schools":
          str = this.formatCommaSepList(str);
          break;
        default:
          break;
      }  
      cleanedData.push(str);
    }
    return [cleanedData];
  }
  
  this.emailVal = function(str) {
    str = str.indexOf("@") != -1 ? str.toString().match(/\b([^\s]+@[^\s]+)\b/)[0].toString() : "";
    return str;
  }
  
  this.generateSlug = function(str, clientProp) {
    if(this.chainBranding == "yes") { //address passed in if chain branding and will be formatted
      str = str.replace(/[^A-Za-z0-9|" "]/g, '').substr(str.indexOf(' ')+1).toString().toLowerCase().trim().replace(/\s\s+|\s/g, '-');
    }
    else {  // this will pass in the brand name to clean for a slug (not chain branded)
      str = str.toString().toLowerCase().trim().replace(/\s\s+|\s/g, '-');
    }
    return str;
  }
  
  this.valSocialLinks = function(str) {
    if((str) && this.hasSocialLink(str)) {
      if(str.indexOf("?") != -1) {
        str = str.substr(0, str.indexOf("?"));
      }
      if(str.substr(str.length - 1) == "/") { //checks if last character in url is trailing slash
        str = str.substr(0, str.length - 1);
      }
      str = str.split("/").pop();
    } else {
      str = "";
    }
    return str;
  } 
  
  this.hasSocialLink = function(str) {    
    var socialStrings = ["yelp","facebook","twitter","pinterest","instagram","youtube","linkedin"];
    for(i = 0; i < socialStrings.length; i++) {
      if(str.indexOf(socialStrings[i]) >= 0) {
        return true;
      }
    }
    return false;
  }
  
  this.valPhoneNum = function(str) {
    var fullNumber = "";
    str = str.replace(/[^0-9\.]+/g, '').replace(/\./g, '').toString().trim();
    if(str != "" || str.length === 10) {
      var areaCode = str.substr(0, 3);
      var first3 = str.substr(3, 3);
      var last4 = str.substr(6, 4);
      var fullNumber = areaCode + '-' + first3 + '-' + last4;
    }
    return fullNumber;
  }
  
  this.valDomain = function(str, clientProp) { 
    var domain = "";
    if(this.domainType == "multi") {
      domain = str.replace(/https:\/\/www.|https:\/\/|http:\/\/www.|http:\/\/|www\./gi, "" ).split("/", 1).toString().toLowerCase().trim();
    }
    return domain;
  }
  
  this.valFloorPlans = function(str) {
    var hasStudio = false;
    if (str.indexOf("studio") != -1 || str.indexOf("Studio") != -1) {
      hasStudio = true;
    }
    str = str.replace(/\../g, "").replace(/[^0-9]+/g, "").toString().trim();
    if (str.length > 1) {
      var x = str.substr(-1);
      str = str.slice(0, -1).split("").join(", ");
      if (hasStudio == true) {
        str = "Studio, " + str + " & " + x;
      } else {
        str = str + " & " + x;
      }
    }
    return str;
  }
  
  this.extractFirstVal = function(str) {
    str = str != "" ? str.split(/[\n,;(]/, 1).toString().trim() : "";
    return str;
  }
  
  this.getStateAbb = function(str) {
    return stateMap[str];
  }
  
  this.formatCommaSepList = function(val1) {
    var y = val1.replace(/[^\r\n\w\s|\,\;]/gi, '').trim(); 
    if(y != "") {
      if(!this.hasALineBreakComma(y)) {
        y = y.replace(/(\r\n|\n|\r)/g,', ');
        y = y.replace(/\s\s+/g, ' ');
        y = y.split(/\n\;|,+/g);
        var x = [];
        y.forEach(function(e) {
          e = e.trim()
          x.push(e);
        });
        y = x.filter(Boolean);
        y = y.join();
        y = y.trim();
      }
      else {
        y = y.replace(/(\r\n|\n|\r)/gm," ").replace(/\s\s+/g, ' ').toString().trim();
        y = y.replace(/\s\s+/g, ' ');
      }
    }
    y = y.replace(/\,+/g,', ');
    return y;
  }
  
  this.hasALineBreakComma = function(s) {
    var indexPosition = s.indexOf("\n") - 1;
    var character = s.charAt(indexPosition);
    var character2 = s.charAt(indexPosition -1);
    var lineBreakComma = false;
    if (character == /\,|\;/g || character2 == /\,|\;/g) {
      lineBreakComma = true;
    } 
    return lineBreakComma;
  }
    
} 


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


function defaultValuePrint(numLocations,search, domainType) { //this function is used in the searchRowIndexArray to print out default values in columns where the values are static
  var fillDefaultArrayValues;
  var printColumnIndex = spinUpFileHeaders.indexOf(search) + 1;
  if(search === 'secure_domain' && domainType === 'single') {
    fillDefaultArrayValues = fillArray('', numLocations);
  }
  else {
    fillDefaultArrayValues = fillArray(defaultTagValue[search], numLocations);
  }
  return fillDefaultArrayValues;
}

var defaultTagValue = {
  'corporate': 'false',
  'status': 'Pending',
  'no_deploy': 'false',
  'spinup_web_theme': 'default', 
  'secure_domain': 'true' 
}

function fillArray(value, len) {  //this function works the defaultValuePrint function to fill an array full of default values to be printed in a range
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  }
  return [arr];
}