const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./schema');

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to database'))
.catch((err) => {
  console.error('Error connecting to database', err);
  process.exit(1);
});

// POST API: Store user data
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.validate();
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: `Validation error: ${err.message}` });
    } else if (err.code === 11000) {
      res.status(400).json({ message: 'Email must be unique' });
    } else {
      console.error('Server error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
