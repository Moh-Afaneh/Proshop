import express from "express";
import {
  getProducts,
  getProductById,
  productDelete,
  productCreate,
  productUpdate,
  createProductReview,
  getTopRated,
} from "../controllers/productController.js";
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
router.route("/:id/reviews").post(protectRoutes, createProductReview);
router.route("/top").get(getTopRated);

// @desc Fetch single product
// @route Get/api/products/id
// @access public
router
  .route("/:id")
  .get(getProductById)
  .delete(protectRoutes, protectAdmin, productDelete)
  .patch(protectRoutes, protectAdmin, productUpdate);
export default router;
