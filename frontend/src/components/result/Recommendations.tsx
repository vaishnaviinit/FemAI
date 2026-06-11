"use client";

import { motion } from "framer-motion";
import { Stethoscope, Apple, Dumbbell, FlaskConical, Heart } from "lucide-react";
import type { PredictionResult } from "@/types";

interface Props {
  result: PredictionResult;
}

interface Recommendation {
  icon: typeof Stethoscope;
  category: string;
  items: string[];
  color: string;
  bg: string;
}

const RECS: Record<string, Recommendation[]> = {
  low: [
    {
      icon: Heart,
      category: "Maintain Your Health",
      items: [
        "Continue regular menstrual cycle tracking",
        "Maintain current healthy lifestyle habits",
        "Annual gynecological check-ups recommended",
      ],
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: Apple,
      category: "Nutrition",
      items: [
        "Continue a balanced, low-glycemic diet",
        "Limit processed foods and refined sugars",
        "Maintain adequate hydration",
      ],
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: Dumbbell,
      category: "Lifestyle",
      items: [
        "Keep up regular physical activity (150+ min/week)",
        "Manage stress through mindfulness or yoga",
        "Aim for consistent, quality sleep",
      ],
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
  ],
  moderate: [
    {
      icon: Stethoscope,
      category: "Medical Consultation",
      items: [
        "Schedule an appointment with a gynecologist",
        "Request a hormonal blood panel (FSH, LH, AMH, testosterone)",
        "Consider pelvic ultrasound to assess ovarian morphology",
      ],
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      icon: Apple,
      category: "Dietary Changes",
      items: [
        "Adopt a low-glycemic index (GI) diet",
        "Reduce refined carbohydrates and sugars",
        "Increase fiber, lean protein, and anti-inflammatory foods",
      ],
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      icon: Dumbbell,
      category: "Exercise & Lifestyle",
      items: [
        "Start a moderate exercise routine (cardio + strength)",
        "Target 30 minutes of activity at least 5 days/week",
        "Reduce stress with relaxation techniques",
      ],
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      icon: FlaskConical,
      category: "Monitoring",
      items: [
        "Track menstrual cycle length and regularity",
        "Monitor weight and BMI monthly",
        "Note any new or worsening symptoms",
      ],
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ],
  high: [
    {
      icon: Stethoscope,
      category: "Immediate Medical Action",
      items: [
        "Consult a gynecologist or endocrinologist promptly",
        "Comprehensive hormonal panel: FSH, LH, AMH, testosterone, insulin",
        "Pelvic ultrasound to assess ovarian cysts and endometrium",
        "Screen for insulin resistance and metabolic syndrome",
      ],
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      icon: Apple,
      category: "Therapeutic Nutrition",
      items: [
        "Strictly follow a low-GI anti-inflammatory diet",
        "Eliminate refined sugars and highly processed foods",
        "Consider consulting a registered dietitian specializing in PCOS",
      ],
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      icon: Dumbbell,
      category: "Exercise Prescription",
      items: [
        "Begin supervised exercise program",
        "Combine aerobic exercise with resistance training",
        "Even 5–10% weight loss can significantly improve PCOS symptoms",
      ],
      color: "text-pink-600",
      bg: "bg-pink-50",
    },
    {
      icon: FlaskConical,
      category: "Medical Management",
      items: [
        "Discuss potential pharmacological options with your doctor",
        "Metformin may be considered for insulin resistance",
        "Oral contraceptives may help regulate cycle (physician discretion)",
      ],
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ],
};

export default function Recommendations({ result }: Props) {
  const recs = RECS[result.riskLevel];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
    >
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-5">
        Recommendations
      </h3>

      <div className="space-y-4">
        {recs.map((rec, i) => {
          const Icon = rec.icon;
          return (
            <motion.div
              key={rec.category}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className={`p-4 rounded-xl ${rec.bg} border border-transparent`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-1.5 rounded-lg bg-white/70`}>
                  <Icon className={`w-3.5 h-3.5 ${rec.color}`} />
                </div>
                <h4 className={`text-sm font-bold ${rec.color}`}>{rec.category}</h4>
              </div>
              <ul className="space-y-1.5">
                {rec.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className={`mt-1.5 w-1 h-1 rounded-full ${rec.color.replace("text-", "bg-")} shrink-0`} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
