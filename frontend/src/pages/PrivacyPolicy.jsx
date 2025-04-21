import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center px-4 py-16">
          <div className="max-w-3xl ">
            <h1 className="text-5xl  font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-gray-400 mb-6">Last Updated: 1 April 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
              <p className="text-gray-300 ml-4">
                Welcome to Devplex AI. Your privacy is important to us, and we
                are committed to protecting your personal data. This Privacy
                Policy explains how we collect, use, and safeguard your
                information when you use our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Information We Collect
              </h2>
              <h3 className="text-xl font-medium mt-4">Personal Information</h3>
              <ul className="list-disc list-inside text-gray-300 ml-4">
                <li>
                  Name, email address, and contact details when you register or
                  subscribe.
                </li>
                <li>
                  Payment information for subscription services (handled
                  securely by third-party payment processors).
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                How We Use Your Information
              </h2>
              <ul className="list-disc list-inside text-gray-300 ml-4">
                <li>Provide, improve, and optimize Devplex AI services.</li>
                <li>
                  Personalize user experience and recommend relevant features.
                </li>
                <li>Process transactions and manage subscriptions.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
              <p className="text-gray-300 ml-4">
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href="mailto:support@devplexai.com"
                  className="text-blue-400 hover:underline"
                >
                  support@devplexai.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
        <Footer />
      </>
    );
};

export default PrivacyPolicy;
