import { useQuery } from '@tanstack/react-query';

import api from '@app/api';
import type { QueryOptions } from '@app/types/react-query';

type PredictionResponse = {};

async function getPrediction(id: string) {
  const { data } = await api.get<PredictionResponse>(`/predictions/${id}`);

  return data;
}

export default function useGetPrediction(
  predictionId: string,
  props?: QueryOptions<PredictionResponse>,
) {
  return useQuery({
    ...props,
    queryKey: ['useGetPrediction', predictionId],
    queryFn: () => getPrediction(predictionId),
  });
}
