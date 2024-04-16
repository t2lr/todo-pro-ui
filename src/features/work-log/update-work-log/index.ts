import { updateWorkLog } from '@/entities/work-log/api';
import { useMutation } from '@tanstack/react-query';

export const useUpdateWorkLog = () =>
  useMutation({
    mutationFn: updateWorkLog
  });
