import express from "express";
import {
  addOrderItems,
  getOrder,
  getOrders,
  getOrderUsers,
  updateOrderToDelivered,
  UpdateOrderToPay,
} from "../controllers/orderController.js";
import {
  protectAdmin,
  protectRoutes,
} from "../middleware/ProtectMiddelWare.js";

const router = express.Router();
router
  .route("/")
  .post(protectRoutes, addOrderItems)
  .get(protectRoutes, protectAdmin, getOrders);
router.route("/myorders").get(protectRoutes, getOrderUsers);
router.route("/:id").get(protectRoutes, getOrder);
router.route("/:id/pay").put(protectRoutes, UpdateOrderToPay);
router
  .route("/:id/deliver")
  .put(protectRoutes, protectAdmin, updateOrderToDelivered);
export default router;
