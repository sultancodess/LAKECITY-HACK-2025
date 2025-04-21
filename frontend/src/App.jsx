import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { ToastContainer } from "react-toastify";
import AuthSuccess from "./components/AuthSuccess";
import PricingPage from "./pages/PricingPage";
import ReportAbuse from "./pages/ReportAbuse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/T&C";
import Security from "./pages/Security";
import AboutUs from "./pages/AboutUs";


const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/report-abuse" element={<ReportAbuse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/security" element={<Security />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
};

export default App;
