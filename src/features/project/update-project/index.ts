import { updateProject } from '@/entities/project/api';
import { useMutation } from '@tanstack/react-query';

export const useUpdateProject = () =>
  useMutation({
    mutationFn: updateProject
  });
