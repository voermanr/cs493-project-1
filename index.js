// Project 1

let express = require('express');
let app = express();
app.use(express.json());

const busCon = require("./controllers/businessesController");
const revCon = require("./controllers/reviewsController");
const {findMissingParams} = require("./middeware/findMissingParameters");

let port = process.argv[2];
app.listen(port, () => {
    console.log(`Listening on ${port}...`)
})


// User adds a new business
app.post('/businesses/', busCon.setRequiredBusinessParams, findMissingParams, busCon.createNewBusiness);

// User gets a list of all businesses
app.get('/businesses/', busCon.getAllBusinesses);

// User gets a specific business
app.get('/businesses/:id', busCon.getBusinessById);

// User updates a business
app.patch('/businesses/:id', busCon.updateBusinessById);

// User removes a business
app.delete('/businesses/:id', busCon.deleteBusinessById);


// User posts a new review
app.post('/reviews/', revCon.setRequiredParams, findMissingParams, revCon.createNewReview)

// User deletes a review
app.delete('/reviews/:id', revCon.deleteReviewById)

// User updates a review
app.patch('/reviews/:id', revCon.updateReview);

// User views a review
app.get('/reviews/:id', revCon.getReviewById)


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