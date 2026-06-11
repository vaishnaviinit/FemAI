import { Microscope, Info } from "lucide-react";
import DetailedAssessmentWizard from "@/components/assessment/DetailedAssessmentWizard";

export const metadata = {
  title: "Detailed Assessment — FemAI",
  description: "Comprehensive 41-feature PCOS risk assessment with clinical precision.",
};

export default function DetailedAssessmentPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-violet-100 rounded-2xl mb-4">
            <Microscope className="w-6 h-6 text-violet-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            Detailed Assessment
          </h1>
          <p className="text-slate-500">
            41 clinical features · Highest precision · Multi-step wizard
          </p>
        </div>

        {/* Info banner */}
        <div className="flex items-start gap-3 p-4 bg-violet-50 border border-violet-100 rounded-xl mb-8">
          <Info className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
          <div className="text-sm text-violet-700">
            <p className="font-medium mb-0.5">Prepare your lab reports</p>
            <p className="text-violet-600 text-xs">
              This assessment requires hormonal blood test results (FSH, LH, AMH, TSH, etc.)
              and ultrasound measurements. Complete all 5 steps for the most accurate result.
            </p>
          </div>
        </div>

        {/* Wizard card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
          <DetailedAssessmentWizard />
        </div>

        <p className="text-center text-xs text-slate-400 mt-5">
          This tool is for screening purposes only. Not a substitute for medical diagnosis.
        </p>
      </div>
    </div>
  );
}
