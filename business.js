class Business {
    constructor(id, {name, streetAddress, city, state, zipCode, phoneNumber, category, subcategory, website, email}) {
        this.name = name;
        this.streetAddress = streetAddress;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.phoneNumber = phoneNumber;
        this.category = category;
        this.subcategory = subcategory;
        this.website = website;
        this.email = email;
        this.links = [{"self":`/businesses/${id}`}];
    }
}

module.exports = { Business };