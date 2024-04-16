import { updateUserStory } from '@/entities/user-story/api';
import { useMutation } from '@tanstack/react-query';

export const useUpdateUserStory = () =>
  useMutation({
    mutationFn: updateUserStory
  });
