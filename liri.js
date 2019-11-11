// Imports
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios');

// Get Arguments
var operation = process.argv[2];
var query_arg = process.argv[3];

if (operation === "spotify-this-song") {

    // var spotify = new Spotify(keys.spotify);

    // spotify.search({ type: 'track', query: query_arg }, function (err, data) {
    //     if (err) {
    //         return console.log('Error occurred: ' + err);
    //     }

    //     // Artists
    //     console.log(data.tracks.items[0].artists[0].name);

    //     // Song Name
    //     console.log(data.tracks.items[0].name);

    //     // Album Name
    //     console.log(data.tracks.items[0].album.name);

    //     // link
    //     console.log(data.tracks.items[0].external_urls.spotify);
    // });

} else if (operation === 'concert-this') {

    axios({
        method: 'get',
        url: `https://api.seatgeek.com/2/events?q=${query_arg}&client_id=${keys.seatgeek.id}`
    })
        .then(function (response) {
            console.log(response.data.events[0].title);
        })
} else if (operation === 'movie-this') {

    axios({
        method: 'get',
        url: `https://www.omdbapi.com/?t=${query_arg}&apikey=${keys.omdb.key}`
    })
        .then(function (response) {
            console.log('*' + response.data.Title);
            console.log('*' + response.data.Year);
            console.log('*' + response.data.imdbRating);
            console.log('*' + response.data.Ratings[1].Value);
            console.log('*' + response.data.Country);
            console.log('*' + response.data.Plot);
            console.log('*' + response.data.Actors);
        })

};