import { WorkLogResDto } from '../dto';

export type WorkLogPaginationDto = {
  work_logs: WorkLogResDto[];
  total: number;
  pageIndex: number;
  pageSize: number;
};
