import { deleteTask } from '@/entities/task/api';
import { useMutation } from '@tanstack/react-query';

export const useDeleteTask = () =>
  useMutation({
    mutationFn: deleteTask
  });
