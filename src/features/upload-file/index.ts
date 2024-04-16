import { uploadFile } from '@/entities/upload/api';
import { useMutation } from '@tanstack/react-query';

export const useUploadFile = () =>
  useMutation({
    mutationFn: uploadFile
  });
