require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require("axios");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var moment = require('moment');
var search = process.argv[3]
var action = process.argv[2]


// Write the following commands
// * `concert-this`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`
function liriBot(){
if (action == "concert-this") {
    var queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp"
    axios.get(queryUrl).then(
        function (response) {
            console.log(search + "is playing in the following places:")
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            // * Name of the venue
            for (var i = 0; i < response.data.length; i++) {
                console.log(response.data[i].venue.name)
                // * Venue location
                console.log(response.data[i].venue.city + "," + response.data[i].venue.country)
                // * Date of the Event (use moment to format this as "MM/DD/YYYY")
                var dateTime = moment(response.data[i].datetime).format("MM/DD/YYYY")
                console.log(dateTime)
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            }
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}
if ("spotify-this-song") {
    if(search==undefined){
        search="The Sign"
    }

    spotify
        .search({ type: 'track', query: search, limit: 1 })
        .then(function (response) {
            //console.log(response.tracks)
            console.log("~~~~")
            for(var i=0;i<response.tracks.items.length;i++){
               // console.log(response.tracks.items[i])
            //     * Artist(s)
            console.log("The song we found for your search features:")
            for(var j=0;j<response.tracks.items[i].artists.length;j++){
                console.log(response.tracks.items[i].artists[j].name)}
            //     * The song's name
            console.log("~~~~")
            console.log("The tracks name is "+response.tracks.items[i].name)
            //console.log(response.tracks.items[i].name)
            //     * A preview link of the song from Spotify
            console.log("A preview link for this song is "+response.tracks.items[i].external_urls.spotify)
            //     * The album that the song is from
            console.log("This song can be found on the Album "+response.tracks.items[i].album.name)
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
           
            //   * If no song is provided then your program will default to "The Sign" by Ace of Base.
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}
if("movie-this"){
if(search==undefined){
search="Mr. Nobody"
}
var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";



axios.get(queryUrl).then(
  function(response) {
    // * Title of the movie.
    console.log("Title: "+response.data.title)
    // * Year the movie came out.
    console.log("Release Year: " + response.data.Year);
    // * IMDB Rating of the movie.
    console.log("IMDB Rating: "+response.data.rating)
    // * Rotten Tomatoes Rating of the movie.
    console.log("Rotten Tomatoes Score: "+response.data.rating)
    // * Country where the movie was produced.
    console.log("Produced in "+response.data.produced.country)
    // * Language of the movie.
    console.log("Language: "+response.data.language)
    // * Plot of the movie.
    console.log("Plot: "+response.data.summary)
    // * Actors in the movie.
    console.log("Cast: "+response.data.cast)
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });


}
if("do-what-it-says"){
    var fs = require("fs")
    var random = 'spotify-this-song,"I Want it That Way"';
    var res = random.split(",");
    action = res[0]
    search = res[1]
    liriBot()
}
}