const customerModel = require("../models/Customer.models");

exports.createCustomer = async (req, res) => {
  try {
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    };

    const findEmail = await customerModel.findOne({ email: req.body.email });

    const findphoneNumber = await customerModel.findOne({
      phoneNumber: req.body.phoneNumber,
    });

    if (findEmail || findphoneNumber) {
      return res.status(404).json({
        message: "customer already exist",
      });
    }

    const customer = await customerModel.create(data);
    res.status(201).json({
      message: "customer creacted.",
      datas: customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "something is wrong",
      error: error.message,
    });
  }
};

exports.retrieveCustomer = async (req, res) => {
  try {
    const customerID = req.params.id;

    const findCustomerId = await customerModel.findById(customerID)
    .populate("orderdetailed").populate("productdetailed");
    if (!findCustomerId) {
      return res.status(404).json({
        message: "customer not found.",
      });
    }

    res.status(200).json({
      message: "customer gotting.",
      user: findCustomerId,
    });
  } catch (error) {
    res.status(500).json({
      message: "something is wrong",
      error: error.message,
    });
  }
};



exports.updateCustomer = async (req, res) => {
  try {
    const customerID = req.params.id;

    const updateCustomerId = await customerModel.findByIdAndUpdate(
        customerID,
        {
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
        },
        {returnDocument: "after", runValidators: true}
    );
    if (!updateCustomerId) {
      return res.status(404).json({
        message: "customer not found.",
      });
    }

    res.status(200).json({
      message: "customer updated.",
      user: updateCustomerId,
    });
  } catch (error) {
    res.status(500).json({
      message: "something is wrong",
      error: error.message,
    });
  }
};


exports.deleteCustomer = async (req, res) => {
  try {
    const customerID = req.params.id;

    const deleteCustomerId = await customerModel.findByIdAndDelete(
        customerID
    );
    if (!deleteCustomerId) {
      return res.status(404).json({
        message: "customer not found.",
      });
    }

    res.status(200).json({
      message: "customer deleted.",
    });
  } catch (error) {
    res.status(500).json({
      message: "something is wrong",
      error: error.message,
    });
  }
};




exports.retrieveCustomerProfile = async (req, res) => {
  try {
    const customerId = req.params.customerid;

    const customer = await customerModel
      .findById(customerId)
      .populate("orderdetailed");

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found."
      });
    }

    return res.status(200).json({
      message: "Customer profile successfully retrieved.",
      data: customer
    });

  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong.",
      error: error.message
    });
  }
};
