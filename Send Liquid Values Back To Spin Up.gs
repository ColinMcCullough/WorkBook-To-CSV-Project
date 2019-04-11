//Global Variables  
var domainType = seoLvTab.getRange("G2").getValue();
var vertical = seoLvTab.getRange("E2").getValue();

var streetAdressColumn = headerArrayNames.indexOf("street_address_1") + 1;
var cityColumn = headerArrayNames.indexOf("city") + 1;
var stateColumn = headerArrayNames.indexOf("state") + 1;
var postalColumn = headerArrayNames.indexOf("postal_code") + 1;
var neighborhoodColumn = headerArrayNames.indexOf("neighborhood") + 1;
var neighborhood2Column = headerArrayNames.indexOf("neighborhood_2") + 1;
var landmarkColumn = headerArrayNames.indexOf("landmark_1_name") + 1;
var customSlugColumn = headerArrayNames.indexOf("custom_slug") + 1;
var floorPlansColumn = headerArrayNames.indexOf("floor_plans") + 1;
var propertyFeatureColumn = headerArrayNames.indexOf("property_feature_1") + 1;
var primaryApartentAmenityColumn = headerArrayNames.indexOf("apartment_amenity_1") + 1;
var primaryCommunityAmenityColumn = headerArrayNames.indexOf("community_amenity_1") + 1;



//gets values in ranges that need to be copied from seo liquid values tab to spinup file tab
function getLiquidValuesRangeValues(headerRange) {
  var landmarkValues = "";
  var customSlugValues = "";
  var floorPlansValues = "";
  var propertyFeatureValues = "";
  var primaryApartentAmenityValues = "";
  var primaryCommunityAmenityValues = "";
  var customSlugValues = seoLvTab.getRange(5,headerRange[0].indexOf("custom_slug") + 1,seoLvTab.getLastRow() -4,1).getValues();
  var landmarkValues = seoLvTab.getRange(5,headerRange[0].indexOf("landmark") + 1,seoLvTab.getLastRow() -4,1).getValues();  
  //if (vertical == "ss" || vertical == "sl") {
    //var customSlugValues = seoLvTab.getRange(5,12,seoLvTab.getLastRow() -4,1).getValues();
    //var landmarkValues = seoLvTab.getRange(5,11,seoLvTab.getLastRow() -4,1).getValues();    
  //}
  if (vertical == "mf") {
    //var landmarkValues = seoLvTab.getRange(5,12,seoLvTab.getLastRow() -4,1).getValues(); 
    //var customSlugValues = seoLvTab.getRange(5,16,seoLvTab.getLastRow() -4,1).getValues();
    floorPlansValues = seoLvTab.getRange(5,headerRange[0].indexOf("floor_plans") + 1,seoLvTab.getLastRow() -4,1).getValues();      
    propertyFeatureValues = seoLvTab.getRange(5,headerRange[0].indexOf("property_feature_1") + 1,seoLvTab.getLastRow() -4,1).getValues();
    primaryApartentAmenityValues = seoLvTab.getRange(5,headerRange[0].indexOf("apart_amen") + 1,seoLvTab.getLastRow() -4,1).getValues();
    primaryCommunityAmenityValues = seoLvTab.getRange(5,headerRange[0].indexOf("comm_amen") + 1,seoLvTab.getLastRow() -4,1).getValues();
  }
  setValuesInSpinUpFile(landmarkValues,customSlugValues,floorPlansValues,propertyFeatureValues,primaryApartentAmenityValues,primaryCommunityAmenityValues,headerRange);
}

function setValuesInSpinUpFile(landmarkValues,customSlugValues,floorPlansValues,propertyFeatureValues,primaryApartentAmenityValues,primaryCommunityAmenityValues,headerRange) {
  //gets values in ranges that need to be copied from seo liquid values tab to spinup file tab
  var streetAdressValues = seoLvTab.getRange(5,headerRange[0].indexOf("street_address_1") + 1,seoLvTab.getLastRow() -4,1).getValues();
  var cityValues = seoLvTab.getRange(5,headerRange[0].indexOf("city") + 1,seoLvTab.getLastRow() -4,1).getValues();
  var stateValues = seoLvTab.getRange(5,headerRange[0].indexOf("state") + 1,seoLvTab.getLastRow() -4,1).getValues();
  var zipValues = seoLvTab.getRange(5,headerRange[0].indexOf("postal_code") + 1,seoLvTab.getLastRow() -4,1).getValues();
  var neighborhoodValues = seoLvTab.getRange(5,headerRange[0].indexOf("neighborhood") + 1,seoLvTab.getLastRow() -4,1).getValues();
  var neighborhood2Values = seoLvTab.getRange(5,headerRange[0].indexOf("neighborhood_2") + 1,seoLvTab.getLastRow() -4,1).getValues();
  
  try {
    spinUpTab.getRange(2,streetAdressColumn,spinUpTab.getLastRow() - 1,1).setValues(streetAdressValues);  //sets street address values in spinupfile tab
    spinUpTab.getRange(2,cityColumn,spinUpTab.getLastRow() - 1,1).setValues(cityValues);  //sets city values in spinupfile tab
    spinUpTab.getRange(2,stateColumn,spinUpTab.getLastRow() - 1,1).setValues(stateValues);  //sets state values in spinupfile tab
    spinUpTab.getRange(2,postalColumn,spinUpTab.getLastRow() - 1,1).setValues(zipValues);  //sets state values in spinupfile tab
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
  catch (e) {
    ui.alert("The number of locations in the SEO Liquid Values Tab dont match the number in the spin up file.");
  }
} 

//main function that sends liquid values from lv tab back to spin up tab
function liquidToSpinUp() {
  var headerRange = seoLvTab.getRange(1,1,1,seoLvTab.getLastColumn()).getValues();
  if(seoLvTab.getLastRow() > 4) {
    getLiquidValuesRangeValues(headerRange);
  } else {
    ui.alert("There are no liquid values to copy over.");
  }
}