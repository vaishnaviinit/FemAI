import type { DetailedFormStep } from "@/types";

const YES_NO = [
  { label: "Yes", value: 1 },
  { label: "No", value: 0 },
];

const CYCLE_OPTIONS = [
  { label: "Regular", value: 2 },
  { label: "Irregular", value: 4 },
];

const BLOOD_GROUP_OPTIONS = [
  { label: "A+", value: 11 },
  { label: "A-", value: 12 },
  { label: "B+", value: 13 },
  { label: "B-", value: 14 },
  { label: "AB+", value: 15 },
  { label: "AB-", value: 16 },
  { label: "O+", value: 17 },
  { label: "O-", value: 18 },
];

export const DETAILED_STEPS: DetailedFormStep[] = [
  {
    title: "Personal Information",
    description: "Basic anthropometric and demographic details",
    fields: [
      { index: 0, key: "age", label: "Age", unit: "years", type: "number", min: 12, max: 60, step: 1, placeholder: "25" },
      { index: 1, key: "weight", label: "Weight", unit: "kg", type: "number", min: 30, max: 150, step: 0.1, placeholder: "60" },
      { index: 2, key: "height", label: "Height", unit: "cm", type: "number", min: 100, max: 220, step: 0.1, placeholder: "165" },
      { index: 3, key: "bmi", label: "BMI", unit: "kg/m²", type: "number", min: 10, max: 60, step: 0.1, placeholder: "22.0" },
      { index: 4, key: "blood_group", label: "Blood Group", type: "select", options: BLOOD_GROUP_OPTIONS },
      { index: 5, key: "pulse_rate", label: "Pulse Rate", unit: "bpm", type: "number", min: 40, max: 160, step: 1, placeholder: "72" },
      { index: 6, key: "rr", label: "Respiratory Rate", unit: "breaths/min", type: "number", min: 8, max: 40, step: 1, placeholder: "16" },
      { index: 7, key: "hb", label: "Hemoglobin (Hb)", unit: "g/dl", type: "number", min: 5, max: 20, step: 0.1, placeholder: "13.5" },
    ],
  },
  {
    title: "Medical History",
    description: "Menstrual cycle, reproductive, and obstetric history",
    fields: [
      { index: 8, key: "cycle", label: "Menstrual Cycle", type: "select", options: CYCLE_OPTIONS },
      { index: 9, key: "cycle_length", label: "Cycle Length", unit: "days", type: "number", min: 1, max: 90, step: 1, placeholder: "28" },
      { index: 10, key: "marriage_status", label: "Marriage Duration", unit: "years", type: "number", min: 0, max: 40, step: 0.5, placeholder: "2" },
      { index: 11, key: "pregnant", label: "Currently Pregnant", type: "binary", options: YES_NO },
      { index: 12, key: "abortions", label: "Number of Abortions", type: "number", min: 0, max: 20, step: 1, placeholder: "0" },
    ],
  },
  {
    title: "Hormonal Parameters",
    description: "Blood tests and hormonal measurements (from lab reports)",
    fields: [
      { index: 13, key: "hcg1", label: "I beta-HCG", unit: "mIU/mL", type: "number", min: 0, max: 50000, step: 0.1, placeholder: "1.0" },
      { index: 14, key: "hcg2", label: "II beta-HCG", unit: "mIU/mL", type: "number", min: 0, max: 50000, step: 0.1, placeholder: "1.0" },
      { index: 15, key: "fsh", label: "FSH", unit: "mIU/mL", type: "number", min: 0, max: 50, step: 0.01, placeholder: "5.0" },
      { index: 16, key: "lh", label: "LH", unit: "mIU/mL", type: "number", min: 0, max: 50, step: 0.01, placeholder: "5.0" },
      { index: 17, key: "fsh_lh", label: "FSH/LH Ratio", type: "number", min: 0, max: 20, step: 0.01, placeholder: "1.0" },
      { index: 21, key: "tsh", label: "TSH", unit: "mIU/L", type: "number", min: 0, max: 20, step: 0.01, placeholder: "2.5" },
      { index: 22, key: "amh", label: "AMH", unit: "ng/mL", type: "number", min: 0, max: 20, step: 0.01, placeholder: "3.0" },
      { index: 23, key: "prl", label: "Prolactin (PRL)", unit: "ng/mL", type: "number", min: 0, max: 200, step: 0.1, placeholder: "15.0" },
      { index: 24, key: "vit_d3", label: "Vitamin D3", unit: "ng/mL", type: "number", min: 0, max: 150, step: 0.1, placeholder: "30.0" },
      { index: 25, key: "prg", label: "Progesterone (PRG)", unit: "ng/mL", type: "number", min: 0, max: 100, step: 0.01, placeholder: "1.0" },
      { index: 26, key: "rbs", label: "Random Blood Sugar (RBS)", unit: "mg/dl", type: "number", min: 50, max: 400, step: 1, placeholder: "100" },
    ],
  },
  {
    title: "Symptoms",
    description: "Physical symptoms and clinical signs",
    fields: [
      { index: 27, key: "weight_gain", label: "Weight Gain", type: "binary", options: YES_NO },
      { index: 28, key: "hair_growth", label: "Excessive Hair Growth (Hirsutism)", type: "binary", options: YES_NO },
      { index: 29, key: "skin_darkening", label: "Skin Darkening (Acanthosis)", type: "binary", options: YES_NO },
      { index: 30, key: "hair_loss", label: "Hair Loss / Thinning", type: "binary", options: YES_NO },
      { index: 31, key: "pimples", label: "Pimples / Acne", type: "binary", options: YES_NO },
    ],
  },
  {
    title: "Lifestyle & Clinical",
    description: "Lifestyle factors, blood pressure, and ultrasound findings",
    fields: [
      { index: 32, key: "fast_food", label: "Regular Fast Food Consumption", type: "binary", options: YES_NO },
      { index: 33, key: "exercise", label: "Regular Exercise", type: "binary", options: YES_NO },
      { index: 34, key: "bp_systolic", label: "BP Systolic", unit: "mmHg", type: "number", min: 60, max: 220, step: 1, placeholder: "120" },
      { index: 35, key: "bp_diastolic", label: "BP Diastolic", unit: "mmHg", type: "number", min: 40, max: 140, step: 1, placeholder: "80" },
      { index: 36, key: "follicle_l", label: "Follicle Count (Left)", type: "number", min: 0, max: 30, step: 1, placeholder: "5" },
      { index: 37, key: "follicle_r", label: "Follicle Count (Right)", type: "number", min: 0, max: 30, step: 1, placeholder: "5" },
      { index: 38, key: "avg_fsize_l", label: "Avg Follicle Size (Left)", unit: "mm", type: "number", min: 0, max: 30, step: 0.1, placeholder: "9.0" },
      { index: 39, key: "avg_fsize_r", label: "Avg Follicle Size (Right)", unit: "mm", type: "number", min: 0, max: 30, step: 0.1, placeholder: "9.0" },
      { index: 40, key: "endometrium", label: "Endometrium Thickness", unit: "mm", type: "number", min: 1, max: 30, step: 0.1, placeholder: "7.0" },
      { index: 18, key: "hip", label: "Hip", unit: "inch", type: "number", min: 20, max: 80, step: 0.1, placeholder: "38" },
      { index: 19, key: "waist", label: "Waist", unit: "inch", type: "number", min: 20, max: 80, step: 0.1, placeholder: "30" },
      { index: 20, key: "waist_hip", label: "Waist:Hip Ratio", type: "number", min: 0.5, max: 2, step: 0.01, placeholder: "0.79" },
    ],
  },
];

export function buildDataArray(formValues: Record<string, number>): number[] {
  const allFields = DETAILED_STEPS.flatMap((s) => s.fields);
  const arr = new Array(41).fill(0) as number[];
  for (const field of allFields) {
    const val = formValues[field.key];
    arr[field.index] = val ?? 0;
  }
  return arr;
}
