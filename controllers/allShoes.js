import { allShoesS } from "../models/index.js";

export const getAllShoes = async (req, res) => {
  const task = await allShoesS.find({});
  res.status(200).json({ task });
};
