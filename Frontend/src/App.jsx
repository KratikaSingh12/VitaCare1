import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Appointment from "./pages/Appointment";
import About from "./pages/About";
import Login from "./pages/Login";
import Departments from "./pages/Departments";
import DoctorProfile from "./pages/DoctorProfile";
import SymptomChecker from "./pages/SymptomChecker";
import Emergency from "./pages/Emergency";
import PatientProfile from "./pages/PatientProfile";
import MyAppointments from "./pages/MyAppointments";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="w-full">

      <ToastContainer />

      <Header /> {/* ✅ Header added */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/doctor/:docId" element={<DoctorProfile />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route
  path="/my-appointments"
  element={<MyAppointments />}
/>
        <Route path="/departments" element={<Departments />} />
        <Route path="/symptom-check" element={<SymptomChecker />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patient-profile" element={<PatientProfile />} />
        <Route path="/emergency" element={<Emergency />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
