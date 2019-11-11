// Imports
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');


var spotify = new Spotify(keys.spotify);

spotify.search({ type: 'track', query: 'Hello' }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    // Artists
    console.log(data.tracks.items[0].artists[0].name);

    // Song Name
    console.log(data.tracks.items[0].name);

    // Album Name
    console.log(data.tracks.items[0].album.name);

    // link
    console.log(data.tracks.items[0].external_urls.spotify);
});