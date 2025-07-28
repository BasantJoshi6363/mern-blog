import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        trim : true,
        required : true
    },
    email : {
        type: String,
        trim : true,
        required : true
    },
    password : {
        type: String,
        trim : true,
        required : true
    },
    role : {
        type: String,
        trim : true,
        required : true
    }
})

export const User =  mongoose.model("User",userSchema);