import { useMutation } from '@tanstack/react-query';

import api from '@app/api';
import type { MutationOptions } from '@app/types/react-query';

type GeneratePredictionProps = {};
type PredictionResponse = {};

async function createPrediction(data: GeneratePredictionProps) {
  const res = await api.post<PredictionResponse>('/predictions', data);

  return res.data;
}

export default function useCreatePrediction(
  props?: MutationOptions<PredictionResponse, GeneratePredictionProps>,
) {
  return useMutation({
    ...props,
    mutationFn: (data) => createPrediction(data),
  });
}
