const express = require('express');
const database = require('../data/database');

const ratingRouter = express.Router();

ratingRouter.route('/')
    .get((req, res) => {
        res.send(database.get('ratings'));
    });

module.exports = ratingRouter;
