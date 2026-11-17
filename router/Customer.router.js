const {
  createCustomer,
  retrieveCustomer,
  updateCustomer,
  deleteCustomer,
  retrieveCustomerProfile,
} = require("../controllers/Customer.controllers");

const router = require("express").Router();

router.post("/createcustomer/new", createCustomer);

router.get("/getone/customer/:id", retrieveCustomer);

router.patch("/updateone/customer/:id", updateCustomer);

router.delete("/deleteone/customer/:id", deleteCustomer);

router.get("/retrieveCustomerProfile/:customerid", retrieveCustomerProfile);

module.exports = router;
