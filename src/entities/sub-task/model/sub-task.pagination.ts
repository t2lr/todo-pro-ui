import { SubTaskResDto } from '../dto';

export type SubTaskPaginationDto = {
  sub_tasks: SubTaskResDto[];
  total: number;
  pageIndex: number;
  pageSize: number;
};
