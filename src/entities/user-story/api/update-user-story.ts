import { apiClient } from '@/shared/api/base';
import { UserStoryResDto } from '../dto';
import { UserStory } from '../model';

export const updateUserStory = async (
  body: Partial<UserStory>
): Promise<UserStoryResDto> => {
  const { project_id, ...bodyWithoutProjectId } = body;
  const result = await apiClient.put<UserStoryResDto>(
    `/projects/${project_id}/user-stories/${body.id}`,
    bodyWithoutProjectId
  );

  return result;
};
