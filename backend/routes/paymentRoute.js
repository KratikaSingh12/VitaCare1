import express from "express";

import {
  razorpayPayment
} from "../controllers/userController.js";

import authUser from "../middleware/authUser.js";

const paymentRouter = express.Router();

paymentRouter.post(
  "/razorpay",
  authUser,
  razorpayPayment
);

export default paymentRouter;