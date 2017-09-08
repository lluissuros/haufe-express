const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// NOTE: Workaround for development in local.
const cors = require('cors');
app.use(cors());

// parse application/json
app.use(bodyParser.json());


const bookRouter = require('./src/routes/bookRoutes');
const notAvaliableRouter = require('./src/routes/notAvailableRoutes');
// const ratingRouter = require('./src/routes/ratingRoutes')(nav);

app.use('/Books', bookRouter);
// app.use('/Ratings', ratingRouter);
app.use('*', notAvaliableRouter);

//error handling
app.use(logErrors);
app.use(knownErrorHandler);
app.use(unknownErrorHandler);

function logErrors (err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function knownErrorHandler (err, req, res, next) {
    const KNOWN_ERROR_STATUS = [400, 404];
    if (KNOWN_ERROR_STATUS.find(knownErrStatus => knownErrStatus === err.status)) {
        res.status(err.status);
        res.send(err.message || '** this page doesnt exist :p **');
    } else {
        return next(err);
    }
}

function unknownErrorHandler (err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`listening on port ${port}!`);
});
