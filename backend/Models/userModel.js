import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide your name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide a email address"],
    lowercase: true,
    validate: [validator.isEmail, "please provide a Valid Email address"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "please Enter your password"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
usersSchema.methods.comparePassword = async function (enteredpassword) {
  const isMatch = await bcrypt.compare(enteredpassword, this.password);
  console.log(this.password);
  console.log(enteredpassword);
  return isMatch;
};
usersSchema.pre("save", async function (req, res, next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", usersSchema);
export default User;
