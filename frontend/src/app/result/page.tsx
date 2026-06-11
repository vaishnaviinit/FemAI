"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BarChart2, RefreshCw } from "lucide-react";
import { loadResult } from "@/lib/risk";
import type { PredictionResult } from "@/types";
import RiskCard from "@/components/result/RiskCard";
import RiskGauge from "@/components/result/RiskGauge";
import RiskSummary from "@/components/result/RiskSummary";
import Recommendations from "@/components/result/Recommendations";

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const r = loadResult();
    if (!r) {
      router.replace("/assessment/quick");
      return;
    }
    setResult(r);
    setReady(true);
  }, [router]);

  if (!ready || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Loading results…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Back nav */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link
            href={`/assessment/${result.assessmentType}`}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Assessment
          </Link>
          <Link
            href="/result/explanation"
            className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <BarChart2 className="w-4 h-4" />
            View AI Explanation
          </Link>
        </motion.div>

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-extrabold text-slate-900">Your PCOS Risk Report</h1>
          <p className="text-slate-500 mt-1 text-sm">
            Based on your {result.assessmentType} assessment · {result.model}
          </p>
        </motion.div>

        {/* Top row: Risk card + Gauge */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RiskCard result={result} />
          <RiskGauge result={result} />
        </div>

        {/* Bottom row: Summary + Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RiskSummary result={result} />
          <Recommendations result={result} />
        </div>

        {/* Action row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/result/explanation"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm shadow-blue-200"
          >
            <BarChart2 className="w-4 h-4" />
            View AI Explanation
          </Link>
          <button
            onClick={() => router.push("/assessment/quick")}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-6 py-3 rounded-xl border border-slate-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Start New Assessment
          </button>
        </motion.div>
      </div>
    </div>
  );
}
