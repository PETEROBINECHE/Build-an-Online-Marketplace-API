const mongoose = require("mongoose");

const orderschema = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
    },
    productsID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    }],
    quantityOrder: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    orderStatus: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered"],
        default: "Pending",
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});


const orderModel = mongoose.model("order", orderschema);

module.exports = orderModel; 