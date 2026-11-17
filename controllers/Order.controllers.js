const orderModel = require("../models/Order.models");
const customerModel = require("../models/Customer.models");
const productModel = require("../models/Product.models");


exports.createOrder = async (req, res) => {
  try {
    const customerID = req.params.customerid;

    const productID = req.params.productid;


    const quantity = Number(req.body.quantityOrder);
    

    const findcustomer = await customerModel.findById(customerID);
    if (!findcustomer) {
      return res.status(404).json({
        message: "customer not existing",
      });
    };

    const findproduct = await productModel.findById(productID);    
    if (!findproduct) {
      return res.status(404).json({
        message: "product not existing",
      });
    };

    // Validate quantity
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({
        message: "Please provide a valid quantity",
      });
    }

    const totalToPay = findproduct.price * quantity;
    

    const customerOrder = new orderModel({
      customerId: findcustomer._id,
      productsID: [findproduct._id],
      quantityOrder: quantity,
      totalAmount: totalToPay
    });    
    await customerOrder.save();

    findcustomer.orderdetailed.push(customerOrder._id);
    findcustomer.productdetailed.push(findproduct._id);
    await findcustomer.save();

    res.status(201).json({
      message: "order creacted successfully.",
      datas: customerOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "something is wrong",
      error: error.message,
    });
  }
};



exports.allorders  = async (req, res) => {
  try {
    const allorder = await orderModel.find();

    if (allorder.length === 0) {
      return res.status(404).json({
        message: "No orders found."
      });
    }

    res.status(200).json({
      message: "All orders successfully retrieved.",
      totalOrders: allorder.length,
      data: allorder
    });
  } catch (error) {
    res.status(500).json({
      message: "something is wrong",
      error: error.message
    });
  }
};


exports.individualorders  = async (req, res) => {
  try {
    const orderId = req.params.id;

    const oneOrder = await orderModel.findById(orderId);
    if(!oneOrder){
      res.status(404).json({
      message: "individual order not found."
    });
    };
    
    res.status(200).json({
      message: "Order successfully retrieved.",
      data: oneOrder
    });
  } catch (error) {
    res.status(500).json({
      message: "something is wrong",
      error: error.message
    });
  }
};



exports.retrieveAnOrders  = async (req, res) => {
  try {
    const orderId = req.params.id;

    const oneOrder = await orderModel.findById(orderId).populate("customerId").populate("productsID");
    if(!oneOrder){
     return res.status(404).json({
      message: "Order not found."
    });
    };

    // Check whether the customer exists
    if (!oneOrder.customerId) {
      return res.status(404).json({
        message: "Customer associated with this order was not found."
      });
    }

    // Check whether any product was not found
    const productNotFound = oneOrder.productsID.some(
      (product) => product === null
    );

    if (productNotFound) {
      return res.status(404).json({
        message: "One or more products associated with this order were not found."
      });
    }  

    res.status(200).json({
      message: "Order successfully retrieved.",
      data: oneOrder
    });
  } catch (error) {
    res.status(500).json({
      message: "something is wrong",
      error: error.message
    });
  }
};


exports.updateOrderStatus = async (req, res) => {
  try {
    const orderID = req.params.orderid;
    const { orderStatus } = req.body;

    const getorder = await orderModel.findById(orderID);
    if(!getorder){
      return res.status(404).json({
      message: "Order not found.",
    });
    };

    getorder.orderStatus = orderStatus;

    await getorder.save();

    res.status(200).json({
      message: "Order status successfully updated",
      data: getorder
    });

  } catch (error) {
    res.status(500).json({
      message: "something is wrong",
      error: error.message
    });
  }
}