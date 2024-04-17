// Project 1 Check-in 2

let express = require('express');
const {Business} = require("./business");
const {Review} = require("./review");
const {Photo} = require("./photo");
let app = express();

let businesses = [];
let businesses_counter = 0;

let reviews = [];
let reviews_counter = 0;

let photos = [];
let photos_counter = 0;

let port = process.argv[2];

app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on ${port}...`)
})

function findMissingParams(req, res, next) {
    let missingParams = [];
    let requiredParams = req.requiredParams;

    requiredParams.forEach(param => {
        if (!req.body.hasOwnProperty(param)) {
            missingParams.push(`${param}`);
        }
    });

    if (missingParams.length > 0) {
        res.status(400).send("missing parameters: " + missingParams.join(", "))
    }

    next()
}

function prepareBusinessParams(req, res, next) {
    req.requiredParams = ['name', 'street_address', 'city', 'state', 'zip', 'phone_number', 'category', 'subcategory'];

    next();
}

function createBusiness(req, res) {
    let id = businesses_counter;
    businesses[id] = new Business(id, req.body);
    businesses_counter++;
    res.status(201).json({
        'id': id,
        'links': [
            {'self': `/businesses/${id}`}
        ]
    });
}

// User adds a new business
app.post('/businesses/', prepareBusinessParams, findMissingParams, createBusiness)


// User updates a business
app.patch('/businesses/:id', (req, res) => {
    //TODO: verify that the update contains only patchable fields

    let id = req.params.id;

    if (id in businesses) {
        businesses[id].updateFields(req.body);

        res.status(200).send({
            'links': [
                {'self': `/businesses/${id}`}
            ]
        });
    }
    else
        res.sendStatus(404);
})

// User removes a business
app.delete('/businesses/:id', (req, res) => {
    let id = req.params.id;

    if (id in businesses) {
        delete businesses[id];
        res.sendStatus(204);
    }
    else
        res.status(404).send(`Business not found.`);
});

// User gets a specific business
app.get('/businesses/:id', (req, res) => {
    let id = req.params.id;

    if (id in businesses) {
        res.status(200).send(businesses[id]);
    }
    else
        res.status(404).send('Business not found.');
})

// User gets a list of all businesses
app.get('/businesses/', (req, res) => {
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
})

// User posts a new review
app.post('/reviews/', (req, res) => {
    let id = reviews_counter;

    // TODO: make a validate params middleware function
    let missingParameters = [];
    const requiredParameters = ['starRating', 'dollarSignRating'];

    requiredParameters.forEach(param => {
        if (!req.body.hasOwnProperty(param)) {
            missingParameters.push(`${param} is missing`);
        }
    });

    if (missingParameters.length > 0) {
        return res.status(400).send(missingParameters.join("\n"));
    }

    reviews[id] = new Review(id, req.body);
    reviews_counter++;

    res.status(201).json({
        'id': id,
        'links': [
            {'self': `/reviews/${id}`}
        ]
    });
})

// User deletes a review
app.delete('/reviews/:id', (req, res) => {
    let id = req.params.id;
    if (id in reviews) {
        delete reviews[id];
        res.sendStatus(204);
    }
    else {
        res.status(404).send('Review not found.');
    }
})

// User updates a review
app.patch('/reviews/:id', (req, res) => {
    let id = req.params.id;
    if (id in reviews) {
        reviews[id].updateFields(req.body);
        res.status(200).send({
            'links': [
                {'self': `/reviews/${id}`}
            ]
        });
    }
})

// User views a review
app.get('/reviews/:id', (req, res) => {
    let id = req.params.id;
    if (id in reviews) {
        res.status(200).send(reviews[id]);
    }
})

// User posts new photo
app.post('/photos/', (req, res) => {
    let id = photos_counter;

    photos[id] = new Photo(id, req.body);
    photos_counter++;

    res.status(201).send({
        'id': id,
        'links': [
            {'self': `/photos/${id}`}
        ]
    })
})

// DELETE /photos/{id}
app.delete('/photos/:id', (req, res) => {
    let id = req.params.id;
    if (id in photos) {
        delete photos[id];
        res.sendStatus(204);
    }
    else {
        res.status(404).send('Photo not found.');
    }
})

// PATCH /photos/{id}
app.patch('/photos/:id', (req, res) => {
    let id = req.params.id;
    if (id in photos) {
        photos[id].updateFields(req.body);
        res.status(200).send({
            'links': [
                {'self': `/photos/${id}`}
            ]
        });
    }
})

// GET /photos/{id}
app.get('/photos/:id', (req, res) => {
    let id = req.params.id;
    if (id in photos) {
        res.status(200).send(photos[id]);
    }
    else
        res.sendStatus(404);
})

// GET /photos/
app.get('/photos/', (req, res) => {
    //TODO: add pagination

    res.status(200).send(photos);
})

app.get('/*', (req, res) => {
    res.sendStatus(404);
})