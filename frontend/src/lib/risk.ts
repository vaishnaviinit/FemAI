import type { RiskLevel, PredictionResult, PredictionResponse } from "@/types";

export function getRiskLevel(probability: number): RiskLevel {
  if (probability < 0.3) return "low";
  if (probability < 0.6) return "moderate";
  return "high";
}

export function buildResult(
  response: PredictionResponse,
  assessmentType: "quick" | "detailed"
): PredictionResult {
  const { model, prediction, risk_probability } = response.data;
  return {
    model,
    prediction,
    risk_probability,
    riskLevel: getRiskLevel(risk_probability),
    riskPercent: Math.round(risk_probability * 100),
    assessmentType,
  };
}

export const riskConfig = {
  low: {
    label: "Low Risk",
    color: "#16A34A",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    badgeBg: "bg-green-100",
    description:
      "Your current indicators suggest a low likelihood of PCOS. Continue maintaining healthy lifestyle habits.",
  },
  moderate: {
    label: "Moderate Risk",
    color: "#F59E0B",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
    badgeBg: "bg-amber-100",
    description:
      "Some indicators suggest a moderate risk. Consulting a healthcare provider for further evaluation is recommended.",
  },
  high: {
    label: "High Risk",
    color: "#DC2626",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    badgeBg: "bg-red-100",
    description:
      "Your indicators suggest a high likelihood of PCOS. Please consult a gynecologist or endocrinologist promptly.",
  },
} as const;

export const STORAGE_KEY = "femai_result";

export function saveResult(result: PredictionResult): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  }
}

export function loadResult(): PredictionResult | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PredictionResult;
  } catch {
    return null;
  }
}
