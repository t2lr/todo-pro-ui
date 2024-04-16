import { updateUser } from '@/entities/user/api';
import { useMutation } from '@tanstack/react-query';

export const useUpdateUser = () =>
  useMutation({ mutationFn: updateUser })
