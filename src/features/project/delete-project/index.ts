import { deleteProject } from '@/entities/project/api';
import { useMutation } from '@tanstack/react-query';

export const useDeleteProject = () =>
  useMutation({
    mutationFn: deleteProject
  });
