import { apiClient } from '@/shared/api/base';
import { SubTaskResDto } from '../dto';
import { SubTask } from '../model';

export const updateSubTask = async (
  body: Partial<SubTask>
): Promise<SubTaskResDto> => {
  const {
    project_id,
    user_story_id,
    use_case_id,
    task_id,
    id,
    ...bodyWithoutId
  } = body;

  const result = await apiClient.put<SubTaskResDto>(
    `/projects/${project_id}/tasks/${task_id}/sub_tasks/${id}`,
    { ...bodyWithoutId, task_id, id }
  );

  return result;
};
