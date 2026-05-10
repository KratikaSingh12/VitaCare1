import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { AdminContext } from "../../context/AdminContext";

const PatientsList = () => {

  const {
    backendUrl,
    aToken,
  } = useContext(AdminContext);

  const [patients, setPatients] =
    useState([]);

  // Get all patients
  const getPatients = async () => {

    try {

      const { data } =
        await axios.get(

          backendUrl +
            "/api/admin/patients-list",

          {
            headers: {
              aToken,
            },
          }

        );

      if (data.success) {

        setPatients(
          data.patients
        );

      }

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    getPatients();

  }, []);

  return (

    <div className="w-full m-5">

      <h1 className="text-2xl font-semibold mb-5 text-gray-700">

        Patients List

      </h1>

      <div className="bg-white border rounded text-sm max-w-4xl overflow-hidden">

        {/* Header */}
        <div className="grid grid-cols-[0.5fr_2fr_1.5fr_1fr] gap-3 py-3 px-6 border-b bg-gray-100 font-semibold">

          <p>#</p>

          <p>Patient Name</p>

          <p>Email</p>

          <p>Phone</p>

        </div>

        {/* Patients */}
        {
          patients.length > 0 ? (

            patients.map(
              (
                item,
                index
              ) => (

                <div
                  key={item._id}
                  className="grid grid-cols-[0.5fr_2fr_1.5fr_1fr] gap-3 items-center py-4 px-6 border-b hover:bg-gray-50 transition-all"
                >

                  <p>
                    {index + 1}
                  </p>

                  <div>

                    <p className="font-medium text-gray-800">

                      {item.name}

                    </p>

                  </div>

                  <p className="text-gray-600 break-all">

                    {item.email}

                  </p>

                  <p className="text-primary font-medium">

                    {item.phone || "N/A"}

                  </p>

                </div>

              )
            )

          ) : (

            <div className="py-8 text-center text-gray-500">

              No patients found

            </div>

          )
        }

      </div>

    </div>

  );

};

export default PatientsList;