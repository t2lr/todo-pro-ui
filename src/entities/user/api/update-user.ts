import { apiClient } from '@/shared/api/base';
import { UserResDto } from '../dto';
import { User } from '../model';

export const updateUser = async (
  body: Partial<User>
): Promise<UserResDto> => {
  const result = await apiClient.put<UserResDto>(
    `/users/${body.id}`,
    body
  );

  return result;
};
