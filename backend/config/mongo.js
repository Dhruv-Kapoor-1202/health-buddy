import mongoose from "mongoose";

const MONGODB_URI = "mongodb://127.0.0.1:27017/health-buddy";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
