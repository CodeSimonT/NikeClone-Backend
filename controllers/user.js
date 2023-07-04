import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { trusted } from "mongoose";

const secret = "secret";

const register = async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: `${firstname} ${lastname}`,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user });
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

    if (existingCartItem) {
      // If the product already exists in the cart, increment the quantity
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

export {
  register,
  login,
  authenticateUser,
  addToCart,
  deleteCart,
  retriveCart,
};
