const {Photo} = require('../models/photo');

let photos = []
let photoCounter = 0;

module.exports.setRequiredParams = (req, res, next) => {
    req.requiredParams = [];
    next();
}

module.exports.createNewPhoto = (req, res, next) => {
    let id = photoCounter;
    photos[id] = new Photo(id, req.body);
    photoCounter++;

    res.status(201).json({
        'id': id,
        'links': [
            {'self': `/photos/${id}`}
        ]
    });
}

module.exports.getPhotoById = (req, res, next) => {
    let id = req.params.id;
    if (id in photos) {
        res.status(200).send(photos[id]);
    }
    else
        res.sendStatus(404);
}

module.exports.getAllPhotos = (req, res, next) => {
    //TODO: add pagination

    res.status(200).send(photos);
}

module.exports.updatePhotoById = (req, res, next) => {
    let id = req.params.id;
    if (id in photos) {
        photos[id].updateFields(req.body);
        res.status(200).send({
            'links': [
                {'self': `/photos/${id}`}
            ]
        });
    }
}

module.exports.deletePhoto = (req, res, next) => {
    let id = req.params.id;
    if (id in photos) {
        delete photos[id];
        res.sendStatus(204);
    }
    else {
        res.status(404).send('Photo not found.');
    }
}