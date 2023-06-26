import {
  AddidasMen,
  newbalanceMen,
  nikeMen,
  underarmourMen,
} from "../models/index.js";

// AddidasMen get all
const getAllAddidasMen = async (req, res) => {
  const task = await AddidasMen.find({});
  res.status(200).json({ task });
};
// AddidasMen get single
const getSingleAddidasMen = async (req, res) => {
  const { id: itemID } = req.params;
  const task = await AddidasMen.findOne({ _id: itemID });
  res.status(201).json({ task });
};

// newbalanceMen get all
const getAllNewbalanceMen = async (req, res) => {
  const task = await newbalanceMen.find({});
  res.status(200).json({ task });
};
// newbalanceMen get single
const getSingleNewbalanceMen = async (req, res) => {
  const { id: itemID } = req.params;
  const task = await newbalanceMen.findOne({ _id: itemID });
  res.status(201).json({ task });
};

// nikeMen get all
const getAllNikeMen = async (req, res) => {
  const task = await nikeMen.find({});
  res.status(200).json({ task });
};
// nikeMen get single
const getSingleNikeMen = async (req, res) => {
  const { id: itemID } = req.params;
  const task = await nikeMen.findOne({ _id: itemID });
  res.status(201).json({ task });
};

// underarmourMen get all
const getAllUnderArmourMen = async (req, res) => {
  const task = await underarmourMen.find({});
  res.status(200).json({ task });
};
// underarmourMen get single
const getSingleUnderArmourMen = async (req, res) => {
  const { id: itemID } = req.params;
  const task = await underarmourMen.findOne({ _id: itemID });
  res.status(201).json({ task });
};

export {
  getAllAddidasMen,
  getSingleAddidasMen,
  getAllNewbalanceMen,
  getSingleNewbalanceMen,
  getAllNikeMen,
  getSingleNikeMen,
  getAllUnderArmourMen,
  getSingleUnderArmourMen,
};
