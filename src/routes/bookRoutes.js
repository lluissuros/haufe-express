const express = require('express');
const shortid = require('shortid');
const database = require('../data/database');

const bookRouter = express.Router();

const getBook = (id) => database.get('books').find({ id: id });

const router = () => {
    bookRouter.route('/')
        .get((req, res) => {
            res.send(database.get('books'));
        })
        .post((req, res) => {
            console.log('saving to database');
            // Add a post
            const id = shortid.generate();
            const newBook = { id: id, title: 'lowdb is awesome'};
            database.get('books')
            .push(newBook)
            .write();

            res.send(newBook);
        });

    bookRouter.route('/:id')
        .get((req, res) => {
            res.send(getBook(req.params.id));
        });

    return bookRouter;
};

module.exports = router();
