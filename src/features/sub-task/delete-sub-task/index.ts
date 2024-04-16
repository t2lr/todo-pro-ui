import { deleteSubTask } from '@/entities/sub-task/api';
import { useMutation } from '@tanstack/react-query';

export const useDeleteSubTask = () =>
  useMutation({
    mutationFn: deleteSubTask
  });
