// Create web server
// npm install express
// npm install body-parser
// npm install cors
// npm install nodemon
// npm install mongoose
// npm install dotenv

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialize express
const app = express();

// Implement middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// Create schema
const commentSchema = new mongoose.Schema({
  comment: String
});

// Create model
const Comment = mongoose.model('Comment', commentSchema);

// Create API endpoints
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/comments', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      res.status(500).send('Error');
    } else {
      res.status(200).json(comments);
    }
  });
});

app.post('/comments', (req, res) => {
  const newComment = new Comment({
    comment: req.body.comment
  });
  newComment.save((err, comment) => {
    if (err) {
      res.status(500).send('Error');
    } else {
      res.status(201).json(comment);
    }
  });
});

app.put('/comments/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, {
    comment: req.body.comment
  }, (err, comment) => {
    if (err) {
      res.status(500).send('Error');
    } else {
      res.status(200).json(comment);
    }
  });
});

app.delete('/comments/:id', (req, res) => {
  Comment.findByIdAndDelete(req.params.id, (err, comment) => {
    if (err) {
      res.status(500).send('Error');
    } else {
      res.status(200).json(comment);
    }
  });
});

// Start web server
app.listen(process.env.PORT, () => {
  console.log(`Web server is running on port ${process.env.PORT}`);
});



