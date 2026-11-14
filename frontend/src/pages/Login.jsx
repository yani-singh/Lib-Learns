import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Code,
} from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";


import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateLogin = () => {

  if (!formData.email.trim()) {
    toast.error("Email is required");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(formData.email)) {
    toast.error("Please enter a valid email");
    return false;
  }

  if (!formData.password.trim()) {
    toast.error("Password is required");
    return false;
  }

  return true;
};
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateLogin()) return;

    try {

      const response = await API.post(
        "/auth/login",
        formData
      );

      toast.success(response.data.message);

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Invalid email or password"
      );

    }

  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar/>

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Heading */}
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-gray-800">
                Welcome Back
              </h2>

              <p className="text-gray-500 mt-3">
                Access your productive study environment.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
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
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg pl-10 py-3 outline-none focus:ring-2 focus:ring-[#556B2F]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-[#556B2F]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full border rounded-lg pl-10 pr-10 py-3 outline-none focus:ring-2 focus:ring-[#556B2F]"
                  />

                  {showPassword ? (
                    <EyeOff
                      size={18}
                      onClick={() => setShowPassword(false)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                    />
                  ) : (
                    <Eye
                      size={18}
                      onClick={() => setShowPassword(true)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                    />
                  )}
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input type="checkbox" />

                <span className="text-sm text-gray-600">
                  Keep me logged in
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#556B2F] hover:bg-[#465923] text-white py-3 rounded-lg font-semibold transition"
              >
                Sign In to Dashboard
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="h-px bg-gray-300 flex-1"></div>

              <span className="text-xs text-gray-400 font-medium">
                OR CONTINUE WITH
              </span>

              <div className="h-px bg-gray-300 flex-1"></div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="border rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                Google
              </button>

              <button className="border rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                <Code size={18} />
                GitHub
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center mt-10">
              <p className="text-gray-600">
                New to Lib-Learn?{" "}
                <Link
                  to="/register"
                  className="text-[#556B2F] font-semibold"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
        <Footer/>

    </div>
  );
};

export default Login;