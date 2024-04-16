import { apiClient } from '@/shared/api/base';
import { WorkLogResDto } from '../dto';
import { WorkLog } from '../model';

export const updateWorkLog = async (
  body: Partial<WorkLog>
): Promise<WorkLogResDto> => {
  const { sub_task_id, id, ...bodyWithoutId } = body;
  const result = await apiClient.put<WorkLogResDto>(
    `/sub_tasks/${sub_task_id}/work_logs/${id}`,
    { ...bodyWithoutId, sub_task_id, id }
  );

  return result;
};
