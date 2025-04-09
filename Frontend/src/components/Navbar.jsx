import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken , userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400">
      {/* Logo */}
      <img onClick={() => navigate('/')} className="w-10 cursor-pointer" src={assets.logo} alt="Logo" />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-5 font-medium">
        <li>
          <NavLink to="/" className="py-1 hover:text-primary">HOME</NavLink>
        </li>
        <li>
          <NavLink to="/doctors" className="py-1 hover:text-primary">ALL DOCTORS</NavLink>
        </li>
        <li>
          <NavLink to="/about" className="py-1 hover:text-primary">ABOUT</NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="py-1 hover:text-primary">CONTACT</NavLink>
        </li>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {token  && userData ?  (
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-2">
              <img className="w-6 rounded-full" src={userData.image} alt="Profile" />
              <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
            </div>
            <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md w-48 text-gray-700 hidden group-hover:block z-50">
              <ul className="flex flex-col gap-2 p-3">
                <li onClick={() => navigate('/my-profile')} className="cursor-pointer hover:text-black">My Profile</li>
                <li onClick={() => navigate('/my-appointments')} className="cursor-pointer hover:text-black">My Appointments</li>
                <li onClick={logout} className="cursor-pointer hover:text-black">Logout</li>
              </ul>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className="bg-[#4499dd] text-white px-8 py-3 rounded-full font-light hidden md:block">
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img onClick={() => setShowMenu(true)} src={assets.menu_icon} alt="Menu" className="md:hidden cursor-pointer w-7" />

        {/* Mobile Menu Overlay */}
        {showMenu && (
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transition-transform">
            <div className="flex items-center justify-between px-5 py-6">
              <img className="w-36" src={assets.logo} alt="Logo" />
              <img className="w-7 cursor-pointer" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="Close" />
            </div>
            <ul className="flex flex-col items-center gap-3 mt-5 px-5 text-lg font-medium">
              {[
                { path: '/', label: 'Home' },
                { path: '/doctors', label: 'All Doctors' },
                { path: '/about', label: 'About' },
                { path: '/contact', label: 'Contact' },
              ].map(({ path, label }, index) => (
                <li key={index}>
                  <NavLink
                    to={path}
                    onClick={() => setShowMenu(false)}
                    className="px-4 py-2 rounded inline-block hover:text-primary"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
