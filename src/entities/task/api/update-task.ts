import { apiClient } from '@/shared/api/base';
import { TaskResDto } from '../dto';
import { Task } from '../model';

export const updateTask = async (
  body: Partial<Task>
): Promise<TaskResDto> => {
  const { project_id,user_story_id,use_case_id,id,...bodyWithoutId } = body;
  const result = await apiClient.put<TaskResDto>(
    `/projects/${project_id}/user-stories/${user_story_id}/use-cases/${use_case_id}/tasks/${id}`,
    bodyWithoutId
  );

  return result;
};
