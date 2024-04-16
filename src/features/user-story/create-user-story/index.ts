import { createUserStory } from '@/entities/user-story/api';
import { useMutation } from '@tanstack/react-query';

export const useCreateUserStory = () =>
  useMutation({
    mutationFn: createUserStory
  });
