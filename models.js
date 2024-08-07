const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
    Birth: String,
    Death: String,
  },
  ImagePath: String,
  Featured: Boolean,
});

let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

// Password hashing occurs during user creation or updating
// User database was created before password hashing was incorporated
// Therefore I added return plain text password for existing user database
userSchema.methods.validatePassword = function (password) {
  // Check if the stored password is hashed
  const isPasswordHashed = this.Password.startsWith('$2b$');
  if (isPasswordHashed) {
    return bcrypt.compareSync(password, this.Password);
  } else {
    // For plain text passwords, compare directly
    return password === this.Password;
  }
};

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
