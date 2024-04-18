// Project 1

let express = require('express');
let app = express();
app.use(express.json());

const busCon = require("./controllers/businessesController");
const revCon = require("./controllers/reviewsController");
const phoCon = require("./controllers/photoController");
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
app.post('/photos/', phoCon.setRequiredParams, findMissingParams, phoCon.createNewPhoto)

// DELETE /photos/{id}
app.delete('/photos/:id', phoCon.deletePhoto);

// PATCH /photos/{id}
app.patch('/photos/:id', phoCon.updatePhotoById)

// GET /photos/{id}
app.get('/photos/:id', phoCon.getPhotoById)

// GET /photos/
app.get('/photos/', phoCon.getAllPhotos)


app.get('/*', (req, res) => {
    res.sendStatus(404);
})