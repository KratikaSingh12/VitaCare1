import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Heart, User } from "lucide-react";

import { AppContext } from "../context/AppContext";

import { siteConfig, mainNavigation } from "../data/config";

export default function Header() {

  const location = useLocation();

  const { userData, setToken, setUserData } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);

  // ✅ Login page active check
  const isLoginActive = location.pathname === "/login";

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">

      <div className="w-full px-4 sm:px-6 lg:px-8">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              <Heart className="h-5 w-5 text-white" />
            </div>

            <span className="text-2xl font-bold text-black">
              {siteConfig?.name || "VitaCare"}
            </span>

          </Link>

          {/* Nav Links */}
          <nav className="hidden items-center gap-10 md:flex">

            {mainNavigation.map((item) => (

              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `text-base font-medium transition ${
                    isActive ? "text-black" : "text-gray-500"
                  } hover:text-black`
                }
              >
                {item.name}
              </NavLink>

            ))}

          </nav>

          {/* Right Side */}
          {

            userData ? (

              <div className="relative">

                {/* Profile */}
                <div
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex cursor-pointer items-center gap-3"
                >

                 <img
  src={
    userData?.image &&
    userData.image !== "null" &&
    userData.image !== "undefined"
      ? userData.image
      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  }
  onError={(e) => {
    e.target.src =
      "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  }}
  alt="profile"
  className="h-11 w-11 rounded-full border-2 border-gray-200 object-cover shadow-sm"
/>

                  <p className="text-sm font-semibold text-gray-800">
                    {userData.name}
                  </p>

                </div>

                {/* Dropdown */}
                {

                  showMenu && (

                    <div className="absolute right-0 z-50 mt-3 w-56 overflow-hidden rounded-2xl border bg-white shadow-xl">

                      <Link
                        to="/patient-profile"
                        onClick={() => setShowMenu(false)}
                        className="block px-5 py-3 transition hover:bg-gray-100"
                      >
                        My Profile
                      </Link>

                      <button
                        onClick={() => {

                          localStorage.removeItem("token");

                          setToken(false);

                          setUserData(false);

                        }}
                        className="w-full px-5 py-3 text-left text-red-500 transition hover:bg-red-100"
                      >
                        Logout
                      </button>

                    </div>

                  )

                }

              </div>

            ) : (

              <Link
                to="/login"
                className={`flex items-center gap-2 rounded-xl border px-5 py-2 text-sm font-medium transition ${
                  isLoginActive
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-200 bg-white text-black hover:border-emerald-500 hover:bg-emerald-500 hover:text-black"
                }`}
              >

                <User className="h-4 w-4" />

                Login

              </Link>

            )

          }

        </div>

      </div>

    </header>
  );
}