export type RiskLevel = "low" | "moderate" | "high";

export interface QuickAssessmentInput {
  Age: number;
  Weight: number;
  BMI: number;
  Cycle_RI: number;
  Weight_gain_YN: number;
  hair_growth_YN: number;
  Skin_darkening_YN: number;
  Fast_food_YN: number;
  Reg_Exercise_YN: number;
  AMH: number;
  Follicle_No_L: number;
  Follicle_No_R: number;
}

export interface DetailedAssessmentInput {
  data: number[];
}

export interface PredictionResponse {
  success: boolean;
  data: {
    model: string;
    prediction: 0 | 1;
    risk_probability: number;
  };
}

export interface PredictionResult {
  model: string;
  prediction: 0 | 1;
  risk_probability: number;
  riskLevel: RiskLevel;
  riskPercent: number;
  assessmentType: "quick" | "detailed";
}

export interface FeatureImportance {
  feature: string;
  importance: number;
  contribution: "positive" | "negative";
}

export interface DetailedFormStep {
  title: string;
  description: string;
  fields: DetailedFormField[];
}

export interface DetailedFormField {
  key: string;
  label: string;
  unit?: string;
  type: "number" | "select" | "binary";
  min?: number;
  max?: number;
  step?: number;
  options?: { label: string; value: number }[];
  placeholder?: string;
  index: number;
}
