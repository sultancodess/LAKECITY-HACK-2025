import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Mic, Bot, Star, Zap } from "lucide-react";

// Currency formatter
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

// Calculate monthly equivalent and savings
const calculateAnnualSavings = (monthlyPrice, annualPrice) => {
  const annualCostMonthly = annualPrice / 12;
  const savings = monthlyPrice - annualCostMonthly;
  const discount = ((savings / monthlyPrice) * 100).toFixed(0);
  return { annualCostMonthly, discount };
};

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      name: "Starter",
      icon: <Mic className="w-6 h-6" />,
      description: "Perfect for casual interview preparation",
      monthlyPrice: 2470,
      annualPrice: 1990,
      features: [
        "5 AI mock interviews/month",
        "Basic feedback report",
        "3 interview categories",
        "Text-based practice",
        "Community support",
      ],
      cta: "Start Practicing",
      popular: false,
    },
    {
      name: "Professional",
      icon: <Bot className="w-6 h-6" />,
      description: "For serious job seekers and professionals",
      monthlyPrice: 8462,
      annualPrice: 7490,
      features: [
        "20 AI mock interviews/month",
        "Real-time voice analysis",
        "8+ interview categories",
        "Priority support",
        "Advanced feedback analytics",
        "Custom interview scripts",
        "Progress tracking",
      ],
      cta: "Go Professional",
      popular: true,
    },
    {
      name: "Enterprise",
      icon: <Zap className="w-6 h-6" />,
      description: "For teams & institutions",
      features: [
        "Unlimited interviews",
        "Team dashboard",
        "Dedicated success manager",
        "White-label reports",
        "Custom evaluation criteria",
        "SSO & API access",
        "24/7 priority support",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const handlePlanClick = (planName) => {
    setSelectedPlan(planName);
    // Add analytics or navigation logic here
    console.log(`Selected plan: ${planName}`);
  };

  return (
    <div className="min-h-screen bg-[#0A0B14] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F5793B]/10 blur-3xl w-96 h-96 rounded-full" />
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#F5793B] to-orange-200 bg-clip-text text-transparent"
          >
            Ace Your Interviews with AI
          </motion.h1>
          
          <p className="text-gray-400 text-lg mb-8">
            Get interview-ready with real-time AI feedback and personalized coaching
          </p>

          {/* Toggle */}
          <motion.div 
            className="flex items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-gray-300">Annual</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${
                isAnnual ? "bg-[#F5793B]" : "bg-gray-700"
              }`}
              aria-label="Toggle billing period"
            >
              <motion.div
                className="w-6 h-6 bg-white rounded-full shadow-md"
                animate={{ x: isAnnual ? 26 : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </button>
            <span className="text-gray-300">Monthly</span>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const isEnterprise = plan.name === "Enterprise";
            const price = isEnterprise ? "Custom" : (isAnnual ? plan.annualPrice : plan.monthlyPrice);
            const savings = isEnterprise ? null : calculateAnnualSavings(plan.monthlyPrice, plan.annualPrice);

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative rounded-3xl p-8 border transition-all duration-300 ${
                  plan.popular 
                    ? "border-[#F5793B]/50 bg-gradient-to-b from-[#F5793B]/10 to-transparent"
                    : "border-gray-700/50 hover:border-[#F5793B]/30"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-[#F5793B] to-orange-400 text-white px-4 py-1 rounded-tr-2xl rounded-bl-2xl text-sm">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    {plan.icon}
                    <h3 className="text-2xl font-semibold">{plan.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-end gap-2">
                    {!isEnterprise ? (
                      <>
                        <span className="text-4xl font-bold">
                          {formatPrice(price)}
                        </span>
                        <span className="text-gray-400 pb-1">
                          /{isAnnual ? "year" : "month"}
                        </span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold">{price}</span>
                    )}
                  </div>
                  {!isEnterprise && isAnnual && (
                    <p className="text-sm text-gray-400 mt-2">
                      Save {savings.discount}% vs monthly
                    </p>
                  )}
                  {!isEnterprise && !isAnnual && (
                    <p className="text-sm text-gray-400 mt-2">
                      Equivalent to {formatPrice(savings.annualCostMonthly)}/mo annually
                    </p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePlanClick(plan.name)}
                  className={`w-full py-3.5 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? "bg-gradient-to-r from-[#F5793B] to-orange-400 hover:from-[#F5793B]/90 hover:to-orange-400/90"
                      : "border border-[#F5793B] text-[#F5793B] hover:bg-[#F5793B]/10"
                  }`}
                >
                  {plan.cta}
                </motion.button>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-gray-300 text-sm"
                    >
                      <Check className="w-5 h-5 text-[#F5793B] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          )}
        </div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center p-8 rounded-3xl border border-[#F5793B]/20 bg-gradient-to-b from-[#F5793B]/5 to-transparent"
        >
          <div className="max-w-2xl mx-auto">
            <Star className="w-12 h-12 text-[#F5793B] mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Need Enterprise Solutions?
            </h2>
            <p className="text-gray-400 mb-8">
              Custom packages for universities and corporate teams with bulk
              discounts, dedicated support, and custom evaluation criteria.
            </p>
            <button 
              className="py-3 px-8 rounded-lg bg-[#F5793B] hover:bg-[#F5793B]/90 transition-colors"
              onClick={() => handlePlanClick("Enterprise")}
            >
              Schedule Demo
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Pricing;