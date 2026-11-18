const express = require('express');
const customerRouter = require("./router/Customer.router");
const orderRouter = require("./router/Order.router");
const productRouter = require("./router/Product.router");
require("./db");

const PORT = 9009;
const app = express();
app.use(express.json());

app.use(customerRouter);
app.use(orderRouter);
app.use(productRouter);

app.listen(PORT,()=>{
    console.log("my app is running on port " + PORT + "working now")
});