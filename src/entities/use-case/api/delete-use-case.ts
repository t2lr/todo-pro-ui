import { apiClient } from '@/shared/api/base';
import { UseCaseResDto } from '../dto';
import { UseCaseDetailQuery } from '../query';

export const deleteUseCase = async (
  query: UseCaseDetailQuery
): Promise<UseCaseResDto> => {
  const { project_id, user_story_id, id } = query;
  console.log(project_id, user_story_id, id);
  const result = await apiClient.delete<UseCaseResDto>(
    `/projects/${project_id}/user-stories/${user_story_id}/use-cases/${id}`
  );

  return result;
};
