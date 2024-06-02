const express = require('express'),
  morgan = require('morgan'),
  uuid = require('uuid'),
  bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

let movies = [
  {
    title: 'Lord of the Rings',
    director: 'Peter Jackson',
    genre: 'Adventure',
  },
  {
    title: 'Forrest Gump',
    director: 'Robert Zemeckis',
    genre: 'Drama',
  },
  {
    title: 'Jurassic Park',
    director: 'Steven Spielberg',
    genre: 'Thriller',
  },
  {
    title: 'Into the Wild',
    director: 'Sean Penn',
    genre: 'Adventure',
  },
  {
    title: 'Gladiator',
    director: 'Ridley Scott',
    genre: 'Action',
  },
  {
    title: 'Indiana Jones',
    director: 'Steven Spielberg',
    genre: 'Action',
  },
  {
    title: 'Memento',
    director: 'Christopher Nolan',
    genre: 'Thriller',
  },
  {
    title: 'Wall-E',
    director: 'Andrew Stanton',
    genre: 'Adventure',
  },
  {
    title: 'The Terminator',
    director: 'James Cameron',
    genre: 'Science Fiction',
  },
  {
    title: 'Inception',
    director: 'Christopher Nolan',
    genre: 'Science Fiction',
  },
];

let users = [
  {
    name: 'Nathan',
  },
];

app.use(express.json());
app.use(morgan('common'));
app.use(express.static('public'));

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my movie club!');
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get('/movies/:title', (req, res) => {
  let movie = movies.find((movie) => movie.title === req.params.title);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send('Movie not found.');
  }
});

app.get('/movies/:title/genre', (req, res) => {
  let movie = movies.find((movie) => movie.title === req.params.title);
  res.json({ genre: movie.genre });
});

app.get('/movies/:title/director', (req, res) => {
  let movie = movies.find((movie) => movie.title === req.params.title);
  res.json({ director: movie.director });
});

app.post('/users', (req, res) => {
  res.send('Successful POST request of new user');
});

app.put('/users/:name', (req, res) => {
  let { name } = req.params;
  let newName = req.body.name;

  let userIndex = users.findIndex((user) => user.name === name);

  if (userIndex !== -1) {
    users[userIndex].name = newName;
    res.send('Successfully updated user ${name} to ${newName}');
  } else {
    res.status(404).send('User not found.');
  }
});

app.post('/movies', (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    let message = 'Missing "title" in request body';
    res.status(400).send(message);
  } else {
    newMovie.id = uuid.v4();
    movies.push(newMovie);
    res.status(201).send(newMovie);
  }
});

app.delete('/movies/:title', (req, res) => {
  let movieTitle = req.params.title;
  let movieIndex = movies.findIndex((movie) => movie.title === movieTitle);
  if (movieIndex !== -1) {
    movies.splice(movieIndex, 1);
    res.status(200).send(`Movie "${movieTitle}" was deleted`);
  } else {
    res.status(404).send('Movie not found.');
  }
});

app.delete('/users/:name', (req, res) => {
  let userName = req.params.name;
  let userIndex = users.findIndex((user) => user.name === userName);
  if (userIndex !== -1) {
    let deletedUserName = users[userIndex].name; // Get the name of the deleted user
    users.splice(userIndex, 1);
    res.status(200).send(`User "${deletedUserName}" was deleted.`); // Use deletedUserName
  } else {
    res.status(404).send('User not found.');
  }
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
