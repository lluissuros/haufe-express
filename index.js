const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// NOTE: Workaround for development in local.
const cors = require('cors');
app.use(cors());

// parse application/json
app.use(bodyParser.json());


const bookRouter = require('./src/routes/bookRoutes');
// const ratingRouter = require('./src/routes/ratingRoutes')(nav);

app.use('/Books', bookRouter);
// app.use('/Ratings', ratingRouter);
//

//handle all invalid urls
app.get('*', function(req, res, next) {
  const err = new Error();
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  if(err.status !== 404) {
    return next();
  }

  res.status(404);
  res.send(err.message || '** this page doesnt exist :p **');
});

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`listening on port ${port}!`);
});
