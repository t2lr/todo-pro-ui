import { apiClient } from '@/shared/api/base';
import { ProjectResDto } from '../dto';

export const deleteProject = async (id: string): Promise<ProjectResDto> => {
  const result = await apiClient.delete<ProjectResDto>(`/projects/${id}`);

  return result;
};
