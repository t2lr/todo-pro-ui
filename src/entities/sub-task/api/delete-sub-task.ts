import { apiClient } from '@/shared/api/base';
import { SubTaskResDto } from '../dto';
import { SubTaskDetailQuery } from '../query';

export const deleteSubTask = async (
  query: SubTaskDetailQuery
): Promise<SubTaskResDto> => {
  const { project_id, user_story_id, use_case_id, task_id, id } = query;
  const result = await apiClient.delete<SubTaskResDto>(
    `/projects/${project_id}/tasks/${task_id}/sub_tasks/${id}`
  );

  return result;
};
