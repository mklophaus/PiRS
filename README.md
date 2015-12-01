<p align="center">
<img src="https://i.imgur.com/E5WguAz.png" width="175px" />
</p>

<h1 align="center">PiRS.fm</h1>
​
Never argue with your friends about who gets to pick the music again! Brought to you by Boom Squad, Pi.RS is a peer to peer music application
​
Simply log in with your Spotify Account, add your friends, and we will generate a radio based on your and your friends Spotify playlists!
​
​_________________________

##Technologies Used

Development | APIs | Deplployment
------------|------|-------------
HTML | Spotify | Heroku
CSS | | MongoLab
JavaScript/jQuery |
Node.js |
Express |
Passport |
MongoDB |
Underscore |

##API Documentation

Method | Parameters | Description | Exposed
-------------|------|-----------|-------
`indexCircle` | `/indexCircle` | displays all circles in the database | Yes
`showCircle` | `/indexCircle/:id` | finds a circle by an id | Yes
`indexUser` | `/indexUser` | displays all users in the database | No
`displayCircleUsers` | `/circleUsers/:id` | displays all users for a circle id | No


_________________________
​
### USER MODEL

Parameters  | Value | Description | Example
----------- | ------ | ---------- | --------
displayName | String | Spotify Display Name | "Melissa Wilcox"
email | String | Email Registered with Spotify | email@email.com
spotifyId | String | Spotify User Name to Sign in | "mwilcox" 
profileImage | String | URL to Spotify User profile pic | http//:image/yourprofilepic
created | { type: Date, default: Date.now } | Date/Time user was created | 2015-11-30T18:20:31.240Z
accessToken | String | Token used from Spotify Oauth/Passport | 
circles | Array | Circle objects that user belongs to | [{ circleModel },  { circleModel }]
  

### CIRCLE MODEL


Parameters  | Value | Description | Example
----------- | ------ | ---------- | --------
​title | String | name of circle created | Boom Squad 
creator | {type: Schema.Types.ObjectId, ref: 'User'} | User ID who created the circle | 
created | { type: Date, default: Date.now } | Date/Time circle was created | 2015-11-30T18:20:31.240Z | 
users | [{type: Schema.Types.ObjectId, ref: 'User'}] | User IDs of Users who are a part of the circle 


![JSNode JQuery & Js Express](https://i.imgur.com/W7UeOHv.png) 


##Planning/Approach

Tasks were delegated and roles were identified as a mutual team decision. The plan consisted of building the core backend framework and functions using the Spotify API and then transitioning to Front End.
​
* Team Roles
    * Presentation Manager - Ben Benjamin
    * Documentation Manager - Melissa Wilcox
    * GitHub Manager - Mike Klophaus
    * Agile Manager - Gev Gharadaghi
    * VC/Project Manager - Judd Hood
 
##Trello

[BoomSquad - PiRS](https://trello.com/b/MC17o7Zr/pi-rs)
​
​
##Heroku/Website

[Pi Radio](http://www.pirs.fm)
​

##Model/Wireframes

[Model/Wireframe](http://rydr79.axshare.com/#p=login)
​

##Challenges

* Using an unfamiliar Oauth
* Managing workload and Github pull/push requests
* Manipulating API to get correct information needed for functionality of the App


##Installation

To run the application locally you will need to:

[BoomSquad - PiRS](https://trello.com/b/MC17o7Zr/pi-rs)
​
​
##Heroku/Website

[Pi Radio](www.pirs.fm)

​
##Model/Wireframes

[Model/Wireframe](http://rydr79.axshare.com/#p=login)
​
##Challenges

* Using an unfamiliar Oauth
* Managing workload and Github pull/push requests
* Manipulating API to get correct information needed for functionality of the App
​
​
## Installation
​ 
To run the application locally you will need to:
​
* Run npm install
* Run npm install for these additional items:
    * node-sass-middleware (install globally with "-g")
    * express-session
    * passport
    * passport-spotify
* Create a .env with the client_id and client_secret
​
​
​
​
​
​
​
​
___
​
© Boom Squad - Ben Benjamin, Gev Gharadaghi, Judd Hood, Melissa Wilcox, Mike Klophaus
