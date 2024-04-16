import { createUseCase } from '@/entities/use-case/api';
import { useMutation } from '@tanstack/react-query';

export const useCreateUseCase = () =>
  useMutation({
    mutationFn: createUseCase
  });
