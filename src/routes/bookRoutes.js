const express = require('express');
const shortid = require('shortid');
const database = require('../data/database');
const isEmpty = require('lodash.isempty');

const bookRouter = express.Router();

const getBook = (id) => database.get('books').find({ id: id });

const router = () => {
    bookRouter.route('/')
        .get((req, res) => {
            res.send(database.get('books'));
        })
        .post((req, res, next) => {
            const reqBody = req.body;
            if (isEmpty(reqBody)) {
                handleError(400, 'received empty book', next);
            }

            const minBookTitleLength = 1;
            if (reqBody.title.length < minBookTitleLength) {
                handleError(400, 'book title is too short, should be 2 chars', next);
            }

            let savedBook;
            if (reqBody.id) {
                if(isEmpty(getBook(reqBody.id))){
                    handleError(400, 'invalid book id', next);
                }
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
        .get((req, res, next) => {
            const book = getBook(req.params.id);
            isEmpty(book)
                ? res.send(book)
                : handleError(404, 'book is not available', next);
        });

    return bookRouter;
};

function handleError(errCode, errMessage, next) {
    const err = new Error(errMessage);
    err.status = errCode;
    next(err);
}

module.exports = router();
