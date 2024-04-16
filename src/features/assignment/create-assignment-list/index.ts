import { createAssignmentList } from '@/entities/assignments/api';
import { useMutation } from '@tanstack/react-query';

export const useCreateAssignmentList = () =>
  useMutation({
    mutationFn: createAssignmentList
  });
