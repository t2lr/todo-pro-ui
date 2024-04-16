import { apiClient } from '@/shared/api/base';
import { ProjectResDto } from '../dto';
import { Project } from '../model';

export const updateProject = async (
  body: Partial<Project>
): Promise<ProjectResDto> => {
  const result = await apiClient.put<ProjectResDto>(
    `/projects/${body.id}`,
    body
  );

  return result;
};
