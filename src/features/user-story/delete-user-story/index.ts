import { deleteUserStory } from '@/entities/user-story/api';
import { useMutation } from '@tanstack/react-query';

export const useDeleteUserStory = () =>
  useMutation({
    mutationFn: deleteUserStory
  });
