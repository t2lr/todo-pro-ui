import { updateComment } from '@/entities/comment/api';
import { useMutation } from '@tanstack/react-query';

export const useUpdateComment = () =>
  useMutation({
    mutationFn: updateComment
  });
