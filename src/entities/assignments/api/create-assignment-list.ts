import { apiClient } from '@/shared/api/base';
import { AssignmentResDto } from '../dto';
import { AssignmentList } from '../model';

export const createAssignmentList = async (
  body: AssignmentList
): Promise<AssignmentResDto[]> => {
  const result = await apiClient.post<AssignmentResDto[]>(
    `/projects/${body.project_id}/assignments/list`,
    body
  );

  return result;
};
