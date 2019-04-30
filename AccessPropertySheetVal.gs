
/* 
//@param proerty workbook values
//@param tag to find row values of
//@return row values in workbook relevant to tag
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
  //var seoLVSheetValues = seoLvTab.getRange(1, 1, seoLvTab.getLastRow(),seoLvTab.getLastColumn()).getValues(); //everything in the seolvsheet(added for text)
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

