const express = require('express');
const app = express();


// NOTE: Workaround for development in local.
const cors = require('cors');
app.use(cors());


const bookRouter = require('./src/routes/bookRoutes');
// const ratingRouter = require('./src/routes/ratingRoutes')(nav);

app.use('/Books', bookRouter);
// app.use('/Ratings', ratingRouter);

const port = 5000;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
