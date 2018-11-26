require('dotenv').config();

var axios = require('axios');
var moment = require('moment');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var fs = require('fs');


function liri(command, input) {

    switch (command) {

        // ----------------------------------------------------------------CONCERT SEARCH---------------------------------------------//

        case 'concert-this':
            venueSearch(input);
            break;


        // ----------------------------------------------------------------SPOTIFY SEARCH---------------------------------------------//

        case 'spotify-this-song':
            spotifySearch(input);
            break;


        // ----------------------------------------------------------------MOVIE SEARCH---------------------------------------------//
        case 'movie-this':
            movieSearch(input);
            break;

        // ----------------------------------------------------------------LIRI SEARCH---------------------------------------------//

        case 'do-what-it-says':

            fs.readFile('random.txt', 'utf8', function (err, data) {
                console.log(data);
                var randomTxt = data.split(",");
                process.argv[2] = randomTxt[0];
                process.argv[3] = randomTxt[1];


            });



            break;

        default:
            console.log("please put in a valid command");
    }
} // end of liri function

liri(process.argv[2], process.argv[3]);


//-----------------------------------------FUNCTIONS DEFINED BELOW------------------------------------------------------------------////#endregion
function venueSearch(input) {
    var artist = input;
    artist = artist.charAt(0).toUpperCase() + artist.slice(1);

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function (response) {

            //set up for loop so we get response for 5 venues - too much data IMO
            console.log("Here are " + response.data.length + " upcoming concert venus for " + artist + ".\r\n");
            for (i = 0; i < response.data.length; i++) {
                var venue = response.data[i].venue;
                var date = response.data[i].datetime;
                var formatDate = moment(date).format('MM/DD/YYYY');
                var dateUntil = moment(date).diff(moment(), 'days');

                console.log("This " + artist + " concert is at " + venue.name + ".");
                console.log("The " + artist + " concert is located in " + venue.city + " " + venue.region + ", " + venue.country + ".");
                console.log("The " + artist + " concert is on " + formatDate + ", this is in " + dateUntil + " days!");
                console.log("------------------------------------------------------------------");
            }
        }
    );

}




function spotifySearch(input) {
    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });
    var songName = input;

    if (songName === undefined) {
        spotify.search({ type: 'track', query: 'The Sign', limit: 20 })
            .then(function (response) {
                var song = JSON.stringify(response.tracks.items[9].name); //gets the artists name 
                var artist = JSON.stringify(response.tracks.items[9].artists[0].name);//gets the song name
                var spotifyLink = JSON.stringify(response.tracks.items[9].external_urls.spotify); //preview link from spotify
                var album = JSON.stringify(response.tracks.items[9].album.name); //album name
                console.log("You didn't input a song, here is the information for 'The Sign' by Ace of Base.");
                console.log("-----------------------------------------------------------------------------------");
                console.log("The artist of this song is " + artist);
                console.log("The name of this song is " + song);
                console.log("Link to this song on Spotify: " + spotifyLink);
                console.log(song + " is from the album " + album);
                console.log("------------------------------------------------------------------------------------");

            })
            .catch(function (err) {
                console.log(err);
            });
        return
    }

    songName = songName.charAt(0).toUpperCase() + songName.slice(1);

    spotify.search({ type: 'track', query: songName, limit: 20 })
        .then(function (response) {
            for (i = 0; i < response.tracks.limit; i++) {
                var artist = JSON.stringify(response.tracks.items[i].artists[0].name); //gets the artists name
                var song = JSON.stringify(response.tracks.items[i].name); //gets the song name
                var spotifyLink = JSON.stringify(response.tracks.items[i].external_urls.spotify); //preview link from spotify
                var album = JSON.stringify(response.tracks.items[i].album.name); //album name

                console.log("The artist of this song is " + artist);
                console.log("The name of this song is " + song);
                console.log("Link to this song on Spotify: " + spotifyLink);
                console.log(song + " is from the album " + album);
                console.log("------------------------------------------------------------------");
            }
        })
        .catch(function (err) {
            console.log(err);
        });

}

function movieSearch(input) {
    console.log('movie search');
    console.log("------------------------------------------------------------------");
    var movieTitle = input;

    if (movieTitle === undefined) {
        var movieTitle = 'Mr. Nobody';
        axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + movieTitle + "").then(
            function (response) {

                var title = response.data.Title;
                var year = response.data.Year;
                var ratingImdb = response.data.Ratings[0].Source;
                var ratingImdbScore = response.data.Ratings[0].Value;
                var ratingRotten = response.data.Ratings[1].Source;
                var ratingRottenScore = response.data.Ratings[1].Value;
                var country = response.data.Country;
                var language = response.data.Language;
                var plot = response.data.Plot;
                var actors = response.data.Actors;
                var boxOffice = response.data.BoxOffice;
                console.log('Movie Title: ' + title);
                console.log('Release year: ' + year);
                console.log("Rating source: " + ratingImdb + ', Score: ' + ratingImdbScore);
                console.log("Rating source: " + ratingRotten + ', Score: ' + ratingRottenScore);
                console.log("Country of Production: " + country);
                console.log("Language: " + language);
                console.log("Plot summary: " + plot);
                console.log("Main actors: " + actors);
                console.log("Box Office: " + boxOffice);
                console.log("------------------------------------------------------------------");
            });
        return
    }


    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + movieTitle + "").then(
        function (response) {

            var title = response.data.Title;
            var year = response.data.Year;
            var ratingImdb = response.data.Ratings[0].Source;
            var ratingImdbScore = response.data.Ratings[0].Value;
            var ratingRotten = response.data.Ratings[1].Source;
            var ratingRottenScore = response.data.Ratings[1].Value;
            var country = response.data.Country;
            var language = response.data.Language;
            var plot = response.data.Plot;
            var actors = response.data.Actors;
            var boxOffice = response.data.BoxOffice;
            console.log('Movie Title: ' + title);
            console.log('Release year: ' + year);
            console.log("Rating source: " + ratingImdb + ', Score: ' + ratingImdbScore);
            console.log("Rating source: " + ratingRotten + ', Score: ' + ratingRottenScore);
            console.log("Country of Production: " + country);
            console.log("Language: " + language);
            console.log("Plot summary " + plot);
            console.log("Main actors: " + actors);
            console.log("Box Office: " + boxOffice);
            console.log("------------------------------------------------------------------");
        });

}