const express = require('express'),
  morgan = require('morgan'),
  uuid = require('uuid'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Models = require('./models.js');

const Movies = Models.Movie,
  Users = Models.User;
(Genres = Models.Genre), (Directors = Models.Director);

mongoose.connect('mongodb://localhost:27017/cfDB');

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('common'));
app.use(express.static('public'));

// Default text response
app.get('/', (req, res) => {
  res.send('Welcome to MyFlix!');
});

// Return all movies
app.get('/movies', async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Return data about a single movie
app.get('/movies/:Title', async (req, res) => {
  await Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Return data about a genre
app.get('/genre/:Name', async (req, res) => {
  try {
    const movies = await Movies.find({ 'Genre.Name': req.params.Name });
    if (!movies || movies.length === 0) {
      return res.status(404).send('Genre not found');
    }
    // Extract genre descriptions from movies
    const genreDescriptions = movies.map((movie) => movie.Genre.Description);
    res.json(genreDescriptions);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching genre');
  }
});

// Return data about a director
app.get('/director/:Name', async (req, res) => {
  try {
    const movies = await Movies.find({ 'Director.Name': req.params.Name });
    if (!movies || movies.length === 0) {
      return res.status(404).send('Director not found');
    }
    // Extract director information from movies
    const directorsInfo = movies.map((movie) => ({
      Name: movie.Director.Name,
      Bio: movie.Director.Bio,
      Birth: movie.Director.Birth,
      Death: movie.Director.Death,
    }));
    res.json(directorsInfo);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching director');
  }
});

// Add a new user
app.post('/users', async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Get all users
app.get('/users', async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a user by username
app.get('/users/:Username', async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Update a user's info, by username
app.put('/users/:Username', async (req, res) => {
  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', async (req, res) => {
  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Remove a movie to a user's list of favorites
app.delete('/users/:Username/movies/:MovieID', async (req, res) => {
  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $pull: { FavoriteMovies: req.params.MovieID },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Delete a user by username
app.delete('/users/:Username', async (req, res) => {
  await Users.findOneAndDelete({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Error-handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
