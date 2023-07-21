import express from "express";
const userRouter = express.Router();
// user and add to cart feature
import {
  register,
  // register1,
  login,
  authenticateUser,
  addToCart,
  deleteCart,
  retriveCart,
  addOne,
  shoeSize,
} from "../controllers/user.js";

// routes for user
userRouter.post("/register", register);
userRouter.post("/login", login);
// cart
// add
userRouter.post("/addToCart", authenticateUser, addToCart);
// delete
userRouter.delete("/deleteCart/:productId", authenticateUser, deleteCart);
// read
userRouter.get("/retriveCart", authenticateUser, retriveCart);
// quantity
userRouter.patch("/addOne/:productId", authenticateUser, addOne);
// size
userRouter.patch("/shoeSize/:productId", authenticateUser, shoeSize);
export default userRouter;
