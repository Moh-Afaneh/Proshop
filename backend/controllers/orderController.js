import asyncHandler from "express-async-handler";
import Order from "../Models/orderModel.js";

// @desc    Create a new order
// @route   GET /api/order
// @access  private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    totalPrice,
    shippingPrice,
    taxPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(401).json({
      message: "No order items",
    });
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      totalPrice,
      shippingPrice,
      taxPrice,
    });
    const CreatedOrder = await order.save();
    res.status(201).json({
      message: "Order Created",
      CreatedOrder,
    });
  }
});
// @desc    Create a new order
// @route   GET /api/order
// @access  private
export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(201).json({
      order,
    });
  } else {
    res.status(401).json({
      message: "order was not found",
      FindOrder: null,
    });
  }
});
// @desc    Update order to Paid
// @route   GET /api/order/:id/pay
// @access  private
export const UpdateOrderToPay = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResults = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email,
    };
    const updatedOrder = await order.save();
    res.status(201).json({
      updatedOrder,
    });
  } else {
    res.status(401).json({
      message: "order was not found",
      FindOrder: null,
    });
  }
});
// @desc    get user order
// @route   GET /api/order/myorders
// @access  private
export const getOrderUsers = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id });

  if (orders) {
    res.status(201).json({
      Length: orders.length,
      orders,
    });
  } else {
    res.status(401).json({
      message: "there are no orders found",
      FindOrder: null,
    });
  }
});
// @desc    get user order
// @route   GET /api/order/myorders
// @access  private admin
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");

  if (orders) {
    res.status(201).json({
      Length: orders.length,
      orders,
    });
  } else {
    res.status(401).json({
      message: "there are no orders found",
      Orders: null,
    });
  }
});
// @desc    get user order
// @route   GET /api/order/myorders
// @access  private admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  console.log(order);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.status(201).json({
      updatedOrder,
    });
  } else {
    res.status(401).json({
      message: "order was not found",
      FindOrder: null,
    });
  }
});
