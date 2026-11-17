const productModel = require("../models/Product.models");


exports.createProducts = async (req, res) => {
  try {
    const productsdata = {
      productName: req.body.productName,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
      quantity: req.body.quantity,
    };

    const findproductName = await productModel.findOne({ productName: req.body.productName });

    const findproductcategory = await productModel.findOne({
      category: req.body.category,
    });

    if (findproductName && findproductcategory) {
      return res.status(404).json({
        message: "product already exist",
      });
    }

    const products = await productModel.create(productsdata);
    res.status(201).json({
      message: "products creacted.",
      datas: products
    });
  } catch (error) {
    res.status(500).json({
      message: "something is wrong",
      error: error.message
    });
  }
};



exports.allProduct = async (req, res) => {
  try {
    const allProducts = await productModel.find();
    res.status(200).json({
      message: "All products gotting.",
      data: allProducts
    });
  } catch (error) {
    res.status(500).json({
      message: "something is wrong",
      error: error.message
    });
  }
};



exports.updateProduct = async (req, res) => {
  try {
    const ProductID = req.params.id;

    const updateProductId = await productModel.findByIdAndUpdate(
        ProductID,
        {
        price: req.body.price,
        category: req.body.category,
        quantity: req.body.quantity,
        description: req.body.description
        },
        {returnDocument: "after", runValidators: true}
    );
    if (!updateProductId) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    res.status(200).json({
      message: "Product updated.",
      info: updateProductId,
    });
  } catch (error) {
    res.status(500).json({
      message: "something is wrong",
      error: error.message,
    });
  }
};



exports.deleteProduct = async (req, res) => {
  try {
    const productID = req.params.id;

    const deleteproductId = await productModel.findByIdAndDelete(
        productID
    );
    if (!deleteproductId) {
      return res.status(404).json({
        message: "product not found.",
      });
    }

    res.status(200).json({
      message: "Product deleted.",
    });
  } catch (error) {
    res.status(500).json({
      message: "something is wrong",
      error: error.message,
    });
  }
};