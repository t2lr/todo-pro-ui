import { updateDocument } from '@/entities/document/api';
import { useMutation } from '@tanstack/react-query';

export const useUpdateDocument = () =>
  useMutation({
    mutationFn: updateDocument
  });
