const mongoose = require('mongoose')

const ProductScehma = mongoose.Schema({
    id:Number,
    title:String,
    price:Number,
    description:String,
    category:String,
    image:String,
    sold:Boolean,
    dateOfSale:String

})

const Product  = mongoose.model('Product' , ProductScehma);

module.exports = Product;

