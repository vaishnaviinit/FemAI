"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { FeatureImportance } from "@/types";

interface Props {
  features: FeatureImportance[];
}

export default function ShapChart({ features }: Props) {
  const data = features.map((f) => ({
    ...f,
    value: f.contribution === "positive" ? f.importance : -f.importance,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
    >
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">
          SHAP Value Analysis
        </h3>
        <p className="text-xs text-slate-400">
          Positive values increase risk probability; negative values decrease it.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 0, right: 24, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
          <XAxis
            type="number"
            tickFormatter={(v: number) => `${v > 0 ? "+" : ""}${(v * 100).toFixed(0)}%`}
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
              return [`${num > 0 ? "+" : ""}${(num * 100).toFixed(2)}%`, "SHAP Value"];
            }}
            contentStyle={{
              background: "#fff",
              border: "1px solid #E2E8F0",
              borderRadius: "10px",
              fontSize: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          />
          <ReferenceLine x={0} stroke="#E2E8F0" strokeWidth={1.5} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={18}>
            {data.map((entry) => (
              <Cell
                key={entry.feature}
                fill={entry.value >= 0 ? "#2563EB" : "#DC2626"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Feature contribution cards */}
      <div className="mt-5 grid grid-cols-2 gap-2">
        {features.slice(0, 4).map((f) => (
          <div
            key={f.feature}
            className={`p-3 rounded-xl text-xs ${
              f.contribution === "positive" ? "bg-blue-50" : "bg-red-50"
            }`}
          >
            <p className="font-semibold text-slate-700 mb-0.5 truncate">{f.feature}</p>
            <p
              className={`font-bold ${
                f.contribution === "positive" ? "text-blue-600" : "text-red-600"
              }`}
            >
              {f.contribution === "positive" ? "+" : "-"}
              {(f.importance * 100).toFixed(1)}%
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
