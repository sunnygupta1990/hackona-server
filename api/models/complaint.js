const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    shopName: String,
    ownerName: String,
    contactNumber : String,
    whatsAppNumber : String,
    shopAddress : String,
    location : String,
});


//* First argument : Name of the model
//* Second Argumen : Name of the schema
//* Third Argument : Name of collection for this schema
module.exports = mongoose.model('shop',shopSchema,'shop');