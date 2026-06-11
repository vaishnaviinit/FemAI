import { Metadata } from "next";
import { Activity, Brain, Database, Shield } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — FemAI",
  description: "Learn about FemAI's AI-powered PCOS risk assessment platform.",
};

const TECH = [
  { icon: Brain, label: "XGBoost", sub: "ML Model", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: Database, label: "541 Samples", sub: "Training Data", color: "text-violet-600", bg: "bg-violet-50" },
  { icon: Activity, label: "92.7%", sub: "Accuracy", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Shield, label: "Explainable", sub: "AI Results", color: "text-amber-600", bg: "bg-amber-50" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-2xl mb-4">
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">About FemAI</h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            An open-source AI platform for PCOS risk screening using machine learning and explainable AI.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {TECH.map(({ icon: Icon, label, sub, color, bg }) => (
            <div key={label} className={`p-4 rounded-2xl ${bg} text-center`}>
              <Icon className={`w-5 h-5 ${color} mx-auto mb-2`} />
              <p className={`text-lg font-extrabold ${color}`}>{label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">What is PCOS?</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Polycystic Ovary Syndrome (PCOS) is one of the most common hormonal disorders in women
            of reproductive age, affecting approximately 1 in 10. It is characterized by irregular
            menstrual cycles, excess androgen levels, and polycystic ovaries. Early detection and
            lifestyle intervention can significantly improve outcomes.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-3">How FemAI Works</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            FemAI uses a trained XGBoost classifier to assess PCOS risk from clinical parameters.
            Two models are available: a 12-feature lite model for quick screening, and a full
            41-feature model for comprehensive clinical evaluation. Both models were trained on a
            real-world PCOS dataset of 541 patients.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-3">Disclaimer</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            FemAI is an educational screening tool only. Results should not be used as a substitute
            for professional medical diagnosis or treatment. Always consult a qualified gynecologist
            or endocrinologist for clinical evaluation.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Link
            href="/assessment/quick"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm shadow-blue-100"
          >
            Try Quick Assessment
          </Link>
          <Link
            href="/assessment/detailed"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-6 py-3 rounded-xl border border-slate-200 transition-colors"
          >
            Try Detailed Assessment
          </Link>
        </div>
      </div>
    </div>
  );
}
