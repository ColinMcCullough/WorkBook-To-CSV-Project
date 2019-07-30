function testClass() {
  var propSheet = new PropertyInfo();
  var values = propSheet.propertyValues;
  var tags = propSheet.propertyTagsArry();
  var rowIndex = propSheet.getRowIndexByTag('floor_plans');
  var floorPlansRow = propSheet.getARowValByTag('floor_plans');
  var numLoc = propSheet.numOfLoc();
  Logger.log(numLoc);
}
/*
 This class provides methods to access data in the property sheet tab
*/
function PropertyInfo() {
  //constructor functions
  this.propertyValues = (function getPropertySheetValues() {
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
  
  this.getRowIndexByTag = function(tag) {
    return this.propertyTagsArry().indexOf(tag);
  }
  
  
  this.getRowValByTag = function(tag) {
    var result = [];
    var rowIndx = this.getRowIndexByTag(tag);
    var nameIndx = this.nameRowIndex();
    for(var i = 3; i < this.propertyValues[nameIndx].length; i++){
      result.push(this.propertyValues[rowIndx][i]);
    }
    return result;
  }
}



/* 
Gets all values in **Paste Property Info** sheet
//@return {[][]} 2D array of all rows and columns in Property Info Tab
*/
function getPropertySheetValues() {
  return propertySheet.getRange(2, 1, propertySheet.getLastRow(),propertySheet.getLastColumn()).getValues(); //everything in the propertyInfoSheet(added for text) 
}

/* 
//@param proerty workbook values
//@param tag to find row values of
//@return row values in workbook relevant to tagpropertySheet.getRange(2, 1, propertySheet.getLastRow(),propertySheet.getLastColumn()).getValues();
*/
function getRowValByTag(propertySheetValues,tag) {
  var firstColumn = getColumnOneVal(propertySheetValues);
  var rowIndex = getARowIndex(firstColumn,tag);
  if(rowIndex > 0) {
    var rowValue = getARow(propertySheetValues,rowIndex);
    return rowValue;
  } else {
    return null;
  }  
}

/*
//@param first column of workbook
//@param tag to find row values of
//@return index(not row number) of tag in first column.
//to get row number just add 1
*/
function getARowIndex(firstColumn,tag) {
  return firstColumn.indexOf(tag);
}

/*
//@param entire workbook values
//@return column values for first column in workbook
*/
function getColumnOneVal(propertySheetValues) {
  return propertySheetValues.map(function(v){ return v[0] });
}

/*
//@param entire workbook values
//@param index(not row number) of tag in first column.
//@return row array of location info from row index passed in
*/
function getARow(propertySheetValues,rowIndex) {
  var result = [];
  for(var i = 3; i < propertySheetValues[0].length; i++){
    result.push(propertySheetValues[rowIndex][i]);
  }
  return result;
}

/* 
//@param seo lv tab values
//@param tag to find col values of
//@return col values in seo lv tag relevant to tage
*/
function getColValByTag(seoLVSheetValues,tag) {
  var headerRow = getHeaderRow(seoLVSheetValues);
  var colIndex = getColIndex(headerRow,tag);
  if(colIndex > -1) {
      var colValue = getColumnVal(seoLVSheetValues,colIndex);
      var result = colValue.map(function(elem) {return [elem];});
      return result;
    } else {
      return null;
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

var stateModule = (function () {
  var state; // Private Variable
  
  var pub = {};// public object - returned at end of module
  
  pub.changeState = function (newstate) {
    state = newstate;
  };
  
  pub.getState = function() {
    return state;
  }
  return pub; // expose externally
}());


var getState = stateModule.changeState('used');
function update() {
  Logger.log(stateModule.getState());
}




