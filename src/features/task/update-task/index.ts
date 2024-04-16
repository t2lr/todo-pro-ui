import { updateTask } from '@/entities/task/api';
import { useMutation } from '@tanstack/react-query';

export const useUpdateTask = () =>
  useMutation({
    mutationFn: updateTask
  });
