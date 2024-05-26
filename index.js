const express = require('express'),
  morgan = require('morgan');

const app = express();

let topMovies = [
  {
    title: 'Lord of the Rings',
    director: 'Peter Jackson',
  },
  {
    title: 'Forrest Gump',
    director: 'Robert Zemeckis',
  },
  {
    title: 'Jurassic Park',
    director: 'Steven Spielberg',
  },
  {
    title: 'Into the Wild',
    director: 'Sean Penn',
  },
  {
    title: 'Gladiator',
    director: 'Ridley Scott',
  },
  {
    title: 'Indiana Jones',
    director: 'Steven Spielberg',
  },
  {
    title: 'Memento',
    director: 'Christopher Nolan',
  },
  {
    title: 'Wall-E',
    director: 'Andrew Stanton',
  },
  {
    title: 'The Terminator',
    director: 'James Cameron',
  },
  {
    title: 'Inception',
    director: 'Christopher Nolan',
  },
];

// Logging usage to terminal
app.use(morgan('common'));

// Accessing files in public folder
app.use(express.static('public'));

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my movie club!');
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
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
