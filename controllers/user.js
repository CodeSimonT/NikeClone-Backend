import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret = "secret";

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await User.create({
      username: `${firstname} ${lastname}`,
      email,
      password: hashedPassword,
    });

    const userId = await User.findOne({ email });

    const token = jwt.sign({ userId: userId._id }, secret, {
      expiresIn: "100y",
    });

    res
      .status(201)
      .json({ message: "User registered successfully", token, user });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, secret, {
      expiresIn: "100y",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  try {
    const decodedToken = jwt.verify(token, secret);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const addToCart = async (req, res) => {
  try {
    const product = req.body;
    const user = await User.findById(req.userId);
    const existingCartItem = user.cart.find(
      (item) => item.product.id === product.id
    );
    const differentSize = user.cart.find(
      (item) => item.product.size !== product.size
    );

    if (existingCartItem && differentSize) {
      // If the product already exists in the cart, increment the quantity
      user.cart.unshift({ product, quantity: 1 });
    } else if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      // If the product doesn't exist, add it as a new item in the cart
      user.cart.unshift({ product, quantity: 1 });
    }

    await user.save();
    res.json({ message: "Product added to cart", user });
  } catch (error) {
    res.status(500).json({ message: "Error adding product to cart", error });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.userId);

    // Find the index of the cart item with the given ID
    const itemIndex = user.cart.findIndex(
      (item) => item._id.toString() === productId
    );

    if (itemIndex !== -1) {
      // Remove the cart item from the array
      user.cart.splice(itemIndex, 1);
      await user.save();
      res.json({ message: "Cart item deleted", user });
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting cart item", error });
  }
};

const retriveCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = user.cart;
    res.json({ cart });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cart items", error });
  }
};

// quantity
const addOne = async (req, res) => {
  try {
    const { productId } = req.params;
    const { item } = req.body;
    const user = await User.findById(req.userId);
    const existingCartItem = user.cart.find(
      (item) => item._id.toString() === productId
    );

    if (existingCartItem) {
      const previousQuantity = existingCartItem.quantity; // Store the previous quantity
      existingCartItem.quantity = item;
      existingCartItem.product.price =
        (existingCartItem.product.price / previousQuantity) * item;
      await user.save(); // Save the updated user to persist the changes
      res.status(200).json({ msg: "Quantity incremented" });
    } else {
      res.status(404).json({ msg: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const shoeSize = async (req, res) => {
  try {
    const { productId } = req.params;
    const { item } = req.body;
    const user = await User.findById(req.userId);
    const existingCartItem = user.cart.find(
      (item) => item._id.toString() === productId
    );

    if (existingCartItem) {
      existingCartItem.product.size = item;
      await user.save(); // Save the updated user to persist the changes
      res.status(200).json({ msg: "Quantity incremented" });
    } else {
      res.status(404).json({ msg: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export {
  register,
  login,
  authenticateUser,
  addToCart,
  deleteCart,
  retriveCart,
  addOne,
  shoeSize,
};
