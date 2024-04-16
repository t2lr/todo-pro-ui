import { deleteWorkLog } from '@/entities/work-log/api';
import { useMutation } from '@tanstack/react-query';

export const useDeleteWorkLog = () =>
  useMutation({
    mutationFn: deleteWorkLog
  });
