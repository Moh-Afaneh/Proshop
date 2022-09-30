import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import users from "./data/users.js";
import products from "./data/products.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
dotenv.config();
connectDB();
const importData = async () => {
  try {
    console.log(products, users);
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();
    const CreatedUsers = await User.create(users, {
      validateBeforeSave: false,
    });
    const Admin = CreatedUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: Admin };
    });
    await Product.create(sampleProducts);
    console.log("Data imported".green.inverse);
  } catch (error) {
    console.log(`Error in importing ${error}`.red);
    process.exit(1);
  }
};
const destoryData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();
    console.log("Data destroyed".red.inverse);
  } catch (error) {
    console.log(`Error in Destroying ${error}`.red);
    process.exit(1);
  }
};
if (process.argv[2] === "-d") {
  destoryData();
} else {
  importData();
}
