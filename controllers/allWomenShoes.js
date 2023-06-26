import {
  AddidasWomen,
  newbalanceWomen,
  nikeWomen,
  underarmourWomen,
} from "../models/index.js";

// AddidasWomen get all
const getAllAddidasWomen = async (req, res) => {
  const task = await AddidasWomen.find({});
  res.status(200).json({ task });
};
// AddidasWomen get single
const getSingleAddidasWomen = async (req, res) => {
  const { id: itemID } = req.params;
  const task = await AddidasWomen.findOne({ _id: itemID });
  res.status(201).json({ task });
};

// newbalanceWomen get all
const getAllNewbalanceWomen = async (req, res) => {
  const task = await newbalanceWomen.find({});
  res.status(200).json({ task });
};
// newbalanceWomen get single
const getSingleNewbalanceWomen = async (req, res) => {
  const { id: itemID } = req.params;
  const task = await newbalanceWomen.findOne({ _id: itemID });
  res.status(201).json({ task });
};

// nikeWomen get all
const getAllNikeWomen = async (req, res) => {
  const task = await nikeWomen.find({});
  res.status(200).json({ task });
};
// nikeWomen get single
const getSingleNikeWomen = async (req, res) => {
  const { id: itemID } = req.params;
  const task = await nikeWomen.findOne({ _id: itemID });
  res.status(201).json({ task });
};

// underarmourWomen get all
const getAllUnderArmourWomen = async (req, res) => {
  const task = await underarmourWomen.find({});
  res.status(200).json({ task });
};
// underarmourWomen get single
const getSingleUnderArmourWomen = async (req, res) => {
  const { id: itemID } = req.params;
  const task = await underarmourWomen.findOne({ _id: itemID });
  res.status(201).json({ task });
};

export {
  getAllAddidasWomen,
  getSingleAddidasWomen,
  getAllNewbalanceWomen,
  getSingleNewbalanceWomen,
  getAllNikeWomen,
  getSingleNikeWomen,
  getAllUnderArmourWomen,
  getSingleUnderArmourWomen,
};
