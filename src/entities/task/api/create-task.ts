import { apiClient } from '@/shared/api/base';
import { TaskResDto } from '../dto';
import { Task } from '../model';

export const createTask = async (
  body: Partial<Task>
): Promise<TaskResDto> => {
  const { project_id,user_story_id,use_case_id,...bodyWithoutId } = body;
  const result = await apiClient.post<TaskResDto>(
    `/projects/${project_id}/user-stories/${user_story_id}/use-cases/${use_case_id}/tasks`,
    bodyWithoutId
  );

  return result;
};
