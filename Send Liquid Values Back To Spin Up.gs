//Global Variables  
var domainType = seoLvTab.getRange("G2").getValue();
var vertical = seoLvTab.getRange("E2").getValue();

var streetAdressColumn = headerArrayNames.indexOf("street_address_1") + 1;
var cityColumn = headerArrayNames.indexOf("city") + 1;
var stateColumn = headerArrayNames.indexOf("state") + 1;
var neighborhoodColumn = headerArrayNames.indexOf("neighborhood") + 1;
var neighborhood2Column = headerArrayNames.indexOf("neighborhood_2") + 1;
var landmarkColumn = headerArrayNames.indexOf("landmark_1_name") + 1;
var customSlugColumn = headerArrayNames.indexOf("custom_slug") + 1;
var floorPlansColumn = headerArrayNames.indexOf("floor_plans") + 1;
var propertyFeatureColumn = headerArrayNames.indexOf("property_feature_1") + 1;
var primaryApartentAmenityColumn = headerArrayNames.indexOf("apartment_amenity_1") + 1;
var primaryCommunityAmenityColumn = headerArrayNames.indexOf("community_amenity_1") + 1;



//gets values in ranges that need to be copied from seo liquid values tab to spinup file tab
function getLiquidValuesRangeValues() {
  var landmarkValues = "";
  var customSlugValues = "";
  var floorPlansValues = "";
  var propertyFeatureValues = "";
  var primaryApartentAmenityValues = "";
  var primaryCommunityAmenityValues = "";
  if (vertical == "ss" || vertical == "sl") {
    var customSlugValues = seoLvTab.getRange(5,11,seoLvTab.getLastRow() -4,1).getValues();
    var landmarkValues = seoLvTab.getRange(5,10,seoLvTab.getLastRow() -4,1).getValues();    
  }
  else if (vertical == "mf") {
    var landmarkValues = seoLvTab.getRange(5,11,seoLvTab.getLastRow() -4,1).getValues(); 
    var customSlugValues = seoLvTab.getRange(5,15,seoLvTab.getLastRow() -4,1).getValues();
    var floorPlansValues = seoLvTab.getRange(5,10,seoLvTab.getLastRow() -4,1).getValues();      
    var propertyFeatureValues = seoLvTab.getRange(5,12,seoLvTab.getLastRow() -4,1).getValues();
    var primaryApartentAmenityValues = seoLvTab.getRange(5,13,seoLvTab.getLastRow() -4,1).getValues();
    var primaryCommunityAmenityValues = seoLvTab.getRange(5,14,seoLvTab.getLastRow() -4,1).getValues();
  }
  setValuesInSpinUpFile(landmarkValues,customSlugValues,floorPlansValues,propertyFeatureValues,primaryApartentAmenityValues,primaryCommunityAmenityValues);
}

function setValuesInSpinUpFile(landmarkValues,customSlugValues,floorPlansValues,propertyFeatureValues,primaryApartentAmenityValues,primaryCommunityAmenityValues) {
  //gets values in ranges that need to be copied from seo liquid values tab to spinup file tab
  var streetAdressValues = seoLvTab.getRange(5,5,seoLvTab.getLastRow() -4,1).getValues();
  var cityValues = seoLvTab.getRange(5,6,seoLvTab.getLastRow() -4,1).getValues();
  var stateValues = seoLvTab.getRange(5,7,seoLvTab.getLastRow() -4,1).getValues();
  var neighborhoodValues = seoLvTab.getRange(5,8,seoLvTab.getLastRow() -4,1).getValues();
  var neighborhood2Values = seoLvTab.getRange(5,9,seoLvTab.getLastRow() -4,1).getValues();
  
  
  spinUpTab.getRange(2,streetAdressColumn,spinUpTab.getLastRow() - 1,1).setValues(streetAdressValues);  //sets street address values in spinupfile tab
  spinUpTab.getRange(2,cityColumn,spinUpTab.getLastRow() - 1,1).setValues(cityValues);  //sets city values in spinupfile tab
  spinUpTab.getRange(2,stateColumn,spinUpTab.getLastRow() - 1,1).setValues(stateValues);  //sets state values in spinupfile tab
  spinUpTab.getRange(2,neighborhoodColumn,spinUpTab.getLastRow() - 1,1).setValues(neighborhoodValues);  //sets neighborhood values in spinupfile tab
  spinUpTab.getRange(2,neighborhood2Column,spinUpTab.getLastRow() - 1,1).setValues(neighborhood2Values);  //sets neighborhood2 values in spinupfile tab
  spinUpTab.getRange(2,landmarkColumn,spinUpTab.getLastRow() - 1,1).setValues(landmarkValues);  //sets landmark 1 values in spinupfile tab
  if (vertical == "mf") {
    spinUpTab.getRange(2,floorPlansColumn,spinUpTab.getLastRow() - 1,1).setValues(floorPlansValues);  //sets floor plans values in spinupfile tab if MF
    spinUpTab.getRange(2,propertyFeatureColumn,spinUpTab.getLastRow() - 1,1).setValues(propertyFeatureValues);  //sets property feature values in spinupfile tab if MF
    spinUpTab.getRange(2,primaryApartentAmenityColumn,spinUpTab.getLastRow() - 1,1).setValues(primaryApartentAmenityValues);  //sets primary apartment amenity values in spinupfile tab if MF
    spinUpTab.getRange(2,primaryCommunityAmenityColumn,spinUpTab.getLastRow() - 1,1).setValues(primaryCommunityAmenityValues);  //sets primary community amenity values in spinupfile tab if MF
  }
  if (domainType == "single") {
    spinUpTab.getRange(2,customSlugColumn,spinUpTab.getLastRow() - 1,1).setValues(customSlugValues);  //sets custom values in spinupfile tab
  }
} 

//main function that sends liquid values from lv tab back to spin up tab
function liquidToSpinUp() {
  if(seoLvTab.getLastRow() > 4) {
    getLiquidValuesRangeValues();
  } else {
    ui.alert("There are no liquid values to copy over.");
  }
}