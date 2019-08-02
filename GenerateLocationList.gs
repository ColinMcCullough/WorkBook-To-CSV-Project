/*
This function is called by the Generate Locations button 
@param String the selected vertical from the ui dropdown
@param String the selected domainType from the ui dropdown
@param String the selected chainBranding from the ui dropdown
@return an array list of location names from the property workbook
*/
function generateLocations(vertical,domainType,chainBranding) {
  var locationList;
  var clientProperties = getClientProp(vertical,domainType,chainBranding);
  var isValid = valid(vertical,domainType,chainBranding);
  //checks that drop downs are selected
  if(isValid) {
    var propSheetObj = new PropertyInfo();
    var errors = checkErrors(propSheetObj,clientProperties);
    //checks workbook is in a ok state
    if(!errors) {
      var newPSValues = propSheetObj.getNewPropertyValues();
      if(chainBranding === 'no') {
        locationList = getRowValByTag(newPSValues,"name");
        return locationList;
      } 
      else {
        locationList = buildNameAddressLocationList(newPSValues);        
        return locationList;
      }
    }
  }
}

//builds a string concatenating names and addresses
function buildNameAddressLocationList(newPSValues) {
  var namePlusAdd = [];
  var names = getRowValByTag(newPSValues,"name");
  var addresses = getRowValByTag(newPSValues,"street_address_1");
  for(var i = 0; i < names.length; i++) {
    namePlusAdd.push(names[i] + " - " + addresses[i].replace(/[^A-Za-z0-9|" "]/g, '').substr(addresses[i].indexOf(' ')+1).toString().toLowerCase().trim());
  }
  return namePlusAdd;
}

function test() {
  var locationList = generateLocations("mf","multi","yes");
}


function doGet() {
  return HtmlService.createHtmlOutputFromFile('Sidebar');
}
/*
This function gets called when a new location is selected
@param String the location name defined in the drop down list
@return an array list of location names from the property workbook
*/
function getLocationInformation(location,vertical,chainBrand) {
  clearDashboardContent();
  var locationObj = new Location(location,chainBrand);
  if(vertical === 'mf') {
    return[locationObj.streetAddress,locationObj.city,locationObj.state,locationObj.postalCode,locationObj.floorPlans,locationObj.class,locationObj.unitType];
  }
  else {
    return[locationObj.streetAddress,locationObj.city,locationObj.state,locationObj.postalCode]
  }
}

//location object with name, address, class fields
function Location(locationName,chainBrand){  
  var locationNameIndex; var streetAddress; var city; var state; var postalCode; var floorPlansRow; var classRow; var unitTypeRow;
  var newPSValues = getPropertySheetValues();
  if(chainBrand === 'yes') {
    var namePlusAdd = buildNameAddressLocationList(newPSValues);
    locationNameIndex = namePlusAdd.indexOf(locationName);
  }
  if(chainBrand === 'no') {
    locationNameIndex = getRowValByTag(newPSValues,"name").indexOf(locationName);    
  }
  streetAddress = getRowValByTag(newPSValues,"street_address_1")[locationNameIndex];
  city = getRowValByTag(newPSValues,"city")[locationNameIndex];
  state = getRowValByTag(newPSValues,"state")[locationNameIndex];
  postalCode = getRowValByTag(newPSValues,"postal_code")[locationNameIndex];  
  floorPlansRow = getRowValByTag(newPSValues,"floor_plans");
  classRow = getRowValByTag(newPSValues,"class");
  unitTypeRow = getRowValByTag(newPSValues,"primary_type");
  this.locationName = locationName;
  this.address = streetAddress + " " + city + " " + state + " " + postalCode;
  this.streetAddress = streetAddress;
  this.city = city;
  this.state = state;
  this.postalCode = postalCode;
  this.floorPlans = (floorPlansRow === null) ? "none" : cleanFloorPlans(floorPlansRow[locationNameIndex]); 
  this.class = (classRow === null) ? "none" : classRow[locationNameIndex]; 
  this.unitType = (unitTypeRow === null) ? "none" : unitTypeRow[locationNameIndex];  
} 




//checks to make sure no crucial tags are missing or values are missing needed for the keyword tools functionality
function checkPropertySheetErrors(propSheetObj,clientProperties) {
  checkErrors(propSheetObj,clientProperties);
  var checkErrors = new PropertySheetErrors()
  var missingTags = tags.standard.diff(flatColumnArry);
  if(missingTags.length > 0) {
    ui.alert("Error: \nYou are missing the following required tags in the workbook:\nMissing Tags: " + missingTags + "\nCheck to ensure the workbook is up to date");
    return null;
  }
  var locInfoAttr = {
    nameIndx: flatColumnArry.indexOf("name") + 1,
    streetAddIndx: flatColumnArry.indexOf("street_address_1") + 1,
    cityIndx: flatColumnArry.indexOf("city") + 1,    
    stateIndx: flatColumnArry.indexOf("state") + 1,
    postalCodeIndx: flatColumnArry.indexOf("postal_code") + 1
  }
  var keys = ["name","street_address_1","city","state","postal_code"];
  for(var i = 0; i < keys.length; i++) {
    var getRowVal = propSheetObj.getRowValByTag(keys[i]);
    var numBlank = numOfBlanks(getRowVal, getRowVal.length);
    if(numBlank > 0) {
      ui.alert("Error: All locations name, address, city, state and zip cells must be filled out in the projects workbook. \n" +
               "Name Row: " + locInfoAttr.nameIndx + "\nAddress Rows: " + locInfoAttr.streetAddIndx + " - " + locInfoAttr.postalCodeIndx);
      return null;
    }
  }
  return "good";
}