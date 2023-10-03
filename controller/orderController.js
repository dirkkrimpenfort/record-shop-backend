const Order = require("../models/Order");

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send("Error fetching orders");
  }
};

exports.createOrder = async (req, res) => {
  const newOrder = req.body;
  try {
    const order = await Order.create(newOrder);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).send("Error creating order");
  }
};

exports.getOrderById = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).send("Order not found");
    } else {
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).send("Error fetching order");
  }
};

exports.updateOrderById = async (req, res) => {
  const orderId = req.params.id;
  const updatedOrder = req.body;
  try {
    const order = await Order.findByIdAndUpdate(orderId, updatedOrder, {
      new: true,
    });
    if (!order) {
      res.status(404).send("Order not found");
    } else {
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).send("Error updating order");
  }
};

exports.deleteOrderById = async (req, res) => {
  const orderId = req.params.id;
  try {
    const result = await Order.findByIdAndDelete(orderId);
    if (!result) {
      res.status(404).send("Order not found");
    } else {
      res.status(200).send("Order deleted");
    }
  } catch (error) {
    res.status(500).send("Error deleting order");
  }
};
