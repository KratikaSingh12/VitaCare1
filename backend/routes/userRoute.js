import express from 'express'
import {
  getProfile,
  loginUser,
  registerUser,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  razorpayPayment,
  paymentCallback,
  predictDepartment,
  createEmergencyAppointment,
  completeAppointment
} from '../controllers/userController.js'
import authUser from '../middleware/authUser.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/appointments', authUser, listAppointment)
userRouter.post('/cancel-appointment', authUser, cancelAppointment)
userRouter.post(
  "/razorpay-payment",
  authUser,
  razorpayPayment
)
userRouter.post('/payment-callback', paymentCallback)
userRouter.post('/predict-department', predictDepartment)
userRouter.post(
  '/create-emergency-appointment',
  authUser,
  createEmergencyAppointment
)
userRouter.post(
  "/complete-appointment",
  authUser,
  completeAppointment
);

export default userRouter