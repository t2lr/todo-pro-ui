import { apiClient } from '@/shared/api/base';
import { UserPaginationDto } from '../dto';
import { UserStoryQuery } from '../query';

export const getUserStoryList = async (
  project_id: string,
  pageIndex: number,
  pageSize: number
): Promise<UserPaginationDto> => {
  const query: UserStoryQuery = { pageIndex, pageSize };
  const result = await apiClient.get<UserPaginationDto>(
    `/projects/${project_id}/user-stories`,
    query
  );

  return {
    user_stories: result.user_stories,
    pageIndex: result.pageIndex,
    pageSize: result.pageSize,
    total: result.total
  };
};
