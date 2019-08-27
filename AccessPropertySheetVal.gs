/*
 This class provides methods to access data in the property sheet tab
*/
function PropertyInfo() {
  //constructor functions
  this.propertyValues = (function () {
    return propertySheet.getRange(1, 1, propertySheet.getLastRow(),propertySheet.getLastColumn()).getValues(); 
  }());
  
  //class methods
  this.getNewPropertyValues = function() {
    this.propertyValues = propertySheet.getRange(1, 1, propertySheet.getLastRow(),propertySheet.getLastColumn()).getValues(); 
    return this.propertyValues;
  }
  
  this.numOfLoc = function() {
    return this.getRowValByTag('name').length;
  };
  
  this.nameRowIndex = function() {
    return this.getRowIndexByTag('name');
  }
  
  this.propertyTagsArry = function() {
    return this.propertyValues.map(function(v){ return v[0] });
  }
  /*
  //@param entire workbook values
  //@param index(not row number) of tag in first column.
  //@return row array of location info from row index passed in
  */
  this.getRowIndexByTag = function(tag) {
    return this.propertyTagsArry().indexOf(tag);
  }
  
  this.getAFullRowByTag = function(tag) {
    var result = [];
    var rowIndx = this.getRowIndexByTag(tag);
    var nameIndx = this.nameRowIndex();
    for(var i = 0; i < this.propertyValues[nameIndx].length; i++){
      result.push(this.propertyValues[rowIndx][i]);
    }
    return result;
  }
  /* 
  //@param proerty workbook values
  //@param tag to find row values of
  //@return row values in workbook relevant to tagpropertySheet.getRange(2, 1, propertySheet.getLastRow(),propertySheet.getLastColumn()).getValues();
  */
  this.getRowValByTag = function(tag) {
    var result = [];
    var rowIndx = this.getRowIndexByTag(tag);
    var nameIndx = this.nameRowIndex();
    if(rowIndx !== -1) {
      for(var i = 3; i < this.propertyValues[nameIndx].length; i++){
      result.push(this.propertyValues[rowIndx][i]);
      }
    }
    return result;
  }
  
  this.getLocAddressProp = function() {
    var flatColumnArry = this.propertyTagsArry();
    var locInfoAttr = {
      streetAddIndx: flatColumnArry.indexOf("street_address_1") + 1,
      cityIndx: flatColumnArry.indexOf("city") + 1,    
      stateIndx: flatColumnArry.indexOf("state") + 1,
      postalCodeIndx: flatColumnArry.indexOf("postal_code") + 1
    }
    return locInfoAttr;
  }
}

function testPropertyInfoClass() {
  var propSheet = new PropertyInfo();
  var values = propSheet.propertyValues;
  var tags = propSheet.propertyTagsArry();
  var rowIndex = propSheet.getRowIndexByTag('floor_plans');
  var addressProp = propSheet.getLocAddressProp();
  Logger.log(addressProp);
}



/*
//@param entire workbook values
//@return column values for first column in workbook
*/
function getColumnOneVal(propertySheetValues) {
  return propertySheetValues.map(function(v){ return v[0] });
}



/*
  SEO Liquid Values Tab class
  Useful methods to get data from tab
*/ 
function SEOLVTab() {
  
  this.numHeaderRows = 4; 
  this.domainType = seoLvTab.getRange("G2").getValue(); 
  this.vertical = seoLvTab.getRange("E2").getValue();
  
  //constructor functions
  
  this.seoLVSheetVal = (function getSEOSheetValues() {
    return seoLvTab.getRange(1, 1, seoLvTab.getLastRow(),seoLvTab.getLastColumn()).getValues(); 
  }());
  
  //class methods
  this.getNewSeoLVSheetVal = function() {
    this.seoLVSheetVal = seoLvTab.getRange(1, 1, seoLvTab.getLastRow(),seoLvTab.getLastColumn()).getValues(); 
    return this.seoLVSheetVal;
  }
  
  this.headerRowVal = function() {
    var result = [];
    for(var i = 0; i < this.seoLVSheetVal[0].length; i++){
      result.push(this.seoLVSheetVal[0][i]);
    }
    return result;
  }
  
  this.getAColValByTag = function(tag) {
    var colIndex = this.colNumberByTag(tag);
    var result = null;
    if(colIndex > -1) {
      result = [];
      for(var i = this.numHeaderRows; i < this.seoLVSheetVal.length; i++){
        result.push(this.seoLVSheetVal[i][colIndex]);
      }     
    }
    return result;
  }
  
  this.colNumberByTag = function(tag) {
    return this.headerRowVal().indexOf(tag)
  }
}




function getHeaderRow(seoLVSheetValues) {
  var result = [];
  for(var i = 0; i < seoLVSheetValues[0].length; i++){
    result.push(seoLVSheetValues[0][i]);
  }
  return result;
}

function getColIndex(headerRow,tag) {
  return headerRow.indexOf(tag);
}

function getColumnVal(seoLVSheetValues,colIndex) {
  var result = [];
  for(var i = 4; i < seoLVSheetValues.length; i++){
    result.push(seoLVSheetValues[i][colIndex]);
  }
  return result;
}

function testSEOOBJ() {
  var seoObj = new SEOLVTab();
  Logger.log(seoObj.domainType);
  Logger.log(seoObj.headerRowVal());
  Logger.log(seoObj.getAColValByTag('street_address_1'));
}


