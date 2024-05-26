const express = require('express'),
  morgan = require('morgan');

const app = express();

app.use(morgan('common'));

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

app.use(express.static('public'));

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my movie club!');
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

//listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
