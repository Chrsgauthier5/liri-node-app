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
            randomTxt(input);
            break;

        default:
            console.log("-----------------------------------------------------------------------------------------------------------------");
            console.log(
                "Hello - I am Bob.  I am a Language Interpretation and Recognition Interface (LIRI)\n\n" +
                "I can do a few different things if you tell me to.\n\n 1.) Information about upcoming concerts." +
                "To tell me to fetch data about upcoming concerts enter the following after the 'node liri' command:\n\n" +
                "concert-this '<artist/band name>'\n\n If the band or artist has spaces please put them in quotes - likes this: 'Avenged Sevenfold'\n\n" +
                "2.) Informatiom about a song from Spotify.\n\n spotify-this-song '<song name here>'\n\n" +
                "3.) Information about a movie from OMDB.\n\n movie-this '<movie name here>' \n\n" +
                "4.) Run command from the random.txt file in one of the above command formats.\n\n do-what-it-say"

            );
    }
} // end of liri function

liri(process.argv[2], process.argv[3]);


//-----------------------------------------FUNCTIONS DEFINED BELOW------------------------------------------------------------------////#endregion
function venueSearch(input) {
    var artist = input;
    artist = artist.charAt(0).toUpperCase() + artist.slice(1);

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log("Here are " + response.data.length + " upcoming concert venues for " + artist + ".\r\n");
            for (i = 0; i < response.data.length; i++) {
                var venue = response.data[i].venue;
                var date = response.data[i].datetime;
                var formatDate = moment(date).format('MM/DD/YYYY');
                var dateUntil = moment(date).diff(moment(), 'days');
                var concertData = "The " + artist + " concert is at " + venue.name + ".\n" +
                    "The " + artist + " concert is located in " + venue.city + " " + venue.region + ", " + venue.country + ".\n" +
                    "The " + artist + " concert is on " + formatDate + ", this is in " + dateUntil + " days!\n" +
                    "------------------------------------------------------------------\n";
                console.log(concertData);
                append(concertData);
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
                var spotifyDataUndefined = "You didn't input a song, here is the information for 'The Sign' by Ace of Base.\n" +
                    "-----------------------------------------------------------------------------------\n" +
                    + "The artist of this song is " + artist + "\n" +
                    "The name of this song is " + song + '\n' +
                    "Link to this song on Spotify: " + spotifyLink + '\n' +
                    song + " is from the album " + album + '\n' +
                    "------------------------------------------------------------------------------------\n";

                console.log(spotifyDataUndefined);
                append(spotifyDataUndefined);

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
                var spotifyData = "The artist of this song is " + artist + '\n' +
                    "The name of this song is " + song + '\n' +
                    "Link to this song on Spotify: " + spotifyLink + '\n' +
                    song + " is from the album " + album + '\n' +
                    "------------------------------------------------------------------\n";
                console.log(spotifyData);
                append(spotifyData);
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
                var mrNobody = 'Movie Title: ' + title + "\n" + 'Release year: ' + year + "\n" +
                "Rating source: " + ratingImdb + ', Score: ' + ratingImdbScore + "\n" +
                "Rating source: " + ratingRotten + ', Score: ' + ratingRottenScore + "\n" +
                "Country of Production: " + country + "\n" +
                "Language: " + language + "\n" +
                "Plot summary: " + plot + "\n" +
                "Main actors: " + actors + "\n" +
                "Box Office: " + boxOffice + "\n" +
                "------------------------------------------------------------------";
                console.log(mrNobody);
                append(mrNobody);
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
            var movieData = 'Movie Title: ' + title + "\n" + 'Release year: ' + year + "\n" +
                "Rating source: " + ratingImdb + ', Score: ' + ratingImdbScore + "\n" +
                "Rating source: " + ratingRotten + ', Score: ' + ratingRottenScore + "\n" +
                "Country of Production: " + country + "\n" +
                "Language: " + language + "\n" +
                "Plot summary: " + plot + "\n" +
                "Main actors: " + actors + "\n" +
                "Box Office: " + boxOffice + "\n" +
                "------------------------------------------------------------------";
            console.log(movieData);
            append(movieData);
        });

}

function randomTxt() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        var randomTxt = data.split(",");
        process.argv[2] = randomTxt[0];
        process.argv[3] = randomTxt[1];
        if (process.argv[2] === 'concert-this') {
            venueSearch(process.argv[3]);
            return
        }
        if (process.argv[2] === 'spotify-this-song') {
            spotifySearch(process.argv[3]);
            return
        }
        if (process.argv[2] === 'movie-this') {
            movieSearch(process.argv[3]);
            return
        }
        else {
            console.log('Please put a valid command inside of the random.txt file!');
            console.log('There is something wrong with this  - check for typos: ' + data)
        }
    });



}

function append(data) {
    fs.appendFile('log.txt', data, function (err) {
        if (err) {
            console.log('Error occured: ' + err)
        }
    });
}