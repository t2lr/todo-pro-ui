import { apiClient } from '@/shared/api/base';
import { SubTaskResDto } from '../dto';
import { SubTask } from '../model';

export const createSubTask = async (
  body: Partial<SubTask>
): Promise<SubTaskResDto> => {
  const { project_id, user_story_id, use_case_id, task_id, ...bodyWithoutId } =
    body;
  const result = await apiClient.post<SubTaskResDto>(
    `/projects/${project_id}/tasks/${task_id}/sub_tasks`,
    bodyWithoutId
  );

  return result;
};
