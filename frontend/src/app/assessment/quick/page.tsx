import { Zap, Clock, Info } from "lucide-react";
import QuickAssessmentForm from "@/components/assessment/QuickAssessmentForm";

export const metadata = {
  title: "Quick Assessment — FemAI",
  description: "12-feature PCOS risk assessment. Get results in under 30 seconds.",
};

export default function QuickAssessmentPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-2xl mb-4">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            Quick Assessment
          </h1>
          <p className="text-slate-500">
            12 clinical features · Results in ~30 seconds
          </p>
        </div>

        {/* Info banner */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl mb-6">
          <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-0.5">Before you begin</p>
            <p className="text-blue-600 text-xs">
              Have your AMH level and recent ultrasound follicle count available for best accuracy.
              All values are processed locally and not stored.
            </p>
          </div>
        </div>

        {/* Meta chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { icon: Zap, text: "12 Features" },
            { icon: Clock, text: "~30 Seconds" },
          ].map(({ icon: Icon, text }) => (
            <span
              key={text}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-medium shadow-sm"
            >
              <Icon className="w-3 h-3 text-blue-500" />
              {text}
            </span>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
          <QuickAssessmentForm />
        </div>

        <p className="text-center text-xs text-slate-400 mt-5">
          This tool is for screening purposes only. Not a substitute for medical diagnosis.
        </p>
      </div>
    </div>
  );
}
