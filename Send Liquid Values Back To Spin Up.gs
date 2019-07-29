//Global Variables  
var domainType = seoLvTab.getRange("G2").getValue();
var vertical = seoLvTab.getRange("E2").getValue();
var streetAdressColumn = spinUpFileHeaders.indexOf("street_address_1") + 1;
var cityColumn = spinUpFileHeaders.indexOf("city") + 1;
var stateColumn = spinUpFileHeaders.indexOf("state") + 1;
var postalColumn = spinUpFileHeaders.indexOf("postal_code") + 1;
var neighborhoodColumn = spinUpFileHeaders.indexOf("neighborhood") + 1;
var neighborhood2Column = spinUpFileHeaders.indexOf("neighborhood_2") + 1;
var landmarkColumn = spinUpFileHeaders.indexOf("landmark_1_name") + 1;
var customSlugColumn = spinUpFileHeaders.indexOf("custom_slug") + 1;
var floorPlansColumn = spinUpFileHeaders.indexOf("floor_plans") + 1;
var propertyFeatureColumn = spinUpFileHeaders.indexOf("property_feature_1") + 1;
var primaryApartentAmenityColumn = spinUpFileHeaders.indexOf("apartment_amenity_1") + 1;
var primaryCommunityAmenityColumn = spinUpFileHeaders.indexOf("community_amenity_1") + 1;



//gets values in ranges that need to be copied from seo liquid values tab to spinup file tab
function getLiquidValuesRangeValues(headerRange,seoLVSheetValues) {
  var landmarkValues = "";
  var customSlugValues = "";
  var floorPlansValues = "";
  var propertyFeatureValues = "";
  var primaryApartentAmenityValues = "";
  var primaryCommunityAmenityValues = "";
  var customSlugValues = getColValByTag(seoLVSheetValues,"custom_slug");
  var landmarkValues = getColValByTag(seoLVSheetValues,"landmark");
  if (vertical == "mf") {
    floorPlansValues = getColValByTag(seoLVSheetValues,"floor_plans");    
    propertyFeatureValues = getColValByTag(seoLVSheetValues,"property_feature_1"); 
    primaryApartentAmenityValues = getColValByTag(seoLVSheetValues,"apart_amen"); 
    primaryCommunityAmenityValues = getColValByTag(seoLVSheetValues,"comm_amen"); 
  }
  setValuesInSpinUpFile(landmarkValues,customSlugValues,floorPlansValues,propertyFeatureValues,primaryApartentAmenityValues,primaryCommunityAmenityValues,headerRange,seoLVSheetValues);
}

function setValuesInSpinUpFile(landmarkValues,customSlugValues,floorPlansValues,propertyFeatureValues,primaryApartentAmenityValues,primaryCommunityAmenityValues,headerRange,seoLVSheetValues) {
  //gets values in ranges that need to be copied from seo liquid values tab to spinup file tab
  var streetAdressValues = getColValByTag(seoLVSheetValues,"street_address_1");
  var cityValues = getColValByTag(seoLVSheetValues,"city");
  var stateValues = getColValByTag(seoLVSheetValues,"state");
  var zipValues = getColValByTag(seoLVSheetValues,"postal_code");
  var neighborhoodValues = getColValByTag(seoLVSheetValues,"neighborhood");
  var neighborhood2Values = getColValByTag(seoLVSheetValues,"neighborhood_2");
  var spinUpValues = spinUpTab.getRange(2, 1, spinUpTab.getLastRow(),spinUpTab.getLastColumn()).getValues(); //everything in the propertyInfoSheet(added for text) 
  try {
    spinUpTab.getRange(2,streetAdressColumn,spinUpValues.length -1,1).setValues(streetAdressValues);  //sets street address values in spinupfile tab
    spinUpTab.getRange(2,cityColumn,spinUpValues.length -1,1).setValues(cityValues);  //sets city values in spinupfile tab
    spinUpTab.getRange(2,stateColumn,spinUpValues.length -1,1).setValues(stateValues);  //sets state values in spinupfile tab
    spinUpTab.getRange(2,postalColumn,spinUpValues.length -1,1).setValues(zipValues);  //sets state values in spinupfile tab
    spinUpTab.getRange(2,neighborhoodColumn,spinUpValues.length -1,1).setValues(neighborhoodValues);  //sets neighborhood values in spinupfile tab
    spinUpTab.getRange(2,neighborhood2Column,spinUpValues.length -1,1).setValues(neighborhood2Values);  //sets neighborhood2 values in spinupfile tab
    spinUpTab.getRange(2,landmarkColumn,spinUpValues.length -1,1).setValues(landmarkValues);  //sets landmark 1 values in spinupfile tab
    if (vertical == "mf") {
      spinUpTab.getRange(2,floorPlansColumn,spinUpValues.length -1,1).setValues(floorPlansValues);  //sets floor plans values in spinupfile tab if MF
      spinUpTab.getRange(2,propertyFeatureColumn,spinUpValues.length -1,1).setValues(propertyFeatureValues);  //sets property feature values in spinupfile tab if MF
      spinUpTab.getRange(2,primaryApartentAmenityColumn,spinUpValues.length -1,1).setValues(primaryApartentAmenityValues);  //sets primary apartment amenity values in spinupfile tab if MF
      spinUpTab.getRange(2,primaryCommunityAmenityColumn,spinUpValues.length -1,1).setValues(primaryCommunityAmenityValues);  //sets primary community amenity values in spinupfile tab if MF
    }
    if (domainType == "single") {
      spinUpTab.getRange(2,customSlugColumn,spinUpValues.length -1,1).setValues(customSlugValues);  //sets custom values in spinupfile tab
    }
  }
  catch (e) {
    ui.alert("The number of locations in the SEO Liquid Values Tab dont match the number in the spin up file.");
  }
} 

//main function that sends liquid values from lv tab back to spin up tab
function liquidToSpinUp() {
  var seoLVSheetValues = seoLvTab.getRange(1, 1, seoLvTab.getLastRow(),seoLvTab.getLastColumn()).getValues(); //everything in the seolvsheet(added for text)
  var headerRange = [];
  headerRange.push(getHeaderRow(seoLVSheetValues));
  if(seoLVSheetValues.length > 4) {
    getLiquidValuesRangeValues(headerRange,seoLVSheetValues);
  } else {
    ui.alert("There are no liquid values to copy over.");
  }
}