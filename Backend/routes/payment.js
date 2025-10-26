import express from "express";
import { opt1, opt2, success } from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/monthly", opt1);
paymentRouter.post("/yearly", opt2);
paymentRouter.post("/success", success)

export default paymentRouter;