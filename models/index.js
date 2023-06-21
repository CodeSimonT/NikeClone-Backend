import mongoose from "mongoose";

const itemForm = mongoose.Schema({
  itemName: { type: String, require: true },
  price: { type: String, require: true },
  description: { type: String, require: true },
  sale: { type: String, require: true },
  size: [Number],
});
