// Project 1 Check-in 2

let express = require('express');
const {Business} = require("./business");
const {Review} = require("./review");
const {Photo} = require("./photo");
let app = express();

let businesses = {};
let businesses_counter = 0;

let reviews = {};
let reviews_counter = 0;

let photos = {};
let photos_counter = 0;

let port = 6969;

app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on ${port}...`)
})


// User adds a new business
app.post('/businesses/', (req, res) => {
    let id = businesses_counter;

    let missingParameters = [];
    const requiredParameters = ['name', 'street_address', 'city', 'state', 'zip', 'phone_number', 'category', 'subcategory'];

    requiredParameters.forEach(param => {
        if (!req.body.hasOwnProperty(param)) {
            missingParameters.push(`${param} is missing`);
        }
    });

    if (missingParameters.length > 0) {
        return res.status(400).send(missingParameters.join("\n"));
    }
    // Should all this parameter verification be a separate next function?
    // Should we be calling a function here, then calling addNewBusiness from that fnc?

    businesses[id] = new Business(id, req.body);
    businesses_counter++;

    res.status(201).json({
        'id': id,
        'links': [
            {'self': `/businesses/${id}`}
        ]
    });
})

// User updates a business
app.patch('/businesses/:id', (req, res) => {
    //TODO: verify that the update contains only patchable fields
    //TODO: strip update to only patchable fields

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

// User gets a list of all businesses
app.get('/businesses/', (req, res) => {
    res.send(businesses);
})

// User gets a specific business
app.get('/businesses/:id', (req, res) => {
    let id = req.params.id;

    if (id in businesses) {
        res.status(200).send(businesses[id]);
    }
    else
        res.status(404).send('Business not found.');
})

// User posts a new review
app.post('/reviews/', (req, res) => {
    let id = reviews_counter;

    // TODO: link reviews to businesses somehow. require a business id?

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
    // Should all this parameter verification be a separate next function?
    // Should we be calling a function here, then calling addNewBusiness from that fnc?

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
    res.status(200).send(photos);
})