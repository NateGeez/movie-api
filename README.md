#myFlix API

This app contains a database with two collections. One collection stores information about users while another stores information about movies.

##Table of Contents

-#Introduction
-#Deployment
-#Technologies Used
-#Setup
-#Prerequisites
-#Installation
-#Configuration
-#Usage
-#Endpoints

##Introduction
The purpose of this application is to contain a database of movies and allows users to register for an account, add a list of their favorite movies, search for information on movies, directors, and genres.

##Deployment

Deployed on Heroku:

- https://natesmovieflix-742bdbb68d51.herokuapp.com/

##Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Passport.js
- Heroku

##Setup
###Prerequisites

- Node.js installed
- MongoDB Atlas account
- Heroku account

###Installation

1. Clone the repository:

```sh
git clone https://github.com/NateGeez/myflix-app.git
cd myflix-app
```

2. Install dependencies:

```sh
npm install
```

3. Create .env file in the root directory and add your MongoDB connection string:

```sh
CONNECTION_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFlixDB?retryWrites=true&w=majority
```

###Configuration

1. MongoDB Atlas:

   - Create a MongoDB Atlas cluster.
   - Obtain your connection URI.

2. Heroku Deployment
   - Set up Heroku app.
   - Configure environment variables ('CONNECTION_URI', 'PORT', etc.) on Heroku

##Usage
User can register an account creating a username adding a password, their email, and a list of their favorite movies. They can also query individual movies, genres, and directors within the database.

###Endpoints

- GET /movies Retrieve all movies
- GET /movies/:Title Retrieve data about a specific movie
- GET /movies/genre/:Name Retrieve data for a specific genre
- GET /movies/director/:Name Retrieve data for a specific director
- POST /users Register a new user
- GET /users/Username Retrieve user information
- PUT /users/Username Update user information
- POST /users/:Username/movies/:MovieID Add a movie to a user's favorites
- DELETE /users/:Username/movies/:MovieID Remove a movie from a user's favorites
- DELETE /users/:Username Delete a user account
