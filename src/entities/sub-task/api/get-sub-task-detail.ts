import { apiClient } from '@/shared/api/base';
import { SubTaskResDto } from '../dto';
import { SubTaskDetailQuery } from '../query';

export const getSubTask = async (
  query: SubTaskDetailQuery
): Promise<SubTaskResDto> => {
  const result = await apiClient.get<SubTaskResDto>(
    `/projects/${query.project_id}/sub_tasks/${query.id}`
  );

  return result;
};
