function testGetVal() {
  var dashboard = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Keyword Research Accelerator');
  var dashboardData = dashboard.getRange(3, 1, 10,1).getValues();
  Logger.log(dashboardData);
}

function testGeneratePhrases() {
  generatePhrases("mf",["8520 Sierra Ridge Dr","Indianapolis","Indiana","46239"]);
}
/*
@param {String} vertical selected in UI
@param {[]} array of front end table array including address and property info shown to user
*/
function generatePhrases(vertical,locationTable) {
  if(hasAddressVal(locationTable)) {
    var propSheet = propertySheet.getRange(2, 1, propertySheet.getLastRow(),propertySheet.getLastColumn()).getValues();
    var dashboardData = dashboardSheet.getRange(3, 1, dashboardSheet.getLastRow(),dashboardSheet.getLastColumn()).getValues();
    var amenitiesArray = "";  
    var locationInfo = {
      addr: locationTable[0],
      city: locationTable[1],
      state: locationTable[2]
      };
    dashboardSheet.getRange('E3:H500').clearContent();
    //2D Array Holding Neighborhood Keywords in 1st Arry, Landmark Keywords in 2nd Arry
    var apiKeywords = getKeywordsFromDashboard(dashboardData);
    if(vertical === 'mf') {
      //2D Array Holding Apartment Amenities in 1st Arry, Comm Amenities in 2nd Arry
      amenitiesArray = getAmenitiesArray(propSheet,locationTable); 
    }
    var allPhrases = getPhrases(vertical,apiKeywords,amenitiesArray,locationInfo);
    if(allPhrases[0].length > 0) {
      dashboardSheet.getRange(3, 5, allPhrases[0].length, 1).setValues(allPhrases[0]); // sets neighborhood phrases
    }
    if(allPhrases[1].length > 0) {
      dashboardSheet.getRange(3, 6, allPhrases[1].length, 1).setValues(allPhrases[1]); // sets landmark phrases
    } 
    if(amenitiesArray) {
      dashboardSheet.getRange(3, 7, allPhrases[2].length, 1).setValues(allPhrases[2]);
      dashboardSheet.getRange(3, 8, allPhrases[3].length, 1).setValues(allPhrases[3]);
    }
  }
}

/*
@param {String} vertical selected in UI
@param {[][]} 2D array. 1st array is all neighborhood keywords, 2nd array is all landmark keywords
@param {[][]} 1st array is all apartment amenities, 2nd array is all community amenities
@return {[][]} 4 columns of phrases if mf, 2 columns of phrases if sl/ss
*/
function getPhrases(vertical,keywords,amenities,locationInfo) {
  var aptAmenitiesPhrases;
  var commAmenitiesPhrases;
  var neighborhoodKeywords = {
    keywordList: keywords[0],
    keywordType: 'neighborhood'
  };
  var landmarkKeywords = {
    keywordList: keywords[1],
    keywordType: 'landmark'
  };
  var apartmentAmenities = {
    keywordList: amenities[0],
    keywordType: 'amenities'
  };
  var communityAmenities =  {
    keywordList: amenities[1],
    keywordType: 'amenities'
  };
  var neighborhoodPhrases = fillPhrasesWithKeywords(neighborhoodKeywords,vertical,locationInfo); 
  var landmarkPhrases = fillPhrasesWithKeywords(landmarkKeywords,vertical,locationInfo); 
  if(amenities != "") {
    aptAmenitiesPhrases = fillPhrasesWithKeywords(apartmentAmenities,vertical,locationInfo); 
    commAmenitiesPhrases = fillPhrasesWithKeywords(communityAmenities,vertical,locationInfo); 
  } 
  return [neighborhoodPhrases,landmarkPhrases,aptAmenitiesPhrases,commAmenitiesPhrases]
}

function fillPhrasesWithKeywords(keywords,vertical,locationInfo) { 
    var allPhrases = [];
    var phrases;
    if(keywords.keywordType === 'neighborhood') {
      phrases = getNeighborhoodPhraseTemplates(vertical);
    }
    else if(keywords.keywordType === 'landmark') {
      phrases = getLandmarkPhraseTemplates(vertical);
    }
    else {
      phrases = phraseTemplates.mfAmenityPhraseTemplates;
    }
    for(var i = 0; i < keywords.keywordList.length; i++) {
      var keywordPhrases = []
      for(var j = 0; j < phrases.length; j++) {
        var phrase = phrases[j].buildPhrase(locationInfo.city,locationInfo.state,keywords.keywordList[i]);
        if(phrase.length <= 80) {
          keywordPhrases.push(phrase);
        }   
      }
      allPhrases.push([keywordPhrases.join()]);
    }
    return allPhrases;
}

