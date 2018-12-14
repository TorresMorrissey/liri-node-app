var dotenv = require('dotenv').config();
var fs = require('fs');
var keys = require('./keys.js');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var axios = require('axios');

var liriArgument = process.argv[2];
var omdb = require('omdbapi');

['node', 'liri.js', 'movie-this', '\'Saw\'']

// omdb.search('pulp fiction', function(results) {
//     console.log(results);
// })

var spotify = new Spotify({
    id: "2ec9b831bbb24ec48febdae85d843485",
    secret: "ed63c86251ba4e9fb622b2dfa7af6fe1"
  });
   
  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  //console.log(data); 
  });


switch(liriArgument) {
    case "concert-this": concertThis(); break;
    case "spotify-this-song": spotifyThisSong(); break;
    case "movie-this": movieThis(); break;
    case "do-what-it-says": doWhatItSays(); break;
    default: console.log("\r\n" +"Try typing one of the following commands after 'node liri.js' : " +"\r\n"+
        "1. spotify-this-song 'any song name' "+"\r\n"+
        "2. movie-this 'any movie name' "+"\r\n"+
        "3. do-what-it-says."+"\r\n"+
        "Be sure to put the movie or song name in quotation marks if it's more than one word.");
};

function movieThis(){
    var movie = process.argv[3];
    if(!movie){
        movie = "mr nobody";
    }

    axios.get('http://www.omdbapi.com/?apikey=6bf5f16b&t='+ movie)
    .then(function (response) {
        // return response.json();
        var resp = response.data;    
    // }).then(function (response){
        var movieResults =
        "------------------------------ begin ------------------------------" + "\r\n" +
        "Title: " + resp.Title+"\r\n"+
        "Year: " + resp.Year+"\r\n"+
        "Imdb Rating: " + resp.imdbRating+"\r\n"+
        "Country: " + resp.Country+"\r\n"+
        "Language: " + resp.Language+"\r\n"+
        "Plot: " + resp.Plot+"\r\n"+
        "Actors: " + resp.Actors+"\r\n"+
        "Rotten Tomatoes Rating: " + resp.tomatoRating+"\r\n"+
        "Rotten Tomatoes URL: " + resp.tomatoURL + "\r\n" + 
        "------------------------------ fin ------------------------------" + "\r\n";
        console.log(movieResults);
    })
    .catch(function (error) {
      console.log(error);
    });
  
  
    axios("http://www.omdbapi.com/?apikey=6bf5f16b&t=mr+nobody", function (error, response, body) {
     
    });
};

function spotifyThisSong(songName) {
    var songName = process.argv[3];
    if(!songName){
        songName = "What's my age again";
    }
    params = songName;
    spotify.search({ type: "track", query: params }, function(err, data) {
        if(!err){
            var songInfo = data.tracks.items;
            for (var i = 0; i < 5; i++) {
                if (songInfo[i] != undefined) {
                    var spotifyResults =
                    "Artist: " + songInfo[i].artists[0].name + "\r\n" +
                    "Song: " + songInfo[i].name + "\r\n" +
                    "Album the song is from: " + songInfo[i].album.name + "\r\n" +
                    "Preview Url: " + songInfo[i].preview_url + "\r\n" + 
                    "------------------------------ " + i + " ------------------------------" + "\r\n";
                    console.log(spotifyResults);
                    log(spotifyResults); 
                }
            }
        }	else {
            console.log("Error :"+ err);
            return;
        }
    });
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (!error) {
            doWhatItSaysResults = data.split(",");
            spotifyThisSong(doWhatItSaysResults[0], doWhatItSaysResults[1]);
        } else {
            console.log("Error occurred" + error);
        }
    });
};

function log(logResults) {
  fs.appendFile("log.txt", logResults, (error) => {
    if(error) {
      throw error;
    }
  });
}

axios.get('https://rest.bandsintown.com/artists/Lane8?app_id=ee128eeff586f8476577c4d4e838f649')
  .then(function (response) {
    //console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

