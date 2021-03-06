# liri-node-app

* This App is a command-line tool to search Spotify Tracks, OMDB Movies, and SeatGeek Events easily from your terminal! No browser needed.

* The app uses routes different functions and their corresponding search terms into different functions, which then access the corresponding api to retrieve that information if it is found. The main functions are:
  * spotify-this-song
  * movie-this
  * concert-this
  * do-what-it-says

* Instructions to use:
0. Clone the repository to your local computer
1. Run npm install
2. Commands should be structured `node liri.js {command} {query arguments}`
3. The command must be run in the downloaded folder. Queries can have spaces and the command must be chosen from one of the above commands

Functioning Application Screenshot
![First Image](/assets/img/liri-1.png)
![First Image](/assets/img/liri-2.png)
![First Image](/assets/img/liri-3.png)
![First Image](/assets/img/liri-4.5.png)
![First Image](/assets/img/liri-4.png)
![First Image](/assets/img/liri-5.5.png)
![First Image](/assets/img/liri-5.png)
![First Image](/assets/img/liri-6.png)
![First Image](/assets/img/liri-7.png)

* Technologies
  * Node - to run backedn JS
  * Moment - to format dates
  * Axios - to make api requests
  * node-spoitfy-api - to make spotify api requests
  * dotenv - to hide api-keys

The only developer on this project was me.
