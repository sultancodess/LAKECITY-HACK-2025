import React from "react";
import { motion } from "framer-motion";
import { Mic, BotMessageSquare, Star, Zap } from "lucide-react";

const testimonials = [
  {
    content:
      "InterviewMate's AI mock interviews felt incredibly real! The voice-based practice sessions helped me overcome my anxiety and improve my communication skills significantly before my FAANG interview.",
    author: "Sarah Johnson - Senior Developer",
  },
  {
    content:
      "The real-time feedback on my answers was game-changing. I could immediately understand where I needed improvement and track my progress through the detailed analytics dashboard.",
    author: "Raj Patel - Tech Lead",
  },
  {
    content:
      "Practicing HR interviews with InterviewMate helped me craft better responses to behavioral questions. The AI's evaluation of my tone and content was surprisingly accurate!",
    author: "Emily Chen - Product Manager",
  },
  {
    content:
      "As a non-native English speaker, the voice analysis feature helped me improve my pronunciation and speaking pace. Landed my dream job at a Silicon Valley startup!",
    author: "Carlos Mendez - Full Stack Developer",
  },
  {
    content:
      "The technical interview simulations with coding challenges were spot-on. Loved how the AI adapted questions based on my previous answers - just like a real interview!",
    author: "Priya Sharma - Data Scientist",
  },
  {
    content:
      "InterviewMate's AI coach identified weaknesses in my answers I didn't even realize I had. My confidence skyrocketed after just 2 weeks of practice!",
    author: "Michael Thompson - DevOps Engineer",
  },
];

function Testimonials() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#F5793B] to-orange-200 bg-clip-text text-transparent"
          >
            Voices of Success
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg"
          >
            Hear from candidates who aced their interviews
          </motion.p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ 
                x: index % 2 === 0 ? -100 : 100, 
                opacity: 0,
                rotate: index % 2 === 0 ? -2 : 2
              }}
              whileInView={{ 
                x: 0, 
                opacity: 1,
                rotate: 0
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px -5px rgba(245, 121, 59, 0.3)"
              }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                delay: index * 0.1,
                duration: 0.5
              }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-lg hover:border-[#F5793B]/50 group"
            >
              <div className="absolute top-4 left-4 text-[#F5793B]">
                {index % 3 === 0 ? <Mic size={20} /> : 
                 index % 3 === 1 ? <BotMessageSquare size={20} /> : 
                 <Star size={20} />}
              </div>
              
              <blockquote>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <footer className="text-[#F5793B] font-medium text-right">
                  — {testimonial.author}
                </footer>
              </blockquote>
              
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#F5793B]/10 blur-3xl rounded-full transition-opacity group-hover:opacity-50" />
            </motion.div>
          ))}
        </div>

        {/* Stats Banner */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 w-full max-w-4xl p-6 rounded-2xl bg-gradient-to-r from-[#F5793B]/10 to-orange-400/10 border border-[#F5793B]/20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-[#F5793B]">95%</div>
              <div className="text-gray-400 text-sm">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#F5793B]">50K+</div>
              <div className="text-gray-400 text-sm">Mock Interviews</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#F5793B]">8.9/10</div>
              <div className="text-gray-400 text-sm">Satisfaction Score</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#F5793B]">2.5x</div>
              <div className="text-gray-400 text-sm">Faster Hiring</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Testimonials;