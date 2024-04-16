import { createWorkLog } from '@/entities/work-log/api';
import { useMutation } from '@tanstack/react-query';

export const useCreateWorkLog = () =>
  useMutation({
    mutationFn: createWorkLog
  });
