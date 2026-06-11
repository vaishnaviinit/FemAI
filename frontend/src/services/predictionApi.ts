import apiClient from "@/lib/axios";
import type { QuickAssessmentInput, DetailedAssessmentInput, PredictionResponse } from "@/types";

export const quickPredict = async (
  input: QuickAssessmentInput
): Promise<PredictionResponse> => {
  const { data } = await apiClient.post<PredictionResponse>(
    "/predictions/quick",
    input
  );
  return data;
};

export const detailedPredict = async (
  input: DetailedAssessmentInput
): Promise<PredictionResponse> => {
  const { data } = await apiClient.post<PredictionResponse>(
    "/predictions/detailed",
    input
  );
  return data;
};
