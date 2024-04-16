import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { getProgressList } from './get-progress-list';

export const progressQueries = {
  all: () => ['progresses'],
  lists: () => [...progressQueries.all(), 'list'],
  list: (pageIndex: number, pageSize: number) =>
    queryOptions({
      queryKey: [...progressQueries.lists(), pageIndex, pageSize],
      queryFn: () => getProgressList(pageIndex, pageSize),
      placeholderData: keepPreviousData
    })
};
