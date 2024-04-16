import { CommentResDto } from '../dto';

export type CommentPaginationDto = {
  work_logs: CommentResDto[];
  total: number;
  pageIndex: number;
  pageSize: number;
};
