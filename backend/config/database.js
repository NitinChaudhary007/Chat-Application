import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("database Connected");
    })
    .catch(() => {
      console.log("error in database connectivity");
    });
};

export default connectDB;
