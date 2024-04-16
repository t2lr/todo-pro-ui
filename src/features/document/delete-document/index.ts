import { deleteDocument } from '@/entities/document/api';
import { useMutation } from '@tanstack/react-query';

export const useDeleteDocument = () =>
  useMutation({
    mutationFn: deleteDocument
  });
