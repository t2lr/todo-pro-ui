import { apiClient } from '@/shared/api/base';
import { WorkLogResDto } from '../dto';
import { WorkLogDetailQuery } from '../query';

export const deleteWorkLog = async (
  query: WorkLogDetailQuery
): Promise<WorkLogResDto> => {
  const { sub_task_id, id } = query;
  const result = await apiClient.delete<WorkLogResDto>(
    `/sub_tasks/${sub_task_id}/work_logs/${id}`
  );

  return result;
};
