import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret = "secret";

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // User with the given email already exists, send an error message
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }

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

    res.status(201).json({ message: "User registered successfully", token });
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

    // Check if the user has an address
    const { houseNumber, city, address, country } = user;
    if (houseNumber && city && address && country) {
      const token = jwt.sign({ userId: user._id }, secret, {
        expiresIn: "100y",
      });
      return res
        .status(200)
        .json({ message: "Login successful", hasAddress: true, token });
    }

    // If the user doesn't have an address, generate the token without "hasAddress" field
    const token = jwt.sign({ userId: user._id }, secret, {
      expiresIn: "100y",
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Error logging in" });
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
      (item) => item.product.size[0] === product.size
    );

    if (existingCartItem && differentSize) {
      existingCartItem.quantity += 1;
      // If the product already exists in the cart, increment the quantity
    } else if (existingCartItem) {
      user.cart.unshift({ product, quantity: 1 });
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
// userController.js

const updateUserAddress = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { houseNumber, city, address, country } = req.body;

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // const { houseNumber, city, address, country } = user;
    if (houseNumber && city && address && country) {
      // Update the address fields
      user.houseNumber = houseNumber;
      user.city = city;
      user.address = address;
      user.country = country;

      // Save the updated user
      await user.save();

      const token = jwt.sign({ userId: user._id }, secret, {
        expiresIn: "100y",
      });
      return res
        .status(200)
        .json({ message: "update successful", hasAddress: true, token });
    }

    // Respond with the updated user data
  } catch (error) {
    // Handle any errors that may occur
    console.error("Error updating user address:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "user not found" });
  }
};
const checkoutItems = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const cartItems = user.cart;

    // Check if the cart is empty
    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Get the current date and time
    const orderDate = new Date();

    // Create an object to store the group of ordered items
    const groupItem = {
      items: cartItems.map((item) => ({
        product: { ...item.product },
        orderDate,
      })),
    };

    // Add the group of ordered items to the 'ordered' array in the user document
    user.ordered.push(groupItem);

    // Clear the cart after moving items to 'ordered'
    user.cart = [];

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: "Checkout successful", user });
  } catch (error) {
    return res.status(500).json({ message: "Error checking out", error });
  }
};
// get Order
const getOrder = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = user.ordered;
    res.json({ cart });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cart items", error });
  }
};

// received order
const receivedItem = async (req, res) => {
  try {
    // Find the user by ID (you can use any unique identifier here)
    const user = await User.findById(req.userId); // Assuming you pass the user ID in the URL

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Move items from 'ordered' to 'received'
    user.received.push(...user.ordered);
    user.ordered = []; // Clear the 'ordered' array

    // Save the changes
    await user.save();

    return res
      .status(200)
      .json({ message: "Items moved to received successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const getReceived = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = user.received;
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
  addOne,
  shoeSize,
  updateUserAddress,
  getUser,
  checkoutItems,
  getOrder,
  receivedItem,
  getReceived,
};
