import mongoose from "mongoose";


const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        index: true,
        unique:true
    },
    fullName:{
        type: String,
        required: true,
        lowercase: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
        minlength:[8, "password must be 8 characters"]
    },
    avatar:{
        type: String
    },
    refreshToken:{
        type: String,
    }
},{timestamps:true});

export const User= mongoose.model("User",userSchema)