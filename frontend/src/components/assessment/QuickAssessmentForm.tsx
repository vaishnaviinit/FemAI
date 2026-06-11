"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, Activity } from "lucide-react";
import { quickPredict } from "@/services/predictionApi";
import { buildResult, saveResult } from "@/lib/risk";

const schema = z.object({
  Age: z.number().min(10).max(60),
  Weight: z.number().min(30).max(200),
  BMI: z.number().min(10).max(60),
  Cycle_RI: z.number(),
  Weight_gain_YN: z.number(),
  hair_growth_YN: z.number(),
  Skin_darkening_YN: z.number(),
  Fast_food_YN: z.number(),
  Reg_Exercise_YN: z.number(),
  AMH: z.number().min(0).max(20),
  Follicle_No_L: z.number().min(0).max(30),
  Follicle_No_R: z.number().min(0).max(30),
});

type FormValues = z.infer<typeof schema>;

type FieldDef = {
  key: keyof FormValues;
  label: string;
  unit?: string;
  type: "number" | "select" | "binary";
  placeholder?: string;
  options?: { label: string; value: number }[];
};

const FIELD_GROUPS: { title: string; fields: FieldDef[] }[] = [
  {
    title: "Personal Information",
    fields: [
      { key: "Age", label: "Age", unit: "years", type: "number", placeholder: "25" },
      { key: "Weight", label: "Weight", unit: "kg", type: "number", placeholder: "60.0" },
      { key: "BMI", label: "BMI", unit: "kg/m²", type: "number", placeholder: "22.0" },
      {
        key: "Cycle_RI",
        label: "Menstrual Cycle",
        type: "select",
        options: [
          { label: "Regular", value: 2 },
          { label: "Irregular", value: 4 },
        ],
      },
    ],
  },
  {
    title: "Symptoms",
    fields: [
      { key: "Weight_gain_YN", label: "Weight Gain", type: "binary" },
      { key: "hair_growth_YN", label: "Excessive Hair Growth", type: "binary" },
      { key: "Skin_darkening_YN", label: "Skin Darkening", type: "binary" },
    ],
  },
  {
    title: "Lifestyle",
    fields: [
      { key: "Fast_food_YN", label: "Regular Fast Food", type: "binary" },
      { key: "Reg_Exercise_YN", label: "Regular Exercise", type: "binary" },
    ],
  },
  {
    title: "Clinical Parameters",
    fields: [
      { key: "AMH", label: "AMH", unit: "ng/mL", type: "number", placeholder: "3.0" },
      { key: "Follicle_No_L", label: "Follicle Count (Left)", type: "number", placeholder: "5" },
      { key: "Follicle_No_R", label: "Follicle Count (Right)", type: "number", placeholder: "5" },
    ],
  },
];

export default function QuickAssessmentForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
    defaultValues: {
      Cycle_RI: 2,
      Weight_gain_YN: 0,
      hair_growth_YN: 0,
      Skin_darkening_YN: 0,
      Fast_food_YN: 0,
      Reg_Exercise_YN: 0,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setApiError(null);
    try {
      const response = await quickPredict(values);
      const result = buildResult(response, "quick");
      saveResult(result);
      router.push("/result");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Prediction failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit as Parameters<typeof handleSubmit>[0])} className="space-y-8">
      {FIELD_GROUPS.map((group) => (
        <div key={group.title}>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
            {group.title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {group.fields.map((field) => (
              <FieldInput
                key={field.key}
                field={field}
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
              />
            ))}
          </div>
        </div>
      ))}

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

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-100"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Analyzing…
          </>
        ) : (
          <>
            <Activity className="w-4 h-4" />
            Run Quick Assessment
          </>
        )}
      </motion.button>
    </form>
  );
}

function FieldInput({
  field,
  register,
  errors,
  watch,
  setValue,
}: {
  field: FieldDef;
  register: ReturnType<typeof useForm<FormValues>>["register"];
  errors: ReturnType<typeof useForm<FormValues>>["formState"]["errors"];
  watch: ReturnType<typeof useForm<FormValues>>["watch"];
  setValue: ReturnType<typeof useForm<FormValues>>["setValue"];
}) {
  const error = errors[field.key];
  const val = watch(field.key);

  if (field.type === "binary") {
    return (
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">{field.label}</label>
        <div className="flex gap-2">
          {[
            { label: "Yes", value: 1 },
            { label: "No", value: 0 },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setValue(field.key, opt.value)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                Number(val) === opt.value
                  ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                  : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error.message as string}</p>}
      </div>
    );
  }

  if (field.type === "select" && field.options) {
    return (
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">{field.label}</label>
        <select
          {...register(field.key, { valueAsNumber: true })}
          className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors ${
            error ? "border-red-300" : "border-slate-200 hover:border-slate-300"
          }`}
        >
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-xs text-red-600">{error.message as string}</p>}
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
        {...register(field.key, { valueAsNumber: true })}
        type="number"
        step="any"
        placeholder={field.placeholder}
        className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors ${
          error ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error.message as string}</p>}
    </div>
  );
}
