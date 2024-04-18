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
    else
        next()
}

module.exports = { findMissingParams }
