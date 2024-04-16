import { createSubTask } from '@/entities/sub-task/api';
import { useMutation } from '@tanstack/react-query';

export const useCreateSubTask = () =>
  useMutation({
    mutationFn: createSubTask
  });
