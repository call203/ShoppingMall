const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema({
    writer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        maxlength:50
    },
    description:{
        type:String,
    },
    Price:{
        type:Number,
        default:0
    },
    images:{
        type:Array,
        default:[]
    },
    Continents:{
        type:String
    },
    sold:{
        type:Number,
        maxlength:100,
        default:0
    },
    views:{
        type:Number,
        default:0
    }
},{timestamps:true})
   
productSchema.index({
    title:'text',
    description:'text'
},{
    weight:{
        title:5,
        description:1
    }
})


const Product = mongoose.model('Product', productSchema);
Product.createIndexes(); 
module.exports = { Product }