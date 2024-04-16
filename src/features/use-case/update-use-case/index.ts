import { updateUseCase } from '@/entities/use-case/api';
import { useMutation } from '@tanstack/react-query';

export const useUpdateUseCase = () =>
  useMutation({
    mutationFn: updateUseCase
  });
