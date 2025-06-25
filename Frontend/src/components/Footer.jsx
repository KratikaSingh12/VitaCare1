import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 px-6 sm:px-20 py-10 mt-24 border-t border-gray-300">
      <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr] text-sm text-gray-700">
        {/* Left - Logo and Description */}
        <div>
          <img className="w-12 mb-5" src={assets.logo} alt="HealHub Logo" />
          <p className="max-w-md leading-6">
            <strong>HealHub</strong> is your trusted online healthcare companion. 
            Book doctor appointments, consult with specialists, and manage your medical journey 
            all in one place. We're committed to making healthcare simple, secure, and accessible.
          </p>
        </div>

        {/* Middle - Navigation Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li><NavLink to="/" className="hover:underline hover:text-[#4499dd]">Home</NavLink></li>
            <li><NavLink to="/about" className="hover:underline hover:text-[#4499dd]">About Us</NavLink></li>
            <li><NavLink to="/contact" className="hover:underline hover:text-[#4499dd]">Contact Us</NavLink></li>
            <li><NavLink to="/privacy-policy" className="hover:underline hover:text-[#4499dd]">Privacy Policy</NavLink></li>
          </ul>
        </div>

        {/* Right - Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
          <ul className="space-y-2">
            <li>
              <a href="tel:+919084426799" className="hover:underline hover:text-[#4499dd]">+91-9084426799</a>
            </li>
            <li>
              <a href="mailto:healhub247@gmail.com" className="hover:underline hover:text-[#4499dd]">healhub247@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-gray-500 text-xs">
        <hr className="mb-4" />
        <p>© 2025 HealHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
