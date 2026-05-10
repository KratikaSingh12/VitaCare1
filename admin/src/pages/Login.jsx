import axios from "axios";
import React, { useContext, useState } from "react";

import { DoctorContext } from "../context/DoctorContext";
import { AdminContext } from "../context/AdminContext";

import { toast } from "react-toastify";

const Login = () => {

  const [state, setState] = useState("Admin");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { setDToken } = useContext(DoctorContext);

  const { setAToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {

    try {

      event.preventDefault();

      if (state === "Admin") {

        const { data } = await axios.post(
          backendUrl + "/api/admin/login",
          { email, password }
        );

        if (data.success) {

          setAToken(data.token);

          localStorage.setItem("aToken", data.token);

          toast.success("Admin Login Successful ✅");

        } else {

          toast.error(data.message);

        }

      } else {

        const { data } = await axios.post(
          backendUrl + "/api/doctor/login",
          { email, password }
        );

        if (data.success) {

          setDToken(data.token);

          localStorage.setItem("dToken", data.token);

          toast.success("Doctor Login Successful ✅");

        } else {

          toast.error(data.message);

        }

      }

    } catch (error) {

      console.log(error);

      toast.error(error.message);

    }

  };

  return (

    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center"
    >

      <div className="flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-2xl text-[#5E5E5E] text-sm shadow-xl bg-white">

        <p className="text-3xl font-bold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>

        {/* Email */}
        <div className="w-full">

          <p className="font-medium">
            Email
          </p>

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded-xl w-full p-3 mt-2 outline-none focus:border-primary"
            type="email"
            placeholder="Enter your email"
            required
          />

        </div>

        {/* Password */}
        <div className="w-full">

          <p className="font-medium">
            Password
          </p>

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded-xl w-full p-3 mt-2 outline-none focus:border-primary"
            type="password"
            placeholder="Enter your password"
            required
          />

        </div>

        {/* Login Button */}
        <button className="bg-primary hover:opacity-90 transition text-white w-full py-3 rounded-xl text-base font-medium">

          Login

        </button>

        {/* Toggle Login */}
        {

          state === "Admin" ? (

            <p>

              Doctor Login?{" "}

              <span
                onClick={() => setState("Doctor")}
                className="text-primary underline cursor-pointer"
              >
                Click here
              </span>

            </p>

          ) : (

            <p>

              Admin Login?{" "}

              <span
                onClick={() => setState("Admin")}
                className="text-primary underline cursor-pointer"
              >
                Click here
              </span>

            </p>

          )

        }

      </div>

    </form>

  );
};

export default Login;