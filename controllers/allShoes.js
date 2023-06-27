import { allShoesS } from "../models/index.js";

// get all
export const getAllShoes = async (req, res) => {
  const task = await allShoesS.find({});
  res.status(200).json({ task });
};
// get single
export const getSingleShoes = async (req, res) => {
  const { id: itemID } = req.params;
  const task = await allShoesS.findOne({ _id: itemID });
  res.status(201).json({ task });
};
