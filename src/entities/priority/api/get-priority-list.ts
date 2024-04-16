import { apiClient } from '@/shared/api/base';
import { PriorityPaginationDto } from '../dto/priority-pagination';
import { PriorityQuery } from '../query';

export const getPriorityList = async (
  pageIndex: number,
  pageSize: number
): Promise<PriorityPaginationDto> => {
  const query: PriorityQuery = { pageIndex, pageSize };
  const result = await apiClient.get<PriorityPaginationDto>(
    '/priorities',
    query
  );

  return {
    priorities: result.priorities,
    pageIndex: result.pageIndex,
    pageSize: result.pageSize,
    total: result.total
  };
};
