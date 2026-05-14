import React, { useContext, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Clock,
  MapPin,
  GraduationCap,
  ArrowLeft,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";

import axios from "axios";

import { AppContext } from "../context/AppContext";

import slotConfig from "../data/timeSlots.json";

const Appointment = () => {

  const { docId } = useParams();

  const navigate = useNavigate();

  const backendUrl = import.meta.env
    .VITE_BACKEND_URL;

  const { doctors,userData, } = useContext(AppContext);

  // ✅ MongoDB doctor fetch
  const doctor = doctors.find(
    (d) => String(d._id) === String(docId)
  );

  const [selectedDate, setSelectedDate] = useState("");

  const [selectedTime, setSelectedTime] = useState("");

  const [step, setStep] = useState(1);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  });

  // ✅ Doctor not found
  if (!doctor) {

    return (
      <div className="flex min-h-screen items-center justify-center">

        <div className="text-center">

          <h1 className="text-3xl font-bold">
            Doctor Not Found
          </h1>

          <button
            onClick={() => navigate("/doctors")}
            className="mt-5 rounded-lg bg-black px-5 py-3 text-white"
          >
            Back To Doctors
          </button>

        </div>

      </div>
    );
  }

  // ✅ Today date
  const minDate = useMemo(() => {

    const today = new Date();

    const yyyy = today.getFullYear();

    const mm = String(today.getMonth() + 1).padStart(2, "0");

    const dd = String(today.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;

  }, []);

  // ✅ Dynamic slots
  const timeSlots = useMemo(() => {

    const { startHour, endHour, intervalMinutes, breaks } = slotConfig;

    const slots = [];

    const isInBreak = (hhmm) => {

      if (!breaks || breaks.length === 0) return false;

      return breaks.some(
        (b) => hhmm >= b.from && hhmm < b.to
      );
    };

    for (let hour = startHour; hour < endHour; hour++) {

      for (let min = 0; min < 60; min += intervalMinutes) {

        const hh = String(hour).padStart(2, "0");

        const mm = String(min).padStart(2, "0");

        const hhmm = `${hh}:${mm}`;

        if (isInBreak(hhmm)) continue;

        const hour12 =
          hour % 12 === 0 ? 12 : hour % 12;

        const ampm = hour >= 12 ? "PM" : "AM";

        slots.push(
          `${String(hour12).padStart(2, "0")}:${mm} ${ampm}`
        );
      }
    }

    return slots;

  }, []);

  // ✅ Fake unavailable slots
  const unavailableSlots = useMemo(() => {

    if (!selectedDate) return [];

    const seed = Number(
      selectedDate.split("-").join("")
    );

    const unavailable = [];

    for (let i = 0; i < timeSlots.length; i++) {

      if ((seed + i) % 7 === 0) {

        unavailable.push(timeSlots[i]);

      }
    }

    return unavailable;

  }, [selectedDate, timeSlots]);

  // ✅ BOOK + PAYMENT
  const handleSubmit = async (e) => {


    e.preventDefault();
    if (
  !userData?.phone ||
  !userData?.gender ||
  !userData?.age
) {

  toast.warning(
  "Please complete your profile before booking appointment"
);

  navigate("/patient-profile");

  return;

}

    try {

      const token = localStorage.getItem("token");

      // PAYMENT ORDER
      const paymentRes = await axios.post(

        backendUrl + "/api/payment/razorpay",

        {
          amount: doctor.fees || doctor.fee,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!paymentRes.data.success) {

        toast.error("Payment Failed");

        return;
      }

      const order = paymentRes.data.order;

      // RAZORPAY
      const options = {

        key: "rzp_test_SmmuNbjUnTnOjs",

        amount: order.amount,

        currency: order.currency,

        name: "VitaCare",

        description: "Doctor Appointment",

        order_id: order.id,

        handler: async function () {

          try {

            const bookingRes = await axios.post(

              backendUrl + "/api/user/book-appointment",

              {
                docId: doctor._id,

                slotDate: selectedDate,

                slotTime: selectedTime,

                patientData: formData,
              },

              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (bookingRes.data.success) {

             toast.success(
                "Payment Successful & Appointment Booked"
              );

              setIsSubmitted(true);

            } else {

              toast.success(bookingRes.data.message);
            }

          } catch (error) {

            console.log(error);

            toast.error("Booking Failed");
          }
        },

        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },

        theme: {
          color: "#000000",
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();

    } catch (error) {

      console.log(error);

      toast.error("Something went wrong");
    }
  };

  // ✅ SUCCESS PAGE
  if (isSubmitted) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">

        <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg">

          <div className="text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">

              <CheckCircle2 className="h-10 w-10 text-green-600" />

            </div>

            <h1 className="mt-5 text-3xl font-bold">
              Appointment Confirmed 🎉
            </h1>

          </div>

          <div className="mt-8 rounded-xl bg-gray-50 p-5">

            <div className="space-y-3">

              <div className="flex justify-between">
                <span>Doctor</span>
                <span className="font-semibold">
                  {doctor.name}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Date</span>
                <span className="font-semibold">
                  {selectedDate}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Time</span>
                <span className="font-semibold">
                  {selectedTime}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Fee</span>
                <span className="font-semibold text-green-600">
                  ₹{doctor.fees || doctor.fee}
                </span>
              </div>

            </div>

          </div>

          <div className="mt-6 flex gap-4">

            <button
              onClick={() => navigate("/")}
              className="flex-1 rounded-lg border py-3"
            >
              Home
            </button>

            <button
              onClick={() => navigate("/my-appointments")}
              className="flex-1 rounded-lg bg-black py-3 text-white"
            >
              My Appointments
            </button>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="border-b bg-white">

        <div className="mx-auto max-w-7xl px-4 py-6">

          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <h1 className="text-3xl font-bold">
            Book Appointment
          </h1>

        </div>

      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Doctor Card */}
          <div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <img
                src={doctor.image}
                alt={doctor.name}
                className="h-72 w-full rounded-xl object-cover"
              />

              <h2 className="mt-5 text-2xl font-bold">
                {doctor.name}
              </h2>

              <p className="mt-1 text-gray-500">
                {doctor.speciality || doctor.specialization}
              </p>

              <div className="mt-6 space-y-3 text-sm">

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4" />
                  <span>{doctor.experience}</span>
                </div>

                <div className="flex items-center gap-3">
                  <GraduationCap className="h-4 w-4" />
                  <span>{doctor.degree}</span>
                </div>

                {doctor.address && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {doctor.address.line1}
                    </span>
                  </div>
                )}

              </div>

              <div className="mt-6 border-t pt-5">

                <div className="flex items-center justify-between">

                  <span>Consultation Fee</span>

                  <span className="text-2xl font-bold text-green-600">
                    ₹{doctor.fees || doctor.fee}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">

            {/* Steps */}
            <div className="mb-8 flex items-center justify-center gap-3">

              {[1, 2, 3].map((n) => (

                <React.Fragment key={n}>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                      step >= n
                        ? "bg-black text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    {n}
                  </div>

                  {n !== 3 && (
                    <div
                      className={`h-1 w-14 rounded ${
                        step > n
                          ? "bg-black"
                          : "bg-gray-300"
                      }`}
                    />
                  )}

                </React.Fragment>
              ))}

            </div>

            {/* STEP 1 */}
            {step === 1 && (

              <div className="rounded-2xl bg-white p-6 shadow-sm">

                <h3 className="mb-5 text-xl font-bold">
                  Select Date
                </h3>

                <input
                  type="date"
                  min={minDate}
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedTime("");
                  }}
                  className="w-full rounded-lg border px-4 py-3"
                />

                <div className="mt-6 flex justify-end">

                  <button
                    onClick={() => setStep(2)}
                    disabled={!selectedDate}
                    className="rounded-lg bg-black px-6 py-3 text-white disabled:opacity-50"
                  >
                    Continue
                  </button>

                </div>

              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (

              <div className="rounded-2xl bg-white p-6 shadow-sm">

                <h3 className="mb-5 text-xl font-bold">
                  Select Time
                </h3>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                  {timeSlots.map((slot) => {

                    const isUnavailable =
                      unavailableSlots.includes(slot);

                    const isSelected =
                      selectedTime === slot;

                    return (
                      <button
                        key={slot}
                        disabled={isUnavailable}
                        onClick={() =>
                          setSelectedTime(slot)
                        }
                        className={`rounded-lg border py-3 text-sm ${
                          isSelected
                            ? "bg-black text-white"
                            : "bg-white"
                        } ${
                          isUnavailable
                            ? "cursor-not-allowed opacity-40"
                            : ""
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}

                </div>

                <div className="mt-6 flex justify-between">

                  <button
                    onClick={() => setStep(1)}
                    className="rounded-lg border px-6 py-3"
                  >
                    Back
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    disabled={!selectedTime}
                    className="rounded-lg bg-black px-6 py-3 text-white disabled:opacity-50"
                  >
                    Continue
                  </button>

                </div>

              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (

              <div className="rounded-2xl bg-white p-6 shadow-sm">

                <h3 className="mb-5 text-xl font-bold">
                  Patient Details
                </h3>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full rounded-lg border px-4 py-3"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    required
                  />

                  <div className="grid gap-4 sm:grid-cols-2">

                    <input
                      type="email"
                      placeholder="Email"
                      className="rounded-lg border px-4 py-3"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      required
                    />

                    <input
                      type="tel"
                      placeholder="Phone"
                      className="rounded-lg border px-4 py-3"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        })
                      }
                      required
                    />

                  </div>

                  <textarea
                    rows={4}
                    placeholder="Reason for visit"
                    className="w-full rounded-lg border px-4 py-3"
                    value={formData.reason}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reason: e.target.value,
                      })
                    }
                  />

                  <div className="rounded-xl bg-gray-50 p-5">

                    <div className="space-y-3">

                      <div className="flex justify-between">
                        <span>Date</span>
                        <span>{selectedDate}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Time</span>
                        <span>{selectedTime}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Doctor</span>
                        <span>{doctor.name}</span>
                      </div>

                      <div className="flex justify-between border-t pt-3">
                        <span>Fee</span>
                        <span className="font-bold text-green-600">
                          ₹{doctor.fees || doctor.fee}
                        </span>
                      </div>

                    </div>

                  </div>

                  <div className="flex justify-between">

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="rounded-lg border px-6 py-3"
                    >
                      Back
                    </button>

                    <button
  type="submit"
  className="rounded-lg bg-black px-6 py-3 text-white hover:scale-105 hover:bg-gray-800 transition-all duration-300"
>
  Confirm Booking
</button>

                  </div>

                </form>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Appointment;