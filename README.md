# LIRI Project (Bob)

### **In this ReadMe I am going to discuss the LIRI Project I built**

LIRI is a CLI (Command Line Interace) project that enables users to input commands on the node command line, and receive data back specific to their query.

## **There are 4 primary command types that LIRI accepts**


#### - concert-this
* concert-this searchs the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api) to retrieve data about upcoming concerts on bands or artists

* The proper syntax is:

    * _concert-this < artist/band name here>_

#### - spotify-this-song
* spotify-this-song searchs the [Spotify API](https://developer.spotify.com) to retrieve data about songs with the song title that is searched

* The proper syntax is:

    * _spotify-this-song < songname here >_

#### - movie-this
* movie-this searchs the [OMDB API](http://www.ombdapi.com) to retrieve data about movie title that is searched

* The proper syntax is:

    * movie-this < moviename here >_

#### - do-what-it-says
* do-what-it-says will use the random.txt file and parse it to run the command for whatever is in the .txt file.  This does require proper formatting in the random.txt file **(ie: spotify-this-song,"I Want it That Way")**

* The proper syntax is:

    * _do-what-it-says_

## NPM Package Dependencies for this project:

> [axios](https://www.npmjs.com/package/axios)

> [dotenv](https://www.npmjs.com/package/dotenv)

> [moment](https://www.npmjs.com/package/moment)

> [node-spotify-api](https://www.npmjs.com/package/node-spotify-api)
  
