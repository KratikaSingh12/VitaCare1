import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js"
import dotenv from "dotenv"
import razorpayInstance from "../config/razorpay.js";
dotenv.config();
//import appointmentModel from "../models/appointmentModel.js";
// API to register user
const registerUser = async (req, res) => {
  try {
    
    const { name, email, password,phone } = req.body;

    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {userId,
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const completeAppointment = async (req, res) => {

  try {

    const { appointmentId } = req.body;

    await appointmentModel.findByIdAndUpdate(
      appointmentId,
      {
        isCompleted: true,
      }
    );

    res.json({
      success: true,
      message: "Appointment Completed",
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// Api to get usr profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// API to update profile
const updateProfile = async (req, res) => {
  try {
    const {
  userId,
  name,
  phone,
  gender,
  age,
} = req.body;

const imageFile = req.file;

if (
  !name ||
  !phone ||
  !gender ||
  !age
) {

  return res.json({
    success: false,
    message: "Data Missing",
  });

}
    
    await userModel.findByIdAndUpdate(userId, { name, phone, gender,age });
    
    let imageURL = userData.image;

if (imageFile) {

  const imageUpload =
    await cloudinary.uploader.upload(
      imageFile.path,
      {
        resource_type: "image",
      }
    );

  imageURL =
    imageUpload.secure_url;

}

await userModel.findByIdAndUpdate(
  userId,
  {
    name,
    phone,
    gender,
    age,
    image: imageURL,
  }
);
    
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// API to book appointment
const bookAppointment = async (req, res) => {

  try {

    const {
      userId,
      docId,
      slotDate,
      slotTime,
      patientData,
    } = req.body;

    // ✅ doctor fetch
    const docData = await doctorModel
      .findById(docId)
      .select("-password");

    if (!docData) {

      return res.json({
        success: false,
        message: "Doctor not found",
      });

    }

    // ✅ availability check
    if (!docData.available) {

      return res.json({
        success: false,
        message: "Doctor not available",
      });

    }

    let slots_booked =
      docData.slots_booked || {};

    // ✅ slot check
    if (slots_booked[slotDate]) {

      if (
        slots_booked[
          slotDate
        ].includes(slotTime)
      ) {

        return res.json({
          success: false,
          message:
            "Slot not available",
        });

      } else {

        slots_booked[
          slotDate
        ].push(slotTime);

      }

    } else {

      slots_booked[slotDate] =
        [];

      slots_booked[
        slotDate
      ].push(slotTime);

    }

    // ✅ user fetch
    const userData = await userModel
      .findById(userId)
      .select("-password");

    // ✅ appointment data
    const appointmentData = {

      userId,

      docId,

      slotDate,

      slotTime,

      userData,

      patientData,

      docData,

      amount:
        docData.fees,

      payment: true,

      cancelled: false,

      isCompleted: false,

      date: Date.now(),

    };

    // ✅ save appointment
    const newAppointment =
      new appointmentModel(
        appointmentData
      );

    await newAppointment.save();

    // ✅ update doctor slots
    await doctorModel.findByIdAndUpdate(
      docId,
      {
        slots_booked,
      }
    );

    return res.json({
      success: true,
      message:
        "Appointment Booked Successfully",
      appointment:
        newAppointment,
    });

  } catch (error) {

    console.log(error);

    return res.json({
      success: false,
      message: error.message,
    });

  }

};

// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    // Verify appointment user
    if (appointmentData.userId.toString() !== userId.toString()) {
  return res.json({
    success: false,
    message: "Unauthorized action",
  });
}
    
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Release doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;
    if (slots_booked[slotDate]) {

  slots_booked[slotDate] =
    slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

}
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    
    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const generateChecksum = (payloadBase64, saltKey, saltIndex) => {
  const stringToSign = payloadBase64 + "/pg/v1/pay" + saltKey;
  const hash = crypto.createHash("sha256").update(stringToSign).digest("hex");
  return `${hash}###${saltIndex}`;
};
const razorpayPayment = async (req, res) => {

  try {

    const { amount } = req.body;

    const options = {

      amount: amount * 100,

      currency: "INR",

      receipt: "receipt_" + Date.now(),

    };

    const order =
      await razorpayInstance.orders.create(options);

    res.json({

      success: true,

      order,

    });

  } catch (error) {

    console.log(error);

    res.json({

      success: false,

      message: error.message,

    });

  }

};
// Server to server callback
const paymentCallback = async (req, res) => {
  try {
    const decodedResponse = JSON.parse(
      Buffer.from(req.body.response, "base64").toString("utf8")
    );

    const responsecode = decodedResponse.data.responseCode;
    const merchantTransactionId = decodedResponse.data.merchantTransactionId;
    const appointment = await appointmentModel.findById(merchantTransactionId);
    
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found." });
    }

    if (responsecode === "SUCCESS") {
      appointment.payment = true;
      appointment.isCompleted = true;
      await appointment.save();

      return res.redirect(`${process.env.REDIRECT_URL}/my-appointments`);
    } else {
      return res.redirect(
        `${process.env.FRONTEND_URL}/my-appointments?status=failed`
      );
    }
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ success: false, message: "Error processing callback." });
  }
  
};
const predictDepartment = async (req, res) => {
  try {

    const { symptom } = req.body;

    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      {
        symptom
      }
    );

    res.json({
      success: true,
      result: response.data
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message
    });
  }
};
const createEmergencyAppointment = async (req, res) => {

  try {

    const { userId, symptoms } = req.body;

    const emergencyDoctor = await doctorModel.findOne();

    if (!emergencyDoctor) {

      return res.json({
        success: false,
        message: "No doctor available"
      });

    }

    const emergencyCharge = 200;

    const totalAmount =
      emergencyDoctor.fees + emergencyCharge;

    const userData =
      await userModel.findById(userId).select("-password");

    const appointmentData = {

      userId,

      docId: emergencyDoctor._id,

      userData,

      slotDate:
    new Date().toLocaleDateString(),

  slotTime:
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),

      docData: emergencyDoctor,

      amount: emergencyDoctor.fees,

      paymentAmount: totalAmount,

      isEmergency: true,

      symptoms,

      date: Date.now(),

    };

    const newAppointment =
      new appointmentModel(appointmentData);

    await newAppointment.save();

    res.json({

      success: true,

      appointment: newAppointment,

      totalAmount,

      message: "Emergency appointment created"

    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message
    });

  }

};
export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  razorpayPayment,
  paymentCallback,
  predictDepartment,
  createEmergencyAppointment,
  completeAppointment,
};
