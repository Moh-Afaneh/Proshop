import express from "express";
import {
  authUser,
  DelUsers,
  getUserByIdAdmin,
  getUserProfile,
  getUsers,
  registerUser,
  UpdateUserAdmin,
  updateUserProfile,
} from "../controllers/userController.js";
import {
  protectAdmin,
  protectRoutes,
} from "../middleware/ProtectMiddelWare.js";
const router = express.Router();
// @desc Auth user & get token
// @route POST/api/users/login
// @access public
router.route("/").get(protectRoutes, protectAdmin, getUsers);
router.route("/login").post(authUser);
router.route("/signup").post(registerUser);
router
  .route("/profile")
  .get(protectRoutes, getUserProfile)
  .put(protectRoutes, updateUserProfile);
router
  .route("/:id")
  .delete(protectRoutes, protectAdmin, DelUsers)
  .get(protectRoutes, protectAdmin, getUserByIdAdmin)
  .put(protectRoutes, protectAdmin, UpdateUserAdmin);

export default router;
