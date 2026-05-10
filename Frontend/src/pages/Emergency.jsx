import React, {
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  Video,
  ArrowLeft,
  Clock,
  Shield,
  Loader2,
} from "lucide-react";

import { AppContext } from "../context/AppContext";

import axios from "axios";

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

import {
  emergencyTypes,
} from "../data/config";

import { toast } from "react-toastify";

export default function Emergency() {

  const backendUrl = "http://localhost:5000";

  const navigate = useNavigate();

  const { userData } =
    useContext(AppContext);

  const meetingRef = useRef(null);

  const [step, setStep] =
    useState("form");

  const [formData, setFormData] =
    useState({
      name: "",
      phone: "",
      emergencyType: "",
      description: "",
    });

  const consultationFee = 2000;

  const emergencyCharge = 200;

  const totalAmount =
    consultationFee +
    emergencyCharge;

  // LOGIN CHECK
  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {

      toast.warning(
        "Please login first"
      );

      navigate("/login");

    }

  }, []);

  // ZEGO VIDEO CALL
  useEffect(() => {

    if (step !== "call")
      return;

    const timer =
      setTimeout(() => {

        if (!meetingRef.current)
          return;

        const appID =
          142744304;

        const serverSecret =
          "fa6d8134faad99b2a2b0abe1af30c766";

        const kitToken =
          ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            "emergency-room",
            Date.now().toString(),
            formData.name ||
              "Patient"
          );

        const zp =
          ZegoUIKitPrebuilt.create(
            kitToken
          );

        zp.joinRoom({

          container:
            meetingRef.current,

          sharedLinks: [
            {
              name: "Copy Link",
              url: window.location.href,
            },
          ],

          scenario: {
            mode:
              ZegoUIKitPrebuilt.OneONoneCall,
          },

          turnOnMicrophoneWhenJoining:
            true,

          turnOnCameraWhenJoining:
            true,

          showScreenSharingButton:
            true,

          showTextChat: true,

          onLeaveRoom: () => {

            toast.success(
              "Thank you for connecting with VitaCare ❤️"
            );

          },

        });

      }, 500);

    return () =>
      clearTimeout(timer);

  }, [step]);

  // FORM SUBMIT
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        !userData?.phone ||
        !userData?.gender ||
        !userData?.age
      ) {

        toast.warning(
          "Please complete your profile before emergency consultation"
        );

        navigate(
          "/patient-profile"
        );

        return;

      }

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        // CREATE EMERGENCY APPOINTMENT

        const appointmentRes =
          await axios.post(

            backendUrl +
              "/api/user/create-emergency-appointment",

            {
              symptoms:
                formData.description,
            },

            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }

          );

        if (
          !appointmentRes.data
            .success
        ) {

          toast.error(
            appointmentRes.data
              .message
          );

          return;

        }

        // RAZORPAY ORDER

        const paymentRes =
          await axios.post(

            backendUrl +
              "/api/payment/razorpay",

            {
              amount:
                totalAmount,
            },

            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }

          );

        if (
          !paymentRes.data.success
        ) {

          toast.error(
            "Payment Failed"
          );

          return;

        }

        const order =
          paymentRes.data.order;

        // RAZORPAY

        const options = {

          key: "rzp_test_SmmuNbjUnTnOjs",

          amount:
            order.amount,

          currency:
            order.currency,

          name: "VitaCare",

          description:
            "Emergency Video Consultation",

          order_id:
            order.id,

          handler:
            async function () {

              toast.success(
                "Payment Successful"
              );

              setStep(
                "connecting"
              );

              setTimeout(() => {

                setStep(
                  "call"
                );

              }, 3000);

            },

          prefill: {

            name:
              formData.name,

            contact:
              formData.phone,

          },

          theme: {

            color:
              "#000000",

          },

        };

        const razor =
          new window.Razorpay(
            options
          );

        razor.open();

      } catch (error) {

        console.log(error);

        toast.error(
          "Something went wrong"
        );

      }

    };

  // CONNECTING SCREEN
  if (
    step === "connecting"
  ) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-red-50 to-white px-4">

        <div className="w-full max-w-md rounded-xl border bg-white p-10 shadow-sm">

          <div className="flex flex-col items-center text-center">

            <div className="mb-6 flex h-20 w-20 animate-pulse items-center justify-center rounded-full bg-black/10">

              <Loader2 className="h-10 w-10 animate-spin text-black" />

            </div>

            <h2 className="mb-2 text-2xl font-bold text-black">

              Connecting to Doctor

            </h2>

            <p className="mb-4 text-gray-600">

              Please wait while we connect you...

            </p>

            <div className="flex items-center gap-2 text-sm text-gray-500">

              <Clock className="h-4 w-4" />

              <span>
                Estimated wait:
                Less than 1 minute
              </span>

            </div>

          </div>

        </div>

      </div>

    );

  }

  // VIDEO CALL SCREEN
  if (step === "call") {

    return (

      <div className="fixed inset-0 z-[9999] bg-black">

        <div
          ref={meetingRef}
          style={{
            width: "100vw",
            height: "100vh",
          }}
        />

      </div>

    );

  }

  // FORM SCREEN
  return (

    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12">

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-black hover:bg-black/5"
        >

          <ArrowLeft className="h-4 w-4" />

          Back to Home

        </Link>

        {/* WARNING */}

        <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-6">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">

              <Video className="h-6 w-6 text-red-600" />

            </div>

            <div>

              <h3 className="mb-1 font-semibold text-black">

                Emergency Video Consultation

              </h3>

              <p className="text-sm text-gray-700">

                If you are experiencing a life-threatening emergency,
                please call emergency services immediately.

              </p>

            </div>

          </div>

        </div>

        {/* FORM */}

        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <div className="mb-6">

            <h2 className="flex items-center gap-2 text-xl font-bold text-black">

              <Video className="h-5 w-5" />

              Start Emergency Video Call

            </h2>

            <p className="text-sm text-gray-600">

              Connect with a doctor instantly

            </p>

          </div>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-6"
          >

            <div className="grid gap-4 sm:grid-cols-2">

              <input
                className="w-full rounded-md border px-3 py-2 outline-none"
                placeholder="Enter your full name"
                value={
                  formData.name
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name:
                      e.target.value,
                  })
                }
                required
              />

              <input
                className="w-full rounded-md border px-3 py-2 outline-none"
                type="tel"
                placeholder="Enter your phone number"
                value={
                  formData.phone
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone:
                      e.target.value,
                  })
                }
                required
              />

            </div>

            <select
              className="w-full rounded-md border px-3 py-2 outline-none"
              value={
                formData.emergencyType
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  emergencyType:
                    e.target.value,
                })
              }
              required
            >

              <option value="">
                Select emergency type
              </option>

              {emergencyTypes.map(
                (type) => (

                  <option
                    key={
                      type.value
                    }
                    value={
                      type.value
                    }
                  >

                    {type.label}

                  </option>

                )
              )}

            </select>

            <textarea
              className="w-full rounded-md border px-3 py-2 outline-none"
              rows={4}
              placeholder="Describe symptoms..."
              value={
                formData.description
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description:
                    e.target.value,
                })
              }
              required
            />

            {/* CHARGES */}

            <div className="rounded-lg border border-red-200 bg-red-50 p-4">

              <h3 className="mb-3 font-semibold text-black">

                Emergency Consultation Charges

              </h3>

              <div className="space-y-2 text-sm">

                <div className="flex justify-between">

                  <span>
                    Consultation Fee
                  </span>

                  <span>
                    ₹
                    {
                      consultationFee
                    }
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>
                    Emergency Charge
                  </span>

                  <span>
                    ₹
                    {
                      emergencyCharge
                    }
                  </span>

                </div>

                <div className="flex justify-between border-t pt-2 text-lg font-bold">

                  <span>
                    Total
                  </span>

                  <span>
                    ₹
                    {totalAmount}
                  </span>

                </div>

              </div>

            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-black px-4 py-3 text-white transition-all duration-300 hover:scale-105 hover:bg-gray-800"
            >

              <Video className="h-5 w-5" />

              Start Video Call Now

            </button>

          </form>

        </div>

        {/* INFO */}

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <div className="flex items-start gap-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">

                <Clock className="h-5 w-5 text-green-600" />

              </div>

              <div>

                <h4 className="font-medium text-black">

                  Quick Response

                </h4>

                <p className="text-sm text-gray-600">

                  Average wait time under 2 minutes

                </p>

              </div>

            </div>

          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <div className="flex items-start gap-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10">

                <Shield className="h-5 w-5 text-black" />

              </div>

              <div>

                <h4 className="font-medium text-black">

                  Secure & Private

                </h4>

                <p className="text-sm text-gray-600">

                  Secure video consultations

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}