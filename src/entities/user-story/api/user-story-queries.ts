import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { getUserStoryList } from './get-user-story-list';

export const userStoryQueries = {
  all: () => ['user_stories'],
  lists: () => [...userStoryQueries.all(), 'list'],
  list: (
    project_id: string,
    pageIndex: number,
    pageSize: number,
    enabled: boolean
  ) =>
    queryOptions({
      queryKey: [...userStoryQueries.lists(), pageIndex, pageSize],
      queryFn: () => getUserStoryList(project_id, pageIndex, pageSize),
      placeholderData: keepPreviousData,
      enabled
    })
};
