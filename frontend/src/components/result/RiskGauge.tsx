"use client";

import { motion } from "framer-motion";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { riskConfig } from "@/lib/risk";
import type { PredictionResult } from "@/types";

interface Props {
  result: PredictionResult;
}

export default function RiskGauge({ result }: Props) {
  const config = riskConfig[result.riskLevel];
  const data = [{ value: result.riskPercent, fill: config.color }];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
    >
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">
        Risk Gauge
      </h3>

      <div className="relative h-48">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="75%"
            innerRadius="60%"
            outerRadius="90%"
            barSize={14}
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            {/* Background track */}
            <RadialBar
              background={{ fill: "#F1F5F9" }}
              dataKey="value"
              angleAxisId={0}
              cornerRadius={7}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-3xl font-extrabold"
            style={{ color: config.color }}
          >
            {result.riskPercent}%
          </motion.p>
          <p className="text-xs text-slate-400 mt-0.5">PCOS Risk</p>
        </div>
      </div>

      {/* Scale labels */}
      <div className="flex justify-between text-xs text-slate-400 mt-1">
        <span>0%</span>
        <span className="text-green-500">Low</span>
        <span className="text-amber-500">Moderate</span>
        <span className="text-red-500">High</span>
        <span>100%</span>
      </div>

      {/* Threshold markers */}
      <div className="mt-4 space-y-2">
        {[
          { label: "Low Risk", range: "0% – 29%", color: "bg-green-400" },
          { label: "Moderate Risk", range: "30% – 59%", color: "bg-amber-400" },
          { label: "High Risk", range: "60% – 100%", color: "bg-red-500" },
        ].map(({ label, range, color }) => (
          <div key={label} className="flex items-center gap-2 text-xs text-slate-500">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <span className="font-medium">{label}</span>
            <span className="ml-auto text-slate-400">{range}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
