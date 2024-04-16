import { apiClient } from '@/shared/api/base';
import { ProgressPaginationDto } from '../dto/progress-pagination';
import { ProgressQuery } from '../query';

export const getProgressList = async (
  pageIndex: number,
  pageSize: number
): Promise<ProgressPaginationDto> => {
  const query: ProgressQuery = { pageIndex, pageSize };
  const result = await apiClient.get<ProgressPaginationDto>('/progress', query);

  return {
    progress: result.progress,
    pageIndex: result.pageIndex,
    pageSize: result.pageSize,
    total: result.total
  };
};
