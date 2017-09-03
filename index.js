const express = require('express');
const app = express();


// NOTE: Workaround for development in local.
const cors = require('cors');
app.use(cors());


app.post('/books', function (req, res) {
  console.log('saving to database');
  // Add a post
  const id = shortid.generate();
  const newBook = { id: id, title: 'lowdb is awesome'};
  db.get('books')
    .push(newBook)
    .write();

  res.send(newBook);
});

const getBook = (id) => db.get('books').find({ id: id });

app.get('/books/:id', function (req, res) {
  res.send(getBook(req.params.id));
});

const port = 5000;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
