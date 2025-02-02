import mongoose from "mongoose";

export const dbConnect = async() => {
    try {
        const dbConnection = await mongoose.connect(`${process.env.MONGODB_URI}`,{
            dbName: "Full-Stack-Portfolio"
        })
        console.log("Database Connected");
    } catch (error) {
        console.log("Error occured to connect database", error);
    }
}
