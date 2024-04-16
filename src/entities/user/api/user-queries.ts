import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { getUsers } from './get-users';

export const userQueries = {
  all: () => ['users'],
  lists: () => [...userQueries.all(), 'list'],
  list: (pageIndex: number, pageSize: number, enabled: boolean) =>
    queryOptions({
      queryKey: [...userQueries.lists(), pageIndex, pageSize],
      queryFn: () => getUsers(pageIndex, pageSize),
      placeholderData: keepPreviousData,
      enabled
    })
};
