import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ReportAbuse() {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center px-4 py-16">
          <h1 className="text-5xl  font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Report Abuse
          </h1>
          <p className="text-lg text-gray-300 text-center max-w-2xl mb-4">
            Your safety is important to Devplex. If you encounter any abuse,
            security concerns, or violations, please report them to us at{" "}
          </p>{" "}
          <a
            href="mailto:support@Devplex.com"
            className="underline  text-6xl  font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-10 hover:text-white transition-colors"
          >
            support@Devplex.com
          </a>
          <h2 className="text-2xl text-gray-500 font-bold mb-8">
            Our Commitment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl">
            <div className="flex flex-col items-center text-center bg-[#12141F] p-10 rounded-xl border border-white/10">
              <h3 className="text-2xl font-semibold mb-4">Security First</h3>
              <p className="text-gray-400">
                Your security and privacy are our top priorities. All reports
                are handled confidentially.
              </p>
            </div>

            <div className="flex flex-col items-center text-center bg-[#12141F] p-10 rounded-xl border border-white/10">
              <h3 className="text-2xl font-semibold mb-4">
                Responsible Disclosure
              </h3>
              <p className="text-gray-400">
                We follow responsible disclosure practices and appreciate your
                help in keeping Lovable secure.
              </p>
            </div>

            <div className="flex flex-col items-center text-center bg-[#12141F] p-10 rounded-xl border border-white/10">
              <h3 className="text-2xl font-semibold mb-4">Zero Tolerance</h3>
              <p className="text-gray-400">
                We maintain a zero-tolerance policy for abuse and take immediate
                action when verified.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
}

export default ReportAbuse;
