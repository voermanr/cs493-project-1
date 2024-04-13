class Photo {
    constructor(id, {caption}) {
        this.caption = caption;
        this.links = [
            {"self":`/photos/${id}`}
        ]
    }

    updateFields(desiredFields) {
        for (let field in desiredFields) {
            if (field in this) {
                this[field] = desiredFields[field];
            }
        }
    }
}