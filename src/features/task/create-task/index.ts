import { createTask } from '@/entities/task/api';
import { useMutation } from '@tanstack/react-query';

export const useCreateTask = () =>
  useMutation({
    mutationFn: createTask
  });
