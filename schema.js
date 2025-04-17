const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/.+\@.+\..+/, 'Invalid email format'],
    unique: true,
    lowercase: true,
    trim: true
  },
  age: {
    type: Number,
    min: [0, 'Age must be a positive number']
  }
});

module.exports = mongoose.model('User', userSchema);
