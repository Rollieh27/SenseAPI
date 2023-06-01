const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = 3001;
const app = express();

// Middleware for parsing URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mounting the routes
app.use(routes);

// Connect to the database and start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
  });
});
