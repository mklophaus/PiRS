<p align="center">
<img src="https://i.imgur.com/E5WguAz.png" width="175px" />
</p>

<h1 align="center">PiRS.fm</h1>

_**[OVERVIEW](#overview)**_ | 
_**[GETTING STARTED](#start)**_ | 
_**[ENDPOINT REFERENCE](#endpoint)**_ | 
_**[DATA MODEL](#model)**_
​
<a name="overview"></a>
##Overview

Never argue with your friends about who gets to pick the music again! Brought to you by Boom Squad, PiRS is a peer to peer music application
​
Simply log in with your Spotify Account, add your friends, and we will generate a radio based on your and your friends Spotify playlists! To get jammin' head to [Pi Radio](http://www.pirs.fm).
​
​_________________________

###Technologies Used

* HTML
* CSS
* JavaScript/jQuery
* Node.js
* Express
* Passport
* MongoDB/MongoLab
* Spotify API
* Heroku

![JSNode JQuery & Js Express](https://i.imgur.com/W7UeOHv.png) 


##Planning/Approach

Tasks were delegated and roles were identified as a mutual team decision. The plan consisted of building the core backend framework and functions using the Spotify API and then transitioning to Front End.

**Planning/Trello** [here](https://trello.com/b/MC17o7Zr/pi-rs)

**Model/Wireframes:** [Model/Wireframe](http://rydr79.axshare.com/#p=login)
​
* Team Roles
    * Presentation Manager - Ben Benjamin
    * Documentation Manager - Melissa Wilcox
    * GitHub Manager - Mike Klophaus
    * Agile Manager - Gev Gharadaghi
    * VC/Project Manager - Judd Hood
​
##Challenges

* Using an unfamiliar Oauth
* Managing workload and Github pull/push requests
* Manipulating API to get correct information needed for functionality of the App

<a name="start"></a>
##Installation
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


##RESTFull API

 HTTP Verb  | Endpoint                                | Access    
:----------:|-----------------------------------------|:---------------:
 `GET`      | [`/api/circles`](#circleIndex)          | login required
 `GET`      | [`/api/circles/:id`](#showCircle)       | login required
 `GET`      | [`/api/users`](#userIndex)              | login required
 `GET`      | [`/api/me`](#currentUser)               | login required

<a name="circleIndex"></a>
###Show All Circles

**Endpoint**

```GET http://pirs.fm/api/circles```

**Response Format**

On success, the HTTP status code in the response header is 200 OK and the response body contains a a all circles in the database in JSON format. On error, the header status code is an error code and the response body contains an error message.

**Example**

```GET http://pirs.fm/api/circles```
```
[
  {
    _id:     "56932544720a7022242608fe",
    creator: "56932522720a7022242608fd",
    title:   "Boom Squad",
    users:   ["56932522720a7022242608fd",
              "56932544720a702224260900",
              "56932544720a7022242608ff"
             ],
    created: "2016-01-11T03:45:08.295Z"
  },
  {
    _id:     "569473bd33543f532c5b511f",
    creator: "56932522720a7022242608fd",
    title:   "Homies",
    users:   ["56932522720a7022242608fd",
              "569473bd33543f532c5b5120",
              "569473bd33543f532c5b5121"
             ],
    created: "2016-01-12T03:32:13.198Z"
  }
]
```

<a name="showCircle"></a>
###Show Circle

**Endpoint**

```GET http://pirs.fm/api/circles/:id```

**Response Format**

On success, the HTTP status code in the response header is 200 OK and the response body contains a a circle in JSON format. On error, the header status code is an error code and the response body contains an error message.

**Example**

```GET http://pirs.fm/api/circles/56932544720a7022242608fe```
```
{
  _id:     "56932544720a7022242608fe",
  creator: "56932522720a7022242608fd",
  title:   "Boom Squad",
  users:   ["56932522720a7022242608fd",
            "56932544720a702224260900",
            "56932544720a7022242608ff"
           ],
  created: "2016-01-11T03:45:08.295Z"
}
```

<a name="userIndex"></a>
###Show All Users

**Endpoint**

```GET http://pirs.fm/api/users```

**Response Format**

On success, the HTTP status code in the response header is 200 OK and the response body contains a a all users in the database in JSON format. On error, the header status code is an error code and the response body contains an error message.

**Example**

```GET http://pirs.fm/api/users```
```
{
  _id:          "569473bd33543f532c5b5120",
  displayName:  "Jane Jones",
  email:        "example@email.com",
  spotifyId:    "maddawg234"
  profileImage: "https://i.imgur.com/N78DGH.png",
  accessToken:  "BQCzS5NpP2ZiEXMmglDZ6Nk5BdQqaWiCM6rgdky8dpNmo",
  circles:      ["569473bd33543f532c5b511f"],
  created:      "2016-01-12T03:32:13.402Z"
},
{
  _id:          "56932522720a7022242608fd",
  displayName:  "John Smith",
  email:        "email@gmail.com",
  spotifyId:    "swizzle",
  profileImage: "https://i.imgur.com/NRhYDQD.png",
  accessToken:  "BQC-C29nYBaSByeIVi61WQ0aJ_PPceLiaAfAvnWwF0mO",
  circles:      ["56932544720a7022242608fe",
                 "569473bd33543f532c5b511f"
                ],
  created:      "2016-01-11T03:44:34.792Z"
}
```
<a name="currentUser"></a>
###Show Current User

**Endpoint**

```GET http://pirs.fm/api/me```

**Response Format**

On success, the HTTP status code in the response header is 200 OK and the response body contains all of the current users information in JSON format. On error, the header status code is an error code and the response body contains an error message.

**Example**

```GET http://pirs.fm/api/me```
```
{
  _id:          "569473bd33543f532c5b5120",
  displayName:  "Jane Jones",
  email:        "example@email.com",
  spotifyId:    "maddawg234"
  profileImage: "https://i.imgur.com/N78DGH.png",
  accessToken:  "BQCzS5NpP2ZiEXMmglDZ6Nk5BdQqaWiCM6rgdky8dpNmo",
  circles:      ["569473bd33543f532c5b511f"],
  created:      "2016-01-12T03:32:13.402Z"
}
```

<a name="model"></a>​
### Data Models

*User*

Parameters       |Value    | Description         |Example
-----------------|---------|---------------------|--------
`displayName`    |`String` |Spotify Display Name | "John Smith"
`email`          |`String` |Email Registered with Spotify | email@email.com
`spotifyId`      |`String` |Spotify User Name to Sign in | "jsmith" 
`profileImage`   |`String` |URL to Spotify User profile picture | http//:image/yourprofilepic
`created`        |`{ type: Date, default: Date.now }` | Date/Time user was created | 2015-11-30T18:20:31.240Z
`accessToken`    | `String` | Token used from Spotify Oauth/Passport | 
`circles`        | `[{ type: Schema.Types.ObjectId, ref: 'Circle' }]` |An array of circle ID's for all the circles a user belongs to | ["569473bd335", "43f532c5b511f"]
  

*Circle*

Parameters       |Value    |Description              |Example
-----------------|---------|-------------------------|--------
​`title`          |`String` | name of circle created  | Boom Squad 
`creator`        |`{type: Schema.Types.ObjectId, ref: 'User'}` | User ID who created the circle | 
`created`        |`{ type: Date, default: Date.now }`| Date/Time circle was created | 2015-11-30T18:20:31.240Z | 
`users`          |`[{type: Schema.Types.ObjectId, ref: 'User'}]` | User IDs of Users who are a part of the circle 
​
​
​
​
​
___
​
© Boom Squad - Ben Benjamin, Gev Gharadaghi, Judd Hood, Melissa Wilcox, Mike Klophaus
