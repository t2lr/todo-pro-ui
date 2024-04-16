import { apiClient } from '@/shared/api/base';
import { ProjectResDto } from '../dto';
import { Project } from '../model';

export const createProject = async (
  body: Partial<Project>
): Promise<ProjectResDto> => {
  const result = await apiClient.post<ProjectResDto>(`/projects`,body);

  return result;
};
