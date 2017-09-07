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

const port = 5000;
app.listen(port, function () {
  console.log(`listening on port ${port}!`);
});
