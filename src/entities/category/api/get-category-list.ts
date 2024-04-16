import { apiClient } from '@/shared/api/base';
import { CategoryPaginationDto } from '../dto/category-pagination';
import { CategoryQuery } from '../query';

export const getCategoryList = async (
  pageIndex: number,
  pageSize: number
): Promise<CategoryPaginationDto> => {
  const query: CategoryQuery = { pageIndex, pageSize };
  const result = await apiClient.get<CategoryPaginationDto>(
    '/categories',
    query
  );

  return {
    categories: result.categories,
    pageIndex: result.pageIndex,
    pageSize: result.pageSize,
    total: result.total
  };
};