function getNeighborhoodPhraseTemplates(vertical) { 
      if(vertical === "mf") { return phraseTemplates.mfNeighborhoodPhraseTemplates; } 
      else if(vertical === "ss") {return phraseTemplates.ssNeighborhoodPhraseTemplates; } 
      else {return phraseTemplates.slNeighborhoodPhraseTemplates;}
}

function getLandmarkPhraseTemplates(vertical) { 
      if(vertical === "mf") { return phraseTemplates.mfLandmarkPhraseTemplates; } 
      else if(vertical === "ss") {return phraseTemplates.ssLandmarkPhraseTemplates; } 
      else {return phraseTemplates.slLandmarkPhraseTemplates;}
}

/*
@param {String} vertical selected in UI
@return {[][]} 1st array is all neighborhood keywords, 2nd array is all landmark keywords
*/
function getKeywordsFromDashboard(dashboardData) {
  var allApiTypes = getColumnOneVal(dashboardData); //puts api types in array
  var allApiKeywords = getColumnTwoVal(dashboardData); //puts api keywords in array
  var neighborhoodKeys = Object.keys(neighborhoodMap); //gets neighborhood types
  var lastNeighborhoodIndex = -1;
  var landmarkKeywords = [];
  //loops through to find last row in col A that is using a neighborhood type
  for(var i = neighborhoodKeys.length - 1; i >= 0; i--) {
    var neighborhoodIndex = allApiTypes.lastIndexOf(neighborhoodKeys[i]); 
    if(neighborhoodIndex != -1) {
      lastNeighborhoodIndex = neighborhoodIndex;   
      break;
    }
  }
  var neighborhoodKeywords = lastNeighborhoodIndex != -1 ? allApiKeywords.splice(0,lastNeighborhoodIndex + 1).filter(Boolean) : [] ; //splits neighborhood keywords in array
  neighborhoodKeywords = neighborhoodKeywords.concat(getColumnThreeVal(dashboardData).filter(Boolean)); //adds client neighborhood keywords
  neighborhoodKeywords = arrayUnique(neighborhoodKeywords); //removes duplicates
  var landmarkKeywords = allApiKeywords.filter(Boolean); 
  landmarkKeywords = landmarkKeywords.concat(getColumnFourVal(dashboardData).filter(Boolean));//adds client landmark keywords
  landmarkKeywords = arrayUnique(landmarkKeywords); //removes duplicates
  return[neighborhoodKeywords,landmarkKeywords];
}

//de-duplicates array of strings
var arrayUnique = function (arr) {
	return arr.filter(function(item, index){
		return arr.indexOf(item) >= index;
	});
};

function getColumnTwoVal(sheetValues) {return sheetValues.map(function(v){ return v[1] });}
function getColumnThreeVal(sheetValues) {return sheetValues.map(function(v){ return v[2] });}
function getColumnFourVal(sheetValues) {return sheetValues.map(function(v){ return v[3] });}

/*
@param {[][]} propertySheet:2D Array of entire propertyInfo Sheet
@param {[]} array of front end table array including address and property info shown to user
@return {[][]} 1st array is all apartment amenities, 2nd array is all community amenities
*/
function getAmenitiesArray(propertySheet,locationTable) {
  var addresses = getFullRowValByTag(propertySheet,"street_address_1");
  var addressIndex = addresses.indexOf(locationTable[0]);
  var apartmentAmenitiesArry = getAmentiesData(propertySheet,"apartment_amenity",addressIndex);
  var communityAmenitiesArry = getAmentiesData(propertySheet,"community_amenity",addressIndex);
  var primaryApartAmenTags = ["apartment_amenity_1","apartment_amenity_2","apartment_amenity_3","other_apartment_amenities"];
  var primaryCommAmenTags = ["community_amenity_1","community_amenity_2","community_amenity_3","other_community_amenities"];
  var pushTagsValues = function(tagArry,propSheet,locColIndex,amenityArry) {
    for(var i = 0; i < tagArry.length; i++) {
      var amenity = getFullRowValByTag(propSheet,tagArry[i]);
      if(amenity[locColIndex].indexOf(',') != -1) {
        var amenities = amenity[locColIndex].split(',').map(Function.prototype.call, String.prototype.trim); //splits on comma,trims whitespace;
        amenities.forEach(function(e) {
          amenityArry.push(e);
        });        
      } else if(amenity[locColIndex]) {
        amenityArry.push(amenity[locColIndex]);
      }  
    }
  }
  pushTagsValues(primaryApartAmenTags,propertySheet,addressIndex,apartmentAmenitiesArry);
  pushTagsValues(primaryCommAmenTags,propertySheet,addressIndex,communityAmenitiesArry);
  apartmentAmenitiesArry = arrayUnique(apartmentAmenitiesArry); // removes duplicate amenities
  communityAmenitiesArry = arrayUnique(communityAmenitiesArry); // removes duplicate amenities
  return [apartmentAmenitiesArry,communityAmenitiesArry];
}

