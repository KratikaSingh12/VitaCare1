import express from 'express'
<<<<<<< Updated upstream
import {addDoctor,allDoctors,loginAdmin,appointmentsAdmin,appointmentCancel} from '../controllers/adminController.js'
=======
import {addDoctor,allDoctors,loginAdmin,adminDashboard} from '../controllers/adminController.js'
>>>>>>> Stashed changes
import upload from '../middlewares/multer.js'
import authAdmin from "../middlewares/authAdmin.js"
import { changeAvailability } from '../controllers/doctorController.js'
const adminRouter=express.Router()


adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctors);
adminRouter.post('/change-availability',authAdmin,changeAvailability);
<<<<<<< Updated upstream
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
=======
adminRouter.get('/dashboard',authAdmin,adminDashboard)


>>>>>>> Stashed changes
export default adminRouter
