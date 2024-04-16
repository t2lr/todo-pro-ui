import { ProjectResDto } from './project.dto';

export type ProjectPaginationDto = {
  projects: ProjectResDto[];
  total: number;
  pageIndex: number;
  pageSize: number;
};
