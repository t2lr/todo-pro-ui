import { createDocument } from '@/entities/document/api';
import { useMutation } from '@tanstack/react-query';

export const useCreateDocument = () =>
  useMutation({
    mutationFn: createDocument
  });