/*
Fills array full of amenities labeled "Yes" for a location in the property workbook
@param {[][]} propertySheet:2D Array of entire propertyInfo Sheet
@param {Integer} Index of location column in property info sheet
@return {[]} array of amenities from location labeled Yes
*/
function getAmentiesData(propertySheet,tag,locationColIndex) {
  var firstColumn = getColumnOneVal(propertySheet);
  var firstAmenityIndex = firstColumn.indexOf(tag);
  var lastAmenityIndex = firstColumn.lastIndexOf(tag);
  var amenityNameIndex = 1;
  var yesorno = propertySheet[firstAmenityIndex][locationColIndex];
  var amenityname = propertySheet[firstAmenityIndex][amenityNameIndex];
  var amenities = [];
  for(var i = firstAmenityIndex; i <= lastAmenityIndex; i++) {
    var test = propertySheet[i][locationColIndex];
    if(propertySheet[i][locationColIndex] === 'Yes') {
      amenities.push(propertySheet[i][amenityNameIndex]);
    }
  }
  return amenities;
}
/*
@param {[][]} propertySheet:2D Array of entire propertyInfo Sheet
@param {String} tag to search for row
@return {[]} array of row values from propertyInfo Sheet matching tag
*/
function getFullRowValByTag(propertySheetValues,tag) {
    var firstColumn = getColumnOneVal(propertySheetValues);
    var rowIndex = getARowIndex(firstColumn,tag);
    if(rowIndex > 0) {
      var rowValue = function(propertySheetValues,rowIndex) {
        var result = [];
        for(var i = 0; i < propertySheetValues[0].length; i++){
          result.push(propertySheetValues[rowIndex][i]);
        }
        return result
      }
      return rowValue(propertySheetValues,rowIndex);
    } else {
      return null;
    }  
}
/*
Method to replace all liquid variables in a phrase with passed in parameters
Replaces {{city}} with first param, Replaces {{state}} with second param
Replaces {{neighborhood}} or {{landmark}} or {{amenity}} with third param
@param {String} city
@param {String} state
@param {String} keyword
@return {String} manipulated phrase
*/
String.prototype.buildPhrase = function(city, state, keyword) {
   var strText = this; //the original string
   strText = strText.replace(/{{city}}/g,city).replace(/{{state}}/g,state).replace(/({{neighborhood}})|({{landmark}})|({{amenity}})/g,keyword);
   return (strText);
};



