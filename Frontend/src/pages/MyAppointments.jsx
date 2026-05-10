import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { toast } from "react-toastify";


const MyAppointments = () => {

  const backendUrl =
    "http://localhost:5000";

  const [appointments, setAppointments] =
    useState([]);

  // Get appointments
  const getAppointments = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const { data } = await axios.get(

        backendUrl +
          "/api/user/appointments",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      if (data.success) {

        setAppointments(
          data.appointments
        );

      }

    } catch (error) {

      console.log(error);

    }

  };

  // Cancel appointment
  const cancelAppointment = async (
    appointmentId
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      const { data } = await axios.post(

        backendUrl +
          "/api/user/cancel-appointment",

        { appointmentId },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      if (data.success) {

        toast.success("Appointment Cancelled");

        // refresh appointments
        getAppointments();

      } else {

        toast.success(data.message);

      }

    } catch (error) {

      console.log(error);

      toast.error("Cancel failed");

    }

  };

  useEffect(() => {

    getAppointments();

  }, []);

  return (

    <div className="min-h-screen bg-gray-100 px-4 py-8">

      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-sm">

        <h1 className="mb-8 text-3xl font-bold">
          My Appointments
        </h1>

        <div className="space-y-5">

          {
            appointments
              .filter(
                (item) => !item.cancelled
              )
              .length > 0 ? (

              appointments
                .filter(
                  (item) => !item.cancelled
                )
                .map((item) => (

                  <div
                    key={item._id}
                    className="flex flex-col gap-4 rounded-2xl border bg-gray-50 p-5 md:flex-row md:items-center md:justify-between"
                  >

                    <div>

                      <h2 className="text-xl font-bold">
                        Dr. {
                          item.docData?.name
                        }
                      </h2>

                      <p className="text-gray-500">
                        {
                          item.docData
                            ?.speciality
                        }
                      </p>

                      <p className="mt-2 text-sm text-gray-400">
                        {
                          item.slotDate
                        }{" "}
                        • {
                          item.slotTime
                        }
                      </p>

                    </div>

                    <div className="flex gap-3">

                      <button
                        className="rounded-xl bg-green-500 px-4 py-2 text-sm text-white"
                      >
                        Upcoming
                      </button>

                      <button
  onClick={() =>
    cancelAppointment(
      item._id
    )
  }
  className="cursor-pointer rounded-xl bg-red-500 px-4 py-2 text-sm text-white transition-all duration-200 hover:scale-105 hover:bg-red-600 active:scale-95"
>
  Cancel
</button>

                    </div>

                  </div>

                ))

            ) : (

              <p>
                No appointments found
              </p>

            )
          }

        </div>

      </div>

    </div>

  );

};

export default MyAppointments;