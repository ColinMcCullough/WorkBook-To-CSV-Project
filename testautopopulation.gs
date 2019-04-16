function getPopulation() {
  var response = UrlFetchApp.fetch("https://api.census.gov/data/2017/pep/population?get=POP,GEONAME&for=consolidated%20city:*&in=state:*&key=7af6f9b42dce365409a71500293b6e0a6f331515")
  Logger.log(response);
}



//key: 7af6f9b42dce365409a71500293b6e0a6f331515