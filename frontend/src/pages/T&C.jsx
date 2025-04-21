import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsConditions = () => {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center px-4 py-16">
          <div className="max-w-3xl mx-auto ">
            <h1 className="text-5xl  font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Terms & Conditions
            </h1>
            <p className="text-gray-300 mb-10">Last Updated: 1 April 2025</p>

            <section className="mb-8 text-left">
              <h2 className="text-2xl font-semibold mb-2">
                Acceptance of Terms
              </h2>
              <p className="text-gray-300 ml-4">
                By accessing and using Devplex AI, you acknowledge that you have
                read, understood, and agree to be bound by these Terms &
                Conditions.
              </p>
            </section>

            <section className="mb-8 text-left">
              <h2 className="text-2xl font-semibold mb-2">
                Use of AI-Generated Content
              </h2>
              <p className="text-gray-300 ml-4">
                You may use AI-generated content for personal, commercial, or
                business purposes, but you are responsible for ensuring
                compliance with applicable laws.
              </p>
              <p className="text-gray-300 ml-4">
                Devplex AI does not guarantee the accuracy, originality, or
                legality of the generated content.
              </p>
            </section>

            <section className="mb-8 text-left">
              <h2 className="text-2xl font-semibold mb-2">
                Intellectual Property
              </h2>
              <p className="text-gray-300 ml-4">
                All AI-generated content belongs to the user, but Devplex AI
                retains the right to use anonymized outputs to improve model
                performance.
              </p>
            </section>

            <section className="mb-8 text-left">
              <h2 className="text-2xl font-semibold mb-2">
                Limitation of Liability
              </h2>
              <p className="text-gray-300 ml-4">
                Devplex AI is not responsible for any damages, losses, or
                liabilities resulting from the use of its content. We do not
                provide warranties regarding quality, accuracy, or reliability.
              </p>
            </section>

            <section className="mb-8 text-left">
              <h2 className="text-2xl font-semibold mb-2">
                Content Moderation & Compliance
              </h2>
              <p className="text-gray-300 ml-4">
                Devplex AI reserves the right to suspend or terminate accounts
                that violate these terms. Automated and manual moderation
                techniques may be used.
              </p>
            </section>

            <section className="mb-8 text-left">
              <h2 className="text-2xl font-semibold mb-2">
                Payments & Subscription
              </h2>
              <p className="text-gray-300 ml-4">
                Users must adhere to the pricing and payment terms outlined on
                our platform. Subscription fees are non-refundable unless
                explicitly stated.
              </p>
            </section>

            <section className="mb-8 text-left">
              <h2 className="text-2xl font-semibold mb-2">Updates to Terms</h2>
              <p className="text-gray-300 ml-4">
                We reserve the right to update these Terms & Conditions at any
                time. Continued use of Devplex AI constitutes acceptance of the
                revised terms.
              </p>
            </section>

            <section className="mb-8 text-left">
              <h2 className="text-2xl font-semibold mb-2">
                Contact Information
              </h2>
              <p className="text-gray-300 ml-4">
                For any questions or concerns, please contact us at{" "}
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

export default TermsConditions;
