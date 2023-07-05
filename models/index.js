import mongoose from "mongoose";
// addidas
const addidasMenSchema = mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  description: String,
  sale: Number,
  category: String,
  promo: String,
  for: String,
  size: {
    type: [String],
  },
  image: String,
});

const addidasWomenSchema = mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  description: String,
  sale: Number,
  category: String,
  promo: String,
  for: String,
  size: {
    type: [String],
  },
  image: String,
});

const AddidasMen = mongoose.model("addidasMen", addidasMenSchema);
const AddidasWomen = mongoose.model("addidasWomen", addidasWomenSchema);
// newbalanceMen
const newbalanceMenSchema = mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  description: String,
  sale: Number,
  category: String,
  promo: String,
  for: String,
  size: {
    type: [String],
  },
  image: String,
});
const newbalanceWomenSchema = mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  description: String,
  sale: Number,
  category: String,
  promo: String,
  for: String,
  size: {
    type: [String],
  },
  image: String,
});

const newbalanceMen = mongoose.model("newbalanceMen", newbalanceMenSchema);
const newbalanceWomen = mongoose.model(
  "newbalanceWomen",
  newbalanceWomenSchema
);
// nike
const nikeMenSchema = mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  description: String,
  sale: Number,
  category: String,
  promo: String,
  for: String,
  size: {
    type: [String],
  },
  image: String,
});

const nikeWomenSchema = mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  description: String,
  sale: Number,
  category: String,
  promo: String,
  for: String,
  size: {
    type: [String],
  },
  image: String,
});

const nikeMen = mongoose.model("nikeMen", nikeMenSchema);
const nikeWomen = mongoose.model("nikeWomen", nikeWomenSchema);

// underarmour
const underarmourWomenSchema = mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  description: String,
  sale: Number,
  category: String,
  promo: String,
  for: String,
  size: {
    type: [String],
  },
  image: String,
});

const underarmourMenSchema = mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  description: String,
  sale: Number,
  category: String,
  promo: String,
  for: String,
  size: {
    type: [String],
  },
  image: String,
});

const underarmourWomen = mongoose.model(
  "underarmourWomen",
  underarmourWomenSchema
);
const underarmourMen = mongoose.model("underarmourMen", underarmourMenSchema);

const allShoesSchema = mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  description: String,
  sale: Number,
  category: String,
  promo: String,
  for: String,
  size: {
    type: [String],
  },
  image: String,
});

const allShoesS = mongoose.model("allShoes", allShoesSchema);

// userSchema
const cartItemSchema = new mongoose.Schema({
  product: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    sale: { type: Number },
    category: { type: String },
    promo: { type: String },
    for: { type: String },
    size: { type: [String] },
    image: { type: String },
  },
  quantity: { type: Number, default: 1 },
});

const userSchema = mongoose.Schema({
  UserName: { type: String },
  email: { type: String },
  password: { type: String, required: true },
  cart: [cartItemSchema],
});

const userSchema1 = mongoose.Schema({
  UserName: { type: String },
  email: { type: String },
  password: { type: String, required: true },
  cart: [cartItemSchema],
});

const User = mongoose.model("User", userSchema);
const User1 = mongoose.model("User1", userSchema1);

export {
  AddidasMen,
  AddidasWomen,
  newbalanceMen,
  newbalanceWomen,
  nikeMen,
  nikeWomen,
  underarmourWomen,
  underarmourMen,
  allShoesS,
  User,
  User1,
};
