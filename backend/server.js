import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import assisstantRouter from './routes/assisstantRoute.js';
import paymentRouter from "./routes/paymentRoute.js";
const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://vita-care1.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// API endpoints
app.use('/api', assisstantRouter);
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);
app.use("/api/payment", paymentRouter);

app.get("/", (req, res) => {
    res.send("API working");
});

app.listen(port, () => console.log("Server started on port", port));