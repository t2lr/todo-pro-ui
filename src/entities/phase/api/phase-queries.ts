import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { getPhaseList } from './get-phase-list';

export const phaseQueries = {
  all: () => ['phases'],
  lists: () => [...phaseQueries.all(), 'list'],
  list: (pageIndex: number, pageSize: number) =>
    queryOptions({
      queryKey: [...phaseQueries.lists(), pageIndex, pageSize],
      queryFn: () => getPhaseList(pageIndex, pageSize),
      placeholderData: keepPreviousData
    })
};
