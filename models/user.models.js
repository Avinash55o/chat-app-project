import mongoose from "mongoose";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "password must be 8 characters"],
    },
    avatar: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// HASHING THE PASS BEFORE SAVING IN THE THE DATABASE
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//GENERATE ACCESS TOKEN
userSchema.methods.generateAccessToken= async function (){
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email
    }, process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:'1h'}
  )
}

// GENERATE REFRESH TOKEN

export const User = mongoose.model("User", userSchema);
