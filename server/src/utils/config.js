import mongoose from "mongoose";



const connect = async()=>{
    try {
        await mongoose.connect("mongodb+srv://basantjoshi6363:NNyDCOJUrKC4LQUV@cluster0.eqgzh.mongodb.net/uploadtest")
        console.log("database connection successful")
    } catch (error) {
        console.log(error)
    }
}

export default connect;