const mongoose = require("mongoose");

const productschema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Boolean,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});


const productModel = mongoose.model("product", productschema);

module.exports = productModel;