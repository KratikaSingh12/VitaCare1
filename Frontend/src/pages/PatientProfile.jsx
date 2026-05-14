
import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { toast } from "react-toastify";

import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const PatientProfile = () => {

  const {
    userData,
    setToken,
    setUserData,
    loadUserProfileData,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const backendUrl = import.meta.env
    .VITE_BACKEND_URL;

  const [isEditing, setIsEditing] = useState(false);

  const [appointments, setAppointments] = useState([]);

  const [profileData, setProfileData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    gender: userData?.gender || "",
    age: userData?.age || "",
    image:
      userData?.image ||
      "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  });

  useEffect(() => {
    if (userData) {
      setProfileData({
        name: userData?.name || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        gender: userData?.gender || "",
        age: userData?.age || "",
        image:
          userData?.image ||
          "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      });
    }
  }, [userData]);

  // Logout
  const handleLogout = () => {

    localStorage.removeItem("token");

    setToken(false);

    setUserData(false);

    navigate("/");
  };

  // Save profile
  const handleSave = async () => {

    if (
      !profileData.phone ||
      !profileData.gender ||
      !profileData.age
    ) {

      toast.warning("Please complete all details");

      return;
    }

    try {

      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        {
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          gender: profileData.gender,
          age: profileData.age,
          image: profileData.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {

        toast.success("Profile Updated Successfully ✅");

        await loadUserProfileData();

        setIsEditing(false);

      } else {

        toast.error(data.message);
      }

    } catch (error) {

      console.log(error);

      toast.error("Update Failed");
    }
  };

  // Upload image
  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (file) {

      const imageUrl = URL.createObjectURL(file);

      setProfileData({
        ...profileData,
        image: imageUrl,
      });
    }
  };

  // Get appointments
  const getAppointments = async () => {

    try {

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        backendUrl + "/api/user/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setAppointments(data.appointments);
      }

    } catch (error) {
      console.log(error);
    }
  };

  // Cancel appointment
  const handleCancelAppointment = async (appointmentId) => {

    try {

      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {

        toast.success(
          "Appointment Cancelled 💳"
        );

        getAppointments();

      } else {

        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  if (!userData) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">

      <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-4">

        {/* SIDEBAR */}

        <div className="h-fit rounded-2xl bg-white p-5 shadow-sm">

          <div className="flex flex-col items-center">

            <img
              src={profileData.image}
              alt=""
              className="h-24 w-24 rounded-full border-4 border-blue-500 object-cover"
            />

            {
              isEditing && (
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="mt-3 text-xs"
                />
              )
            }

            <h2 className="mt-3 text-lg font-bold">
              {profileData.name}
            </h2>

            <p className="text-sm text-gray-500">
              {profileData.email}
            </p>
          </div>

          <div className="mt-6 space-y-3">

            <button
              onClick={() => navigate("/patient-profile")}
              className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              My Profile
            </button>

            <button
              onClick={() => navigate("/emergency")}
              className="w-full rounded-xl border py-2.5 text-sm font-medium hover:bg-gray-50"
            >
              Emergency Calls
            </button>

            <button
              onClick={handleLogout}
              className="w-full rounded-xl bg-red-500 py-2.5 text-sm font-medium text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}

        <div className="space-y-5 lg:col-span-3">

          {/* PROFILE SECTION */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-bold">
                Personal Information
              </h2>

              <button
                onClick={() => {
                  if (isEditing) {
                    handleSave();
                  } else {
                    setIsEditing(true);
                  }
                }}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
              >
                {isEditing ? "Save" : "Edit Profile"}
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* NAME */}

              <div>
                <p className="text-sm text-gray-500">
                  Full Name
                </p>

                {
                  isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          name: e.target.value,
                        })
                      }
                      className="mt-2 w-full rounded-xl border p-2.5 outline-none"
                    />
                  ) : (
                    <h3 className="mt-1 text-lg font-semibold">
                      {profileData.name}
                    </h3>
                  )
                }
              </div>

              {/* EMAIL */}

              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>

                {
                  isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                      className="mt-2 w-full rounded-xl border p-2.5 outline-none"
                    />
                  ) : (
                    <h3 className="mt-1 break-all text-lg font-semibold">
                      {profileData.email}
                    </h3>
                  )
                }
              </div>

              {/* PHONE */}

              <div>
                <p className="text-sm text-gray-500">
                  Phone
                </p>

                {
                  isEditing ? (
                    <input
                      type="text"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value,
                        })
                      }
                      className="mt-2 w-full rounded-xl border p-2.5 outline-none"
                    />
                  ) : (
                    <h3 className="mt-1 text-lg font-semibold">
                      {profileData.phone}
                    </h3>
                  )
                }
              </div>

              {/* GENDER */}

              <div>
                <p className="text-sm text-gray-500">
                  Gender
                </p>

                {
                  isEditing ? (
                    <select
                      value={profileData.gender}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          gender: e.target.value,
                        })
                      }
                      className="mt-2 w-full rounded-xl border p-2.5 outline-none"
                    >
                      <option value="">
                        Select Gender
                      </option>

                      <option>
                        Female
                      </option>

                      <option>
                        Male
                      </option>

                      <option>
                        Other
                      </option>
                    </select>
                  ) : (
                    <h3 className="mt-1 text-lg font-semibold">
                      {profileData.gender}
                    </h3>
                  )
                }
              </div>

              {/* AGE */}

              <div>
                <p className="text-sm text-gray-500">
                  Age
                </p>

                {
                  isEditing ? (
                    <input
                      type="number"
                      value={profileData.age}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          age: e.target.value,
                        })
                      }
                      className="mt-2 w-full rounded-xl border p-2.5 outline-none"
                    />
                  ) : (
                    <h3 className="mt-1 text-lg font-semibold">
                      {profileData.age || "Not Added"}
                    </h3>
                  )
                }
              </div>
            </div>
          </div>

          {/* APPOINTMENTS */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-bold">
                My Appointments
              </h2>

              <button
                onClick={() => navigate("/my-appointments")}
                className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
              >
                View All
              </button>
            </div>

            <div className="space-y-4">

              {
                appointments
  .filter((item) => !item.cancelled)
  .map((item) => {

    const appointmentDateTime = new Date(
      `${item.slotDate} ${item.slotTime}`
    );

    const now = new Date();

    let status = "Upcoming";

    if (appointmentDateTime < now) {
      status = "Missed";
    }

    if (item.isCompleted) {
      status = "Completed";
    }

    return (
                    <div
                      key={item._id}
                      className="flex flex-col gap-4 rounded-2xl border bg-gray-50 p-5 md:flex-row md:items-center md:justify-between"
                    >

                      <div>
                        <h3 className="text-lg font-bold">
                          {item.docData?.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {item.docData?.speciality}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {item.slotDate} • {item.slotTime}
                        </p>
                      </div>

                      <div className="flex gap-2">

                        <button
  className={`rounded-xl px-4 py-2 text-xs font-medium text-white ${
    status === "Completed"
      ? "bg-blue-500"
      : status === "Missed"
      ? "bg-gray-500"
      : "bg-green-500"
  }`}
>
  {status}
</button>

                        <button
                          onClick={() =>
                            handleCancelAppointment(item._id)
                          }
                          className="rounded-xl bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                                   );
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;

