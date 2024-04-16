import { apiClient } from '@/shared/api/base';
import { UserStoryResDto } from '../dto';
import { UserStoryDetailQuery } from '../query';

export const deleteUserStory = async (
  query: UserStoryDetailQuery
): Promise<UserStoryResDto> => {
  const result = await apiClient.delete<UserStoryResDto>(
    `/projects/${query.project_id}/user-stories/${query.id}`
  );

  return result;
};
