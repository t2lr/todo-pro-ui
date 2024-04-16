import { deleteUseCase } from '@/entities/use-case/api';
import { useMutation } from '@tanstack/react-query';

export const useDeleteUseCase = () =>
  useMutation({
    mutationFn: deleteUseCase
  });
