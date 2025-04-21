
import React from "react";
import { motion } from "framer-motion";
import { Mic, Bot, Star, ArrowRight, Zap, CheckCircle, Users, Clock, Award } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#1A0B2E] to-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7F6FEA]/10 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#F5793B]/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 py-24 flex flex-col lg:flex-row items-center justify-between relative z-10">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 mb-12 lg:mb-0"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Ace Your Interviews with
            <span className="bg-gradient-to-r from-[#F5793B] to-[#7F6FEA] bg-clip-text text-transparent">
              {" "}AI Coaching
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Practice with realistic AI interviews and get instant feedback on your 
            answers, tone, and body language.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#F5793B] to-[#7F6FEA] text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 hover:shadow-xl hover:shadow-[#F5793B]/20"
          >
            Start Free Trial <ArrowRight size={20} />
          </motion.button>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex items-center gap-6"
          >
            <div className="flex items-center gap-2">
              <Star className="text-[#F5793B]" />
              <span className="text-gray-400">4.9/5 (2k+ Reviews)</span>
            </div>
            <div className="h-6 w-px bg-gray-600" />
            <div className="flex items-center gap-2">
              <CheckCircle className="text-[#7F6FEA]" />
              <span className="text-gray-400">50k+ Interviews Conducted</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Interactive Mockup */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative lg:w-1/2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5793B] to-[#7F6FEA] blur-3xl opacity-20 rounded-full" />
          <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
            {/* AI Interview Simulation */}
            <div className="flex flex-col gap-4">
              <motion.div 
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-3"
              >
                <div className="h-12 w-12 bg-[#F5793B] rounded-full flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div className="bg-gray-800 p-4 rounded-xl relative">
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#F5793B]/30 animate-progress" />
                  <p className="text-gray-300">Tell me about your experience with React...</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center gap-3 ml-12"
              >
                <div className="bg-gray-800 p-4 rounded-xl">
                  <p className="text-gray-300">I've worked with React for 3 years...</p>
                </div>
                <div className="h-12 w-12 bg-[#7F6FEA] rounded-full flex items-center justify-center">
                  <Mic size={24} />
                </div>
              </motion.div>
            </div>

            {/* Real-time Feedback */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="mt-6 p-4 bg-gray-800 rounded-xl border-l-4 border-[#F5793B]"
            >
              <div className="flex items-center gap-2 text-[#F5793B]">
                <Star size={18} />
                <span className="font-medium">Feedback Score: 82/100</span>
              </div>
              <div className="mt-2 flex gap-2">
                {['Clarity', 'Confidence', 'Relevance'].map((metric, i) => (
                  <div key={i} className="px-3 py-1 bg-[#7F6FEA]/10 rounded-full text-sm">
                    {metric}: {78 + i * 2}%
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Why InterviewMate? Section */}
      <section className="container mx-auto px-4 py-24">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-center mb-16"
        >
          Why InterviewMate?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Users className="text-[#F5793B]" size={32} />,
              title: "Proven Success",
              text: "92% of users land jobs within 3 months of practice"
            },
            {
              icon: <Clock className="text-[#7F6FEA]" size={32} />,
              title: "Real-time Analysis",
              text: "Instant feedback on 12+ interview metrics"
            },
            {
              icon: <Award className="text-[#F5793B]" size={32} />,
              title: "Expert Approved",
              text: "Curriculum designed with hiring managers from top tech companies"
            }
          ].map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-900/50 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-[#7F6FEA]/30 transition-all"
            >
              <div className="mb-6 text-[#F5793B]">{reason.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{reason.title}</h3>
              <p className="text-gray-400">{reason.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Existing How It Works Section */}
      <section className="container mx-auto px-4 py-24">
        {/* ... (existing how it works content) */}
     
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-center mb-16"
        >
          How It Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Mic className="text-[#F5793B]" size={32} />,
              title: "Start Interview",
              text: "Choose from 50+ domains and difficulty levels"
            },
            {
              icon: <Bot className="text-[#7F6FEA]" size={32} />,
              title: "AI Analysis",
              text: "Real-time feedback on 12+ performance metrics"
            },
            {
              icon: <Star className="text-[#F5793B]" size={32} />,
              title: "Improve",
              text: "Personalized improvement plan with AI insights"
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-900/50 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-[#7F6FEA]/30 transition-all"
            >
              <div className="mb-6">{step.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    

      {/* Existing Key Features Section */}
      <section className="bg-gradient-to-b from-[#1A0B2E] to-black py-24">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16"
          >
            Powerful Features
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="text-[#F5793B]" size={24} />,
                title: "Voice Analysis",
                text: "Tone, pace & clarity evaluation"
              },
              {
                icon: <CheckCircle className="text-[#7F6FEA]" size={24} />,
                title: "AI Scoring",
                text: "12+ parameters including confidence & relevance"
              },
              {
                icon: <Mic className="text-[#F5793B]" size={24} />,
                title: "Multi-format",
                text: "Voice or text-based interviews"
              },
              {
                icon: <Bot className="text-[#7F6FEA]" size={24} />,
                title: "Question Bank",
                text: "10,000+ industry-specific questions"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-[#F5793B]/30 transition-all"
              >
                <div className="mb-4 bg-[#F5793B]/10 p-3 rounded-lg w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
   </section>
  );
};

export default Hero;