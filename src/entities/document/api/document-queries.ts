import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { searchDocuments } from './get-document-list';

export const documentQueries = {
  all: () => ['documents'],
  lists: () => [...documentQueries.all(), 'list'],
  list: (pageIndex: number, pageSize: number) =>
    queryOptions({
      queryKey: [...documentQueries.lists(), pageIndex, pageSize],
      queryFn: () => searchDocuments(pageIndex, pageSize),
      placeholderData: keepPreviousData
    })
};
