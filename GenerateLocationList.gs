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
  var dropDownsSelected = valid(vertical,domainType,chainBranding);
  var propSheetObj = new PropertyInfo();
  var numLocations = propSheetObj.numOfLoc();
  //checks that drop downs are selected
  if(dropDownsSelected && numLocations > 0) {
    var errors = checkErrors(propSheetObj,clientProperties);
    //checks workbook is in a ok state
    if(!errors) {
      if(chainBranding === 'no') {
        locationList = propSheetObj.getRowValByTag("name");
        return locationList;
      } 
      else {
        locationList = buildNameAddressLocationList(propSheetObj);        
        return locationList;
      }
    }
  }
}

//builds a string concatenating names and addresses
function buildNameAddressLocationList(propSheetObj) {
  var namePlusAdd = [];
  var names = propSheetObj.getRowValByTag("name");
  var addresses = propSheetObj.getRowValByTag("street_address_1");
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
  var propSheetObj = new PropertyInfo();
  if(chainBrand === 'yes') {
    var namePlusAddress = buildNameAddressLocationList(propSheetObj);
    locationNameIndex = namePlusAddress.indexOf(locationName);
  }
  else {
    locationNameIndex = propSheetObj.getRowValByTag("name").indexOf(locationName);    
  }
  streetAddress = propSheetObj.getRowValByTag("street_address_1")[locationNameIndex];
  city = propSheetObj.getRowValByTag("city")[locationNameIndex];
  state = propSheetObj.getRowValByTag("state")[locationNameIndex];
  postalCode = propSheetObj.getRowValByTag("postal_code")[locationNameIndex];  
  floorPlansRow = propSheetObj.getRowValByTag("floor_plans");
  classRow = propSheetObj.getRowValByTag("class");
  unitTypeRow = propSheetObj.getRowValByTag("primary_type");
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

function newLoc() {
  var x = new Location('Dummy - kepler st','yes');
}


