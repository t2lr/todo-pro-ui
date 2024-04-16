import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { searchSubtasks } from './search-sub-tasks';
import { SubTaskDetailQuery } from '../query';
import { getSubTask } from './get-sub-task-detail';

export const subTaskQueries = {
  all: () => ['sub_tasks'],
  lists: () => [...subTaskQueries.all(), 'list'],
  list: (
    pageIndex: number,
    pageSize: number,
    start_date: Date,
    end_date: Date
  ) =>
    queryOptions({
      queryKey: [...subTaskQueries.lists(), pageIndex, pageSize],
      queryFn: () => searchSubtasks(pageIndex, pageSize, start_date, end_date),
      placeholderData: keepPreviousData
    }),
  detail: (query: SubTaskDetailQuery, enabled: boolean) =>
    queryOptions({
      queryKey: ['detail', query?.id],
      queryFn: () => getSubTask({ id: query.id, project_id: query.project_id }),
      staleTime: 5000,
      enabled
    })
};
