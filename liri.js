// Imports
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios');
var fs = require('fs');

// Get Arguments
var operation = process.argv[2];
var query_arg = process.argv.slice(3).join("+");

function run_liri(operation, query_arg) {

    // Branching conditions
    if (operation === "spotify-this-song") {
        querySpotify(query_arg);
    } else if (operation === 'concert-this') {
        querySeatgeek(query_arg);
    } else if (operation === 'movie-this') {
        queryOMDB(query_arg);
    } else if (operation === 'do-what-it-says') {

        console.log(operation);

        fs.readFile('./random.txt', 'utf-8', function (err, data) {
            line = data.replace(/\n|"/g, "").split(',');
            operation = line[0];
            query_arg = line[1].split(' ').join('+');

            run_liri(operation, query_arg);

        });
    }
}

run_liri(operation, query_arg);

function querySpotify(query_arg) {
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: query_arg }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // Artist
        console.log(data.tracks.items[0].artists[0].name);

        // Song Name
        console.log(data.tracks.items[0].name);

        // Album Name
        console.log(data.tracks.items[0].album.name);

        // link
        console.log(data.tracks.items[0].external_urls.spotify);
    });
}

function querySeatgeek(query_arg) {
    axios({
        method: 'get',
        url: `https://api.seatgeek.com/2/events?q=${query_arg}&client_id=${keys.seatgeek.id}`
    })
        .then(function (response) {
            console.log(response.data.events[0].title);
            // Print this in a prettier format
            console.log(response.data.events[0].datetime_local);
            console.log(response.data.events[0].venue.name + response.data.events[0].venue.display_location);
        })
}

function queryOMDB(query_arg) {
    if (query_arg === "") {
        query_arg = "Mr. Nobody"
    }

    axios({
        method: 'get',
        url: `https://www.omdbapi.com/?t=${query_arg}&apikey=${keys.omdb.key}`
    })
        .then(function (response) {
            console.log(response.data.Ratings);
            console.log('*' + response.data.Title);
            console.log('*' + response.data.Year);
            console.log('*' + response.data.imdbRating);
            try {
                console.log('*' + response.data.Ratings[1].Value);
            } catch {
                console.log('*No Rotten Tomatoes Rating');
            }
            console.log('*' + response.data.Country);
            console.log('*' + response.data.Plot);
            console.log('*' + response.data.Actors);
        })
}