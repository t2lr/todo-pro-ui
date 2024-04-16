import { apiClient } from '@/shared/api/base';
import { ProjectResDto } from '../dto';
import { ProjectDetailQuery } from '../query';

export const getProject = async (
  query: ProjectDetailQuery
): Promise<ProjectResDto> => {
  const result = await apiClient.get<ProjectResDto>(`/projects/${query.id}`);

  return result;
};
