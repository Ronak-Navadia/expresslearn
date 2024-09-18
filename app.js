const express = require('express');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
require('./db/connection');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();  // Pass control to the next handler
});

app.use('/users', usersRoute);
app.use('/auth', authRoute);

//test routes

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/about', (req, res) => {
  res.send('This is the about page.');
});

app.get('/contact', (req, res) => {
  res.send('Contact us at contact@example.com.');
});

app.get('/error', (req, res) => {
  throw new Error('This is a forced error.');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});