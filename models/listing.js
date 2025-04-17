const mongoose = require("mongoose");
const listingSchema = new mongoose.Schema({
    title : String,
    image : String,
    Capacity: String,
    Material: String,
    Price: Number,
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;