import express from "express";
import cors from "cors"
import { connectDB } from "./config/db.js";
import shopRouter from "./routes/shopRoute.js";
import dotenv from "dotenv";

//app config
const app = express()
const port = 4000
export const frontendURl = "https://launch-my-biz-s8b9.onrender.com"

//middelware

app.use(express.json())
app.use(cors())

//db connection
connectDB();
// Api endpoint
app.use("/shop", shopRouter)

app.get("/", (req, res) => {
   res.send("api working")
})

 app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`)
 })
 
