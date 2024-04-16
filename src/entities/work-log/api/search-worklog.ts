import { apiClient } from '@/shared/api/base';
import { WorkLogQuery } from '../query';
import { WorkLogPaginationDto } from '../model';

export const searchWorkLogs = async (
  pageIndex: number,
  pageSize: number,
  start_date: Date,
  end_date: Date
): Promise<WorkLogPaginationDto> => {
  const query: WorkLogQuery = { pageIndex, pageSize, start_date, end_date };

  const result = await apiClient.get<WorkLogPaginationDto>(
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
