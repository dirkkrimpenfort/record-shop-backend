const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

router
  .route("/")
  .get(orderController.getOrders)
  .post(orderController.createOrder);

router
  .route("/:id")
  .get(orderController.getOrderById)
  .put(orderController.updateOrderById)
  .delete(orderController.deleteOrderById);

module.exports = router;
