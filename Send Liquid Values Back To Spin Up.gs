var tagsToCopy = {
  getTags: function(vertical,domain) {
    return this[vertical][domain];    
  },
  mf: {
    single: ['street_address_1','city','state','postal_code','neighborhood','neighborhood_2','floor_plans','landmark_1_name','property_feature_1','apartment_amenity_1','community_amenity_1','custom_slug'],
    multi: ['street_address_1','city','state','postal_code','neighborhood','neighborhood_2','floor_plans','landmark_1_name','property_feature_1','apartment_amenity_1','community_amenity_1']
  },
  ss: {
    single: ['street_address_1','city','state','postal_code','neighborhood','neighborhood_2','landmark_1_name','custom_slug'],
    multi: ['street_address_1','city','state','postal_code','neighborhood','neighborhood_2','landmark_1_name']
  },
  sl: {
    single: ['street_address_1','city','state','postal_code','neighborhood','neighborhood_2','landmark_1_name','custom_slug'],
    multi: ['street_address_1','city','state','postal_code','neighborhood','neighborhood_2','landmark_1_name']
  }
}

//gets values in ranges that need to be copied from seo liquid values tab to spinup file tab
function getLiquidValuesRangeValues(headerRange,seoLVSheetValues,seoTabObj) {
  var spinUpValues = spinUpTab.getRange(2, 1, spinUpTab.getLastRow(),spinUpTab.getLastColumn()).getValues();
  var seoHeadersAndVal = {};
  var headers = tagsToCopy.getTags(seoTabObj.vertical,seoTabObj.domainType);
  headers.forEach(function(e) { 
    value = seoTabObj.getAColValByTag(e);
    seoHeadersAndVal[e] = value;
  });
  var keys = Object.keys(seoHeadersAndVal);
  try {
    keys.forEach(function(e) {
    var spinUpCol = spinUpFileHeaders.indexOf(e) + 1;
    var setValue = seoHeadersAndVal[e].map(function(elem) {return [elem];}); 
    spinUpTab.getRange(2,spinUpCol,spinUpValues.length -1,1).setValues(setValue);
    });  
  } catch(e) {
     ui.alert("The number of locations in the SEO Liquid Values Tab dont match the number in the spin up file.");
  }
}


//main function that sends liquid values from lv tab back to spin up tab
function liquidToSpinUp() {
  var seoTabObj = new SEOLVTab();
  var seoLVSheetValues =  seoTabObj.seoLVSheetVal;//everything in the seolvsheet(added for text)
  var headerRange = [];
  headerRange.push(seoTabObj.headerRowVal());
  if(seoLVSheetValues.length > 4) { //makes sure locaiton values exist after headers
    getLiquidValuesRangeValues(headerRange,seoLVSheetValues,seoTabObj);
  } else {
    ui.alert("There are no liquid values to copy over.");
  }
}

function tagsToCopyTest() {
  var test = tagsToCopy.getTags('ss','multi');
  Logger.log(test);
}