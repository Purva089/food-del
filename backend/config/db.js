import mongoose from "mongoose";

export const  connectDB = async () =>{
    await mongoose.connect('mongodb+srv://purvamiglani28:purva12345@cluster01.8pkmbmc.mongodb.net/food-del').then(()=>console.log("DB Connected"))
}

