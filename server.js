// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const path = require('path');
require('dotenv').config();

const cors = require('cors');
const logger = require('morgan');
const compression  = require('compression');
const helmet  = require('helmet');


const port = process.env.PORT || 5431
const app = express()

if (process.env.NODE_ENV === 'development') {
  console.log("Environment ==> 'development'");

  // logger
  app.use(logger('dev'));

  // cors.
  app.use(cors())
}

if (process.env.NODE_ENV  === 'production') {
  console.log("Environment ==> 'production'");

  app.use(logger('tiny'));
  // Returns the compression middleware
  app.use(compression());
  // Helmet helps you secure your Express apps by setting various HTTP headers.
  app.use(helmet());
}

// Pars the requests
app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'build')))

// Test route.
app.get('/ping', function(req, res) {
  return res.send('pong')
})

// send statics files.
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

/** Handel Errors */
app.use((req, res, next) => {
  const error = new Error('Resource not Found');
  error.status = 404;
  next(error);
});
app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message || "Server Error!"
    }
  });
});
/** End Handel Errors */

app.listen(port);
console.log(`Server started on: http://localhost:${port}`)

