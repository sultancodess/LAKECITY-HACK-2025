import React, { useState, useEffect, useRef } from "react";
import { X, Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUser } from "../../redux/authSlice";
import Avatar from "react-avatar";
import { toast } from "react-toastify";
import { fetchUserData } from "../../redux/authActions";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.auth);
  const [userAvatar, setUserAvatar] = useState(user?.avatar || "");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId && !user) {
      fetchUserData(token, userId, dispatch, setUser);
    }
  }, [dispatch, user]); // Runs only when `user` changes

  useEffect(() => {
    if (user?.avatar) {
      setUserAvatar(user.avatar);
    }
  }, [user]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");

    dispatch(logout());

    toast.success("Sign Out Successfully");

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Pricing", link: "/pricing" },
  ];

  return (
    <>
      <nav
        className={`w-full bg-black text-white py-4 px-4 sm:px-6 lg:px-40 flex items-center justify-between border-b border-white/10 sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-3 bg-black/90 backdrop-blur-sm" : ""
        }`}
      >
        {/* Logo + Name */}
        <div
          onClick={() => {
            navigate("/");
          }}
          className="flex cursor-pointer items-center gap-1"
        >
          <img
            src="/assets/logo.png"
            alt="interviewmate Logo"
            className="h-6 w-auto colour-white"
          />
          <span className="text-xl font-semibold text-white">Interviewmate</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-6 text-gray-400 text-sm">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="hover:text-white transition cursor-pointer"
            >
              <Link to={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="hidden md:flex items-center gap-4">
                <Avatar
                  src={`${userAvatar}`}
                  name={!user?.name ? user?.email : user?.name}
                  alt="User Avatar"
                  size={40}
                  className="h-10 w-10 rounded-full"
                />
                <button
                  onClick={handleLogout}
                  className="text-white flex gap-2 bg-gray-900 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-800 cursor-pointer transition"
                >
                  Sign Out <LogOut size={20} />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="hidden md:flex items-center gap-4">
                <button
                  onClick={() => navigate("/login")}
                  className="text-white bg-amber-500 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-800 cursor-pointer transition"
                >
                  Sign in
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-gradient-to-r from-[#F5793B] to-[#7F6FEA] text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-600 transition"
                >
                  Get Started
                </button>
              </div>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          ref={menuRef}
          className={`fixed md:hidden top-16 left-0 w-full bg-black border-b border-white/10 transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <ul className="flex flex-col space-y-0 text-gray-300">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="hover:text-white transition cursor-pointer border-b border-white/10"
              >
                <a
                  href={item.link}
                  className="block px-6 py-4"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              </li>
            ))}
            {user ? (
              <>
                <li className="hover:text-white transition cursor-pointer border-b border-white/10">
                  <div className="flex items-center gap-3 px-6 py-4">
                    <Avatar
                      src={`${userAvatar}`}
                      alt="User Avatar"
                      name={!user?.name ? user?.email : user?.name}
                      size={40}
                      className="h-10 w-10 rounded-full"
                    />
                    <span>{user.name}</span>
                  </div>
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-6 py-4 flex items-center gap-2"
                  >
                    <LogOut size={18} /> Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-white transition cursor-pointer border-b border-white/10">
                  <a
                    href="/login"
                    className="block px-6 py-4"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign in
                  </a>
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  <a
                    href="/signup"
                    className="block px-6 py-4 text-blue-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
