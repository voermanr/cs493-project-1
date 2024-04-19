const {Photo} = require('../models/photo');

let photos = []
let photoCounter = 0;

module.exports.setRequiredParams = (req, res, next) => {
    req.requiredParams = [];
    next();
}

module.exports.createNewPhoto = (req, res) => {
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
    else {
        res.statusText = "No photo found";
        next();
    }
}

module.exports.getAllPhotos = (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let numPerPage = 10;
    let lastPage = Math.ceil(photos.length /numPerPage);
    page = page < 1 ? 1 : page;
    page = page > lastPage ? lastPage : page;

    let start = (page - 1) * numPerPage;
    let end = start + numPerPage;
    let pagePhotos = photos.slice(start, end);

    let links = {};
    if (page < lastPage) {
        links.nextPage = '/photos?page=' + (page + 1);
        links.lastPage = '/photos?page=' + lastPage;
    }
    if (page > 1) {
        links.prevPage = '/photos?page=' + (page - 1);
        links.firstPage = '/photos?page=1';
    }

    res.status(200).json({
        "pageNumber": page,
        "totalPages": lastPage,
        "pageSize": numPerPage,
        "totalCount": photos.length,
        "photos": pagePhotos,
        "links": links
    });
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
    else {
        res.statusText = "No photo found";
        next();
    }
}

module.exports.deletePhoto = (req, res, next) => {
    let id = req.params.id;
    if (id in photos) {
        delete photos[id];
        res.sendStatus(204);
    }
    else {
        res.statusText = 'Photo not found';
        next();
    }
}