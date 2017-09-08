const express = require('express');

const notAvailableRouter = express.Router();

const router = () => {
    notAvailableRouter.route('/')
        .get((req, res, next) => {
            const err = new Error('page is not available');
            err.status = 404;
            next(err);
        });
    return notAvailableRouter;
};

module.exports = router();
