import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "₹";

  // backend URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(
  localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : false
);

  // 🔹 Get doctors
  const getDoctorData = async () => {
    try {
      if (!backendUrl) return;

      const { data } = await axios.get(backendUrl + "/api/doctor/list");

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // 🔹 Load user profile (FIXED)
  const loadUserProfileData = async () => {
    try {
      if (!backendUrl) return;

      const storedToken = localStorage.getItem("token");
      console.log(storedToken);

      if (!storedToken) {
  console.log("Token missing ❌");
  return;
}

// Firebase token skip
if (storedToken.length > 500) {
  console.log("Firebase Google token detected ✅");
  return;
}

      const { data } = await axios.get(
        backendUrl + "/api/user/get-profile",
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (data.success) {

  setUserData(data.userData);

  localStorage.setItem(
    "userData",
    JSON.stringify(data.userData)
  );

}else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // 🔹 Sync token on reload
  useEffect(() => {

  const storedToken = localStorage.getItem("token");

  if (storedToken) {

    setToken(storedToken);

    loadUserProfileData();

  }

}, []);

  // 🔹 Load doctors
  useEffect(() => {
    getDoctorData();
  }, [backendUrl]);

  // 🔹 Load user when token changes
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);

localStorage.removeItem("userData");
    }
  }, [token, backendUrl]);

  const value = {
    doctors,
    getDoctorData,
    currencySymbol,
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;