import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { searchWorkLogs } from './search-worklog';

export const workLogQueries = {
  all: () => ['worklogs'],
  lists: () => [...workLogQueries.all(), 'list'],
  list: (
    pageIndex: number,
    pageSize: number,
    start_date: Date,
    end_date: Date
  ) =>
    queryOptions({
      queryKey: [...workLogQueries.lists(), pageIndex, pageSize],
      queryFn: () => searchWorkLogs(pageIndex, pageSize, start_date, end_date),
      placeholderData: keepPreviousData
    })
};
