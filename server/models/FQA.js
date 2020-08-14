const mongoose = require('mongoose');

const faqSchema = mongoose.Schema({
    writer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    Question:{
        type:String,
        maxlength:50
    },
    Answer:{
        type:String,
    },
    Continent:{
        type:String
    }

})
   

const FAQ = mongoose.model('FAQ', faqSchema);

module.exports = { FAQ }