import { apiClient } from '@/shared/api/base';
import { UseCaseResDto } from '../dto';
import { UseCase } from '../model';

export const createUseCase = async (
  body: Partial<UseCase>
): Promise<UseCaseResDto> => {
  const { project_id, user_story_id, ...bodyWithoutProjectIdAndUserStoryId } =
    body;
  const result = await apiClient.post<UseCaseResDto>(
    `/projects/${project_id}/user-stories/${user_story_id}/use-cases`,
    bodyWithoutProjectIdAndUserStoryId
  );

  return result;
};
