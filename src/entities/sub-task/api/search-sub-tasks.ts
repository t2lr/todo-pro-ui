import { apiClient } from '@/shared/api/base';
import { SubTaskQuery } from '../query';
import { SubTaskPaginationDto } from '../model';

export const searchSubtasks = async (
  pageIndex: number,
  pageSize: number,
  start_date: Date,
  end_date: Date
): Promise<SubTaskPaginationDto> => {
  const query: SubTaskQuery = { pageIndex, pageSize, start_date, end_date };

  const result = await apiClient.get<SubTaskPaginationDto>(
    '/sub_tasks/search',
    query
  );

  return {
    sub_tasks: result.sub_tasks,
    pageIndex: result.pageIndex,
    pageSize: result.pageSize,
    total: result.total
  };
};
