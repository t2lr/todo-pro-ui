import { apiClient } from '@/shared/api/base';
import { UserPaginationDto } from '../model/user-pagination';
import { UserQuery } from '../query';

export const getUsers = async (
  pageIndex: number,
  pageSize: number
): Promise<UserPaginationDto> => {
  const query: UserQuery = { pageIndex, pageSize };
  const result = await apiClient.get<UserPaginationDto>('/users', query);

  return {
    users: result.users,
    pageIndex: result.pageIndex,
    pageSize: result.pageSize,
    total: result.total
  };
};
