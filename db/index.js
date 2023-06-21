import mongoose from "mongoose";

export const connectDB = (Url) => {
  return mongoose.connect(Url);
};