function testBuildString() {
  var string =  "storage near {{landmark}} in {{city}} ";
  var neighborhood = "west";
  var landmark = "Walmart";
  var amenity = "Air Conditioning";
  var city = "bend";
  var state = "oregon";
  string = string.buildPhrase(city,state,landmark);
  Logger.log(string);
  Logger.log(phraseTemplates.ssLandmarkPhraseTemplates);
  
}
var phraseTemplates = {
  "mfNeighborhoodPhraseTemplates": 
  [
    "{{neighborhood}} apartments", "{{neighborhood}} {{city}} apartments", "{{neighborhood}} {{city}} {{state}} apartments", 
    "{{neighborhood}} apartments in {{city}}", "{{neighborhood}} apartments in {{city}} {{state}}", "apartments in {{neighborhood}}", 
    "apartments in {{neighborhood}} {{city}}", "apartments in {{neighborhood}} {{city}} {{state}}", "apartments {{neighborhood}}", 
    "apartments {{neighborhood}} {{city}}", "apartments {{neighborhood}} {{city}} {{state}}", "apartments {{city}} in {{neighborhood}}", 
    "apartments {{city}} {{state}} in {{neighborhood}}", "{{city}} apartments in {{neighborhood}}", "{{city}} apartments near {{neighborhood}}", 
    "{{city}} {{state}} apartments in {{neighborhood}}", "{{city}} {{state}} apartments near {{neighborhood}}", "apartments near {{neighborhood}}", 
    "apartments near {{neighborhood}} {{city}}", "apartments near {{neighborhood}} {{city}} {{state}}", "{{neighborhood}} apartments near me", 
    "{{neighborhood}} {{city}} apartments near me", "{{neighborhood}} {{city}} {{state}} apartments near me", "{{neighborhood}} apartments for rent near me", 
    "{{neighborhood}} apartments for rent", "{{neighborhood}} {{city}} apartments for rent", "{{neighborhood}} {{city}} {{state}} apartments for rent", 
    "{{neighborhood}} apartments for rent in {{city}}", "{{neighborhood}} apartments for rent in {{city}} {{state}}", "apartments for rent in {{neighborhood}}", 
    "apartments for rent in {{neighborhood}} {{city}}", "apartments for rent in {{neighborhood}} {{city}} {{state}}", "apartments for rent {{neighborhood}}", 
    "apartments for rent {{neighborhood}} {{city}}", "apartments for rent {{neighborhood}} {{city}} {{state}}", "apartments for rent {{city}} in {{neighborhood}}", 
    "{{city}} apartments for rent in {{neighborhood}}", "{{city}} apartments for rent near {{neighborhood}}", "apartments for rent near {{neighborhood}}", 
    "apartments for rent near {{neighborhood}} {{city}}", "{{neighborhood}} apartment building", "{{neighborhood}} {{city}} apartment building", 
    "{{neighborhood}} {{city}} {{state}} apartment building", "{{neighborhood}} apartment building in {{city}}", "{{neighborhood}} apartment building in {{city}} {{state}}", 
    "apartment building in {{neighborhood}}", "apartment building in {{neighborhood}} {{city}}", "apartment building in {{neighborhood}} {{city}} {{state}}", 
    "apartment building {{neighborhood}}", "apartment building {{neighborhood}} {{city}}", "apartment building {{neighborhood}} {{city}} {{state}}", 
    "apartment building {{city}} in {{neighborhood}}", "apartment building {{city}} {{state}} in {{neighborhood}}", "{{city}} apartment building in {{neighborhood}}", 
    "{{city}} apartment building near {{neighborhood}}", "{{city}} {{state}} apartment building in {{neighborhood}}", "{{city}} {{state}} apartment building near {{neighborhood}}", 
    "apartment building near {{neighborhood}}", "apartment building near {{neighborhood}} {{city}}", "apartment building near {{neighborhood}} {{city}} {{state}}", 
    "{{neighborhood}} apartment building near me", "{{neighborhood}} {{city}} apartment building near me", "{{neighborhood}} apartment building for rent", 
    "{{neighborhood}} {{city}} apartment building for rent", "apartment building for rent in {{neighborhood}}", "apartment building for rent {{neighborhood}}", 
    "apartment building for rent {{neighborhood}} {{city}}", "apartment building for rent near {{neighborhood}}", "{{neighborhood}} apartment complexes", 
    "{{neighborhood}} {{city}} apartment complexes", "{{neighborhood}} {{city}} {{state}} apartment complexes", "{{neighborhood}} apartment complexes in {{city}}", 
    "{{neighborhood}} apartment complexes in {{city}} {{state}}", "apartment complexes in {{neighborhood}}", "apartment complexes in {{neighborhood}} {{city}}", 
    "apartment complexes in {{neighborhood}} {{city}} {{state}}", "apartment complexes {{neighborhood}}", "apartment complexes {{neighborhood}} {{city}}", 
    "apartment complexes {{neighborhood}} {{city}} {{state}}", "apartment complexes {{city}} in {{neighborhood}}", "apartment complexes {{city}} {{state}} in {{neighborhood}}", 
    "{{city}} apartment complexes in {{neighborhood}}", "{{city}} apartment complexes near {{neighborhood}}", "{{city}} {{state}} apartment complexes in {{neighborhood}}", 
    "{{city}} {{state}} apartment complexes near {{neighborhood}}", "apartment complexes near {{neighborhood}}", "apartment complexes near {{neighborhood}} {{city}}", 
    "apartment complexes near {{neighborhood}} {{city}} {{state}}", "{{neighborhood}} apartment complexes near me", "{{neighborhood}} {{city}} apartment complexes near me", 
    "{{neighborhood}} apartment complexes for rent", "{{neighborhood}} {{city}} apartment complexes for rent", "apartment complexes for rent in {{neighborhood}}", 
    "apartment complexes for rent {{neighborhood}}", "apartment complexes for rent {{neighborhood}} {{city}}", "apartment complexes for rent near {{neighborhood}}", 
    "{{neighborhood}} apartment homes", "{{neighborhood}} {{city}} apartment homes", "{{neighborhood}} {{city}} {{state}} apartment homes", "{{neighborhood}} apartment homes in {{city}}", 
    "{{neighborhood}} apartment homes in {{city}} {{state}}", "apartment homes in {{neighborhood}}", "apartment homes in {{neighborhood}} {{city}}", 
    "apartment homes in {{neighborhood}} {{city}} {{state}}", "apartment homes {{neighborhood}}", "apartment homes {{neighborhood}} {{city}}", "apartment homes {{neighborhood}} {{city}} {{state}}", 
    "apartment homes {{city}} in {{neighborhood}}", "apartment homes {{city}} {{state}} in {{neighborhood}}", "{{city}} apartment homes in {{neighborhood}}", 
    "{{city}} apartment homes near {{neighborhood}}", "{{city}} {{state}} apartment homes in {{neighborhood}}", "{{city}} {{state}} apartment homes near {{neighborhood}}", 
    "apartment homes near {{neighborhood}}", "apartment homes near {{neighborhood}} {{city}}", "apartment homes near {{neighborhood}} {{city}} {{state}}", 
    "{{neighborhood}} apartment homes near me", "{{neighborhood}} {{city}} apartment homes near me", "{{neighborhood}} apartment homes for rent", "{{neighborhood}} {{city}} apartment homes for rent", 
    "apartment homes for rent in {{neighborhood}}", "apartment homes for rent {{neighborhood}}", "apartment homes for rent {{neighborhood}} {{city}}", "apartment homes for rent near {{neighborhood}}"
  ],
  
  "mfLandmarkPhraseTemplates":     
  [
    "apartments near {{landmark}}", "apartments near {{landmark}}", "{{city}} apartments near {{landmark}}", "apartments in {{city}} near {{landmark}}", 
    "{{city}} {{state}} apartments near {{landmark}}", "apartments in {{city}} {{state}} near {{landmark}}", "apartments near {{landmark}} in {{city}}", 
    "apartments near {{landmark}} in {{city}} {{state}}", "apartments for rent near {{landmark}}"
  ],
    
  "mfAmenityPhraseTemplates":      
  [
    "apartments with {{amenity}}", "{{city}} apartments with {{amenity}}", "{{city}} {{state}} apartments with {{amenity}}", "apartments in {{city}} with {{amenity}}", 
    "apartments in {{city}} {{state}} with {{amenity}}", "apartments with {{amenity}} in {{city}}", "apartments with {{amenity}} in {{city}} {{state}}", 
    "apartments for rent with {{amenity}}", "{{city}} apartments for rent with {{amenity}}"
  ],
  
  "ssNeighborhoodPhraseTemplates": 
  [
    "Nearest storage facility in {{neighborhood}} {{city}}", "Nearest storage facility in {{neighborhood}}", "Self storage facilities near {{neighborhood}} {{city}}", 
    "Self storage facilities near {{neighborhood}}", "{{city}} self storage facilities near {{neighborhood}}", "Storage facilities near {{neighborhood}} {{city}} {{state}}", 
    "Storage facilities near {{neighborhood}} {{city}}", "Storage facilities near {{neighborhood}}", "{{city}} {{state}} storage facilities near {{neighborhood}}", 
    "{{city}} storage facilities near {{neighborhood}}", "Storage facility rental in {{neighborhood}} {{city}}", "Storage facility rental in {{neighborhood}}", 
    "{{city}} storage facility rental in {{neighborhood}}", "{{neighborhood}} storage facility rental in {{city}}", "{{neighborhood}} storage facility rental", 
    "{{neighborhood}} {{city}} {{state}} storage facility rental", "{{neighborhood}} {{city}} storage facility rental", "{{neighborhood}} storage facility rental", 
    "Self storage for rent near {{neighborhood}}", "Self storage near {{neighborhood}} {{city}} {{state}}", "Self storage near {{neighborhood}} {{city}}", 
    "Self storage near {{neighborhood}}", "{{city}} self storage near {{neighborhood}}", "{{city}} {{state}} self storage near {{neighborhood}}", 
    "Self storage nearby {{neighborhood}} {{city}} {{state}}", "Self storage nearby {{neighborhood}} {{city}}", "Self storage nearby {{neighborhood}}", 
    "{{city}} self storage nearby {{neighborhood}}", "{{city}} {{state}} self storage nearby {{neighborhood}}", "Self storage in {{neighborhood}} {{city}} {{state}}", 
    "Self storage in {{neighborhood}} {{city}}", "Self storage in {{neighborhood}}", "{{neighborhood}} {{city}} {{state}} self storage", "{{neighborhood}} {{city}} self storage", 
    "{{neighborhood}} self storage", "{{neighborhood}} self storage in {{city}} {{state}}", "{{neighborhood}} self storage in {{city}}", "{{city}} {{state}} self storage in {{neighborhood}}", 
    "{{city}} self storage in {{neighborhood}}", "Storage for rent nearby {{neighborhood}} {{city}}", "Storage for rent nearby {{neighborhood}}", "{{city}} storage for rent nearby {{neighborhood}}", 
    "Storage near {{neighborhood}} {{city}} {{state}}", "Storage near {{neighborhood}} {{city}}", "Storage near {{neighborhood}}", "{{city}} storage near {{neighborhood}}", 
    "{{city}} {{state}} storage near {{neighborhood}}", "Storage nearby {{neighborhood}} {{city}} {{state}}", "Storage nearby {{neighborhood}} {{city}}", "Storage nearby {{neighborhood}}", 
    "{{city}} storage nearby {{neighborhood}}", "{{city}} {{state}} storage nearby {{neighborhood}}", "Storage in {{neighborhood}} {{city}} {{state}}", "Storage in {{neighborhood}} {{city}}", 
    "Storage in {{neighborhood}}", "{{neighborhood}} {{city}} {{state}} storage", "{{neighborhood}} {{city}} storage", "{{neighborhood}} storage", "{{neighborhood}} storage in {{city}} {{state}}", 
    "{{neighborhood}} storage in {{city}}", "{{city}} {{state}} storage in {{neighborhood}}", "{{city}} storage in {{neighborhood}}", "{{neighborhood}} self storage units for rent", 
    "Self storage units near {{neighborhood}} {{city}}", "Self storage units near {{neighborhood}}", "{{city}} self storage units near {{neighborhood}}", "Self storage units nearby {{neighborhood}} {{city}}", 
    "Self storage units nearby {{neighborhood}}", "{{city}} self storage units nearby {{neighborhood}}", "Storage units near {{neighborhood}} {{city}} {{state}}", "Storage units near {{neighborhood}} {{city}}", 
    "Storage units near {{neighborhood}}", "{{city}} {{state}} storage units near {{neighborhood}}", "{{city}} storage units near {{neighborhood}}", "Storage units nearby {{neighborhood}} {{city}} {{state}}", 
    "Storage units nearby {{neighborhood}} {{city}}", "Storage units nearby {{neighborhood}}", "{{city}} {{state}} storage units nearby {{neighborhood}}", "{{city}} storage units nearby {{neighborhood}}", 
    "Storage units for rent near {{neighborhood}}", "Storage units for rent nearby {{neighborhood}}", "Storage units for rent in {{neighborhood}}", "{{neighborhood}} storage units for rent", 
    "{{neighborhood}} {{city}} storage units for rent", "Self storage places near {{neighborhood}} {{city}}", "Self storage places near {{neighborhood}}", "{{city}} self storage places near {{neighborhood}}", 
    "Storage places near {{neighborhood}} {{city}} {{state}}", "Storage places near {{neighborhood}} {{city}}", "Storage places near {{neighborhood}}", "{{city}} {{state}} storage places near {{neighborhood}}", 
    "{{city}} storage places near {{neighborhood}}", "Storage places nearby {{neighborhood}} {{city}} {{state}}", "Storage places nearby {{neighborhood}} {{city}}", 
    "Storage places nearby {{neighborhood}}", "{{city}} {{state}} storage places nearby {{neighborhood}}", "{{city}} storage places nearby {{neighborhood}}", "Storage rental places in {{neighborhood}} {{city}}", 
    "Storage rental places in {{neighborhood}}", "{{city}} storage rental places in {{neighborhood}}", "{{neighborhood}} {{city}} {{state}} storage rental places", 
    "{{neighborhood}} {{city}} storage rental places", "{{neighborhood}} storage rental places", "{{neighborhood}} storage rental places in {{city}}"
  ],
  
  "ssLandmarkPhraseTemplates":     
  [
    "Self storage facilities near {{landmark}}", "{{city}} self storage facilities near {{landmark}}", "Storage facilities near {{landmark}} in {{city}}", 
    "Storage facilities near {{landmark}}", "{{city}} storage facilities near {{landmark}}", "Self storage facilities nearby {{landmark}}", "{{city}} self storage facilities nearby {{landmark}}", 
    "Storage facilities nearby {{landmark}} in {{city}}", "Storage facilities nearby {{landmark}}", "{{city}} storage facilities nearby {{landmark}}", 
    "Storage facilities nearby {{landmark}} in {{city}}", "Storage facilities nearby {{landmark}}", "{{city}} storage facilities nearby {{landmark}}", 
    "Storage facilities nearby {{landmark}} in {{city}}", "Storage facilities nearby {{landmark}}", "{{city}} storage facilities nearby {{landmark}}", 
    "Storage facility rental nearby {{landmark}}", "{{city}} storage facility rental nearby {{landmark}}", "Self storage for rent near {{landmark}}", 
    "Self storage near {{landmark}} in {{city}}", "Self storage near {{landmark}}", "{{city}} self storage near {{landmark}}", "Self storage by {{landmark}} in {{city}}", 
    "Self storage by {{landmark}}", "{{city}} self storage by {{landmark}}", "Storage near {{landmark}} in {{city}} {{state}}", "Storage near {{landmark}} in {{city}}", 
    "Storage near {{landmark}}", "{{city}} storage near {{landmark}}", "Storage by {{landmark}} in {{city}} {{state}}", "Storage by {{landmark}} in {{city}}", "Storage by {{landmark}}", 
    "{{city}} storage by {{landmark}}", "Self storage units near {{landmark}} in {{city}}", "Self storage units near {{landmark}}", "{{city}} self storage units near {{landmark}}", 
    "Storage units near {{landmark}} in {{city}}", "Storage units near {{landmark}}", "{{city}} storage units near {{landmark}}", "Storage units for rent near {{landmark}}", 
    "Storage units for rent by {{landmark}}"
  ],
  
  "slNeighborhoodPhraseTemplates": 
  [
    "Active senior living in {{neighborhood}}", "Active senior living in {{neighborhood}} {{city}}", "Senior living in {{neighborhood}}", 
    "Senior living in {{neighborhood}} {{city}}", "Senior living near {{neighborhood}}", "Senior living near {{neighborhood}} {{city}}", 
    "Senior living communities near {{neighborhood}}", "Senior living communities near {{neighborhood}} {{city}}", "Senior living communities in {{neighborhood}}", 
    "Senior living communities in {{neighborhood}} {{city}}", "Senior living facilities near {{neighborhood}}", "Senior living facilities near {{neighborhood}} {{city}}", 
    "Senior living facilities in {{neighborhood}}", "Senior living facilities in {{neighborhood}} {{city}}", "Senior living residences in {{neighborhood}}", 
    "Senior living residences in {{neighborhood}} {{city}}", "Aged care in {{neighborhood}}", "Aged care in {{neighborhood}} {{city}}", "Aged care homes in {{neighborhood}}", 
    "Aged care homes in {{neighborhood}} {{city}}", "Aged care services in {{neighborhood}}", "Aged care services in {{neighborhood}} {{city}}", "Assisted living in {{neighborhood}}", 
    "Assisted living in {{neighborhood}} {{city}}", "Assisted living near {{neighborhood}}", "Assisted living near {{neighborhood}} {{city}}", "Assisted living communities in {{neighborhood}}", 
    "Assisted living communities in {{neighborhood}} {{city}}", "Assisted living communities near {{neighborhood}}", "Assisted living communities near {{neighborhood}} {{city}}", 
    "Assisted living facilities in {{neighborhood}}", "Assisted living facilities in {{neighborhood}} {{city}}", "Assisted living facilities near {{neighborhood}}", 
    "Assisted living facilities near {{neighborhood}} {{city}}", "Assisted living homes in {{neighborhood}}", "Assisted living homes in {{neighborhood}} {{city}}", 
    "Assisted living homes near {{neighborhood}}", "Assisted living homes near {{neighborhood}} {{city}}", "Assisted living memory care near {{neighborhood}}", 
    "Assisted living residence in {{neighborhood}}", "Assisted living residence in {{neighborhood}} {{city}}", "Assisted living services in {{neighborhood}}", 
    "Assisted living services in {{neighborhood}} {{city}}", "Senior assisted living in {{neighborhood}}", "Senior assisted living in {{neighborhood}} {{city}}", 
    "Senior assisted living near {{neighborhood}}", "Senior assisted living near {{neighborhood}} {{city}}", "Senior assisted living facilities in {{neighborhood}}", 
    "Hospice services in {{neighborhood}}", "Hospice services in {{neighborhood}} {{city}}", "Hospice care in {{neighborhood}}", "Hospice care in {{neighborhood}} {{city}}", 
    "Hospice care near {{neighborhood}}", "Hospice care near {{neighborhood}} {{city}}", "Hospice near {{neighborhood}}", "Hospice near {{neighborhood}} {{city}}", 
    "Elderly care in {{neighborhood}}", "Elderly care in {{neighborhood}} {{city}}", "Elderly care near {{neighborhood}}", "Elderly care near {{neighborhood}} {{city}}", 
    "Elderly home care in {{neighborhood}}", "Elderly home care in {{neighborhood}} {{city}}", "Independent living communities in {{neighborhood}}", 
    "Independent living communities in {{neighborhood}} {{city}}", "Independent living in {{neighborhood}}", "Independent living in {{neighborhood}} {{city}}", 
    "Independent living near {{neighborhood}}", "Independent living near {{neighborhood}} {{city}}", "Independent living facilities in {{neighborhood}}", 
    "Independent living facilities in {{neighborhood}} {{city}}", "Independent living facilities near {{neighborhood}}", "Independent living facilities near {{neighborhood}} {{city}}", 
    "Independent senior living in {{neighborhood}}", "Independent senior living in {{neighborhood}} {{city}}", "Independent senior living near {{neighborhood}}", 
    "Independent senior living near {{neighborhood}} {{city}}", "Senior apartments independent living in {{neighborhood}}", "Senior independent living communities in {{neighborhood}}", 
    "Senior independent living in {{neighborhood}}", "Senior independent living in {{neighborhood}} {{city}}", "Senior independent living near {{neighborhood}}", 
    "Senior independent living near {{neighborhood}} {{city}}", "Memory care in {{neighborhood}}", "Memory care in {{neighborhood}} {{city}}", "Memory care near {{neighborhood}}", 
    "Memory care near {{neighborhood}} {{city}}", "Memory care assisted living in {{neighborhood}}", "Skilled nursing facility in {{neighborhood}}", 
    "Skilled nursing facility in {{neighborhood}} {{city}}", "Skilled nursing facility near {{neighborhood}}", "Skilled nursing facility near {{neighborhood}} {{city}}", 
    "Skilled nursing home in {{neighborhood}}", "Skilled nursing home in {{neighborhood}} {{city}}", "Skilled nursing near {{neighborhood}}", "Skilled nursing near {{neighborhood}} {{city}}", 
    "Respite care in {{neighborhood}}", "Respite care in {{neighborhood}} {{city}}", "Respite care near {{neighborhood}}", "Respite care near {{neighborhood}} {{city}}", 
    "Respite home in {{neighborhood}}", "Respite home in {{neighborhood}} {{city}}", "Respite services in {{neighborhood}}", "Respite services in {{neighborhood}} {{city}}", 
    "Senior apartments in {{neighborhood}}", "Senior apartments in {{neighborhood}} {{city}}", "Senior apartments near {{neighborhood}}", "Senior apartments near {{neighborhood}} {{city}}", 
    "Senior care facilities in {{neighborhood}}", "Senior care facilities in {{neighborhood}} {{city}}", "Senior care facilities near {{neighborhood}}", 
    "Senior care facilities near {{neighborhood}} {{city}}", "Senior care near {{neighborhood}}", "Senior care near {{neighborhood}} {{city}}", "Senior citizen housing near {{neighborhood}}", 
    "Senior citizen housing near {{neighborhood}} {{city}}", "Senior citizen living in {{neighborhood}}", "Senior citizen living in {{neighborhood}} {{city}}", "Senior communities in {{neighborhood}}", 
    "Senior communities in {{neighborhood}} {{city}}", "Senior communities near {{neighborhood}}", "Senior communities near {{neighborhood}} {{city}}", "Senior housing in {{neighborhood}}", 
    "Senior housing in {{neighborhood}} {{city}}", "Senior housing near {{neighborhood}}", "Senior housing near {{neighborhood}} {{city}}", "Senior home care in {{neighborhood}}", 
    "Senior home care in {{neighborhood}} {{city}}", "Senior home in {{neighborhood}}", "Senior home in {{neighborhood}} {{city}}"
  ],
  
  "slLandmarkPhraseTemplates":     
  [
    "independent living near {{landmark}}", "independent living near {{landmark}} {{city}}", "independent living by {{landmark}}", "independent living by {{landmark}} {{city}}", 
    "assisted living near {{landmark}}", "assisted living near {{landmark}} {{city}}", "assisted living by {{landmark}}", "assisted living by {{landmark}} {{city}}", 
    "senior living near {{landmark}}", "senior living near {{landmark}} {{city}}", "senior living by {{landmark}}", "senior living by {{landmark}} {{city}}", "memory care near {{landmark}}", 
    "memory care near {{landmark}} {{city}}", "memory care by {{landmark}}", "memory care by {{landmark}} {{city}}", "hospice care near {{landmark}}", "hospice care near {{landmark}} {{city}}", 
    "hospice care by {{landmark}}", "hospice care by {{landmark}} {{city}}", "respite care near {{landmark}}", "respite care near {{landmark}} {{city}}", "respite care by {{landmark}}", 
    "respite care by {{landmark}} {{city}}"
  ]
}