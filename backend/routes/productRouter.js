import express from "express";
import {
  getProducts,
  getProductById,
  productDelete,
  productCreate,
  productUpdate,
} from "../Controllers/productController.js";
import {
  protectAdmin,
  protectRoutes,
} from "../middleware/ProtectMiddelWare.js";
const router = express.Router();
// @desc Fetch all products
// @route Get/api/products
// @access public
router
  .route("/")
  .get(getProducts)
  .post(protectRoutes, protectAdmin, productCreate);

// @desc Fetch single product
// @route Get/api/products/id
// @access public
router
  .route("/:id")
  .get(getProductById)
  .delete(protectRoutes, protectAdmin, productDelete)
  .patch(protectRoutes, protectAdmin, productUpdate);
export default router;
