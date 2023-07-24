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
  updateUserAddress,
  getUser,
  checkoutItems,
  getOrder,
  receivedItem,
  getReceived,
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
// updateUserAddress
userRouter.post("/updateUserAddress", authenticateUser, updateUserAddress);
// get user Data
userRouter.get("/getUser", authenticateUser, getUser);
//checkout
userRouter.post("/checkoutItems", authenticateUser, checkoutItems);
// get order
userRouter.get("/getOrder", authenticateUser, getOrder);
// received item
userRouter.post("/receivedItem", authenticateUser, receivedItem);
// get received
userRouter.get("/getReceived", authenticateUser, getReceived);

export default userRouter;
