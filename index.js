// Project 1 Check-in 1
// Endpoints Design

let express = require('express');
const {Business} = require("./business");
let app = express();

let businesses = {};
let businesses_counter = 0;

let port = 6969;

app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on ${port}...`)
})

/*
User adds a new business

POST "/businesses/"
-------------------
    params:
        name, street_address, city, state, zip, phone_number, category, subcategory, (website), (email)

    res:
        {
            id,
            links: {
                "/businesses/id"
            }
        }
 */

app.post('/businesses/', (req, res, next) => {
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
    // Should all this parameter verification be a seperate next function?
    // Should we be calling a function here, then calling addNewBusiness from that fnc?

    businesses[id] = new Business(req.body);
    businesses_counter++;

    res.status(201).json({
        'id': id,
        'links': [
            {'self': `/businesses/${id}`}
        ]
    });
})


/*
User updates a business

PATCH "/businesses/{id}"
----------------------
    params:
        (name), (street_address), (city), (state), (zip), (phone_number), (category), (subcategory), (website), (email)

    res:

 */



/*
User removes a business

DELETE "/businesses/{id}"
-------------------------
    params:

    res:
 */



/*
User gets a list of all businesses

GET "/businesses/"
------------------
    params:

    res:
        [
            { id0, name, street_address, ... , (email) },
            { id1, name, street_address, ... , (email) },
            ... ,
            { idn, name, street_address, ... , (email) }
        ]
 */



/*
Users gets a specific business

GET "/businesses/{id}"
----------------------
    params:

    res:
        {
            name,
            street_address
            ...
            links : {
                photos: {
                    "/photos/id0",
                    "/photos/id1"
                },
                reviews: {
                    "/reviews/id0",
                    "/reviews/id1"
                }
            }
       }
 */



/*
User writes a new review

POST "/reviews/"
----------------
    params:
        star_rating, dollar_sign_rating, review_body

    res:
        {
            id,
            links: {
                "/reviews/id"
            }
        }
 */




/*
User deletes review

DELETE "/reviews/{id}"
----------------------
    params:

    res:
 */



/*
User updates review

PATCH "/reviews/{id}"
---------------------
    params:
        (star_rating), (dollar_sign_rating), (review_body)

    res:
 */


/*
User views reviews

GET "/reviews/{id}"
-------------------
    params:

    res:
 */



/*
User posts new photo

POST "/photos/"
---------------
    params:
        (caption)

    res:
        {
            id,
            links: {
                "/photos/id"
            }
        }
 */



/*
User deletes photo

DELETE "/photos/{id}"
---------------------
    params:

    res:
 */



/*
User modifies caption

PATCH "/photos/{id}"
--------------------
    params:
        (caption)

    res:
 */



/*
User wants to view a photo

GET "/photos/{id}"
------------------
    params:

    res:
 */




/*
User lists all photos

GET "/photos"
-------------
    params:

    res:
        {
            { id0, caption, links: "/photos/id0" },
            { id1, caption, links: "/photos/id1" },
            ... ,
            { id2, caption, links: "/photos/id2" }
        }
 */