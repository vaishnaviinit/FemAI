"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Minus } from "lucide-react";

const ROWS = [
  { label: "Number of Features", quick: "12", detailed: "41" },
  { label: "Time Required", quick: "~30 seconds", detailed: "~5 minutes" },
  { label: "Accuracy (F1 Score)", quick: "0.882", detailed: "0.879" },
  { label: "Hormonal Parameters", quick: false, detailed: true },
  { label: "Ultrasound Data", quick: false, detailed: true },
  { label: "Blood Pressure", quick: false, detailed: true },
  { label: "Core Symptoms", quick: true, detailed: true },
  { label: "Lifestyle Factors", quick: true, detailed: true },
  { label: "Recommended Use", quick: "Initial Screening", detailed: "Clinical Evaluation" },
];

export default function ComparisonTable() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100 mb-4">
            Compare
          </span>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Quick vs Detailed Assessment
          </h2>
          <p className="text-slate-500 text-lg">
            Choose the right assessment for your needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-slate-900">
            <div className="p-5 text-slate-400 text-sm font-medium">Feature</div>
            <div className="p-5 border-l border-slate-700 text-center">
              <span className="text-white font-bold text-sm">Quick</span>
              <p className="text-blue-400 text-xs mt-0.5">12 features</p>
            </div>
            <div className="p-5 border-l border-slate-700 text-center bg-blue-600">
              <span className="text-white font-bold text-sm">Detailed</span>
              <p className="text-blue-100 text-xs mt-0.5">41 features</p>
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 border-t border-slate-100 ${
                i % 2 === 0 ? "bg-white" : "bg-slate-50/50"
              }`}
            >
              <div className="p-4 pl-5 text-sm text-slate-700 font-medium flex items-center">
                {row.label}
              </div>
              <div className="p-4 border-l border-slate-100 flex items-center justify-center">
                {typeof row.quick === "boolean" ? (
                  row.quick ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Minus className="w-4 h-4 text-slate-300" />
                  )
                ) : (
                  <span className="text-sm text-slate-600">{row.quick}</span>
                )}
              </div>
              <div className="p-4 border-l border-blue-50 flex items-center justify-center bg-blue-50/30">
                {typeof row.detailed === "boolean" ? (
                  row.detailed ? (
                    <Check className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Minus className="w-4 h-4 text-slate-300" />
                  )
                ) : (
                  <span className="text-sm font-medium text-blue-700">{row.detailed}</span>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
