import { apiClient } from '@/shared/api/base';
import { UseCaseResDto } from '../dto';
import { UseCase } from '../model';

export const updateUseCase = async (
  body: Partial<UseCase>
): Promise<UseCaseResDto> => {
  const {
    project_id,
    user_story_id,
    id,
    ...bodyWithoutProjectIdAndUserStoryId
  } = body;
  const result = await apiClient.put<UseCaseResDto>(
    `/projects/${project_id}/user-stories/${user_story_id}/use-cases/${id}`,
    bodyWithoutProjectIdAndUserStoryId
  );

  return result;
};
