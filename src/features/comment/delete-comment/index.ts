import { deleteComment } from '@/entities/comment/api';
import { useMutation } from '@tanstack/react-query';

export const useDeleteComent = () =>
  useMutation({
    mutationFn: deleteComment
  });
