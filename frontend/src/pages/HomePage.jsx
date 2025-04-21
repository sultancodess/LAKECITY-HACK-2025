import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRocket, FaBrain, FaServer, FaFigma } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { UserDetailContext } from "../context/UserDetailContext";
import { useSelector } from "react-redux";
import FAQ from "../components/FaqSection";
import PricingPage from "./PricingPage";
import Pricing from "../components/Pricing";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { AlertCircle, ArrowRight, CheckCircle, CircleCheck, Figma, Link, X } from "lucide-react";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import Hero from "../components/Hero";
const Home = () => {

 const apiURL = import.meta.env.VITE_BASE_URL;
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0); // Track API progress
  const [status, setStatus] = useState("idel"); 
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);


const handleGenerate = async () => {
  if (!user) {
    navigate("/login");
    return;
  }

 
}
   

  return (
    <div className="bg-black h-full min-h-screen">
     
      <Navbar />
      <Hero/>
      <Testimonials/>
      <FAQ />
      <Pricing />
      <Footer />
      
      {isModalOpen && (
        <VideoModal
          isOpen={isModalOpen}
          progress={progress}
          status={status}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};


const VideoModal = ({ isOpen,progress, status, onClose }) => {

  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % messages.length;
        setCurrentMessage(messages[newIndex]);
        return newIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <>
 
      
    </>
  );
};

export default Home;
