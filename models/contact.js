const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const contactSchema = new Schema ({
   
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type:String
    },
    message: {
        type:String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contactme',contactSchema);