import { createComment } from '@/entities/comment/api';
import { useMutation } from '@tanstack/react-query';

export const useCreateComment = () =>
  useMutation({
    mutationFn: createComment
  });
