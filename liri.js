// Imports
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios');
var fs = require('fs');
var moment = require('moment');

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
    } else {
        console.log('That was an invalid operation. Try one of these functions:');
        console.log('* spotify-this-song');
        console.log('* movie-this');
        console.log('* concert-song');
        console.log('* do-what-it-says');
    }
}

run_liri(operation, query_arg);

function querySpotify(query_arg) {

    if (query_arg === "") {
        query_arg = "The Sign Ace of Base";
    }

    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: query_arg }, function (err, data) {
        if (err) {
            return console.log('No track was found under that name.');
        }
        // Artist
        console.log(`* Artist(s): ${data.tracks.items[0].artists[0].name}`);

        // Song Name
        console.log(`* Track: ${data.tracks.items[0].name}`);

        // Album Name
        console.log(`* Album: ${data.tracks.items[0].album.name}`);

        // link
        console.log(`* Link: ${data.tracks.items[0].external_urls.spotify}`);
    });
}

function querySeatgeek(query_arg) {
    axios({
        method: 'get',
        url: `https://api.seatgeek.com/2/events?q=${query_arg}&client_id=${keys.seatgeek.id}`
    })
        .then(function (response) {

            if (response.data.events.length === 0) {
                console.log('No concerts available for this query.');
            }

            response.data.events.forEach(function (event) {
                var concertName = event.title;
                var concertDateTime = event.datetime_local.split('T')[0];
                var venueName = event.venue.name;
                var venueLocation = event.venue.display_location;

                var dateTime = new Date(concertDateTime);
                dateTime = moment(dateTime).format("MM/DD/YYYY");

                console.log(`There is a ${concertName} concert on ${dateTime}.\nIt will be held at ${venueName} in ${venueLocation}.\n`);
            });


        });
};

function queryOMDB(query_arg) {
    if (query_arg === "") {
        query_arg = "Mr. Nobody"
    }

    axios({
        method: 'get',
        url: `https://www.omdbapi.com/?t=${query_arg}&apikey=${keys.omdb.key}`
    })
        .then(function (response) {

            // if 
            // console.log('No movies found in this database');
            if (response.data.Response === "False") {
                console.log('No Movie Found!');
            } else {

                var movieTitle = response.data.Title;
                var movieYear = response.data.Year;
                var imdbRating = response.data.imdbRating;

                try {
                    var rottenRating = response.data.Ratings[1].Value;
                } catch {
                    var rottenRating = 'No Rotten Tomatoes Rating';
                }

                var movieCountry = response.data.Country;
                var moviePlot = response.data.Plot;
                var movieActors = response.data.Actors;

                // Album Name
                console.log(`* Title: ${movieTitle}`);
                console.log(`* Year: ${movieYear}`);
                console.log(`* IMDB Rating: ${imdbRating}`);
                console.log(`* Rotten Tomatoes Rating: ${rottenRating}`);
                console.log(`* Country: ${movieCountry}`);
                console.log(`* Plot: ${moviePlot}`);
                console.log(`* Actors: ${movieActors}`);

            }

        })

}