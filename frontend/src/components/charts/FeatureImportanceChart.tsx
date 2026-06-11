"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { FeatureImportance } from "@/types";

interface Props {
  features: FeatureImportance[];
  title?: string;
}

const POSITIVE_COLOR = "#2563EB";
const NEGATIVE_COLOR = "#DC2626";

export default function FeatureImportanceChart({ features, title = "Feature Importance" }: Props) {
  const sorted = [...features].sort((a, b) => Math.abs(b.importance) - Math.abs(a.importance));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
          {title}
        </h3>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-600" />
            Increases risk
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-red-500" />
            Decreases risk
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          layout="vertical"
          data={sorted}
          margin={{ top: 0, right: 24, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
          <XAxis
            type="number"
            tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`}
            tick={{ fontSize: 11, fill: "#94A3B8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="feature"
            width={140}
            tick={{ fontSize: 11, fill: "#64748B" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter={(value: any) => {
              const num = Number(value ?? 0);
              return [`${(num * 100).toFixed(1)}%`, "Importance"];
            }}
            contentStyle={{
              background: "#fff",
              border: "1px solid #E2E8F0",
              borderRadius: "10px",
              fontSize: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          />
          <Bar dataKey="importance" radius={[0, 4, 4, 0]} maxBarSize={18}>
            {sorted.map((entry) => (
              <Cell
                key={entry.feature}
                fill={entry.contribution === "positive" ? POSITIVE_COLOR : NEGATIVE_COLOR}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
