import { createProject } from '@/entities/project/api';
import { useMutation } from '@tanstack/react-query';

export const useCreateProject = () =>
  useMutation({
    mutationFn: createProject
  });
