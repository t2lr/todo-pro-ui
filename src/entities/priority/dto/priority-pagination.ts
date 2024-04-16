import { PriorityResDto } from '.';

export type PriorityPaginationDto = {
  priorities: PriorityResDto[];
  total: number;
  pageIndex: number;
  pageSize: number;
};
