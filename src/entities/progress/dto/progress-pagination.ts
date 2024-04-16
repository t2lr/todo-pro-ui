import { ProgressResDto } from '.';

export type ProgressPaginationDto = {
  progress: ProgressResDto[];
  total: number;
  pageIndex: number;
  pageSize: number;
};
