const {Review} = require('../models/review');
let reviews =[];
let reviewCounter = 0;

module.exports.setRequiredParams = (req, res, next) => {
    req.requiredParams = ['starRating', 'dollarSignRating'];
    next();
}

module.exports.createNewReview = (req, res) => {
    let id = reviewCounter;
    reviews[id] = new Review(id, req.body);
    reviewCounter++;

    res.status(201).json({
        'id': id,
        'links': [
            {'self': `/reviews/${id}`}
        ]
    });
}

module.exports.getReviewById = (req, res, next) => {
    let id = req.params.id;

    if (reviews[id]) {
        res.status(200).send(reviews[id]);
    }
    else {
        res.statusText('Review not found.');
        next();
    }
}

module.exports.updateReview = (req, res, next) => {
    let id = req.params.id;
    if (reviews[id]) {
        reviews[id].updateFields(req.body);
        res.status(200).send({
            'links': [
                {'self': `/reviews/${id}`}
            ]
        });
    }
    else {
        res.statusText('Review not found.');
        next();
    }
}

module.exports.deleteReviewById = (req, res, next) => {
    let id = req.params.id;
    if (id in reviews) {
        delete reviews[id];
        res.sendStatus(204);
    }
    else {
        res.statusText('Review not found.');
        next();
    }
}