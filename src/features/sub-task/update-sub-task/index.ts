import { updateSubTask } from '@/entities/sub-task/api';
import { useMutation } from '@tanstack/react-query';

export const useUpdateSubTask = () =>
  useMutation({
    mutationFn: updateSubTask
  });
