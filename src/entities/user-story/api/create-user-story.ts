import { apiClient } from '@/shared/api/base';
import { UserStoryResDto } from '../dto';
import { UserStory } from '../model';

export const createUserStory = async (
  body: Partial<UserStory>
): Promise<UserStoryResDto> => {
  const { project_id, ...bodyWithoutProjectId } = body;
  const result = await apiClient.post<UserStoryResDto>(
    `/projects/${project_id}/user-stories`,
    bodyWithoutProjectId
  );

  return result;
};
