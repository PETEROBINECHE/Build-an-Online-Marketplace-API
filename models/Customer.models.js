const mongoose = require("mongoose");

const customerschema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    orderdetailed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "order"
    }],
    productdetailed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }]
});


const customerModel = mongoose.model("customer", customerschema);

module.exports = customerModel; 