import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Mail,
  Lock,
  User,
  Phone,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import { siteConfig } from "../data/config";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  signInWithRedirect,signInWithPopup,
} from "firebase/auth";

import { auth } from "../firebase";

export default function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [activeTab, setActiveTab] = useState("login");

  const [remember, setRemember] = useState(false);

  const [terms, setTerms] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const { setToken, setUserData, loadUserProfileData } = useContext(AppContext);

  // ================= LOGIN =================

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const { data } = await axios.post(
  `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        {
          email: loginData.email,
          password: loginData.password,
        }
      );

      if (data.success) {

  localStorage.setItem("token", data.token);

  setToken(data.token); // ADD THIS

  await loadUserProfileData(); // ADD THIS

  setIsSubmitted(true);

        setTimeout(() => {

          navigate("/");

        }, 1500);

      } else {

        toast.success(data.message);

      }

    } catch (error) {

      console.log(error);

      toast.error("Login Failed");

    }

  };

  // ================= REGISTER =================

  const handleRegister = async (e) => {

    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {

      toast.error("Passwords do not match");

      return;

    }

    if (!terms) {

      toast.warning("Please accept Terms and Conditions");

      return;

    }

    try {

      const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
        {
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
          phone: registerData.phone,
        }
      );

      if (data.success) {

        localStorage.setItem("token", data.token);

setToken(data.token);

await loadUserProfileData();

toast.success("Registration Successful");

navigate("/");

      } else {

        toast.success(data.message);

      }

    } catch (error) {

      console.log(error);

      toast.error("Registration Failed");

    }

  };

  // ================= GOOGLE LOGIN =================

 const handleGoogleLogin = async () => {

  try {

    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: "select_account",
    });

    const result = await signInWithPopup(auth, provider);

    localStorage.setItem("token", result.user.accessToken);

    setToken(result.user.accessToken);

    setUserData({
      name: result.user.displayName,
      email: result.user.email,
      image: result.user.photoURL,
    });
    localStorage.setItem(
  "userData",
  JSON.stringify({
    name: result.user.displayName,
    email: result.user.email,
    image: result.user.photoURL,
  })
);

    navigate("/");

  } catch (error) {

    console.log(error);

    toast.error(error.message);

  }

};

  // ================= SUCCESS SCREEN =================

  if (isSubmitted && activeTab === "login") {

    return (

      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-100 to-white px-4">

        <div className="w-full max-w-md rounded-xl border bg-white p-8 text-center shadow-sm">

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">

            <CheckCircle2 className="h-10 w-10 text-green-600" />

          </div>

          <h2 className="mb-2 text-2xl font-bold text-black">
            Welcome Back!
          </h2>

          <p className="mb-6 text-gray-600">
            You have successfully logged in.
          </p>

          <Link
            to="/"
            className="inline-block rounded-md bg-black px-5 py-2 text-white"
          >
            Go to Dashboard
          </Link>

        </div>

      </div>

    );

  }

  return (

    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-100 to-white px-4 py-12">

      <div className="w-full max-w-md">

        {/* BACK BUTTON */}

        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-700 hover:underline"
        >

          <ArrowLeft className="h-4 w-4" />

          Back to Home

        </Link>

        {/* CARD */}

        <div className="rounded-xl border bg-white shadow-sm">

          {/* HEADER */}

          <div className="border-b p-6 text-center">

            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-black">

              <Heart className="h-6 w-6 text-white" />

            </div>

            <h2 className="text-2xl font-bold text-black">

              Welcome to {siteConfig?.name || "VitaCare"}

            </h2>

            <p className="mt-1 text-sm text-gray-600">

              Sign in to your account or create a new one

            </p>

          </div>

          {/* TABS */}

          <div className="p-6">

            <div className="grid grid-cols-2 overflow-hidden rounded-lg border">

              <button
                onClick={() => setActiveTab("login")}
                className={`py-2 text-sm font-medium ${
                  activeTab === "login"
                    ? "bg-black text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                Login
              </button>

              <button
                onClick={() => setActiveTab("register")}
                className={`py-2 text-sm font-medium ${
                  activeTab === "register"
                    ? "bg-black text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                Register
              </button>

            </div>

            {/* LOGIN FORM */}

            {activeTab === "login" && (

              <form onSubmit={handleLogin} className="mt-6 space-y-4">

                <div>

                  <label className="mb-1 block text-sm font-medium">
                    Email
                  </label>

                  <div className="relative">

                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          email: e.target.value,
                        })
                      }
                      className="w-full rounded-md border px-10 py-2 outline-none"
                      required
                    />

                  </div>

                </div>

                <div>

                  <label className="mb-1 block text-sm font-medium">
                    Password
                  </label>

                  <div className="relative">

                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          password: e.target.value,
                        })
                      }
                      className="w-full rounded-md border px-10 py-2 outline-none"
                      required
                    />

                  </div>

                </div>

                <div className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />

                  <label className="text-sm text-gray-700">
                    Remember me
                  </label>

                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-black py-3 text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                >
                  Sign In
                </button>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full rounded-md border border-black py-3 transition-all duration-200 hover:bg-black hover:text-white active:scale-95"
                >
                  Continue with Google
                </button>

              </form>

            )}

            {/* REGISTER FORM */}

            {activeTab === "register" && (

              <form onSubmit={handleRegister} className="mt-6 space-y-4">

                <div>

                  <label className="mb-1 block text-sm font-medium">
                    Full Name
                  </label>

                  <div className="relative">

                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                    <input
                      placeholder="John Doe"
                      value={registerData.name}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          name: e.target.value,
                        })
                      }
                      className="w-full rounded-md border px-10 py-2 outline-none"
                      required
                    />

                  </div>

                </div>

                <div>

                  <label className="mb-1 block text-sm font-medium">
                    Email
                  </label>

                  <div className="relative">

                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                      className="w-full rounded-md border px-10 py-2 outline-none"
                      required
                    />

                  </div>

                </div>

                <div>

                  <label className="mb-1 block text-sm font-medium">
                    Phone Number
                  </label>

                  <div className="relative">

                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                    <input
                      type="tel"
                      placeholder="+91 9876543210"
                      value={registerData.phone}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          phone: e.target.value,
                        })
                      }
                      className="w-full rounded-md border px-10 py-2 outline-none"
                      required
                    />

                  </div>

                </div>

                <div>

                  <label className="mb-1 block text-sm font-medium">
                    Password
                  </label>

                  <div className="relative">

                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                    <input
                      type="password"
                      placeholder="Create Password"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                      className="w-full rounded-md border px-10 py-2 outline-none"
                      required
                    />

                  </div>

                </div>

                <div>

                  <label className="mb-1 block text-sm font-medium">
                    Confirm Password
                  </label>

                  <div className="relative">

                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={registerData.confirmPassword}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full rounded-md border px-10 py-2 outline-none"
                      required
                    />

                  </div>

                </div>

                <div className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                  />

                  <label className="text-sm text-gray-700">
                    I agree to Terms & Privacy Policy
                  </label>

                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-black py-3 text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                >
                  Create Account
                </button>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full rounded-md border border-black py-3 transition-all duration-200 hover:bg-black hover:text-white active:scale-95"
                >
                  Continue with Google
                </button>

              </form>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}