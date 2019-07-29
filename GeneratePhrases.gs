function testGetVal() {
  var dashboard = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Keyword Research Accelerator');
  var dashboardData = dashboard.getRange(3, 1, 10,1).getValues();
  Logger.log(dashboardData);
}

function testGeneratePhrases() {
  generatePhrases("mf",["10691 Cadence Point","Bend","Oregon","97702"]);
}
/*
@param {String} vertical selected in UI
@param {[]} array of front end table array including address and property info shown to user
*/
function generatePhrases(vertical,locationTable) {
  if(hasAddressVal(locationTable)) {
    var propSheet = propertySheet.getRange(2, 1, propertySheet.getLastRow(),propertySheet.getLastColumn()).getValues();
    //var dashboard = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Keyword Research Accelerator');
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
        keywordPhrases.push(phrases[j].buildPhrase(locationInfo.city,locationInfo.state,keywords.keywordList[i]));        
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
@return {[][]} 2D array. 1st array is all neighborhood keywords, 2nd array is all landmark keywords
*/
function getKeywordsFromDashboard(dashboardData) {
  var allApiTypes = getColumnOneVal(dashboardData);
  var allApiKeywords = getColumnTwoVal(dashboardData); 
  var neighborhoodKeys = Object.keys(neighborhoodMap);
  var lastNeighborhoodIndex = -1;
  var landmarkKeywords = [];
  for(var i = neighborhoodKeys.length - 1; i >= 0; i--) {
    var neighborhoodIndex = allApiTypes.lastIndexOf(neighborhoodKeys[i]); 
    if(neighborhoodIndex != -1) {
      lastNeighborhoodIndex = neighborhoodIndex;   
      break;
    }
  }
  var neighborhoodKeywords = lastNeighborhoodIndex != -1 ? allApiKeywords.splice(0,lastNeighborhoodIndex + 1).filter(Boolean) : [] ;
  neighborhoodKeywords = neighborhoodKeywords.concat(getColumnThreeVal(dashboardData).filter(Boolean));
  neighborhoodKeywords = arrayUnique(neighborhoodKeywords);
  var landmarkKeywords = allApiKeywords.filter(Boolean);
  landmarkKeywords = landmarkKeywords.concat(getColumnFourVal(dashboardData).filter(Boolean));
  landmarkKeywords = arrayUnique(landmarkKeywords);
  return[neighborhoodKeywords,landmarkKeywords];
}

//de-duplicates array of strings
var arrayUnique = function (arr) {
	return arr.filter(function(item, index){
		return arr.indexOf(item) >= index;
	});
};

function getColumnTwoVal(propertySheetValues) {return propertySheetValues.map(function(v){ return v[1] });}
function getColumnThreeVal(propertySheetValues) {return propertySheetValues.map(function(v){ return v[2] });}
function getColumnFourVal(propertySheetValues) {return propertySheetValues.map(function(v){ return v[3] });}

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
      } else {
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
  "mfNeighborhoodPhraseTemplates": [
                                     "{{neighborhood}}", "{{neighborhood}} {{city}}", "{{neighborhood}} apartments", "{{neighborhood}} {{city}} apartments", 
                                     "{{neighborhood}} {{city}} {{state}} apartments", "{{neighborhood}} apartments in {{city}}", "apartments {{city}} in {{neighborhood}}", 
                                     "apartments {{city}} {{state}} in {{neighborhood}}", "apartments {{neighborhood}}", "apartments {{neighborhood}} {{city}}", 
                                     "apartments {{neighborhood}} {{city}} {{state}}", "apartments in {{neighborhood}}", "apartments in {{neighborhood}} {{city}}", 
                                     "apartments in {{neighborhood}} {{city}} {{state}}", "apartments near {{neighborhood}}", "apartments near {{neighborhood}} {{city}}", 
                                     "apartments near {{neighborhood}} {{city}} {{state}}", "{{city}} apartments in {{neighborhood}}", "{{city}} apartments near {{neighborhood}}", 
                                     "{{city}} {{state}} apartments in {{neighborhood}}", "{{city}} {{state}} apartments near {{neighborhood}}"
                                    ],
  
  "mfLandmarkPhraseTemplates":     [
                                     "{{landmark}} {{city}}","apartments near {{landmark}}","{{city}} apartments near {{landmark}}","apartments in {{city}} near {{landmark}}"
                                   ],
    
  "mfAmenityPhraseTemplates":      [
                                    "apartments with a {{amenity}}", "apartments with {{amenity}}", "{{city}} apartments with {{amenity}}", 
                                    "{{city}} {{state}} apartments with {{amenity}}", "apartments in {{city}} with {{amenity}}", 
                                    "apartments in {{city}} {{state}} with {{amenity}}", "{{amenity}} apartments"
                                   ],
  "ssNeighborhoodPhraseTemplates": [
                                     "{{neighborhood}}", "{{neighborhood}} {{city}}", "{{neighborhood}} storage", "{{neighborhood}} {{city}} storage", 
                                     "{{neighborhood}} {{city}} {{state}} storage", "{{neighborhood}} storage in {{city}}", "storage {{city}} in {{neighborhood}}", 
                                     "storage {{city}} {{state}} in {{neighborhood}}", "storage {{neighborhood}}", "storage {{neighborhood}} {{city}}", 
                                     "storage {{neighborhood}} {{city}} {{state}}", "storage in {{neighborhood}}", "storage in {{neighborhood}} {{city}}", 
                                     "storage in {{neighborhood}} {{city}} {{state}}", "storage near {{neighborhood}}", "storage near {{neighborhood}} {{city}}", 
                                     "storage near {{neighborhood}} {{city}} {{state}}", "{{city}} storage in {{neighborhood}}", "{{city}} storage near {{neighborhood}}", 
                                     "{{city}} {{state}} storage in {{neighborhood}}", "{{city}} {{state}} storage near {{neighborhood}}", "{{neighborhood}} storage units", 
                                     "{{neighborhood}} {{city}} storage units", "{{neighborhood}} {{city}} {{state}} storage units", "{{neighborhood}} storage units in {{city}}", 
                                     "storage units {{city}} in {{neighborhood}}", "storage units {{city}} {{state}} in {{neighborhood}}", "storage units {{neighborhood}}", 
                                     "storage units {{neighborhood}} {{city}}", "storage units {{neighborhood}} {{city}} {{state}}", "storage units in {{neighborhood}}", 
                                     "storage units in {{neighborhood}} {{city}}", "storage units in {{neighborhood}} {{city}} {{state}}", "storage units near {{neighborhood}}", 
                                     "storage units near {{neighborhood}} {{city}}", "storage units near {{neighborhood}} {{city}} {{state}}", "{{city}} storage units in {{neighborhood}}", 
                                     "{{city}} storage units near {{neighborhood}}", "{{city}} {{state}} storage units in {{neighborhood}}", "{{city}} {{state}} storage units near {{neighborhood}}", 
                                     "{{neighborhood}} self storage", "{{neighborhood}} {{city}} self storage", "{{neighborhood}} {{city}} {{state}} self storage", "{{neighborhood}} self storage in {{city}}", 
                                     "self storage {{city}} in {{neighborhood}}", "self storage {{city}} {{state}} in {{neighborhood}}", "self storage {{neighborhood}}", "self storage {{neighborhood}} {{city}}", 
                                     "self storage {{neighborhood}} {{city}} {{state}}", "self storage in {{neighborhood}}", "self storage in {{neighborhood}} {{city}}", 
                                     "self storage in {{neighborhood}} {{city}} {{state}}", "self storage near {{neighborhood}}", "self storage near {{neighborhood}} {{city}}", 
                                     "self storage near {{neighborhood}} {{city}} {{state}}", "{{city}} self storage in {{neighborhood}}", "{{city}} self storage near {{neighborhood}}", 
                                     "{{city}} {{state}} self storage in {{neighborhood}}", "{{city}} {{state}} self storage near {{neighborhood}}", "self storage for rent {{neighborhood}}", 
                                     "storage rental {{neighborhood}}", "self storage for rent {{neighborhood}} {{city}}", "storage rental {{neighborhood}} {{city}}"
                                   ],
  "ssLandmarkPhraseTemplates":     [
                                    "{{landmark}}", "{{landmark}} {{city}}", "{{landmark}} in {{city}}", "storage near {{landmark}}", "storage near {{landmark}} {{city}}", 
                                    "storage near {{landmark}} in {{city}}", "storage units near {{landmark}}", "storage units near {{landmark}} {{city}}", "storage units near {{landmark}} in {{city}}", 
                                    "self storage near {{landmark}}", "self storage near {{landmark}} {{city}}", "self storage near {{landmark}} in {{city}}", "storage by {{landmark}}", 
                                    "storage by {{landmark}} {{city}}", "storage by {{landmark}} in {{city}}", "storage units by {{landmark}}", "storage units by {{landmark}} {{city}}", 
                                    "storage units by {{landmark}} in {{city}}", "self storage by {{landmark}}", "self storage by {{landmark}} {{city}}", "self storage by {{landmark}} in {{city}}"
                                   ],
  "slNeighborhoodPhraseTemplates": [
                                    "{{neighborhood}}", "{{neighborhood}} {{city}}", "{{neighborhood}} {{city}} {{state}}", "{{city}} independent living in {{neighborhood}}", 
                                    "independent living in {{neighborhood}}", "independent living in {{neighborhood}} {{city}}", "independent living {{neighborhood}} {{city}}", 
                                    "independent living {{neighborhood}} {{city}} {{state}}", "{{neighborhood}} {{city}} independent living", "{{neighborhood}} independent living", 
                                    "{{neighborhood}} independent living {{city}}", "{{city}} independent living in {{neighborhood}}", "independent living in {{neighborhood}}", 
                                    "independent living in {{neighborhood}} {{city}}", "independent living {{neighborhood}} {{city}}", "independent living {{neighborhood}} {{city}} {{state}}", 
                                    "{{neighborhood}} {{city}} independent living", "{{neighborhood}} independent living", "{{neighborhood}} independent living {{city}}", 
                                    "{{city}} senior living in {{neighborhood}}", "senior living in {{neighborhood}}", "senior living in {{neighborhood}} {{city}}", "senior living {{neighborhood}} {{city}}", 
                                    "senior living {{neighborhood}} {{city}} {{state}}", "{{neighborhood}} {{city}} senior living", "{{neighborhood}} senior living", "{{neighborhood}} senior living {{city}}", 
                                    "{{city}} memory care in {{neighborhood}}", "memory care in {{neighborhood}}", "memory care in {{neighborhood}} {{city}}", "memory care {{neighborhood}} {{city}}", 
                                    "memory care {{neighborhood}} {{city}} {{state}}", "{{neighborhood}} {{city}} memory care", "{{neighborhood}} memory care", "{{neighborhood}} memory care {{city}}", 
                                    "{{city}} hospice care in {{neighborhood}}", "hospice care in {{neighborhood}}", "hospice care in {{neighborhood}} {{city}}", "hospice care {{neighborhood}} {{city}}", 
                                    "hospice care {{neighborhood}} {{city}} {{state}}", "{{neighborhood}} {{city}} hospice care", "{{neighborhood}} hospice care", "{{neighborhood}} hospice care {{city}}", 
                                    "{{city}} respite care in {{neighborhood}}", "respite care in {{neighborhood}}", "respite care in {{neighborhood}} {{city}}", "respite care {{neighborhood}} {{city}}", 
                                    "respite care {{neighborhood}} {{city}} {{state}}", "{{neighborhood}} {{city}} respite care", "{{neighborhood}} respite care", "{{neighborhood}} respite care {{city}}"
                                   ],
  "slLandmarkPhraseTemplates":     [
                                    "{{landmark}} {{city}}", "{{landmark}} {{city}} {{state}}", "{{landmark}} in {{city}}", "{{landmark}} in {{city}} {{state}}", 
                                    "independent living near {{landmark}}", "independent living near {{landmark}} {{city}}", "independent living by {{landmark}}", 
                                    "independent living by {{landmark}} {{city}}", "assisted living near {{landmark}}", "assisted living near {{landmark}} {{city}}", 
                                    "assisted living by {{landmark}}", "assisted living by {{landmark}} {{city}}", "senior living near {{landmark}}", "senior living near {{landmark}} {{city}}", 
                                    "senior living by {{landmark}}", "senior living by {{landmark}} {{city}}", "memory care near {{landmark}}", "memory care near {{landmark}} {{city}}", 
                                    "memory care by {{landmark}}", "memory care by {{landmark}} {{city}}", "hospice care near {{landmark}}", "hospice care near {{landmark}} {{city}}", 
                                    "hospice care by {{landmark}}", "hospice care by {{landmark}} {{city}}", "respite care near {{landmark}}", "respite care near {{landmark}} {{city}}", 
                                    "respite care by {{landmark}}", "respite care by {{landmark}} {{city}}"
                                    ]  
}