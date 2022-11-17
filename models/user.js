const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');
const Schema = moongose.Schema;

const userSchema = new Schema({
    first_name : {
        type: String
    },
    last_name: {
        type: String
    },
    
    full_name: {
        type: String
    },
    image : {
        type: String
    },
    // Not used in code
    wallet: {
        type : Number,
        default: 0
    }
});

module_exports = mongoose.model('User',userSchema);