import { apiClient } from '@/shared/api/base';
import { TaskResDto } from '../dto';
import { TaskDetailQuery } from '../query';

export const deleteTask = async (
  query: TaskDetailQuery
): Promise<TaskResDto> => {
  const { project_id,user_story_id,use_case_id,id } = query;
  const result = await apiClient.delete<TaskResDto>(
    `/projects/${project_id}/user-stories/${user_story_id}/use-cases/${use_case_id}/tasks/${id}`
  );

  return result;
};
