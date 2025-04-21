import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Security = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-3xl">
          <h1 className="text-5xl  font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Security at Devplex AI
          </h1>
          <p className="text-gray-300 mb-6">Last Updated: 1 April 2025</p>

          <section className="mb-8 text-left">
            <h2 className="text-2xl font-semibold mb-2">
              Data Protection & Privacy
            </h2>
            <p className="text-gray-300 ml-4">
              We employ industry-standard encryption protocols (AES-256, TLS
              1.3) to safeguard data in transit and at rest.
            </p>
            <p className="text-gray-300 ml-4">
              Strict access control mechanisms ensure only authorized users can
              interact with your data.
            </p>
            <p className="text-gray-300 ml-4">
              Compliant with GDPR, CCPA, and other major data privacy
              regulations.
            </p>
          </section>

          <section className="mb-8 text-left">
            <h2 className="text-2xl font-semibold mb-2">
              Secure AI Development
            </h2>
            <p className="text-gray-300 ml-4">
              AI models are continuously monitored and optimized to identify and
              mitigate potential security vulnerabilities.
            </p>
            <p className="text-gray-300 ml-4">
              Regular security audits and automated threat detection systems
              ensure the safety of your applications.
            </p>
          </section>

          <section className="mb-8 text-left">
            <h2 className="text-2xl font-semibold mb-2">
              Infrastructure Security
            </h2>
            <p className="text-gray-300 ml-4">
              Deployed on trusted cloud providers with robust physical and
              network security measures.
            </p>
            <p className="text-gray-300 ml-4">
              Firewalls, DDoS protection, and advanced intrusion detection
              systems are implemented to prevent unauthorized access.
            </p>
          </section>

          <section className="mb-8 text-left">
            <h2 className="text-2xl font-semibold mb-2">
              Continuous Monitoring & Updates
            </h2>
            <p className="text-gray-300 ml-4">
              Automated systems provide real-time monitoring of all components
              to detect and respond to threats instantly.
            </p>
            <p className="text-gray-300 ml-4">
              Regular updates ensure compliance with the latest security
              standards and practices.
            </p>
          </section>

          <section className="mb-8 text-left">
            <h2 className="text-2xl font-semibold mb-2">
              Secure DevOps (DevSecOps)
            </h2>
            <p className="text-gray-300 ml-4">
              Integrated security checks throughout CI/CD pipelines to detect
              and resolve vulnerabilities early.
            </p>
            <p className="text-gray-300 ml-4">
              Automated compliance checks to ensure adherence to best practices
              and regulatory requirements.
            </p>
          </section>

          <section className="mb-8 text-left">
            <h2 className="text-2xl font-semibold mb-2">
              Incident Response & Recovery
            </h2>
            <p className="text-gray-300 ml-4">
              Comprehensive backup and disaster recovery plans to maintain data
              integrity and availability.
            </p>
            <p className="text-gray-300 ml-4">
              Transparent reporting and communication channels in case of
              security incidents.
            </p>
          </section>

          <section className="mb-8 text-left">
            <h2 className="text-2xl font-semibold mb-2">
              Your Security, Our Priority
            </h2>
            <p className="text-gray-300 ml-4">
              At Devplex AI, we are committed to providing you with a secure,
              reliable, and efficient platform. Your innovation deserves the
              highest level of protection, and we ensure that at every step.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Security;
