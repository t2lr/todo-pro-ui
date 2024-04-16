import { apiClient } from '@/shared/api/base';
import { CommentQuery } from '../query';
import { CommentPaginationDto } from '../model';

export const searchComments = async (
  pageIndex: number,
  pageSize: number
): Promise<CommentPaginationDto> => {
  const query: CommentQuery = { pageIndex, pageSize };

  const result = await apiClient.get<CommentPaginationDto>(
    '/work_logs/search',
    query
  );

  return {
    work_logs: result.work_logs,
    pageIndex: result.pageIndex,
    pageSize: result.pageSize,
    total: result.total
  };
};
