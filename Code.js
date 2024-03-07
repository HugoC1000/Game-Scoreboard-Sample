function organizeData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var mainSheet = ss.getSheetByName("Main"); //Set main as the source of the data. 
  var dataRange = mainSheet.getDataRange();
  var dataValues = dataRange.getValues();
  
  // Create sheets for classical and other versions if they don't exist
  var classicalSheet = ss.getSheetByName("Classical");
  if (!classicalSheet) {
    classicalSheet = ss.insertSheet("Classical");
  }
  var otherSheet = ss.getSheetByName("Other");
  if (!otherSheet) {
    otherSheet = ss.insertSheet("Other");
  }
  
  // Clear existing data in the sheets
  classicalSheet.clear();
  otherSheet.clear();
  
  // Find column indexes
  var headers = dataValues[0];

//Set the index/column number for each heading. 
  var timestampIndex = 0;
  var nameIndex = 1;
  var discordIndex = 2;
  var ageIndex = 3;
  var scoreIndex = 4;
  var commentIndex = 6;
  var versionIndex = 7;
  Logger.log(timestampIndex);
  Logger.log(nameIndex);
  Logger.log(discordIndex);

  Logger.log(ageIndex);
  Logger.log(scoreIndex);
  Logger.log(commentIndex);
  Logger.log(versionIndex);
  // Organize data into classical and other sheets
  var classicalData = [];
  var otherData = [];
for (var i = 1; i < dataValues.length; i++) {
    var rowData = dataValues[i];
    var version = rowData[versionIndex];
    if (version === "Classical") {
      // Exclude columns for screenshot and type of Tetris
      classicalData.push([rowData[timestampIndex], rowData[nameIndex], rowData[discordIndex], rowData[ageIndex], rowData[scoreIndex], rowData[commentIndex]]);
    } else if (version === "Other") {
      // Exclude columns for screenshot and type of Tetris
      otherData.push([rowData[timestampIndex], rowData[nameIndex], rowData[discordIndex], rowData[ageIndex], rowData[scoreIndex], rowData[commentIndex]]);
    }
  }

//Customize column's width for classical Sheet
  classicalSheet.setColumnWidth(1, 175);
  classicalSheet.setColumnWidth(2, 150);
  classicalSheet.setColumnWidth(3, 175);
  classicalSheet.setColumnWidth(4, 75);
  classicalSheet.setColumnWidth(5, 100);
  classicalSheet.setColumnWidth(6, 500);

//Customize height of the first row for classical sheet
  classicalSheet.setRowHeight(1, 50);

//Customize column's width for classical Sheet
  otherSheet.setColumnWidth(1, 175);
  otherSheet.setColumnWidth(2, 150);
  otherSheet.setColumnWidth(3, 175);
  otherSheet.setColumnWidth(4, 75);
  otherSheet.setColumnWidth(5, 100);
  otherSheet.setColumnWidth(6, 500);
//Customize height of the first row for classical sheet
  otherSheet.setRowHeight(1, 50);
  
  // Set font and formatting for headings
  var headingFontColor = "#ffffff"; // White text color
  var headingBackgroundColor = "#000000"; // Black background color
  var headingFontFamily = "Exo"; // Font family
  
  //List of Headings
  var classicalHeadings = ["Timestamp", "Name", "Discord Username", "Age", "Score", "Short Comment"];
  //Customize font, font color and background for the headings
  var headingRange = classicalSheet.getRange(1, 1, 1, classicalHeadings.length);
  headingRange.setFontFamily(headingFontFamily).setFontColor(headingFontColor).setBackground(headingBackgroundColor);
  //Put the headings inside the heading range. 
  headingRange.setValues([classicalHeadings]);
  
  //Customize font, font color and background for the headings
  headingRange = otherSheet.getRange(1, 1, 1, classicalHeadings.length);
  headingRange.setFontFamily(headingFontFamily).setFontColor(headingFontColor).setBackground(headingBackgroundColor);
  //Put the headings inside the heading range. 
  headingRange.setValues([classicalHeadings]);
  
  // Set font and formatting for data
  var dataFontFamily = "Exo"; // Font family for data

  // Sort classicalData by score (descending order)
  classicalData.sort(function(a, b) {
    return b[scoreIndex] - a[scoreIndex];
  });

  // Sort otherData by score (descending order)
  otherData.sort(function(a, b) {
    return b[scoreIndex] - a[scoreIndex];
  });



  
  // Write data to classical sheet
  if (classicalData.length > 0) {
    var classicalDataRange = classicalSheet.getRange(2, 1, classicalData.length, classicalData[0].length);
    classicalDataRange.setFontFamily(dataFontFamily);
    for (var i = 0; i < Math.min(3, classicalData.length); i++) {
      var backgroundRange = classicalSheet.getRange(i + 2, 1, 1, classicalData[0].length); // Adjusted to target each row directly
      if (i === 0) {
        backgroundRange.setBackground("#ffd700"); // Gold for first place
      } else if (i === 1) {
        backgroundRange.setBackground("#c0c0c0"); // Silver for second place
      } else if (i === 2) {
        backgroundRange.setBackground("#cd7f32"); // Bronze for third place
      }
    }
    classicalDataRange.setValues(classicalData);
    
  }
  
  // Write data to other sheet
  if (otherData.length > 0) {
    var otherDataRange = otherSheet.getRange(2, 1, otherData.length, otherData[0].length);
    otherDataRange.setFontFamily(dataFontFamily);
    otherDataRange.setValues(otherData);
  }
}
