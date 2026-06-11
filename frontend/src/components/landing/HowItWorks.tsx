"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ClipboardList, Cpu, BarChart2, HeartPulse } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Enter Health Information",
    description:
      "Fill in your clinical parameters — anthropometrics, hormones, symptoms, and lifestyle factors.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Risk Analysis",
    description:
      "Our XGBoost model processes your inputs and computes a calibrated PCOS risk probability in milliseconds.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    number: "03",
    icon: BarChart2,
    title: "Review Explanations",
    description:
      "Understand exactly which factors contributed to your result through feature importance visualizations.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    number: "04",
    icon: HeartPulse,
    title: "Take Action",
    description:
      "Receive personalized, evidence-based recommendations and guidance on next steps.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100 mb-4">
            How It Works
          </span>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            From inputs to insights in 4 steps
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            A streamlined clinical workflow designed for efficiency and clarity.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-slate-100 mx-32" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Icon circle */}
                  <div
                    className={`relative w-20 h-20 rounded-2xl ${step.bg} border-2 border-white shadow-md flex items-center justify-center mb-5 z-10`}
                  >
                    <Icon className={`w-8 h-8 ${step.color}`} />
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                      {i + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
