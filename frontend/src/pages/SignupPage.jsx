

import React, { useContext, useState } from "react";
import axios from "axios";
import { IoLogoGithub } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useGoogleLogin } from "@react-oauth/google";
import { UserDetailContext } from "../context/UserDetailContext";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";


const SignupPage = ({ onClose = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userDetail, setUserDetail }=useContext(UserDetailContext);
 const apiURL = import.meta.env.VITE_BASE_URL;
 const handleGitHubLogin = () => {
   try {
     setIsSocialLoading(true);
     window.location.href = `${apiURL}/auth/github`; // Use environment variable for flexibility
   } catch (error) {
     console.error("GitHub Login Error:", error);
     setIsSocialLoading(false);
   }
 };


  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(`${apiURL}/auth/sign-up`, {
        email,
        password,
      });
      toast.success("Registration successful! Please Login");
      localStorage.setItem("token", response.data.token);
      onClose();
      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };


    const googleLogin = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        try {
          // Fetch user info from Google API
          const { data: userInfo } = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers: {
                Authorization: `Bearer ${tokenResponse?.access_token}`,
              },
            }
          );

          console.log(userInfo);

       
          const { data: response } = await axios.post(
            `${apiURL}/auth/google-login`,
            userInfo,
            { withCredentials: true }
          );

          if (response.token) {
            // Dispatch to Redux store
            dispatch(setUser({ user: response.user, token: response.token }));
            toast.success("Google Login Successful!");
            navigate("/");
          }
        } catch (error) {
          console.error("Google user info fetch failed:", error);
          toast.error("Failed to fetch user info from Google.");
        }
      },
      onError: (errorResponse) => {
        console.log("Google Login Error:", errorResponse);
        toast.error("Google login failed. Please try again.");
      },
    });

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <Navbar />
      <div
        className="absolute w-[2600px] h-[800px] rounded-[50%] left-1/2 -translate-x-1/2 
 bg-[radial-gradient(closest-side,#000_70%,#1E90FF_90%,#00BFFF_100%)] blur-sm
 top-[450px] border-2 border-[#8CD6DE]/30 opacity-70"
      ></div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0, duration: 1 }}
        className=" flex items-center justify-center mt-10"
      >
        <div className="w-[60%] flex gap-8  bg-gray-900 p-4 rounded-2xl shadow-2xl border border-gray-700 z-20">
          <div className="w-1/2">
            <img
              src="/assets/signup.jpg"
              alt=""
              className="w-90% h-full rounded-xl"
            />
          </div>

          <div className="w-1/2 p-4">
            <div className="text-center mb-8">
              <h2 className="text-white text-3xl font-bold mb-2">Welcome</h2>
              <p className="text-gray-400">Sign up to create your account</p>
            </div>

            {error && (
              <div className="mb-4 text-sm text-red-500 text-center">
                {error}
              </div>
            )}

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="mx-4 text-gray-400 text-sm font-medium">
                Sign up with
              </span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={() => googleLogin()}
                disabled={isSocialLoading}
                aria-label="Sign in with Google"
                className="flex-1 gap-1 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow disabled:opacity-70"
              >
                <img
                  src="/assets/google.png"
                  className="w-6 h-6"
                  alt="Google logo"
                />
                Google
              </button>
              <button
                onClick={handleGitHubLogin}
                disabled={isSocialLoading}
                aria-label="Sign in with GitHub"
                className="flex-1 gap-1  text-black bg-white font-medium py-3 px-4 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow disabled:opacity-70"
              >
                <IoLogoGithub className="text-3xl" />
                GitHub
              </button>
            </div>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="mx-4 text-gray-400 text-sm font-medium">
                or continue with
              </span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-5 relative">
                <input
                  className="peer w-full px-4 py-3 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent border border-gray-600/50"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 -top-2.5 text-sm text-gray-400 bg-gray-800 px-1 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-400"
                >
                  Email
                </label>
              </div>

              <div className="mb-6 relative">
                <input
                  className="peer w-full px-4 py-3 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent border border-gray-600/50"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 -top-2.5 text-sm text-gray-400 bg-gray-800 px-1 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-400"
                >
                  Password
                </label>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-300"
                  >
                    Remember me
                  </label>
                </div>

                <a
                  href="#"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline transition-all duration-300 flex items-center justify-center disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Signing up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;

