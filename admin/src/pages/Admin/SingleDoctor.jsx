import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import axios from "axios";

import { toast } from "react-toastify";

import { AdminContext } from "../../context/AdminContext";

const SingleDoctor = () => {

  const { docId } =
    useParams();

  const navigate =
    useNavigate();

  const {
    backendUrl,
    aToken,
  } = useContext(AdminContext);

  const [doctor, setDoctor] =
    useState(null);

  // GET SINGLE DOCTOR
  const getDoctor =
    async () => {

      try {

        const { data } =
          await axios.get(

            backendUrl +
              `/api/admin/doctor/${docId}`,

            {
              headers: {
                aToken,
              },
            }

          );

        if (data.success) {

          setDoctor(
            data.doctor
          );

        }

      } catch (error) {

        console.log(error);

      }

    };

  // REMOVE DOCTOR
  const removeDoctor =
    async () => {

      const confirmDelete =
        window.confirm(
          "Remove this doctor?"
        );

      if (!confirmDelete)
        return;

      try {

        const { data } =
          await axios.delete(

            backendUrl +
              `/api/admin/remove-doctor/${docId}`,

            {
              headers: {
                aToken,
              },
            }

          );

        if (data.success) {

          toast.success(
  "Doctor Removed Successfully"
);

          navigate(
            "/doctors-list"
          );

        }

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    getDoctor();

  }, []);

  if (!doctor) {

    return (

      <div className="m-5">

        Loading...

      </div>

    );

  }

  return (

    <div className="m-5">

      <div className="max-w-5xl rounded-2xl bg-white p-8 shadow">

        <div className="flex flex-col gap-8 md:flex-row">

          {/* IMAGE */}
          <div>

            <img
              src={doctor.image}
              alt=""
              className="h-64 w-64 rounded-2xl object-cover border"
            />

          </div>

          {/* INFO */}
          <div className="flex-1">

            <h1 className="text-4xl font-bold text-gray-800">

              {doctor.name}

            </h1>

            <p className="mt-3 text-xl text-primary font-medium">

              {
                doctor.speciality
              }

            </p>

            <div className="mt-6 space-y-3 text-gray-700">

              <p>

                <span className="font-semibold">

                  Degree:

                </span>

                {" "}
                {doctor.degree}

              </p>

              <p>

                <span className="font-semibold">

                  Experience:

                </span>

                {" "}
                {
                  doctor.experience
                }

              </p>

              <p>

                <span className="font-semibold">

                  Fees:

                </span>

                {" "}
                ₹
                {doctor.fees}

              </p>

              <p>

                <span className="font-semibold">

                  Availability:

                </span>

                {" "}
                {
                  doctor.available
                    ? "Available"
                    : "Unavailable"
                }

              </p>

              <p>

                <span className="font-semibold">

                  Address:

                </span>

                {" "}
                {
                  doctor.address
                    ?.line1
                }

                {" "}

                {
                  doctor.address
                    ?.line2
                }

              </p>

            </div>

          </div>

        </div>

        {/* ABOUT */}
        <div className="mt-10">

          <h2 className="text-2xl font-semibold mb-3">

            About Doctor

          </h2>

          <p className="text-gray-600 leading-7">

            {doctor.about}

          </p>

        </div>

        {/* BUTTON */}
        <button
          onClick={removeDoctor}
          className="mt-10 rounded-xl bg-red-500 px-6 py-3 text-white hover:bg-red-600 transition-all"
        >

          Remove Doctor

        </button>

      </div>

    </div>

  );

};

export default SingleDoctor;