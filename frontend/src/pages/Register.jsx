import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Menu,
  GraduationCap,
  Building2,
  BookOpen,
  Library,
} from "lucide-react";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "", 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const validateForm = () => {

    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }

    if (formData.fullName.length < 3) {
      toast.error("Full name must be at least 3 characters");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email");
      return false;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must contain uppercase, lowercase, number and special character"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {

  e.preventDefault();
  console.log("submit successfully ")

  if (!validateForm()) return;

  try {

    // API Call

    toast.success("Registration Successful");

    navigate("/login");

  } catch (error) {

    toast.error(error.response?.data?.message || "Registration Failed");

  }
};

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar/>

      {/* Content */}
      <div className="flex-1 flex justify-center py-10">
        <div className="w-full max-w-md px-4">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-[#E8EDE0] flex items-center justify-center">
              <GraduationCap className="text-[#556B2F]" size={34} />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800">
              Create Account
            </h2>
            <p className="text-gray-500 mt-3">
              Join our community of focused learners and book your ideal study
              space.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="mb-5">
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Yani Singh"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border rounded-lg pl-10 py-3 outline-none focus:ring-2 focus:ring-[#556B2F]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="yani@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg pl-10 py-3 outline-none focus:ring-2 focus:ring-[#556B2F]"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-5">
                <label className="block text-sm font-medium mb-2">
                    Password
                </label>

                <div className="relative">
                    <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border rounded-lg pl-10 pr-10 py-3 outline-none focus:ring-2 focus:ring-[#556B2F]"
                    />

                    {showPassword ? (
                    <EyeOff
                        size={18}
                        onClick={() => setShowPassword(false)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                    />
                    ) : (
                    <Eye
                        size={18}
                        onClick={() => setShowPassword(true)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                    />
                    )}
                </div>
                </div>

              {/* Terms */}
              <div className="flex items-start gap-2 mb-6">
                <input type="checkbox" className="mt-1" />

                <p className="text-sm text-gray-600">
                  I agree to the{" "}
                  <span className="text-[#556B2F] font-medium">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-[#556B2F] font-medium">
                    Privacy Policy
                  </span>
                </p>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-[#556B2F] hover:bg-[#465923] text-white py-3 rounded-lg font-semibold transition"
              >
                Sign Up →
              </button>
            </form>

            {/* Login */}
            <div className="mt-8 text-center border-t pt-6">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button className="text-[#556B2F] font-semibold cursor-pointer" onClick={() => navigate("/login")}>
                  Log In
                </button>
              </p>
            </div>
          </div>

          {/* Trusted */}
          <div className="text-center mt-10">
            <p className="text-xs uppercase text-gray-400 mb-4">
              Trusted By Students At
            </p>

            <div className="flex justify-center gap-8 text-gray-400">
              <Building2 />
              <BookOpen />
              <Library />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Register;