const {Business} = require("../models/business");
let businesses = [];
let businessCounter = 0;

module.exports.setRequiredBusinessParams = (req, res, next) => {
        req.requiredParams = ['name', 'streetAddress', 'city', 'state', 'zip', 'phoneNumber', 'category', 'subcategory'];
        next();
}

module.exports.createNewBusiness = (req, res, next) => {
    let id = businessCounter;
    businesses[id] = new Business(id, req.body);
    businessCounter++;
    res.status(201).json({
        'id': id,
        'links': [
            {'self': `/businesses/${id}`}
        ]
    });
}

module.exports.getBusinessById = (req, res, next) => {
    let id = req.params.id;

    if (businesses[id] ) {
        res.status(200).send(businesses[id]);
    }
    else
        //TODO: remove this and make a general handler for when the path is not found. replace with a call to next()
        res.status(404).send('Business not found.');
}

module.exports.getAllBusinesses = (req, res, next) => {
    let page = parseInt(req.query.page) || 1;
    let numPerPage = 10;
    let lastPage = Math.ceil(businesses.length /numPerPage);
    page = page < 1 ? 1 : page;
    page = page > lastPage ? lastPage : page;

    let start = (page - 1) * numPerPage;
    let end = start + numPerPage;
    let pageBusinesses = businesses.slice(start, end);

    let links = {};
    if (page < lastPage) {
        links.nextPage = '/businesses?page=' + (page + 1);
        links.lastPage = '/businesses?page=' + lastPage;
    }
    if (page > 1) {
        links.prevPage = '/businesses?page=' + (page - 1);
        links.firstPage = '/businesses?page=1';
    }

    res.status(200).json({
        "pageNumber": page,
        "totalPages": lastPage,
        "pageSize": numPerPage,
        "totalCount": businesses.length,
        "businesses": pageBusinesses,
        "links": links
    });
}

module.exports.updateBusinessById = (req, res, next) => {
    //TODO: verify that the update contains only patchable fields

    let id = req.params.id;

    if (businesses[id]) {
        businesses[id].updateFields(req.body);

        res.status(200).send({
            'links': [
                {'self': `/businesses/${id}`}
            ]
        });
    }
    else
        res.sendStatus(404);
}

module.exports.deleteBusinessById = (req, res, next) => {
    let id = req.params.id;

    if (id in businesses) {
        delete businesses[id];
        businesses[id] = undefined;
        res.sendStatus(204);
    }
    else
        res.status(404).send(`Business not found.`);
}