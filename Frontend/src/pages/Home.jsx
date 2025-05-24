import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
const Home = () => {
  const navigate = useNavigate();
  const {backendUrl}=useContext(AppContext)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(backendUrl + '/api/user/login', {
          headers: { token: localStorage.getItem("token") },
        });
        const data = await response.json();

        if (data.message === "Token expired. Please login again.") {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else if (!data.success) {
          alert(data.message);
          navigate("/login");
        } else {
          console.log("Welcome, authorized user.");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  );
};

export default Home;
