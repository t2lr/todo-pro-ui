import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { getCategoryList } from './get-category-list';

export const categoryQueries = {
  all: () => ['Categoryes'],
  lists: () => [...categoryQueries.all(), 'list'],
  list: (pageIndex: number, pageSize: number) =>
    queryOptions({
      queryKey: [...categoryQueries.lists(), pageIndex, pageSize],
      queryFn: () => getCategoryList(pageIndex, pageSize),
      placeholderData: keepPreviousData
    })
};
