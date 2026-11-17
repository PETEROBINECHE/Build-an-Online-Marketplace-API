const {
  createProducts,
  allProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/Product.controllers");

const router = require("express").Router();

router.post("/createproducts/addone", createProducts);

router.get("/", allProduct);

router.patch("/updateproduct/one/:id", updateProduct);

router.delete("/deleteproduct/one/:id", deleteProduct);

module.exports = router;
