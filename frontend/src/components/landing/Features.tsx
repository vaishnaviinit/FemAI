"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Microscope, Brain, FileText } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Quick Assessment",
    subtitle: "12 Features · ~30 Seconds",
    description:
      "Fast preliminary screening using the most predictive clinical indicators. Perfect for initial risk flagging.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    badge: "Recommended for first-time users",
  },
  {
    icon: Microscope,
    title: "Detailed Assessment",
    subtitle: "41 Features · Higher Precision",
    description:
      "Comprehensive clinical evaluation using complete hormonal, ultrasound, and anthropometric parameters.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
    badge: "For clinical use cases",
  },
  {
    icon: Brain,
    title: "Explainable AI",
    subtitle: "SHAP-Based Insights",
    description:
      "Transparent predictions backed by feature importance analysis. Every result comes with a clear explanation.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    badge: "AI you can trust",
  },
  {
    icon: FileText,
    title: "Actionable Reports",
    subtitle: "Clinical Recommendations",
    description:
      "Get personalized next steps based on your risk profile — from lifestyle advice to when to see a specialist.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    badge: "Doctor friendly",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100 mb-4">
            Platform Capabilities
          </span>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Everything you need for PCOS screening
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            A complete clinical-grade AI platform built for accuracy, transparency, and ease of use.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`bg-white rounded-2xl border ${feat.border} p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div
                  className={`w-10 h-10 rounded-xl ${feat.bg} flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${feat.color}`} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {feat.title}
                  </h3>
                  <p className={`text-xs font-semibold ${feat.color} mb-2`}>
                    {feat.subtitle}
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-md ${feat.bg} ${feat.color} text-xs font-medium`}
                  >
                    {feat.badge}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
