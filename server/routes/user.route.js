import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  getUserListing,
  getUser,
  toggleWishlist,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.get("/", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListing);
router.get("/:id", verifyToken, getUser);
router.post("/toggle-wishlist", verifyToken, toggleWishlist);

export default router;
