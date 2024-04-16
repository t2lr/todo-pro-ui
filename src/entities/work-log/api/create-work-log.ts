import { apiClient } from '@/shared/api/base';
import { WorkLogResDto } from '../dto';
import { WorkLog } from '../model';

export const createWorkLog = async (
  body: Partial<WorkLog>
): Promise<WorkLogResDto> => {
  const { sub_task_id, ...bodyWithoutId } = body;
  const result = await apiClient.post<WorkLogResDto>(
    `/sub_tasks/${sub_task_id}/work_logs`,
    bodyWithoutId
  );

  return result;
};
