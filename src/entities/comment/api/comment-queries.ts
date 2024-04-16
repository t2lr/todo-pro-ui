import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { searchComments } from './search-comment';

export const commentQueries = {
  all: () => ['comments'],
  lists: () => [...commentQueries.all(), 'list'],
  list: (pageIndex: number, pageSize: number) =>
    queryOptions({
      queryKey: [...commentQueries.lists(), pageIndex, pageSize],
      queryFn: () => searchComments(pageIndex, pageSize),
      placeholderData: keepPreviousData
    })
};
