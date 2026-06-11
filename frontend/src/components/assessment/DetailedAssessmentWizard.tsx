"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { detailedPredict } from "@/services/predictionApi";
import { buildResult, saveResult } from "@/lib/risk";
import { DETAILED_STEPS, buildDataArray } from "@/lib/detailedFeatures";
import type { DetailedFormField } from "@/types";

export default function DetailedAssessmentWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, number>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const totalSteps = DETAILED_STEPS.length;
  const currentStep = DETAILED_STEPS[step];
  const progress = ((step + 1) / totalSteps) * 100;

  const updateValue = (key: string, val: number) => {
    setValues((v) => ({ ...v, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    for (const field of currentStep.fields) {
      const v = values[field.key];
      if (v === undefined || v === null || isNaN(v)) {
        newErrors[field.key] = "This field is required";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, totalSteps - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prev = () => {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    setApiError(null);
    try {
      const data = buildDataArray(values);
      const response = await detailedPredict({ data });
      const result = buildResult(response, "detailed");
      saveResult(result);
      router.push("/result");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Prediction failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Step progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-500 font-medium">
            Step {step + 1} of {totalSteps}
          </span>
          <span className="text-xs text-blue-600 font-semibold">{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-600 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step breadcrumb dots */}
      <div className="flex gap-2">
        {DETAILED_STEPS.map((s, i) => (
          <div
            key={s.title}
            className={`flex-1 h-1 rounded-full transition-colors ${
              i < step
                ? "bg-blue-600"
                : i === step
                ? "bg-blue-400"
                : "bg-slate-200"
            }`}
          />
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Step {step + 1}
              </span>
              {step > 0 && (
                <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  {step} step{step > 1 ? "s" : ""} complete
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-900">{currentStep.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{currentStep.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentStep.fields.map((field) => (
              <WizardField
                key={field.key}
                field={field}
                value={values[field.key]}
                error={errors[field.key]}
                onChange={updateValue}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* API Error */}
      <AnimatePresence>
        {apiError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl"
          >
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <p className="text-sm text-red-700">{apiError}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        {step > 0 && (
          <button
            type="button"
            onClick={prev}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
        )}

        {step < totalSteps - 1 ? (
          <motion.button
            type="button"
            onClick={next}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors shadow-sm shadow-blue-200"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        ) : (
          <motion.button
            type="button"
            onClick={submit}
            disabled={submitting}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors shadow-sm shadow-blue-200"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing…
              </>
            ) : (
              "Submit & Get Results"
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
}

function WizardField({
  field,
  value,
  error,
  onChange,
}: {
  field: DetailedFormField;
  value: number | undefined;
  error: string | undefined;
  onChange: (key: string, val: number) => void;
}) {
  if (field.type === "binary" && field.options) {
    return (
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {field.label}
        </label>
        <div className="flex gap-2">
          {field.options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(field.key, opt.value)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                value === opt.value
                  ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                  : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  if (field.type === "select" && field.options) {
    return (
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {field.label}
          {field.unit && (
            <span className="ml-1.5 text-slate-400 font-normal text-xs">({field.unit})</span>
          )}
        </label>
        <select
          value={value ?? ""}
          onChange={(e) => onChange(field.key, Number(e.target.value))}
          className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors ${
            error ? "border-red-300" : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <option value="">Select…</option>
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {field.label}
        {field.unit && (
          <span className="ml-1.5 text-slate-400 font-normal text-xs">({field.unit})</span>
        )}
      </label>
      <input
        type="number"
        step="any"
        min={field.min}
        max={field.max}
        placeholder={field.placeholder}
        value={value ?? ""}
        onChange={(e) => onChange(field.key, parseFloat(e.target.value))}
        className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors ${
          error ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
