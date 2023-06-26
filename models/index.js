import mongoose from "mongoose";
// addidas
const addidasMenSchema = mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  description: String,
  sale: String,
  category: String,
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
  sale: String,
  category: String,
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
  sale: String,
  category: String,
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
  sale: String,
  category: String,
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
  sale: String,
  category: String,
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
  sale: String,
  category: String,
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
  sale: String,
  category: String,
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
  sale: String,
  category: String,
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
  sale: String,
  category: String,
  for: String,
  size: {
    type: [String],
  },
  image: String,
});

const allShoesS = mongoose.model("allShoes", allShoesSchema);

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
};
