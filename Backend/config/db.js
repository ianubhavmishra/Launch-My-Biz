import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://anubhavmishra:22012004@cluster2.vmfwh.mongodb.net/launch-my-biz").then(()=>{console.log("DB Connected")})
}