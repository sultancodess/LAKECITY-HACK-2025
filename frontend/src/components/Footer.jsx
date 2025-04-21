import React from "react";
import { Twitter, Linkedin } from "lucide-react";
import {Link} from "react-router-dom"


const Footer = () => {
  return (
    <footer className="bg-black text-white pt-8 px-10 border-t border-white/30">
      <div className="container mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Social Links */}
          <div className="col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 mb-6">
                <img
                  src="/assets/logo.png"
                  alt="Devplex AI Logo"
                  className="h-6 w-auto"
                />
                <span className="text-xl font-semibold">Interviewmate</span>
              </div>
              <p className="text-md text-gray-300 mb-4">
              Master Your Interviews With AI Precision.
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="hover:text-gray-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="hover:text-gray-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {[
                "Roadmap",
                "Changelog",
                "Solutions",
                "Hire a Partner",
                "Become a Partner",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-gray-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", link: "/" },
                { label: "About", link: "/about" },
                { label: "Pricing", link: "/pricing" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.link}
                    className="hover:text-gray-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {["Launched", "Docs", "Support"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-gray-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {[
                { label: "Privacy Policy", link: "/privacy-policy" },
                { label: "Terms & Conditions", link: "/terms-conditions" },
                { label: "Report Abuse", link: "/report-abuse" },
                { label: "Security", link: "/security" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.link}
                    className="hover:text-gray-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-white/20 p-4 text-center text-gray-300 text-lg">
          &copy; {new Date().getFullYear()} Interviewmate. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
