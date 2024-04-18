class Review {
    constructor(id, {starRating, dollarSignRating, reviewBody}) {
        this.starRating = starRating;
        this.dollarSignRating = dollarSignRating;
        this.reviewBody = reviewBody;
        this.links = [{"self":`/reviews/${id}`}]
    }

    updateFields(desiredFields) {
        for (let field in desiredFields) {
            if (field in this) {
                this[field] = desiredFields[field];
            }
        }
    }
}

module.exports = { Review };