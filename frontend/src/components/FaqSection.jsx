import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is InterviewMate?",
    answer:
      "InterviewMate is an AI-powered platform that helps job seekers prepare for interviews with real-time feedback, personalized coaching, and realistic practice scenarios.",
  },
  {
    question: "How does InterviewMate work?",
    answer:
      "Users participate in mock interviews powered by AI. The platform simulates various interview scenarios, analyzes your responses, and provides instant feedback to help you improve.",
  },
  {
    question: "Who can use InterviewMate?",
    answer:
      "Job seekers preparing for interviews, including students, professionals, and anyone looking to enhance their interview skills. It’s useful for technical and non-technical roles.",
  },
  {
    question: "What types of interviews can I practice on InterviewMate?",
    answer:
      "You can practice tech interviews, HR interviews, case studies, and domain-specific interviews. The platform covers a wide range of industries and job positions.",
  },
  {
    question: "Do I need coding knowledge to use InterviewMate?",
    answer:
      "No! While we offer technical interview practice, InterviewMate also supports HR, behavioral, and domain-specific interviews that don’t require technical knowledge.",
  },
  {
    question: "How much does InterviewMate cost?",
    answer:
      "InterviewMate offers a tiered pricing model with Free, Premium, and Enterprise plans. Each plan provides different levels of access to features like interview simulations, AI feedback, and personalized coaching.",
  },
];

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <motion.div 
      className="bg-transparent"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        className={`w-full flex items-center justify-between p-6 bg-gray-900/80 backdrop-blur-xl rounded-2xl text-left border transition-all duration-300 ${
          isOpen 
            ? "border-[#F5793B]/50 shadow-lg shadow-[#F5793B]/10"
            : "border-gray-800/50 hover:border-[#F5793B]/30"
        }`}
        onClick={onClick}
      >
        <span className="text-xl text-gray-100 font-medium">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-[#F5793B]" />
        ) : (
          <ChevronDown className="w-6 h-6 text-[#F5793B]" />
        )}
      </button>
      
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          height: isOpen ? "auto" : 0 
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-6 mt-2 bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-[#F5793B]/20">
          <p className="text-gray-300 leading-relaxed">{answer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div
      className="min-h-screen bg-black p-6 md:p-12"
      style={{
        backgroundImage: `linear-gradient(
          to bottom right, 
          rgba(245, 121, 59, 0.1),
          rgba(30, 41, 59, 0.15)
        ), url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=2940&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#F5793B] to-orange-300 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 text-lg">
            Everything you need to know about InterviewMate
          </p>
        </motion.div>

        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openIndex}
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default FAQ;