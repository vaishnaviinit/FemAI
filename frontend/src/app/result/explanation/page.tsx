"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Brain, Info, AlertCircle } from "lucide-react";
import { loadResult } from "@/lib/risk";
import type { PredictionResult, FeatureImportance } from "@/types";
import FeatureImportanceChart from "@/components/charts/FeatureImportanceChart";
import ShapChart from "@/components/charts/ShapChart";

const MOCK_FEATURES_QUICK: FeatureImportance[] = [
  { feature: "AMH (ng/mL)", importance: 0.28, contribution: "positive" },
  { feature: "Follicle No. (L)", importance: 0.21, contribution: "positive" },
  { feature: "Follicle No. (R)", importance: 0.19, contribution: "positive" },
  { feature: "BMI", importance: 0.12, contribution: "positive" },
  { feature: "Cycle (R/I)", importance: 0.10, contribution: "positive" },
  { feature: "Weight Gain", importance: 0.08, contribution: "positive" },
  { feature: "Age", importance: 0.07, contribution: "negative" },
  { feature: "Hair Growth", importance: 0.06, contribution: "positive" },
  { feature: "Skin Darkening", importance: 0.05, contribution: "positive" },
  { feature: "Regular Exercise", importance: 0.04, contribution: "negative" },
  { feature: "Fast Food", importance: 0.03, contribution: "positive" },
  { feature: "Weight", importance: 0.02, contribution: "negative" },
];

const MOCK_FEATURES_DETAILED: FeatureImportance[] = [
  { feature: "AMH (ng/mL)", importance: 0.25, contribution: "positive" },
  { feature: "LH/FSH Ratio", importance: 0.18, contribution: "positive" },
  { feature: "Follicle No. (L)", importance: 0.15, contribution: "positive" },
  { feature: "Follicle No. (R)", importance: 0.14, contribution: "positive" },
  { feature: "TSH (mIU/L)", importance: 0.09, contribution: "positive" },
  { feature: "BMI", importance: 0.08, contribution: "positive" },
  { feature: "Cycle (R/I)", importance: 0.07, contribution: "positive" },
  { feature: "Endometrium", importance: 0.06, contribution: "negative" },
  { feature: "Avg F Size (L)", importance: 0.05, contribution: "positive" },
  { feature: "Weight Gain", importance: 0.04, contribution: "positive" },
];

export default function ExplanationPage() {
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
          <span className="text-sm">Loading explanation…</span>
        </div>
      </div>
    );
  }

  const features =
    result.assessmentType === "quick" ? MOCK_FEATURES_QUICK : MOCK_FEATURES_DETAILED;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Back nav */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mb-8"
        >
          <Link
            href="/result"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Results
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">AI Explanation</h1>
              <p className="text-slate-500 text-sm">
                Explainable AI — understand what drove your result
              </p>
            </div>
          </div>
        </motion.div>

        {/* Info banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-start gap-3 p-4 bg-violet-50 border border-violet-100 rounded-xl mb-8"
        >
          <Info className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
          <div className="text-xs text-violet-700">
            <p className="font-semibold mb-1">About these explanations</p>
            <p>
              Feature importance values shown below are derived from the XGBoost model&apos;s
              built-in feature importance scores. SHAP (SHapley Additive exPlanations) integration
              is coming in a future update. Values shown are representative model-level importances.
            </p>
          </div>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <FeatureImportanceChart features={features} />
          <ShapChart features={features} />
        </div>

        {/* Feature breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8"
        >
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-5">
            Top Contributing Features
          </h3>
          <div className="space-y-3">
            {features.slice(0, 8).map((f, i) => (
              <motion.div
                key={f.feature}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-center gap-3"
              >
                <span className="w-6 text-xs text-slate-400 text-right">{i + 1}</span>
                <span className="text-sm text-slate-700 w-44 shrink-0">{f.feature}</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${f.importance * 100}%` }}
                    transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                    className="h-full rounded-full"
                    style={{
                      background: f.contribution === "positive" ? "#2563EB" : "#DC2626",
                    }}
                  />
                </div>
                <span
                  className={`text-xs font-bold w-12 text-right ${
                    f.contribution === "positive" ? "text-blue-600" : "text-red-600"
                  }`}
                >
                  {(f.importance * 100).toFixed(1)}%
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl"
        >
          <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-700">
            Feature importances are shown at the model level and reflect which features
            the model found most predictive overall. Individual predictions may vary. This
            information is intended to help you understand the model&apos;s behavior — it is not
            personalized medical advice.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
