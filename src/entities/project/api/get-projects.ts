import { apiClient } from '@/shared/api/base';
import { ProjectQuery } from '../query';
import { ProjectPaginationDto } from '../dto';

export const getProjects = async (
  pageIndex: number,
  pageSize: number
): Promise<ProjectPaginationDto> => {
  const query: ProjectQuery = { pageIndex, pageSize };

  const result = await apiClient.get<ProjectPaginationDto>('/projects', query);

  return {
    projects: result.projects,
    pageIndex: result.pageIndex,
    pageSize: result.pageSize,
    total: result.total
  };
};
