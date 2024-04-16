import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { getProjects } from './get-projects';
import { ProjectDetailQuery } from '../query';
import { getProject } from './get-project-detail';

export const projectQueries = {
  all: () => ['projects'],
  lists: () => [...projectQueries.all(), 'list'],
  list: (pageIndex: number, pageSize: number) =>
    queryOptions({
      queryKey: [...projectQueries.lists(), pageIndex, pageSize],
      queryFn: () => getProjects(pageIndex, pageSize),
      placeholderData: keepPreviousData
    }),
  detail: (query: ProjectDetailQuery, enabled: boolean) =>
    queryOptions({
      queryKey: ['detail', query?.id],
      queryFn: () => getProject({ id: query.id }),
      staleTime: 5000,
      enabled
    })
};
