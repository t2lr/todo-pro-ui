import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { getPriorityList } from './get-priority-list';

export const priorityQueries = {
  all: () => ['priorities'],
  lists: () => [...priorityQueries.all(), 'list'],
  list: (pageIndex: number, pageSize: number) =>
    queryOptions({
      queryKey: [...priorityQueries.lists(), pageIndex, pageSize],
      queryFn: () => getPriorityList(pageIndex, pageSize),
      placeholderData: keepPreviousData
    })
};
