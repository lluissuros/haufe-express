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
            const reqBody = req.body;
            // TODO: check if any body is received

            const minBookTitleLength = 1;
            if (reqBody.title.length < minBookTitleLength) {
            //TODO: send error
              //reject(`Title must be at least ${minBookTitleLength} characters.`);
            }

            let savedBook;
            if (reqBody.id) {
                //TODO: send error if sent id is not in our db.
                savedBook = database
                    .get('books')
                    .find({id: reqBody.id})
                    .assign(reqBody)
                    .write();
            } else {
                // Add a new book
                const newBook = Object.assign(
                    {},
                    reqBody,
                    { id: shortid.generate() }
                );
                database
                    .get('books')
                    .push(newBook)
                    .write();
                savedBook = database
                    .get('books')
                    .find({ id: newBook.id })
                    .value();
            }
            res.send(savedBook);
        });

    bookRouter.route('/:id')
        .get((req, res) => {
            res.send(getBook(req.params.id));
        });

    return bookRouter;
};

module.exports = router();
