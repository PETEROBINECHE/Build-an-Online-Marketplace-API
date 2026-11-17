const { createOrder, allorders, individualorders, retrieveAnOrders, updateOrderStatus } = require("../controllers/Order.controllers");


const router = require("express").Router();

router.post("/addorder/customerorder/:customerid/:productid", createOrder);

router.get("/allorders/all", allorders);

router.get("/individualorders/one/:id", individualorders);

router.get("/retrievenrders/one/:id", retrieveAnOrders);

router.put("/updatesrderstatus/status/:orderid", updateOrderStatus);

module.exports = router;