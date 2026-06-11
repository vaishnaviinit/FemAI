"use client";

import { motion } from "framer-motion";
import { ShieldCheck, AlertTriangle, AlertOctagon, Activity } from "lucide-react";
import { riskConfig } from "@/lib/risk";
import type { PredictionResult } from "@/types";

interface Props {
  result: PredictionResult;
}

const ICONS = {
  low: ShieldCheck,
  moderate: AlertTriangle,
  high: AlertOctagon,
};

export default function RiskCard({ result }: Props) {
  const config = riskConfig[result.riskLevel];
  const Icon = ICONS[result.riskLevel];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl border-2 ${config.borderColor} ${config.bgColor} p-8 text-center`}
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md mb-6"
        style={{ borderColor: config.color, borderWidth: 2 }}
      >
        <Icon className="w-9 h-9" style={{ color: config.color }} />
      </motion.div>

      {/* Risk percent */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div
          className="text-7xl font-extrabold tracking-tighter mb-2"
          style={{ color: config.color }}
        >
          {result.riskPercent}%
        </div>
        <div className="text-sm text-slate-500 mb-4">Risk Probability</div>
      </motion.div>

      {/* Risk badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-4"
      >
        <span
          className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold ${config.badgeBg} ${config.textColor}`}
        >
          <Activity className="w-3.5 h-3.5" />
          {config.label}
        </span>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-slate-600 leading-relaxed max-w-xs mx-auto"
      >
        {config.description}
      </motion.p>

      {/* Model badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/70 text-slate-500 text-xs font-medium border border-slate-200"
      >
        Model: {result.model}
      </motion.div>
    </motion.div>
  );
}
